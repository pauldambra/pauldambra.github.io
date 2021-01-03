---
title: "An unusbscribey follow up"
layout: "post"
permalink: "/2011/09/unusbscribey-follow-up.html"
date: "2011-09-20 14:21:00"
updated: "2011-09-20 14:22:33"
category: HTTP
tags: [GET, idempotence, detail, follow-up]
---

So recently I [blogged a bloggy thing ](http://mindlessramblingnonsense.blogspot.com/2011/08/how-to-design-unsubscribe-link.html)here about unsubscribe links.

I know a lot of people are of the opinion that an unsubscribe link should unsubscribe you and require no further action and that the whole idempotency thing is software design flim-flam and I was tempted to agree until I was introduced to the concept of pre-fetching...

<!--more-->

In short modern browsers and some email clients will try to speed up your experience by following links in the background so that when you click on a link it seems to launch lightening fast.  Given the massive bandwidth lots of people have in this Buck Rogers-esque world we live in this is a "good thing".   However, if you have recipients of emails with unsubscribe links that require no confirmation and those people are pre-fetching those links then they could be being unsubscribed without even knowing it.

This is a good example of why standards are worth following... an unsubscribe link made before the advent of pre-fetching that was idempotent on get doesn't need to worry when prefetching is invented because so long as the people implementing prefetching follow the standards too then your software will continue to work as expected.

As with lots of this stuff - it seems like more work now but it's always more work when it breaks!
