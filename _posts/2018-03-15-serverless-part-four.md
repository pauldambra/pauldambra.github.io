---
title: "Serverless - Part Four"
layout: "post"
permalink: "/2018/02/serverless-4.html"
date: "2018-03-15 10:00:00"
description: "Examining event driven serverless systems"
category: "serverless"
tags: ["serverless", "series", "events", "eventdriven"]
---

[Part One](/2018/02/serverless-1.html) - describing event-driven and serverless systems

[Part Two](/2018/02/serverless-2.html) - Infrastructure as code walking skeleton

[Part Three](/2018/02/serverless-3.html) - SAM Local and the first event producer

In this post we start to see how we can build a stream of events that lets us create state. We'll do this by adding an event subscrber that waits until a user proposes a destination to visit and validates the location they've provided.

![the slice being built in this article](/images/events/c4/second-slice-4.jpg)

<!--more-->

# Overview

This slice will prove that the system can subscribe to events occurring, react to them, and write new events back to the stream. That would only leave authentication, and a read model website to build to provide all the parts needed.

Subscribing and reacting to events demonstrates one of the benefits mentioned in [part one](/2018/02/serverless-1.html). That these systems are composable. The additional code added here won't need any changes to the existing deployed applications. But can still add new behaviour to the system as a whole.

In part three we added a command handler that could write `ProposedDestination` events. Here a user is saying they think there is a place that parents would like to take their kids. The application accepts this to smooth their experience (and capture any proposal) and then responds to that event by checking the provided details before listing the new destination.

![the event flow](/images/events/part-four-flow.jpg)

So:

 * one or more ProposedDestination events occur
 * The Location Validator is subscribed to those events
 * It reads each one and validates the provided location
 * Writing the success or failure event to the stream

Notice here that the validator doesn't need to know what happens in case of success or failure. It doesn't even need to know whether there are applications that do something - there's no coupling of config or orchestration.

# Twee Example

The first iteration will be a validator that confirms that an event has a `geolocation` key which has a numeric latitude and longitude.

```
{
  "geolocation": {
    "latitude": 1.23,
    "longitude": 2.34
  }
}
```

This is obviously a bit silly but the point here isn't to see what useful location validation looks like. Think of it as a walking skeleton into which more realistic geolocation like checking the coordinate is in the UK could be placed.

# Infrastructure Changes

As discussed in [part two](/2018/02/serverless-2.html) DynamoDb already has the concept of streams of changes to tables as triggers for lambdas. Updating the SAM template to add the stream changes the definition to:

```
  EventsTable:
    Type: "AWS::DynamoDB::Table"
    Properties:
      AttributeDefinitions:
        - AttributeName: StreamName
          AttributeType: S
        - AttributeName: EventId
          AttributeType: S
      KeySchema:
        - AttributeName: StreamName
          KeyType: HASH
        - AttributeName: EventId
          KeyType: RANGE
      ProvisionedThroughput:
        ReadCapacityUnits: 5
        WriteCapacityUnits: 5
      StreamSpecification:
        StreamViewType: NEW_IMAGE
```

This change to add the [`StreamSpecification`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_StreamSpecification.html) YAML key sets the stream of changes to only include the new version of the item. The valid options for `StreamViewType` are:

 * KEYS_ONLY - Only the key attributes of the modified item are written to the stream.
 * NEW_IMAGE - The entire item, as it appears after it was modified, is written to the stream.
 * OLD_IMAGE - The entire item, as it appeared before it was modified, is written to the stream.
 * NEW_AND_OLD_IMAGES - Both the new and the old item images of the item are written to the stream.

Referring back to Fowler's four types of event driven systems from [part One](/2018/02/serverless-1.html):

 * `KEYS_ONLY` works for "Event Notification": the receiver knows a property changed and whether it wants to act (_but not what changed_).
 * `NEW_IMAGE` could map to "Event Assisted State Transfer" (EAST) unless the receiver needs access to the old version of the data. For example to write to your old and new address when your postal address changes. And could map to CQRS where the new_image could be either the command or the result of accepting the command
 * `OLD_IMAGE` doesn't map to any type but would be great for an audit log or system where data mustn't be lost.
 * `NEW_AND_OLD_IMAGES` maps well to EAST and CQRS.

25 characters to add the change. Over 1200 to disect it.

# The Lambda...

... is again a simple composition root to allow unit testing without the external dependencies.

```
const mapDomainEvent = require('./destinations/location-validation/dynamoDbMap')

const guid = require('./GUID')

let streamRepo
const dynamoDbClient = require('./destinations/dynamoDbClient')
const makeStreamRepository = require('./destinations/make-stream-repository')

const geolocationValidator = require('./destinations/location-validation/geolocation-validator')

const geolocationEventWriter = require('./destinations/location-validation/geolocation-validation-event-writer')
let eventWriter

const makeEventSubscriber = require('./destinations/location-validation/event-subscriber')

exports.handler = (event, context, callback) => {
  const receivedEvents = mapDomainEvent.from(event)

  streamRepo = streamRepo || makeStreamRepository.for(dynamoDbClient.connect(), guid)
  eventWriter = eventWriter || geolocationEventWriter.for(streamRepo)

  const eventSubscriber = makeEventSubscriber.for(geolocationValidator, eventWriter)

  eventSubscriber.apply(receivedEvents, callback)
}
```

Again some dependencies are initialised in the handler but memoised outside of it to reduce start-up time when a lambda is re-used.

It maps from the list of DynamoDB events received to a list of domain events and then passes those off to an `eventSubscriber`. The event subscriber has the validator and the resulting events writer injected.

