---
title: "Serverless - Part Three"
layout: "post"
permalink: "/2018/02/serverless-3.html"
date: "2018-02-05 10:00:00"
description: "Examining event driven serverless systems"
category: "serverless"
tags: ["serverless", "series", "events", "eventdriven"]
---

[Part One](/2018/02/serverless-1.html) - describing event-driven and serverless systems

[Part Two](/2018/02/serverless-2.html) - Infrastructure as code walking skeleton

In this post we will look at how SAM local let's you develop locally and write the first lambda function. To take a `ProposeDestination` command and write a `DestinationProposed` event to the eventstream.

"[SAM Local](https://github.com/awslabs/aws-sam-local/blob/28eacbdd299917b2cceeb9444fe22bd57d33d97d/README.md) can be used to test functions locally, start a local API Gateway from a SAM template, validate a SAM template, and generate sample payloads for various event sources."

<!--more-->

# SAM Local

You have to have Docker running locally and then you can `npm install -g aws-sam-local`.

To start the API Gateway and Lambda example from [part two](/2018/02/serverless-2.html) navigate to the directory containing the template.yaml file and run `sam local start-api`

This starts lambda in Docker and shows what endpoints are mounted:

![the start-api command console output](/images/events/start-api.png)

You can then POST to the endpoint `curl -H "Content-Type: application/json" -X POST -d '{"geolocation":"xyz", "name":"test"}' http://127.0.0.1:3000/destination`

Which outputs the same information as you would see in cloudwatch logs:

![the api console output](/images/events/api-console-output.png)

# DynamoDB

