---
title: "How to design an unsubscribe link?!?"
layout: "post"
permalink: "/2011/08/how-to-design-unsubscribe-link.html"
uuid: "3671822714965799043"
guid: "tag:blogger.com,1999:blog-6728560442491983758.post-3671822714965799043"
date: "2011-08-05 08:49:00"
updated: "2011-08-05 09:39:35"
description: 
blogger:
    siteid: "6728560442491983758"
    postid: "3671822714965799043"
    comments: "0"
categories: 
author: 
    name: "Paul D'Ambra"
    url: "https://plus.google.com/114260096260757534167?rel=author"
    image: "//lh5.googleusercontent.com/-nN3yNuaSWDs/AAAAAAAAAAI/AAAAAAAABQU/ESeyTW5Duf0/s512-c/photo.jpg"
---

We send out mail to 70,000+ members of our organisation. In theory they know they're getting it cos they're advised when they join the organisation that we'll send the email... yes, I know that implicit opt-ins aren't best practice... I want to polish up our email unsubscribe flow since the amount of mail we send out is steadily climbing as we move from paper to email for more things.

<!--more-->

So first idea... you click a link = you get unsubscribed...<br /><br /><blockquote>http://unsubscribe.somewhere.co.uk/123435 </blockquote><br /><br />where 12345 is your user id. <br /><br />Except someone malicious could<br /><pre><br />for(i=0;i<1000000000;i++)<br />   {<br />    $.get('http://unsubscribe.somewhere.co.uk/'+i);<br />   }<br /></pre><br />and unsubscribe every member. <br /><br />No it isn't that likely since this is for a climbing organisation but then you'd be surprised how many smart-alec programmers also climb!<br /><br />Alright we don't need to make it into<br /><br /><blockquote>http://unsubscribe.somewhere.co.uk/{encrypted_something}</blockquote><br /><br />I think that would be overkill so let's just<br /><br /><blockquote>http://unsubscribe.somewhere.co.uk/email_address</blockquote><br /><br />That way although you could sit and guess the email addresses of members to unsubscribe them at least it is harder and the urls are readable<br /><br />Except the <a href="http://t.co/xH5nYHf">HTTP RFC</a> says that a GET request should be idempotent.<br /><br /><a onblur="try {parent.deselectBloggerImageGracefully();} catch(e) {}" href="http://1.bp.blogspot.com/-uEF-Zso3K5M/Tju1K8hAhrI/AAAAAAAAAVk/Vi_WggM_FEY/s1600/1095675-futurama_fry_looking_squint_super.jpg"><img style="cursor:pointer; cursor:hand;width: 320px; height: 240px;" src="http://1.bp.blogspot.com/-uEF-Zso3K5M/Tju1K8hAhrI/AAAAAAAAAVk/Vi_WggM_FEY/s400/1095675-futurama_fry_looking_squint_super.jpg" border="0" alt=""id="BLOGGER_PHOTO_ID_5637298558232200882" /></a><br /><br />No me neither...<br /><br /><blockquote><a href="http://en.wikipedia.org/wiki/Idempotence">"Idempotence is the property of certain operations in mathematics and computer science, that they can be applied multiple times without changing the result."</a></blockquote><br /><br />In short someone clicking a link can get information from the database but shouldn't update information.<br /><br />The problem is that I think that is counter-intuitive. I know I don't click links hoping that the actions carried out are idempotent. I click a link *expecting* something to happen and if we <a href="http://en.wikipedia.org/wiki/Principle_of_least_astonishment">confound a user's expectations </a>then we get to do the same job at least one more time... and I'm lazy - so that isn't a solution for me<br /><br />But what is the solution since people are not going to want to spend time reading the page. How do I make what someone sees work well?<br /><br />I'm a google fanboy so <a href="https://mail.google.com/support/bin/answer.py?answer=81126#unsub">what do they say</a><br /><br /><blockquote><span style="font-weight:bold;">Unsubscribing</span><br />A user must be able to unsubscribe from your mailing list through one of the following means:<br /><br />1) A prominent link in the body of an email leading users to a page confirming his or her unsubscription (no input from the user, other than confirmation, should be required).<br />2) By replying to your email with an unsubscribe request.<br /></blockquote><br />So I think that we're going to shufty this all around a bit.<br /><br />Two types of mailings = two types of link<br /><br />unsubscribe.somewhere.co.uk/areas/email@person.com<br />unsubscribe.somewhere.co.uk/monthly/email@person.com<br /><br />When you hit the page you can just click a big button to confirm the action (which ajax-ily updates your displayed state and we can track how many people hit the page without doing anything).<br /><br /><a onblur="try {parent.deselectBloggerImageGracefully();} catch(e) {}" href="http://4.bp.blogspot.com/-olQbQBRHcak/Tju4pxILv1I/AAAAAAAAAVs/jizlCCsfz1M/s1600/mockup.png"><img style="cursor:pointer; cursor:hand;width: 400px; height: 307px;" src="http://4.bp.blogspot.com/-olQbQBRHcak/Tju4pxILv1I/AAAAAAAAAVs/jizlCCsfz1M/s400/mockup.png" border="0" alt=""id="BLOGGER_PHOTO_ID_5637302386286116690" /></a>
</div>