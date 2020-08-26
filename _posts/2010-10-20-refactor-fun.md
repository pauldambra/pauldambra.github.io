--- 
title: "Refactor ==fun" 
layout: "post" 
permalink: "/2010/10/refactor-fun.html" 
date: "2010-10-20 13:43:00" 
updated: "2010-10-20 16:05:46" 
category: refactoring
tags: [c#, refactoring, dictionary]
---

I've been using [JetBrains Resharper](http://www.jetbrains.com/resharper/) for a while after a recommendation along the lines of "I can't stand to write code without it now" and...

I can't stand to write code without it now!

<!--more-->
            
I've got a program that (in a moderately clunky way) gets all of the emails in a couple of mailboxes and checks to see if they are non-delivery reports, reports of address changes (which our customers consistently send in reply to newsletters), unsubscribe requests (despite a link in the mail) and so on...
<!--alex ignore demon-->    
The class that handled the matching of text against rules had grown to be a real behemoth if not actually a spaghetti monster it was at the minimum a noodle demon. I won't post the code here the internet isn't big enough!
    
But it consisted of an enum, five `List<string>` and then a set of methods that took an email object compared the body and subject to the 5 phrase lists and returned an appropriate result from the enum.

I realised that I didn't want a list per result...
        
```c# 
_badAddresses.add("no user by that name");
_outOfOffice.add("on my hols");
```

it was getting difficult to manage, there was no checking for duplication of the strings, there was no apparent way to keep the enum return and phrase list linked and all the looping was getting confusing.

So I went through two stages and Resharper helped by being awesome at supporting my laziness.

First I combined the many lists into one D`ictionary<string, phrasecheckresult>` to link my candidate strings with my enum result types.

I used a little of Notepad++'s Find and replace magic to wholesale convert my list initialisation into a Dictionary initialisation and ended up with

```c# 
_phraseMap = new Dictionary<string, phrasecheckresult>
{
    {"554 qq sorry, no valid recipients}", PhraseCheckResult.BadAddress},                             
    {"user doesn't have a yahoo.co.uk account", PhraseCheckResult.BadAddress},
    {"account has been disabled or discontinued", PhraseCheckResult.BadAddress},
    {"550 recipient", PhraseCheckResult.BadAddress},
    {"is invalid", PhraseCheckResult.BadAddress},
    {"user invalid", PhraseCheckResult.BadAddress}
};
```
<!--alex ignore failed-->
cut short for brevity as there are nearly 300 phrases now... Using an object initialiser meant I had nowhere to go when the program failed at runtime adding duplicate keys to the dictionary. Catching the exception didn't help since I couldn't see what key was duplicated to tidy up my code.

So I highlighted all the rows of initialisation and what did I see?

![what did i see?](http://1.bp.blogspot.com/_u8J81ttOSD8/TL8LrjgRXsI/AAAAAAAAAL4/U86PBLyzzZM/s400/ResharperToAddCall.jpg)

Resharper's context menu lets me switch the object initialiser out to a series of .Add() calls. I could quickly find the duplicates and then switch back to an object initialiser. Yay!

I *should* be writing unit tests but then that's always being put off to the next project and could I check if I've added a key already during an object initialisers run? I guess not but...

Second I wrote a couple of if braces that checked the subject and body and returned the appropriate results... up pops Resharper and suggests I can convert that to a Linq expression and I get the end result of...

```csharp
public enum PhraseCheckResult
{
    None, BadAddress, ChangeAddress, OutOfOffice, Unsubscribe, Delete
}

private static Dictionary<string, PhraseCheckResult> _phraseMap;

public PhraseCheckResult CheckItemAgainstLists(OutlookItem itemIn)
{
    return _phraseMap.SingleOrDefault(
        i =>
        itemIn.Subject.ToLower().Contains(i.Key.ToLower()) || itemIn.Body.ToLower().Contains(i.Key.ToLower())).
        Value;
}

public ProcessPhraseList()
{
    _phraseMap = new Dictionary<string, PhraseCheckResult>
    {
         {"554 qq sorry, no valid recipients}", PhraseCheckResult.BadAddress},
         {"user doesn't have a yahoo.co.uk account", PhraseCheckResult.BadAddress}
    };
}
```

A little shift around of the enum was necessary to put None as the first option. That way when the SingleOrDefault method doesn't find any of the candidate strings in the mail item the default action to take is to do nothing and a person can look at it. If you wanted to always delete unidentified messages you could shift Delete to be first in the enum and your program's behaviour would change. Bonza!
