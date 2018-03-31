---
title: "Constructiphor"
layout: "post"
permalink: "/2017/10/constructiphor.html"
date: "2017-10-15 10:00:00"
description: "Construction might not be the best metaphor"
category: "metaphors"
tags: [metaphors, software]
---

# On Twitter I...

[...made a toot-storm](https://twitter.com/pauldambra/status/916712725060947974) about using construction as a metaphor for software engineering.

> I've never really got on with construction metaphors for software. The cost of mistakes and rework is high in construction

![the toot itself](/images/toot.jpeg)

This isn't saying that Software isn't putting things together but rather I've seen people justify not 'being agile' by using construction metaphors.

<!--more-->

For example

> we have to agree up front what we're going to do so that we know we're building the right thing... now go plan 19 sprints

(guess whether the client was certain they knew what they wanted)

### So, why, do we have to agree up front what we're doing?

The builders pouring the foundations in the image in that toot were *really* careful they got things right before they started pouring concrete. If you pour that concrete and it's wrong, it's a big deal. Doing it *twice* would be an expensive problem. It isn't inconceivable that you make a mistake where it might be impossible to recover from the cost.

The bricklayers that built on top of the foundations couldn't start before the foundations were ready. Once they could start they went _really_, *really* slowly until the first few rows were in and true. After that it is amazing how fast they can add new rows of bricks.

 * They have to work in series.
 * They have to be incredibly intolerant of mistakes

In short they have to agree up front what they're doing.

In comparison I could run infrastructure scripts to create complex utility computing environments, test the results, tear down the infrastructure, and repeat. All for the cost of the compute time. AWS recently started billing by the second so if that only takes minutes to run it's even cheaper than before.

I can reset the state of the software to just about any point in history to see what it was like. I can experiment with swingeing changes cheaply and without impacting other people's work.

 * We don't have to work in series
 * We can be tolerant of mistakes

So, we don't have to agree up front what we're doing?

# Also...

...I saw a few folks tweet that [Allan Kelly](https://twitter.com/allankellynet) makes the point that renting compute in the 70s cost the equivalent of 1.25 million dollars monthly but a similar amount of compute can now be bought for something more like $35.

In the context of the 70s pricing planning was cheap. But planning is now comparatively expensive.

![seen at https://twitter.com/ojuncu/status/913688587576778752](/images/agilecam.jpg)

That's all the confirmation bias I need :)

# And so...

... in construction the cost of the work, or the cost of the work being wrong is higher than the cost of planning the work. Measure twice, cut once remains good advice.

That *was* true in Software but isn't anymore.

Because the cost of planning is comparatively expensive it is now the item to minimise. Software systems can be put together by taking many small, cheap, reversible steps. What Deng Xiaoping would have described as "crossing the river by feeling the stones."

If _your_ software development still spends a high proportion of time planning then you need to be sure that is an unavoidable aspect of what you are doing and not a signal that you're falling into obsolescence.

For example if you're writing the software that determines whether to insert or remove the control rods in a nuclear reactor then, yes, you probably need to be very sure you know every edge case is handled correctly or successfully passed off to a human before it goes into production.

# What can I do..?

For most software development now we need to be asking what the measurable outcome is, ensure we're measuring it, and _start doing_ as fast as possible.

The harder work then is using user research to determine what direction to head in. Followed by more user research and the telemetry coming out of the application to stay on course or make appropriate corrections.

Cut once, Measure twice.
