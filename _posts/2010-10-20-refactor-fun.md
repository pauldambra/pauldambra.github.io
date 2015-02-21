--- 
title: "Refactor ==fun" 
layout: "post" 
permalink: "/2010/10/refactor-fun.html" 
uuid: "1119135333799241491" 
guid: "tag:blogger.com,1999:blog-6728560442491983758.post-1119135333799241491" 
date: "2010-10-20 13:43:00" 
updated: "2010-10-20 16:05:46" 
description:
blogger: 
siteid: "6728560442491983758" 
postid: "1119135333799241491" 
comments: "0" 
categories: 
author: 
name: "Paul D'Ambra" 
url: "https://plus.google.com/114260096260757534167?rel=author" 
image: "//lh5.googleusercontent.com/-nN3yNuaSWDs/AAAAAAAAAAI/AAAAAAAABQU/ESeyTW5Duf0/s512-c/photo.jpg"
---

I've been using <a href="http://www.jetbrains.com/resharper/">JetBrains Resharper</a> for a while after a recommendation along the lines of "I can't stand to write code without it now" and...
    <br />
    <br />I can't stand to write code without it now!

    <br />I've got a program that (in a moderately clunky way) gets all of the emails in a couple of mailboxes and checks to see if they are non-delivery reports, reports of address changes (which our customers consistently send in reply to newsletters), unsubscribe
    requests (despite a link in the mail) and so on...
    <br />
    <br />The class that handled the matching of text against rules had grown to be a real behemoth if not actually a spaghetti monster it was at the minimum a noodle demon. I won't post the code here the internet isn't big enough!
    <br />
    <br />But it consisted of an enum, five List&lt;string&gt; and then a set of methods that took an email object compared the body and subject to the 5 phrase lists and returned an appropriate result from the enum.
        <br />
        <br />I realised that I didn't want a list per result...
        <br />
        
{% highlight c# %}
_badAddresses.add("no user by that name");
_outOfOffice.add("on my hols");
{% endhighlight %}

it was getting difficult to manage, there was no checking for duplication of the strings, there was no obvious or easy way to keep the enum return and phrase list linked and all the looping was getting confusing.
        <br />
        <br />So I went through two stages and Resharper helped by being awesome at supporting my laziness.
        <br />
        <br />First I combined the many lists into one Dictionary&lt;string,phrasecheckresult&gt; to link my candidate strings with my enum result types.
            <br />
            <br />I used a little of Notepadd++'s Find and replace magic to wholesale convert my list initialisation into a Dictionary initialisation and ended up with
            <br />
            {% highlight c# %}
            _phraseMap = new Dictionary<string, phrasecheckresult>
            	{
            		{"554 qq sorry, no valid recipients}", PhraseCheckResult.BadAddress},                             
            		{"user doesn't have a yahoo.co.uk account", PhraseCheckResult.BadAddress},
            		{"account has been disabled or discontinued", PhraseCheckResult.BadAddress},
            		{"550 recipient", PhraseCheckResult.BadAddress},
            		{"is invalid", PhraseCheckResult.BadAddress},
            		{"user invalid", PhraseCheckResult.BadAddress}
            	};
            	{% endhighlight %}
            <br />cut short for brevity as there are nearly 300 phrases now... Using an object initialiser meant I had nowhere to go when the program failed at runtime adding duplicate keys to the dictionary. Catching the exception didn't help since I couldn't
            see what key was duplicated to tidy up my code.
            <br />
            <br />So I highlighted all the rows of initalisation and what did I see?
            <br />
            <a onblur="try {parent.deselectBloggerImageGracefully();} catch(e) {}" href="http://1.bp.blogspot.com/_u8J81ttOSD8/TL8LrjgRXsI/AAAAAAAAAL4/U86PBLyzzZM/s1600/ResharperToAddCall.jpg">
                <img style="float:left; margin:0 10px 10px 0;cursor:pointer; cursor:hand;width: 400px; height: 80px;" src="http://1.bp.blogspot.com/_u8J81ttOSD8/TL8LrjgRXsI/AAAAAAAAAL4/U86PBLyzzZM/s400/ResharperToAddCall.jpg" border="0" alt="" id="BLOGGER_PHOTO_ID_5530151710327135938"
                />
            </a>
            </string,>
            <br />Resharper's context menu lets me switch the object initialiser out to a series of .Add() calls. I could quickly find the duplicates and then switch back to an object initialiser. Yay!
            <br />
            <br />I *should* be writing unit tests but then that's always being put off to the next project and could I check if I've added a key already during an object initialisers run? I guess not but...
            <br />
            <br />Second I wrote a couple of if braces that checked the subject and body and returned the appropriate results... up pops Resharper and suggests I can convert that to a Linq expression and I get the sexy end result of...
            <br />
            <br /><pre name="code" class="c#"><br />        
            public enum PhraseCheckResult<br />        {<br />            None, BadAddress, ChangeAddress, OutOfOffice, Unsubscribe, Delete<br />        }<br /><br />        private static Dictionary<string, PhraseCheckResult> _phraseMap;<br /><br />        public PhraseCheckResult CheckItemAgainstLists(OutlookItem itemIn)<br />        {<br />            return _phraseMap.SingleOrDefault(<br />                i =><br />                itemIn.Subject.ToLower().Contains(i.Key.ToLower()) || itemIn.Body.ToLower().Contains(i.Key.ToLower())).<br />                Value;<br />        }<br /><br />        public ProcessPhraseList()<br />        {<br />            _phraseMap = new Dictionary<string, PhraseCheckResult><br />                             {<br />                                 {"554 qq sorry, no valid recipients}", PhraseCheckResult.BadAddress},<br />                                 {"user doesn't have a yahoo.co.uk account", PhraseCheckResult.BadAddress}};<br />        }</pre>
            <br
            />
            <br />A little shift around of the enum was necessary to put None as the first option. That way when the SingleOrDefault method doesn't find any of the candidate strings in the mail item the default action to take is to do nothing and a person can
            look at it. If you wanted to always delete unidentified messages you could just shift Delete to be first in the enum and your program's behaviour would change. Bonzer!
</div>
