---
title: "Websites != CMS Platform"
layout: "post"
permalink: "/2014/02/websites-cms.html"
date: "2014-02-22 18:59:00"
updated: "2014-04-11 18:23:57"
category: cms
tags: [learning, cms, design, web, series]
---

I was once complaining about having difficulty setting up a very slightly unusual feature in a Drupal site that was taking forever to achieve. The framework made so many assumptions about what I should do that it wouldn't let me do what I wanted to.
<!--alex ignore he-she --->
A freelancer commented that if he was quoting on a project that had a requirement that it use a given CMS he didn't quote any less than building from scratch. He had found it didn't make enough difference to the effort he'd spend...

This stuck with me and matches my experience so far. (yeah, yeah, confirmation bias. I know)

<!--more-->

I spent this past week doing maintenance work on a Django website. The ceremony involved in the Django part has outweighed the time spent designing the new HTML and creating the new page significantly.

Some of that delay is that I'm new to Django (and Python), sure, but at points, even when I'd come to understand what Django wanted, I still had to spend time poking it with a stick before it would allow me to display HTML in a browser.

# So?

My position is that a CMS can be overkill. They speed up the initial setup for a website but then can slow down subsequent features. I'd argue you can provide the features of most CMS with relatively little effort by embracing modularity and the capabilities of modern JS.

### Edit/Addendum

As [Dan](https://plus.google.com/u/0/+DanielDrummond) points out in the comments Django != CMS either. I call out above that I'm not experienced with Django. I've worked with it twice. And both times Django had been used to build a CMS.

Importantly, both times I was able to deliver almost every necessary change by editing JS files.

I'm not saying that Django is bad per se (although <i>I</i> *really* didn't enjoy working with it). I'm not even saying that having a system to manage content on a website is bad - I can't be I'm suggesting building one!

Maybe that "heavy-weight" web frameworks may not be appropriate to build that system - on a large .Net project recently I'd argue most of the functionality the customer wanted was built with JS.
    
I'm primarily a .Net developer. I love C# - I think the language is powerful and expressive. I think MS are really pushing things with new language development. I grok how to build websites using it but I'm getting to the point where even my BFF language isn't necessarily my first choice.

Really all I'm saying is that I've discovered I heart JS for making web things because I've found it gets out of the way and lets me build things.

![always be punning](/images/ABC.png)

The basic idea for this blog series had been bouncing around in my head for a while... and the recent work with Django was the kick I needed to actually bother to write it.

#### Never say never but sometimes say no
    
So I wondered if I really could build an editable website
    
Proof, in other words, if proof be need be.

# What is it?!

Wikipedia has a reasonable definition of a Web CMS (right now at least) as:

> A web content management system (WCMS)<sup>[1](http://en.m.wikipedia.org/wiki/Web_content_management_system#cite_note-1)</sup> is a software system that provides website authoring, collaboration, and administration tools designed to allow users with little knowledge of web programming languages or markup languages to create and manage website content with relative ease. A robust WCMS provides the foundation for collaboration, offering users the ability to manage documents and output for multiple author editing and participation.

> Most systems use a content repository or a database to store page content, metadata, and other information assets that might be needed by the system.

> A presentation layer (template engine) displays the content to website visitors based on a set of templates, which are sometimes XSLT files. Most systems use server side caching to improve performance. This works best when the WCMS is not changed often but visits happen regularly.
 <!--alex ignore fat --->
> Administration is also typically done through browser-based interfaces, but some systems require the use of a fat client

> A WCMS allows non-technical users to make changes to a website with little training. A WCMS typically requires a systems administrator and/or a web developer to set up and add features, but it is primarily a website maintenance tool for non-technical staff.


I'm not trying to build a CMS... something that could be packaged and distributed. I'm only interested in how long it would actually take me to build a web site that:

* Displays Web pages
	* [part 1](/2014/03/websites-cms-displaying-pages.html)
    * [part 2](/2014/03/website-cms-display-pages-part-2.html)
* Stores data
	* [part 1](/Websites-CMS-Platform-Storing-Data.html)
	* [part 2](/Websites-CMS-Platform-Storing-Data2.html)
* Edits web pages / Has an Admin section
	* [on page editing](/On-Page-Editing.html)
	* [UX part 1](/better-affordance.html)
	* [UX part 2](/better-affordance-js.html)
* Has templating
	* [Handlebars](/2014/03/website-cms-display-pages-part-2.html)
* Allows more than one author
	* [Logging in](/websites-CMS-platform-logging-in.html)
* Has Server side caching
	* does anything not have server side caching these days?!
* Can be used by someone non-technical
	* totally subjective...

(edited with links to the completed work)

So I'm going to imagineer a fake company called Omniclopse and build them a website from scratch. I'll try to provide what would be provided by a modern CMS and see how much effort that takes. And I'll blog about it as I go.

I may learn that it isn't quick to build those things (or that I'm not very good at them) but then a negative result is still a result...

I don't know what rate I'll manage to post at since I have one kid with a broken leg and one about to be born (and another not providing any more than the usual amount of rewarding distraction) but I'd like to practice using NodeJS, Mongo, and Angular. And to practice estimating my work before I begin.

[Read the next post](/2014/03/websites-cms-displaying-pages.html)
