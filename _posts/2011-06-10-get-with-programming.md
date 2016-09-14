---
title: "Get with the program(ming)!"
layout: "post"
permalink: "/2011/06/get-with-programming.html"
date: "2011-06-10 12:13:00"
updated: "2011-06-10 12:26:02"
category: rant
tags: [design, ux]
---

Twice recently I've hit the same problem with two different mobile phone vendor's websites. Vodafone (displayed here) and 3. When I type a phone number I split it into three sections using white space. "nnnn nnn nnnn" that's how I remember numbers. That's not uncommon I don't think...

<!--more-->

![using a dash in an input](http://1.bp.blogspot.com/-5j1jDK3JAss/TfIK0Q-_reI/AAAAAAAAAO0/LyikHIbRnj0/s1600/idiots.png)

 nor is it odd to use a dash.

 So why do I need to learn how your website wants phone numbers formatted.

 Whack some javascript on your page... you *must* be using it for something!

 `var correctedNumber = numberTypedOnForm.replace(" ","").replace("-","");`

 and with that massive development cost you aren't going to make someone type a number twice just to satisfy your database server. Yes, not everyone will have javascript turned on and it won't catch everyone's weird way of typing phone numbers

 > "(nnnn)-nn-nn-nn-n" 

 but it's about not introducing a pain point for customers when you don't have to

 If you want to be really fancy you could

 `var correctedNumber = numberTypedOnForm.replace("/\D/g","");`

 Computers are supposed to make our lives easier but it's up to *you* website developers to help them help us.

 Arseholes!