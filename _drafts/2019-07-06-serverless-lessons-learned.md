---
title: "Serverless - Lessons learned"
layout: "post"
permalink: "/2019/07/serverless-lessons-learned.html"
date: "2019-07-06 10:00:00"
description: "reflecting on 6 months of building serverless systems"
category: "serverless"
tags: ["serverless", "experience-report"]
---

At [Manchester Java Unconference 2019](https://mcrjava.github.io/jmanc/) I attended a discussion on "Cloud Native Functions". It turned out nobody in the group had used "cloud native" but I've been working with teams using serviceful systems.

I have a bad habit of talking more than I should but, despite my best efforts, the group expressed interest in hearing what teams at Co-op Digital had learned in the last ten months or so of working with serviceful systems in AWS.

We defined some terms, covered some pitfalls and gotchas, some successes, and most of all our key learning: that once you can deploy one serviceful system into production you can move faster than you ever have before.

Let's spend a little while defining our terms...

<!--more-->

# Cloud Native Functions

[The Cloud Native Computing foundation](https://www.cncf.io/) is a group of companies seeking to define open standards for systems built to run on "the cloud".

> Cloud native technologies empower organizations to build and run scalable applications in modern, dynamic environments such as public, private, and hybrid clouds. Containers, service meshes, microservices, immutable infrastructure, and declarative APIs exemplify this approach.

from: https://github.com/cncf/foundation/blob/master/charter.md

Seeking to build "a constellation of high-quality projects that orchestrate
containers as part of a microservices architecture."

So, cloud native functions are (container based) systems that allow you to run functions as a service (Faas).

# FaaS

These are compute environments that let someone deploy a function that will run in response to events triggered by the environment.

AWS, Azure, and Google Cloud Platform all have a FaaS offering. There are systems like kubeless that let you run infrastructure (or rent it from someone else) and run your own FaaS environment on top of that.

[CNCF has a landscape view](https://landscape.cncf.io/format=serverless&fullscreen=yes&zoom=150) at time of writing that has 58 serverless products on it.

58 products!

So even though I've been working for nearly a year on this I don't lay particular claim to expertise and certainly don't claim to know what all of those systems do.

# Serverless

There's quite a bit of [definition of serverless in a previous post](/2018/02/serverless-1.html).

![what you do and don't manage in a serverless system](/images/serverless-maintenance.png)

This image shows what you need to operate to run something (a web application, a queue, a database) and how much of that you need to manage under different scenarios.

I've had to guess at some of the detail of how a particular vendor might provide managed kubernetes for example. This does show that serverless doesn't mean there are no servers, it means that there are no servers you need to care about (ish).

# Serviceful Systems

Some folk don't get on with the name serverless. My colleague Chris Sewart introduced me to the idea of calling it "serviceful" instead. [The earliest reference for the name I can find is Patrick Debois at Serverlessconf](https://twitter.com/JoeEmison/status/1147825424615059456). A 30 minute video here: [https://www.youtube.com/watch?v=bYCPbKHivMA](https://www.youtube.com/watch?v=bYCPbKHivMA)

Instead of concentrating on not having servers. Concentrate on making best use of services. The example my colleague uses is that if you want a file system you almost certainly want NFS because it's an excellent file system. But that generally speaking you don't really want a file system you just want somewhere it is easy to put files. As a result you should use S3 (if you're in AWS) because that's a really easy way to store files.

In a serviceful system you should default to consuming the service. The service doesn't come with the provisioning and maintenance burden of the not-service. Even if the not-service is in some way better it needs to be a lot better to justify its cost.

# Background / Context

I work with a team that build membership and offers systems for Co-op. At one point the team was 200 people from 3 different consultancies. It's now a few more than 20. 200 people working to a short deadline even bringing their best selves every day can introduce an awful lot of technical debt.

Dealing with that debt while adding to and fixing our systems was making us very slow. Most of our work can be made so that it can be added alongside what exists. That lets us deal with technical debt at a different cadence than we deal with our customers' needs.

We already run in AWS so we chose to use AWS lambda for FaaS and DynamoDB for (sort of) key-value storage. We were already using SQS (queue), SES (email), and S3 (storage).

# Event driven and asynchronous or GTFO

The first thing to accept is that this is an event-driven thing. You have to approach the design of your system as lots of little things talking to each other by raising events (albeit implicitly). If you can't or don't want to then you're not going to get on with this way of building things.

Where something is synchronous (e.g. an API call) you have to know that you can process and respond in a short enough time or that you can fake a synchronous system. For example if you can always succeed (at least after retry) then just return 20x to the calling client, put their request into SQS, and move on.

Honestly, in most cases you should already be thinking of your system as little, independent things talking to each other by sending messages. However, it was fascinating to have someone in the discussion group that worked at Elastic on ElasticSearch. Such a different development context and you could see that things that were absolutely true for them didn't make sense for me and vice versa.

(Always important to remember that we all say "pattern" a lot and that means: a problem, a solution, *and a context*)

# Empowering if you empower

# Cheap and fast and slow

## cheap

Cost isn't the most important thing - developers can cost much more than infrastructure. But we've been building entirely servicefully for a little less than a year now and our systems do more than they used to but at worst our AWS bill has been flat over that year. We use [cloudability](https://www.cloudability.com/) to track our spending and that predicts a 10-20% drop in bill over the next 12 months based on change over the last year.

S3 and dynamo are our highest serverless cost. Lambda is effectively free still despite running production workloads and underpinning the majority of our scheduled infrastructure tasks.

DynamoDB was rising in cost because we were setting tables to fixed provisioned capacities but setting it to "on demand" is a better fit for us and is reducing that cost. The moral of the tale here is you get forensic visibility into the cost of what you're running. But you have to make sure you're using a service like cloudability and are checking what you're spending.

You also have to make sure you are looking at the cost profile of the services... AWS Cognito is cheap as chips, AWS Cognito with Advanced Security not so much. AWS API Gateway is super cheap and per request pricing. Azure API Management service you pay to reserve capacity so at some traffic levels could end up spending more than running an API gateway yourself. You can't just assume this is cheaper but approached in the right way there's a good chance it is.

## and fast

These services are (in our experience, in AWS) rock-solid, stable, and fast. But they're also fast to build. Once you know how! The group building offers took two weeks to get their first API Gateway > Lambda > DynamoDB system into production. They took one day to get the second out.

Sure you can achieve those speeds without serviceful systems but that second portion of the system is incredibly loosely coupled with the first. And that is very hard to achieve without serviceful/serverless/FaaS.

## and slow

But you are also accepting that you are leaning on a framework that you can't play around with. We use a number of existing dependencies that live inside a VPC (a private network in AWS) and so we have to deploy some lambdas inside that VPC.

Currently cold start of a lambda function in a VPC takes a pretty consistent ten seconds. For an offline batch process that doesn't really matter but if you connect that up to an API that's abysmal.

AWS are working on this and there are ways to understand and deal with this. But it's a great example of how you have to accept the tradeoff and build around the services you're using.

# Commit to learning

# Know when to say no

# This is forking awesome