The event subscriber is only interesting because it does some Promise fangling:

```
module.exports = {
  for: (geolocationValidator, eventWriter) => ({
    apply: (events, callback) => {
      console.log(`received events: ${JSON.stringify(events)}`)

      const writePromises = events.map(e => {
        return geolocationValidator
          .tryValidate(e)
          .then(() => {
            return eventWriter.writeSuccess(e)
          })
          .catch(err => {
            return eventWriter.writeFailure(err, e)
          })
      })

      Promise.all(writePromises)
        .then(() => callback(null, `wrote ${writePromises.length} events to dynamodb`))
        .catch(err => callback(err))
    }
  })
}

```

Both the validator and the event writer return promises. The validator only to provide a nicer API. The writer because it is IO. Because of JavaScript's single-threaded "helpfulness" this could mean that your code finishes before the promises finish handing back to the Lambda's callback and terminating your code before it can complete.

This naive version does just that:

```
module.exports = {
  for: (geolocationValidator, eventWriter) => ({
    apply: (events, callback) => {
      console.log(`received events: ${JSON.stringify(events)}`)

      events.forEach(e => {
        geolocationValidator
          .tryValidate(e)
          .then(() => {
            eventWriter.writeSuccess(e)
          })
          .catch(err => {
            eventWriter.writeFailure(err, e)
          })
      })

      callback(null, `wrote ${events} events to dynamodb`))
    }
  })
}

```

Instead each Promise is captured and [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) is used to convert that list of promises into a single promise that only completes when they have all completed.

Testing that takes a bit of juggling but is relatively straight-forward:

```
const chai = require('chai')
const dirtyChai = require('dirty-chai')
chai.use(dirtyChai)
const expect = chai.expect

const geolocationValidator = require('../../destinations/location-validation/geolocation-validator')
const geolocationEventWriter = require('../../destinations/location-validation/geolocation-validation-event-writer')
const makeEventSubscriber = require('../../destinations/location-validation/event-subscriber')

const severalFakeEvents = () => {
  const fakeEvent = {
    event: {
      geolocation: {
        latitude: '0',
        longitude: '0'
      }
    }
  }
  return [
    fakeEvent,
    fakeEvent,
    fakeEvent
  ]
}

const simulateSlowWriteToDynamo = () => {
  const now = new Date().getTime()
  while (new Date().getTime() < now + 200) { /* do nothing */ }
}

const assertAllOfTheEventsHaveWritten = (actual, expected) => {
  expect(actual).to.equal(expected)
}

describe('the event subscriber can handle multiple events', function () {
  it('without calling back it is finished before they write to dynamo', function (done) {
    let writesCompleted = 0

    const fakeSlowStreamRepo = {
      writeToStream: () => {
        return new Promise((resolve, reject) => {
          simulateSlowWriteToDynamo()
          writesCompleted++
          resolve()
        })
      }
    }

    const eventWriter = geolocationEventWriter.for(fakeSlowStreamRepo)

    const eventSubscriber = makeEventSubscriber.for(geolocationValidator, eventWriter)

    const events = severalFakeEvents()

    eventSubscriber.apply(
      events,
      (err, complete) => {
        expect(err).to.be.null()
        expect(complete).to.not.be.null()

        assertAllOfTheEventsHaveWritten(writesCompleted, events.length)

        done()
      })
  })
})
```

Here a fake, slow write is introduced and captures a count of completed writes.

```
let writesCompleted = 0

const fakeSlowStreamRepo = {
  writeToStream: () => {
    return new Promise((resolve, reject) => {
      simulateSlowWriteToDynamo()
      writesCompleted++
      resolve()
    })
  }
}
```

This let the change above be test-driven. Running the test showed it failing before any delays occurring until the `Promise.all` change was introduced.

# Woo-Hoo! Event-Driven!

Running `deploy.sh` and pushing a test API event in results in a DynamoDB table with the expected two events.

![two events in a dynamodb table](/images/events/2-events-written.png)

```
{
  "event": {
    "correlationId": "2237661b-851b-4e78-3dfd-efe2436717d4",
    "geolocation": {
      "latitude": 3.14,
      "longitude": 4.13
    },
    "name": "1",
    "type": "destinationProposed"
  },
  "EventId": "a49fc63b-889f-4311-3b7f-efb6251d39c3",
  "StreamName": "destination-2237661b-851b-4e78-3dfd-efe2436717d4"
}
```

```
{
  "event": {
    "correlationId": "2237661b-851b-4e78-3dfd-efe2436717d4",
    "triggeringEvent": "a49fc63b-889f-4311-3b7f-efb6251d39c3",
    "type": "geolocationValidationSucceeded"
  },
  "EventId": "d8b75eb2-347f-4275-3ea4-7d1c934e6589",
  "StreamName": "destination-2237661b-851b-4e78-3dfd-efe2436717d4"
}
```

This is fantastic. All of the pieces for the event-driven back-end now exist.

It's not all golden. There's still quite a bit of manual testing necessary to check that the lambda's dependencies are declared correctly and wired together as expected. And to check that the system hangs together as expected.

At the moment that's not enough pain to stop moving forwards with the broad-brushstrokes implementation but it is getting close.

Next time we will add a read model and (depending on the length of the blog post that generates) view it via HTML.

All the code for this stage can be found [on github](https://github.com/pauldambra/visit-plannr/tree/code-blog-post-part-four)

# An aside on cost

So far this blog series has cost $0.09 in AWS charges relating to vistplannr. Almost all of which has been avoidable S3 charges.
