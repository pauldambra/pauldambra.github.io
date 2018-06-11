---
title: "Serverless - Part One"
layout: "post"
permalink: "/2018/02/serverless-1.html"
date: "2018-02-03 10:00:00"
description: "Examining event driven serverless systems"
category: "serverless"
tags: ["serverless", "series", "events", "eventdriven"]
---

Anyone who knows me knows that I like to talk about Event-driven systems. And that I'm very excited about serverless systems in utility computing.

I started my career in I.T. having to order network cables, care about fuses, and plan storage and compute capacity. It was slow, frustrating, and if you got it wrong it could take (best case scenario!) days to correct.

Over a few articles I hope to communicate what serverless is, why you should find it exciting, and how to start using it.

Let's start by defining our terms...

<!--more-->

## Utility Computing

As a name, "The Cloud™️" is terrible. It's meaningless. It totally fails to communicate what it is. Maybe it's a place you put computers? Maybe it's because applications can "scale" there?

Far better to think of "Utility Computing". United Utilities provides water as a utility to properties. Their customers know, vaguely, that there are water mains, and reservoirs, water treatment plants, and more but don't have to care. They don't think about that detail, they just turn on a tap.

*That's* the cloud. Computing as a utility. You don't have to care if the provider is running servers or containers, if they have enough fuses in stock, or what model of switch they bought. You just turn on your application and let it run.

## Event-driven systems

Events are facts. They are things that happened so they are immutable. An application can store the events.

In systems that are not event driven **the events are still there** only they are ephemeral, implied in the API call, the change in state, the UI interaction, etc. In the event-driven system they are central to what happens.

[Fowler describes multiple types](https://martinfowler.com/articles/201701-event-driven.html) of Event-driven systems:

 1) Event Notifications

One system registers with another. That system raises an event: `PersonChangedAddress`. If the "subscriber" cares it takes some action. In a system where events are notifications they might carry no information. So the subscriber still needs to call an API or in some other way load the information it needs to take an action.

![event notifications system diagram](/images/events/event-notification.jpg)

 2) Event Carried State Transfer (should obvs be "Event Assisted State Transfer" or E.A.S.T.)

One system registers with another. That system raises an event: `PersonChangedAddress` and includes at least the new address and the identifier for the person. The subscriber now has all the information it needs to respond to the event.

![event carried system diagram](/images/events/east.jpg)

 3) [Command Query Responsibility Segregation (CQRS)](#cqrs)

An application that separates writing to the system (commands) from reading from it (queries).

Arguably not an event-driven architecture since it can be achieved without events. But Greg Young asserts it was a necessary step to a world that has EventSourcing (in [this video](https://www.youtube.com/watch?v=LDW0QWie21s) IIRC).

Here one application receives the command `ChangeAddress`. It acts on it. That action might raise an event, write to a queue, write to a database... the mechanism doesn't matter for CQRS.

Another application (or the same one in a different code path) has the responsibility for querying the system. It lets people view a list of addresses but the work of reading an address for display is much simpler (generally) than the work of accepting, validating, transforming, and storing the address on the command side.

CQRS is a _big_ topic. [Fowler's description](https://martinfowler.com/bliki/CQRS.html) is a good starting point. And [Rob Ashton has a good article](http://codeofrob.com/entries/cqrs-is-too-complicated.html) showing varying levels of complexity of CQRS approaches

![CQRS system diagram](/images/events/cqrs.jpg)

 4) EventSourcing

An event-sourced system doesn't just respond to events but builds its state by replaying the events. For example instead of storing an order:

 `{"user": "12345", "items": [{"sku": "54321", "paid": "£1.23"}]}`.

 You would store events:

 ```json

 [
  {"type": "userStartedOrder", "user": "12345"},
  {"type": "userAddedItemToBasket", "item": {"sku", "54321"}},
  {"type": "userPaidInFull", amount: "£1.23"}
]

```

An application can now read all three of those events to generate the state of the order.

Or it could read all of the events of type `PersonChangedAddress` and generate a list of all addresses in the system.

![event sourcing system diagram](/images/events/event-sourced.jpg)

The event-driven approach has a number of benefits. Most strikingly flexibility to changes in business logic, the ability to audit what has happened, and composability. Imagine we need to report on stock and accounts changes - we don't even need to change any deployed module.

![building on an event driven system diagram](/images/events/event-composed.jpg)

This additive approach means that every application that only reads from the stream can never add defects to existing applications!

Ok, never say never, the chance of introducing a defect at the system level exists but is far, far lower than in a change that directly affects the already deployed application's code.

## Serverless

Serverless continues this journey. [It obviously doesn't mean there aren't _any_ servers.](https://twitter.com/search?q=serverless%20AND%20%22no%20servers%22&src=typd) But it does mean that you hardly have to care there are servers.

Before I started this I was conflating "Serverless" with "Functions-as-a-service" (FaaS).

FaaS is a system where a utility compute provider runs arbitrary code on your behalf in response to events occuring. [No virtual machine, No network config, no capacity planning](https://youtu.be/SKAqmqVQ700?t=1m3s). Think AWS Lambda or Azure Functions.

Serverless *implies* event-driven!

Also serverless isn't just functions!

Storage, database, queues, and more can be provided in such a way that they are distributed, highly available, elastic, *and you don't have to manage, or maintain any infrastructure*. Well, ish, you have to create the serverless components and their connections... but not the infrastructure they're going to run on (and it's patches, and new versions, and foibles, and ...)

So that last system diagram could be rewritten:

![serverless event driven system diagram](/images/events/serverless.jpg)

Globally distributed, resilient, highly available, scalable, event-driven system. And somebody else manages all the pieces while you fill it with code.

I'm sold!

# Let's use a toy system to explore it?

I _love_ building event-driven systems but they're not the norm so it's a long time since I've had one in production. While I was off work recently I thought I'd practice. Since Serverless is _the future_ I decided to make a serverless system. Because I know how to have fun.

Finding somewhere to take your kids can be difficult and, since it was half-term, was on my mind. It seems like there are no websites that are aware of where you are, where you could go, and what the weather might be like when you get there...

So let's make that.

## Level 1: System Context Diagram

![the first level of a c4 diagram](/images/events/c4/1.jpg)

## Level 2: Container Diagram

![the second level of a c4 diagram](/images/events/c4/2.jpg)

## Level 3: Component Diagram

![the third level of a c4 diagram](/images/events/c4/3.jpg)

(check out [Simon Brown's C4 diagrams](https://c4model.com/) - they're 💯)

Some of this is pretty speculative but it's roughly the right shape. So it's not worth designing any more until I've learnt some more.

This is already a massive post so I'll stop here. Next time I'll try and have fewer of my terrible drawings and more code!
