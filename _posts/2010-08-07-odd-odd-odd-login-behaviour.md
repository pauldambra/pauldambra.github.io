--- 
title: "Odd, odd, odd login behaviour" 
layout: "post" 
permalink: "/2010/08/odd-odd-odd-login-behaviour.html" 
date: "2010-08-07 15:57:00" 
updated: "2010-08-07 16:41:54" 
description: 
category: hardware
tags: [review, problem-solving]
---

I've got [a mini 5101](http://h20000.www2.hp.com/bizsupport/TechSupport/Home.jsp?lang=en&cc=us&prodTypeId=321957&prodSeriesId=3973865&lang=en&cc=us). A little HP netbook that I lurve. It runs Windows 7 and Ubuntu 10.04 with aplomb.

<!--more-->

My one gripe is that (much like my mac keyboard) the Function key functions are the main action of that key... so in Windows if you hit F5 to refresh a web page the laptop actually sleeps.

If you hit F3 to search in chrome instead you dim the screen. Annoying, no?

So I travel the dusty highways to the BIOS settings and there's an option to switch the function, erm, function. Some BIOS' refer to this as switching "media keys". I switch this to enable, boot up and my function keys are my own again.

All is well...
           ...
           ...
           ...

except...

If you let the laptop sleep then when it wakes up it prompts for a password which it rejects as incorrect. Now I typed my password * V * E * R * Y * carefully but no joy.

I discovered if I hit switch user and chose the same user then the log in screen displayed the user status as "logged in" instead of "locked". Type the same password here and I can log in... What the what!?

Like an idiot I didn't immediately connect these changes... in my defence this isn't my main machine and I only use it sporadically.

I created a new user... no change.

Then I reinstalled Windows... no change.

I jumped into Google feet first and found almost nothing. Lots of forum posts where nothing is discovered and everyone has a slightly different problem which they describe vaguely. In my experience this generally points to a problem between the chair and the keyboard and so I sat and thought until I had tied the two together in my head.

As a test I let the laptop sleep, checked it rejected my password and then I held down the function key and typed the password. Voila I could log in.

Now I just have to decide which behaviour is most annoying
