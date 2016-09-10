---
title: "Setting up an MVC3 website using built-in membership provider"
layout: "post"
permalink: "/2012/01/setting-up-mvc3-website-using-built-in.html"
date: "2012-01-12 13:38:00"
updated: "2012-01-12 13:38:33"
category: rant
tags: [mvc, visual-studio, membership-provider]
---

Oh wait... this is awful. AWRUCHKA. Right dry heaving done with.

It's a good job so few websites want to authenticate users and collect data on them otherwise we'd constantly have to write the same code ove... what's that? Oh my! Everyone is going through this.

<!--more-->

Jesus no wonder people bang on about RoR. It makes this *easy* in comparison

Anyway - I'll forget how to do this before I have to do it again

So

<ul><li>fire up a new MVC3 web application</li><li>Jump into nuget and Install-Package System.Web.Providers&nbsp;</li><li>Sort out a connection string for SQL CE</li><li>Add a key to make sure the login link always points to LogOn</li></ul>

Now my web.config looks like this (edited out parts I haven't touched for something approximating brevity)

<script src="https://gist.github.com/1600098.js?file=gistfile1.xml"></script>

Now start a debug session for the web app. Click logon. Click Register. Fill in the form. Register. Click Logoff and stop the debug session in Visual Studio

You can see the new SQL CE database and have a look at the schema. The Memberships and Users tables have a new row. The new user. 

{% include image.html url="http://4.bp.blogspot.com/-w1VYrhrRydw/Tw7Aak9b3tI/AAAAAAAAAWw/dQllCHJ7Qjo/s1600/new-sdf-file.PNG" alt="ssms screenshots" %}

{% include image.html url="http://2.bp.blogspot.com/-y4bJjVXY8js/Tw7AcoHn8lI/AAAAAAAAAW4/hnLZO6ShvaQ/s1600/schema.PNG" alt="ssms screenshots" %}

{% include image.html url="http://2.bp.blogspot.com/-tkP3-E66KgQ/Tw7Ad9z8n1I/AAAAAAAAAXA/Vcu-JkjCZrc/s1600/memberships.PNG" alt="ssms screenshots" %}

{% include image.html url="http://1.bp.blogspot.com/-Q83_Po9kXN4/Tw7AfVHsCcI/AAAAAAAAAXI/AvdnqwrMTvA/s1600/users-table.PNG" alt="ssms screenshots" %}

Hurrah - all the information you'll ever need is collected.

What?! You want to know more than name and email. Now *that's* a turn up for the books.

It turns out you can store key-value pairs in the profiles table. I think that anyone that wrote ASP dot Net websites will be old-hand at this but I've never had to do that or this...

While you can do magic up a key-value pair whenever you feel the need to in your code it's probably better to use one of these new fangled Class thing-a-ma-bobs

<script src="https://gist.github.com/1600123.js?file=gistfile1.cs"></script>

<pre class="c#"></pre>Now a quick edit to the web config above so that the providers opening tag becomes

<script src="https://gist.github.com/1600349.js?file=gistfile1.xml"></script>

which makes the Profile Provider aware of the new Profile class

Next step is to find the RegisterModel (this could just as easily be the CreateModel or some other model) and add an Address field

<script src="https://gist.github.com/1600372.js?file=gistfile1.cs"></script>

and edit the Register method in the controller

<script src="https://gist.github.com/1600391.js?file=gistfile1.cs"></script>

*and* finally edit the view to add an editor field for the new propery. (I'll leave that as an exercise for the reader)

Now we can go back to the Register page

{% include image.html url="http://2.bp.blogspot.com/-TZWnNTSKRvY/Tw7HgUSY_jI/AAAAAAAAAXQ/zFssEVG51_4/s1600/new+registration+form+bit.PNG" alt="register page" %}

Register and then have a look in the profile table.

{% include image.html url="http://4.bp.blogspot.com/-oKVRwA7UVxM/Tw7Hnkm1AfI/AAAAAAAAAXY/hHvXOXRF3ug/s1600/persistedproperty.PNG" alt="profile table" %}

Ta da!

So there's a mechanism for extending the default profile. 

Honestly, it feels messy and since at this point if there's a need for any data access layer then since there'll be a link on user name or user id anyway it's likely a better idea to have the additional data in the DAL and fangle the authentication and user models together in a ViewModel.

Having gone away and checked some code committed on another project by the lovely <a href="http://www.orangetentacle.co.uk/">OrangeTentacle</a>&nbsp;that's just what he's done. So having figured it out for myself I'll probably just go and crib off his much tidier code

Additional Reading:

[Simple.Web.Providers announcement](http://www.hanselman.com/blog/IntroducingSystemWebProvidersASPNETUniversalProvidersForSessionMembershipRolesAndUserProfileOnSQLCompactAndSQLAzure.aspx)

