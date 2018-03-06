---
title: "Serverless - Part Three"
layout: "post"
permalink: "/2018/02/serverless-3.html"
date: "2018-02-05 10:00:00"
description: "Examining event driven serverless systems"
category: "serverless"
tags: ["serverless", "series", "events", "eventdriven"]
---

[Part One](/2018/02/severless-1.html) - describing event-driven and serverless systems

[Part Two](/2018/02/severless-2.html) - Infrastructure as code walking skeleton

In this post we will look at how SAM local let's you develop locally and write the first lambda function. To take a `ProposeDestination` command and write a `DestinationProposed` event to the eventstream.

"[SAM Local]((https://github.com/awslabs/aws-sam-local/blob/28eacbdd299917b2cceeb9444fe22bd57d33d97d/README.md)) can be used to test functions locally, start a local API Gateway from a SAM template, validate a SAM template, and generate sample payloads for various event sources."

<!--more-->

# SAM Local

You have to have Docker running locally and then you can `npm install -g aws-sam-local`.

To start the API Gateway and Lambda example from [part two](/2018/02/severless-2.html) navigate to the directory containing the template.yaml file and run `sam local start-api`

This starts lambda in Docker and shows what endpoints are mounted

![the start-api command console output](/images/events/start-api.png)

You can then POST to the endpoint `curl -H "Content-Type: application/json" -X POST -d '{"geolocation":"xyz", "name":"test"}' http://127.0.0.1:3000/destination`

Which outputs the same information as you would see in cloudwatch logs

![the api console output](/images/events/api-console-output.png)

# DynamoDB

This took several attempts to get running - mostly because I am very unfamiliar with Docker.

There are three steps to this

## 1) Start dynamodb

DynamoDB needs to be run as a named container and on the same Docker network as SAM local

```
docker network create lambda-local
sam local start-api --docker-network lambda-local
docker run -d -v "$PWD":/dynamodb_local_db -p 8000:8000 --network lambda-local --name dynamodb cnadiminti/dynamodb-local
```

## 2) Create the DynamoDB table

SAM local can't create DynamoDB tables from the template.yaml in the way that CloudFormation will when the SAM application is deployed so the table needs manually creating

The following AWS CLI command will create the table as defined in the template.yaml

```
aws dynamodb create-table \
  --table-name visitplannr-events \
  --attribute-definitions \
        AttributeName=EventId,AttributeType=S AttributeName=StreamName,AttributeType=S \
  --key-schema AttributeName=EventId,KeyType=HASH AttributeName=StreamName,KeyType=RANGE \
  --provisioned-throughput \
  ReadCapacityUnits=5,WriteCapacityUnits=5 \
  --endpoint-url http://0.0.0.0:8000
```

## 3) Write some code to have the one talk to the other

The client connection code ends up as:

```
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

This module exposes a connect method that lazily initializes a singleton db client.

SAM local sets an AWS_SAM_LOCAL environment variable so the code checks for that and if it is present sets the endpoint URL to `http://dynamodb:8000`. This is the container name and the port it exposes.

For the production code you don't need to set any endpoint and can let lambda figure out what to connect to.

# The first handler

The first pass at the handler ends up looking like this:

```

const map = require('./destinations/map')
const commandHandler = require('./destinations/commandHandler')
const guid = require('./GUID')

let streamRepo
const dynamoDbClient = require('./destinations/dynamoDbClient')
const makeStreamRepository = require('./destinations/make-stream-repository')

exports.handler = (event, context, callback) => {
  const proposeDestination = map.fromAPI(event, 'proposeDestination')

  streamRepo = streamRepo || makeStreamRepository.for(dynamoDbClient.connect(), guid)

  commandHandler
    .apply({
      command: proposeDestination,
      type: 'destinationProposed',
      streamRepository: streamRepo,
      guidGenerator: guid // because command handler knows about correlation id o_O
    })
    .then(() => map.toSuccessResponse(proposeDestination, callback))
    .catch((err) => map.toResponseForInvalidRequest(err, proposeDestination, callback))
}

```
