---
title: "Automagical search UX"
layout: "post"
permalink: "/2013/03/automagical-search-ux.html"
date: "2013-03-20 08:15:00"
updated: "2013-03-20 08:20:21"
category: ux
tags: [design, analysis, search]
---

So I'm building a page in a mobile app to find "things". 

Some assumptions:

* If you're using the app you are already familiar with the "things"
* You've clicked "Find Things" and so you're expecting, as a minimum, to type something into a box (to tell the app what things you want to find)
* You're a busy mofo and [you don't want to have to think](http://www.amazon.co.uk/Dont-Make-Me-Think-Usability/dp/0321344758)

<!--more-->

Each thing has a name and a location. The one is, to some extent, meaningless without the other. What I want is that if you enter a name or a part of a name then you get a list of things whose names match. If you enter a place then you get a list of things sorted by distance from that place.

I'd like the search function to be as unobtrusive as possible and to my mind that means that the user shouldn't have to tell me whether they've entered a name or a place.

The problem I have is that sometimes the name of the thing *is* the name of a place. When you type in that text expecting to search in the context of it being a place I currently have no way of letting you override the context of it being the name of a "thing".

The question is do I catch just that scenario - as in this first set of mockups...

{% include image.html url="http://2.bp.blogspot.com/-h1Xm0j1c0wQ/UUlrqBaznwI/AAAAAAAACyQ/TK1bmf7zZUk/s1600/rad+app+search.png" alt="Mockup" caption="Mockup" %}

I like this because the intention is pretty clear and the UI doesn't contain elements to muddy the intention unless we're already in a situation where we might need to make additional decisions.

But if there's a use-case or an incorrect result state that we haven't accounted for the user could find themselves stuck - I can't think of it but that doesn't mean that it doesn't exist.

So we could add a toggle that allows people to tell us what they want to do - as in this set...

{% include image.html url="http://2.bp.blogspot.com/-gvBeHDi7SwQ/UUlufgumOJI/AAAAAAAACyg/RPcrpOyQ3Qo/s1600/rad-search-two.png" alt="Mockup" caption="Mockup" %}

I worry that there's more to parse on this screen but also I wonder if it makes the fact that you can search by address more discoverable.

Or something else or <a href="http://cdn.crushable.com/files/2012/05/whatthewhat.gif" target="_blank">what-the-what</a> and then.... oh no! <a href="http://en.wikipedia.org/wiki/Analysis_paralysis">ANALYSIS PARALYSIS</a>!!!111!!!1!!!
