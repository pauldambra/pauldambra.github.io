---
title: "How to design an unsubscribe link?!?"
layout: "post"
permalink: "/2011/08/how-to-design-unsubscribe-link.html"
date: "2011-08-05 08:49:00"
updated: "2011-08-05 09:39:35"
category: HTTP
tags: [GET, idempotence, detail]
---

We send out mail to 70,000+ members of our organisation. In theory they know they're getting it cos they're advised when they join the organisation that we'll send the email... yes, I know that implicit opt-ins aren't best practice... I want to polish up our email unsubscribe flow since the amount of mail we send out is steadily climbing as we move from paper to email for more things.

<!--more-->

So first idea... you click a link = you get unsubscribed...

`http://unsubscribe.somewhere.co.uk/123435`

where 12345 is your user id. 

Except someone malicious could

```
 for(i=0;i<1000000000;i++)
 {
 	$.get('http://unsubscribe.somewhere.co.uk/'+i);
 }
```
 and unsubscribe every member. 

No it isn't that likely since this is for a climbing organisation but then you'd be surprised how many smart-alec programmers also climb!

Alright we don't need to make it into

`http://unsubscribe.somewhere.co.uk/{encrypted_something}`

I think that would be overkill so let's just

`http://unsubscribe.somewhere.co.uk/email_address`

That way although you could sit and guess the email addresses of members to unsubscribe them at least it is harder and the urls are readable

Except the [HTTP RFC](http://t.co/xH5nYHf) says that a GET request should be idempotent.

![not sure if meme is appropriate or you should feel bad](http://1.bp.blogspot.com/-uEF-Zso3K5M/Tju1K8hAhrI/AAAAAAAAAVk/Vi_WggM_FEY/s1600/1095675-futurama_fry_looking_squint_super.jpg)

<blockquote>["Idempotence is the property of certain operations in mathematics and computer science, that they can be applied multiple times without changing the result."](http://en.wikipedia.org/wiki/Idempotence)</blockquote>

In short someone clicking a link can get information from the database but shouldn't update information.

The problem is that I think that is counter-intuitive. I know I don't click links hoping that the actions carried out are idempotent. I click a link *expecting* something to happen and if we [confound a user's expectations ](http://en.wikipedia.org/wiki/Principle_of_least_astonishment)then we get to do the same job at least one more time... and I'm lazy - so that isn't a solution for me

But what is the solution since people are not going to want to spend time reading the page. How do I make what someone sees work well?

I'm a google fanboy so [what do they say](https://mail.google.com/support/bin/answer.py?answer=81126#unsub)

<blockquote><span style="font-weight:bold;">Unsubscribing</span><br />A user must be able to unsubscribe from your mailing list through one of the following means:

1) A prominent link in the body of an email leading users to a page confirming his or her unsubscription (no input from the user, other than confirmation, should be required).<br />2) By replying to your email with an unsubscribe request.<br /></blockquote><br />So I think that we're going to shufty this all around a bit.

Two types of mailings = two types of link

unsubscribe.somewhere.co.uk/areas/email@person.com<br />unsubscribe.somewhere.co.uk/monthly/email@person.com

When you hit the page you can just click a big button to confirm the action (which ajax-ily updates your displayed state and we can track how many people hit the page without doing anything).

![mockup of UI](http://4.bp.blogspot.com/-olQbQBRHcak/Tju4pxILv1I/AAAAAAAAAVs/jizlCCsfz1M/s1600/mockup.png)
