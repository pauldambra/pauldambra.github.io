---
title: "Is where we're going where we're going" 
layout: "post" 
permalink: "/2018/01/direction.html" 
date: "2018-01-29 10:00:00"
description: "Direction is more important than speed"
keywords: physics software agile cargo-cult
category: "agile"
tags: ["physics", "software", "agile", "cargo-cult", "rant"]
---

# Velocity is...

A way of measuring the progress being made by a software team. Not all teams use velocity. I've been on quite a few that do. So at least some teams still use it as a measure.

<!--more-->

> Velocity is the number of story points completed by a team in an iteration.
[scrum alliance 2014](https://www.scrumalliance.org/community/articles/2014/february/velocity)

> define velocity as simply a measure of how fast a team is going
[mountain goat software 2014](https://www.mountaingoatsoftware.com/blog/know-exactly-what-velocity-means-to-your-scrum-team)

In fact both of those articles go on to expand on the physical metaphor...

> How do you measure your velocity while driving? (Imagine the speedometer is broken.) You've been driving for the last two hours, you've gone 160 kilometers, so you know your average velocity is 80 km per hour. [scrum alliance 2014](https://www.scrumalliance.org/community/articles/2014/february/velocity)

# A little physics

Notice that in the quote above there is a switch between "velocity" and "speedometer". 

If you were driving too fast you don't get a velociting ticket for exceeding the velocity limit.

In physics (and policing) there is a [distinction between speed and velocity.](https://www.khanacademy.org/science/physics/one-dimensional-motion/displacement-velocity-time/a/what-is-velocity)

Speed only has magnitude but [velocity is speed _and_ direction](https://youtu.be/DRb5PSxJerM?t=55s).

### Wait, what?

If you are told someone is moving 30mph can you tell me how long it will take them to get to your house?

No! You don't know where they are and you don't know which way they're travelling. You need to know they are, for example, due south from your house and travelling north.

You can't say *anything* about when and where they will arrive just from their speed.

### So, what do we need?

Simplistically (let's not stretch the metaphor to routing on a map) you need:
 
 * a destination
 * a starting point
 * a direction of travel
 * a speed

Let's, for now, assume we're talking about a fixed destination and starting point (spoiler: we're not).

(Most?) Teams that measure velocity do so as if direction doesn't exist. It's just a count of the work completed... it assumes you know where you are, where you're going, and that you're heading in the right direction.

It assumes that every `(task|story|ticket|feature)` you are asked to complete is the correct thing to do.

Do we care? Should we care?

# High speed with no progress

![some toddlers demonstrating you can have speed without progress](/images/kids.gif)

So logically you can have a high speed system with low progress. And you can have a low speed system with high progress.

Let's labour the point...

Take two cyclists and start them at the same place with some desired destination for them to travel to. Point one of them in the right direction and the other randomly. No matter how fast the randomly pointed cyclist travels they are far less likely to reach the destination *at all*.

Mix in a closer to reality metaphor. Make it a journey of many legs and the likelihood that the randomly directed cyclist will ever reach the destination approaches zero pretty quickly. The other cyclist could be travelling at any speed but is guaranteed to get to the destination.

![1 step forward and 1 step back means 0 progress](/images/zero-velocity.png)

# So, what

I assume a few things:

 * you want to achieve something to solve a problem
 * you want to get better at doing that
 * you don't want to waste your own or somebody else's time or money

In which case you have to regularly measure
 
 * where you are
 * where you're going
 * the direction you're travelling
 * that your speed isn't zero

Otherwise, like the cyclist that chooses random directions you can't expect to ever reach your destination.

In reality you aren't given random tickets to work on (or at least for your sake I hope not). Instead, with what we all know right now some group of us choose what to work on next.

You're not being pointed randomly but instead in roughly the right direction.

Taking the cyclist example again - If you can stop and re-assess your roughly correct destination you'll get there eventually but you'll still take longer than a cyclist that has better directions provided than you.

So, ok, direction is important.

# But why regularly measure

Because the landscape you're building software in probably doesn't look like this:

![a picture of the peak district with great visibility](/images/sunny-day.jpg)

Since we're generally operating under imperfect conditions. Trying to figure out where we are is more like being in the fog:

![a picture of the peak in foggy conditions](/images/foggy-day.jpg)

A friend was for a while a member of mountain rescue (who are incidentally incredible - [you should give them money](http://www.kmrt.org.uk/fundraising/other-ways-to-give/)). He once described to me how they navigate when they have very low visibility.

![a lost Lego hiker](/images/lost.jpg)

In pairs:

 * use the map to figure out where you are
 * use that information to figure out what direction to go
 * using a compass one of you slowly walks in that direction
 * the other stays still and calls out when the walker is about to disappear into the fog
 * then that person catches up with the walker
 * repeat

Looking at the context of where they are against what they know about the world. Working together to understand what that means, right then. Watching each other and relying on communication. Chopping the journey into many safer parts.

# Can this apply to software teams? (spoiler, yes, I think so.)

I've tried a number of times to work this out during sessions at [Co-op Digital](https://digitalblog.coop.co.uk/work-with-us/) and [XP Manchester](https://xpmanchester.wordpress.com/). Many thanks to the people who shared their time and brains with my confused grasping at an idea.

Maybe I've not worked it out completely yet... [toot me and tell me what you think](https://twitter.com/pauldambra)!

 * We can use tools like [the Cyenfin framework](https://lizkeogh.com/2012/03/11/cynefin-for-devs/), [Wardley mapping](https://medium.com/wardleymaps), and user research to understand where we are and how we want to get to our destination.

 * We can remember that we have low visibility and work closely together to make sure we aren't trying to move too far in one go. Slicing work as thinly as our context tells us makes sense.

 * We can use metrics from our software and more user research as our compass to check whether we strayed from our desired path.

We can and should care if we're being asked to do something meaningful. And we mustn't treat it as somebody else's work to check where we should go or whether we got there.

The whole team is responsible for quality and [you can't have a quality result if you're just doing the wrong thing harder](https://www.goodreads.com/quotes/29838-there-is-nothing-quite-so-useless-as-doing-with-great).