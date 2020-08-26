---
title: "Ubictionary" 
layout: "post" 
permalink: "/2017/05/ubictionary.html" 
date: "2017-05-10 19:58:00"
description: "The right language shared with the right people"
category: "naming"
tags: [language, names, ddd, misunderstandings, agilemanc]
---
<!--alex ignore dick --->
I've spent a great first day at [Agile Manchester 2017](http://agilemanchester.net/2017/). One of the slides at a talk from [Anna Dick](https://twitter.com/Dixi_chick) was the stand-out point of the day for me.

"Find a common language, don't rely on agile jargon"

<!--more-->
<!--alex ignore dick --->
![slide from of Anna Dick and Co-Op Digital](/images/common-language.jpg)

George Washington was the first to say that "the hardest problem in computer science is naming things and cache invalidation" (citation needed). 

However, often where we do focus on getting a name right in the code (and it's _really_ important that we do that) we don't focus on making sure that name comes from a language that everyone understands and uses. 

As a trivial example don't call something `ChangeJobTitle` when your users are looking for `Promote`.

## This reminded me of...

A recent job where I was at a startup working with maths wizards to try and track shoppers around physical retail stores using only their smartphones. 

_The shoppers' phones not the wizards'._ 

The maths wizards had a complex language and so did retailers and we wanted to make sure that the retailers and shoppers didn't have to care about or understand the maths wizards' language in order to use the system.

We spent time trying to track our language use even publishing an "ubictionary". A portmanteau of 'Dictionary' and '[Ubiquitous language](https://martinfowler.com/bliki/UbiquitousLanguage.html)'. It didn't always work but we felt we were doing ok.

As we were dealing with physical retail one of the names we struggled with was 'site' vs 'store'. The maths wizards didn't need to think about the outside world so they called the indoor shopping area the 'site'. Whereas we cared about the physical location of the 'store' which we called the 'site', using 'store' to mean the indoor shopping area.

Arguably more communication sooner could have avoided this confusion but we treated these as separate [bounded contexts](https://martinfowler.com/bliki/BoundedContext.html). So we documented the two usages and moved on pleased that we'd got the name right.

Another thing we struggled with was that we could only really talk to customer proxies so the language we were trying to capture didn't come to us first-hand. Several months after putting the site/store schism to bed we managed to arrange time with two retail contacts to pick their brains and I used the word 'site'.

They knew what I meant but there was a clear moment of friction as they had to translate in order to follow me. We dug into that and they then spent five or ten minutes discussing whether it was **a 'plot' or a 'lot'.**

## Five minutes with an actual customer had invalidated one of our most basic uses of language.

That's why I was really pleased to see this talk call out not only that we should avoid jargon and find the right language but that it needs to be a common language.

### In other words (pun intended)

If you aren't talking to your users and customers and you aren't absorbing how they think and talk about the things you're working on then you're putting up barriers to communication and usability that don't need to exist.