This took several attempts to get running - mostly because of unfamiliarity with Docker - [AWS were super helpful on twitter](https://twitter.com/heitor_lessa/status/968574144681037826) despite my silliness. Without that confusion this would have been very straightforward.

There are three steps to this:

## 1) Start dynamodb

DynamoDB needs to be run as a named container and on the same Docker network as SAM local

```bash
docker network create lambda-local
sam local start-api --docker-network lambda-local
docker run -d -v "$PWD":/dynamodb_local_db -p 8000:8000 --network lambda-local --name dynamodb cnadiminti/dynamodb-local
```

## 2) Create the DynamoDB table

SAM local can't create DynamoDB tables from the template.yaml in the way that CloudFormation will when the SAM application is deployed so the table needs manually creating.

The following AWS CLI command will create the table as defined in the template.yaml:

```bash
aws dynamodb create-table \
  --table-name visitplannr-events \
  --attribute-definitions \
        AttributeName=EventId,AttributeType=S AttributeName=StreamName,AttributeType=S \
  --key-schema AttributeName=StreamName,KeyType=HASH AttributeName=EventId,KeyType=RANGE \
  --provisioned-throughput \
  ReadCapacityUnits=5,WriteCapacityUnits=5 \
  --endpoint-url http://0.0.0.0:8000
```

## 3) Write some code to have the one talk to the other

The client connection code is:

```js

const AWS = require('aws-sdk')
const awsRegion = process.env.AWS_REGION || 'eu-west-2'

let dynamoDbClient
const makeClient = () => {
  const options = {
    region: awsRegion
  }
  if (process.env.AWS_SAM_LOCAL) {
    options.endpoint = 'http://dynamodb:8000'
  }
  dynamoDbClient = new AWS.DynamoDB.DocumentClient(options)
  return dynamoDbClient
}

module.exports = {
  connect: () => dynamoDbClient || makeClient()
}

```

This module exposes a connect method that lazily initializes the db client.

SAM local sets an AWS_SAM_LOCAL environment variable so the code checks for that and if it is present sets the endpoint URL to `http://dynamodb:8000`. This is the container name and the port it exposes.

For the production code you don't need to set any endpoint and can let lambda figure out what to connect to.

# The propose destination handler

The handler should act as a [composition root](http://blog.ploeh.dk/2011/07/28/CompositionRoot/). It creates the application's object graph and lets the parts do the work. This allows unit tests to inject fakes. If those tests were to exercise the handler directly the code would run the `dynamoDbClient` and timeout waiting for dynamodb.

The handler ends up looking like this:

```js

const httpResponse = require('./destinations/httpResponse')
const mapCommand = require('./destinations/mapCommand')

const guid = require('./GUID')

let streamRepo
const dynamoDbClient = require('./destinations/dynamoDbClient')
const makeStreamRepository = require('./destinations/make-stream-repository')

const commandHandler = require('./destinations/commandHandler')

exports.handler = (event, context, callback) => {
  const proposeDestination = mapCommand.fromAPI(event, 'proposeDestination')

  streamRepo = streamRepo || makeStreamRepository.for(dynamoDbClient.connect(), guid)

  commandHandler
    .apply({
      command: proposeDestination,
      type: 'destinationProposed',
      streamName: 'destination',
      streamRepository: streamRepo
    })
    .then(() => httpResponse.success(proposeDestination, callback))
    .catch((err) => httpResponse.invalid(err, proposeDestination, callback))
}

```

Here the handler converts the API gateway event to a `ProposeDestination` command. It then either uses the existing stream repository or creates one currying the dynamodb client and guid generator.

The command handler is then called. It either converts the command to a `destinationProposed` event and returns an HTTP 200 success. Or fails and returns an HTTP 400 invalid request.

# Testing this with SAM local

I haven't wrapped this up into something useful that could be run in a CI pipeline but as a sense check before deployment this is a good starting point.

First ensure SAM local is running:

`AWS_REGION=eu-west-2 sam local start-api --docker-network lambda-local`

Then also that dynamodb is running:

`docker run -d -v "$PWD":/dynamodb_local_db -p 8000:8000 --network lambda-local --name dynamodb cnadiminti/dynamodb-local`

Then write a test to exercise the system:

```js

const request = require('supertest')
var exec = require('child_process').exec
const expect = require('chai').expect

const rootUrl = process.env.rootUrl || 'http://127.0.0.1:3000'
const dynamoDbUrl = process.env.dynamoDbUrl || 'http://0.0.0.0:8000'

const countItemsInTable = () => {
  return new Promise((resolve, reject) => {
    exec(
      `aws dynamodb scan --table-name visitplannr-events --endpoint-url ${dynamoDbUrl}`,
      (error, stdOut, stdErr) => {
        if (error) {
          reject(new Error(error))
          return
        }
        const scanResult = JSON.parse(stdOut)
        resolve(scanResult.Items.length)
      }
    )
  })
}

describe('propose destination', function () {
  it('can write an event to dynamodb', function (done) {
    this.timeout(5000)

    countItemsInTable()
      .then(startCount => {
        request(rootUrl)
          .post('/destination')
          .send('{"name":"test destination","geolocation":{"x": 0, "y": 0}}')
          .end((err, res) => {
            if (err) {
              done(err)
              return
            }
            countItemsInTable()
              .then(finalCount => {
                expect(finalCount).to.equal(startCount + 1)
                done()
              })
              .catch(done)
          })
      })
      .catch(done)
  })
})


```

This is not a great example of a test for a number of reasons but it does demonstrate that the running system can receive an HTTP post after which there is one more item in the dynamodb table.

The devil is always in the detail so this test wouldn't be good enough for a real system. But it does show that the lambda functions can be integration tested locally with real HTTP calls, writing to a local dynamodb.

# Unit testing

The composition root approach means that the handler can be unit tested without relying on the dynamodb client. As an example testing the behaviour in the repository against a fake dynamodb, here the test locks in that the repository adds a correlation id to the item written to the stream:

```js

const streamRepoFactory = require('../destinations/make-stream-repository')
const expect = require('chai').expect

describe('the stream repository', function () {
  const fakeGuidGenerator = {
    generate: () => 'a-generated-guid'
  }

  const fakeDynamoDbClient = {
    put: (params, callback) => { callback() }
  }

  const streamRepo = streamRepoFactory.for(fakeDynamoDbClient, fakeGuidGenerator)

  let writeToTheStream

  beforeEach(function () {
    writeToTheStream = streamRepo.writeToStream(
      {
        streamName: 'arbitrary-string',
        event: {winnie: 'pooh'}
      }
    )
  })

  it('decorates the event with a correlation id', function (done) {
    writeToTheStream
      .then(writtenItem => {
        expect(writtenItem.Item.event).to.deep.equal({
          winnie: 'pooh',
          correlationId: 'a-generated-guid'
        })
        done()
      })
      .catch(done)
  })
})

```

Writing to the event stream can be tested with a guid generator that always generates the same guid, and a dynamodb client that doesn't connect to dynamodb. This lets other behaviour be tested without those dependencies complicating or slowing down the tests.

# Testing in AWS

The integration test above is bound to querying dynamodb using the AWS CLI. It would not take a lot of fixing to have that test run against an actual API Gateway endpoint and dynamodb instance.

At this point the code is still coming together but demonstrates that there is a local dev story, the system could be tested in CI, and can run in AWS.

# Extending the system

So now POSTing to Lambda can write events to dynamodb. In the next post we will look at subscribing to and responding to that event stream.

All the code for this stage can be found [on github](https://github.com/pauldambra/visit-plannr/tree/code-blog-post-part-three)
