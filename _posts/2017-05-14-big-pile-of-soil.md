---
title: "Big Pile of Soil" 
layout: "post" 
permalink: "/2017/05/big-pile-of-soil.html" 
date: "2017-05-14 19:58:00"
description: "A big pile of mud is a clear sign of dirt"
category: "Tortured Metaphors"
tags: [design, clean-code, metaphor]
---

During [Kevin Rutherford's guided discussion on clean code at Agile Manchester 2017](http://agilemanchester.net/2017/sessions/index.php?session=200) we talked briefly about whether there was a difference between 'cleaning code' and 'clean code'.

I suggested that I might expect to have to make code dirtier on the road to making it cleaner. Being of the opinion that  sometimes you need to add duplication in order to see your way to removing it.

As I am a creature of bad habit I jumped immediately into tortuous metaphor.

<!--more-->

## Brace yourselves

### If I'm concreting in a post in my garden there's a period of time where there's a big pile of soil. I have to get rid of that to finish the job but I can't do the job without making the pile.

## The thing is...

...even though it occurred to me in the moment I actually quite like this metaphor.

 * The reason the mess is there is understood by almost anyone that sees it
 * The path to clearing the mess is understood by almost anyone that sees it
 * For each additional uncleared pile of soil next to a post it becomes more obviously important to think about whether it's time to start finishing the work by almost anyone that sees it

Also, this only holds for a task I can complete in a day or two. If we're laying a foundation then we should probably know where the soil is going and clear it as we go.

If you were to go into somebody's garden and there were tens of posts still with a pile of soil next to each. You'd be tempted to either help them clear up or sit them down and ask them why they hadn't. Either way it would be obvious it was wrong and unfinished as it was.

## Can you stretch the metaphor too far?

Easily :) but I'll try not to. It is common to use physical engineering, building, and DIY metaphors for software but they often fall down because the link between one block of code and another is nowhere near as viscerally obvious as the link between a hole in the ground and a pile of soil.

This is where naming, patterns, conventions, context, and physical position can be used to communicate to the future developer. And where jumping in to version control history can let you see what other files changed when this file was created or amended into its present confusing state.

## But what does it look like?

I started writing up an example and then remembered that the best possible example already exists!

Sandi Metz covered this wonderfully in [this talk from RailsConf 2014.](https://www.youtube.com/watch?v=8bZh5LMaSmE) It's a little under 40 minutes and well worth your time with a worked and brilliantly explained solution to the Gilded Rose kata.

## refactorings are small steps

The road to clean code is not paved with many-day blocks of work. Those aren't refactorings they're just redesigns (which are fine but should probably be infrequent).

That means it can be OK to add something dirty on the path to something better because you know how and when it's going to be cleaned up. 

Just remember to look around the garden for yesterday's mess before you start a new job

