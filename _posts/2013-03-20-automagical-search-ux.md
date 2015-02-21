---
title: "Automagical search UX"
layout: "post"
permalink: "/2013/03/automagical-search-ux.html"
uuid: "6685169030109507883"
guid: "tag:blogger.com,1999:blog-6728560442491983758.post-6685169030109507883"
date: "2013-03-20 08:15:00"
updated: "2013-03-20 08:20:21"
description: 
blogger:
    siteid: "6728560442491983758"
    postid: "6685169030109507883"
    comments: "0"
categories: 
author: 
    name: "Paul D'Ambra"
    url: "https://plus.google.com/114260096260757534167?rel=author"
    image: "//lh5.googleusercontent.com/-nN3yNuaSWDs/AAAAAAAAAAI/AAAAAAAABQU/ESeyTW5Duf0/s512-c/photo.jpg"
---

So I'm building a page in a mobile app to find "things". 

Some assumptions:

* If you're using the app you are already familiar with the "things"
* You've clicked "Find Things" and so you're expecting, as a minimum, to type something into a box (to tell the app what things you want to find)
* You're a busy mofo and <a href="http://www.amazon.co.uk/Dont-Make-Me-Think-Usability/dp/0321344758">you don't want to have to think</a>

<div>Each thing has a name and a location. The one is, to some extent, meaningless without the other. What I want is that if you enter a name or a part of a name then you get a list of things whose names match. If you enter a place then you get a list of things sorted by distance from that place.<br /><br />I'd like the search function to be as unobtrusive as possible and to my mind that means that the user shouldn't have to tell me whether they've entered a name or a place.</div><div><br /></div><div>The problem I have is that sometimes the name of the thing *is* the name of a place. When you type in that text expecting to search in the context of it being a place I currently have no way of letting you override the context of it being the name of a "thing".</div><div><br /></div><div>The question is do I catch just that scenario - as in this first set of mockups...</div><div><br /></div><div class="separator" style="clear: both; text-align: center;"><a href="http://2.bp.blogspot.com/-h1Xm0j1c0wQ/UUlrqBaznwI/AAAAAAAACyQ/TK1bmf7zZUk/s1600/rad+app+search.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="640" src="http://2.bp.blogspot.com/-h1Xm0j1c0wQ/UUlrqBaznwI/AAAAAAAACyQ/TK1bmf7zZUk/s640/rad+app+search.png" width="443" /></a></div><div class="separator" style="clear: both; text-align: center;"><br /></div><div class="separator" style="clear: both; text-align: left;">I like this because the intention is pretty clear and the UI doesn't contain elements to muddy the intention unless we're already in a situation where we might need to make additional decisions.</div><div class="separator" style="clear: both; text-align: left;"><br /></div><div class="separator" style="clear: both; text-align: left;">But if there's a use-case or an incorrect result state that we haven't accounted for the user could find themselves stuck - I can't think of it but that doesn't mean that it doesn't exist.</div><div class="separator" style="clear: both; text-align: left;"><br /></div><div class="separator" style="clear: both; text-align: left;">So we could add a toggle that allows people to tell us what they want to do - as in this set...</div><div class="separator" style="clear: both; text-align: left;"><br /></div><div class="separator" style="clear: both; text-align: center;"><a href="http://2.bp.blogspot.com/-gvBeHDi7SwQ/UUlufgumOJI/AAAAAAAACyg/RPcrpOyQ3Qo/s1600/rad-search-two.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="640" src="http://2.bp.blogspot.com/-gvBeHDi7SwQ/UUlufgumOJI/AAAAAAAACyg/RPcrpOyQ3Qo/s640/rad-search-two.png" width="444" /></a></div><div class="separator" style="clear: both; text-align: center;"><br /></div><div class="separator" style="clear: both; text-align: left;">I worry that there's more to parse on this screen but also I wonder if it makes the fact that you can search by address more discoverable.&nbsp;</div><div class="separator" style="clear: both; text-align: left;"><br /></div><div class="separator" style="clear: both; text-align: left;">Or something else or <a href="http://cdn.crushable.com/files/2012/05/whatthewhat.gif" target="_blank">what-the-what</a> and then.... oh no! <a href="http://en.wikipedia.org/wiki/Analysis_paralysis">ANALYSIS PARALYSIS</a>!!!111!!!1!!!</div><div class="separator" style="clear: both; text-align: left;"><br /></div><div><br /></div>
</div>