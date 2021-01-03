--- 
title: "There's more in them thar hills..." 
layout: "post" 
permalink: "/2010/05/theres-more-in-them-that-hills.html" 
date: "2010-05-08 19:12:00"
updated: "2010-05-08 20:42:26" 
category: software-engineering
tags: [design-patterns, c#, java]
---

...than the [Factory pattern](http://en.wikipedia.org/wiki/Factory_method_pattern).

So anyway I learn about design patterns and begin to use the factory pattern. And much like many other people I settle into a world where there are no other patterns. All is comfortable and fluffy and instantiated from calling code much as it was in days gone by.

<!--more-->

Then comes the day I need to handle the responses to a monthly mailing to over 70,000 email addresses and so I write this incredible code. Well maybe not incredible... what would be the right word - oh yeah "messy".

It all started out really nice and clean but then I realised I needed to handle a couple of more cases than I'd intended when I began... and lots and lots of mail servers have been configured to return non-standard responses to unsuccessful mailings which is great for a human but not so great for a piece of software trying to classify that response.
    
So time passes and I'm correctly responding to over 90% of the returns we get (all of which stops evil companies like Yahoo for blocklisting us because we're mailing to non-existent addresses) but my code has got really, really messy.
    
Really messy.

Oh, it's awful.
    
I decide to refactor but no matter what I think of I can't get a Factory to solve my problem. Yeah, yeah I know but if you're gonna have a hammer it might as well be [shiny](http://en.wikipedia.org/wiki/Golden_hammer). Now, I could go ahead and invent my own solution but as far as I'm concerned writing software is about having to do less and that sounds like too much work.
    
A little thought later and I decide it's time to add the command pattern to my arsenal. After all, I'm categorising mail, potentially selecting from a database, potentially updating a database, potentially replying to or forwarding an email and then deleting that mail. Wrap that up and then bash out the various alternatives I need. [Bazinga](http://www.urbandictionary.com/define.php?term=bazinga)!
    
I also like to be sure about what I'm doing before I start. Well, sometimes... So I dig out [Patterns in Java Volume 1](http://www.amazon.com/Patterns-Catalog-Reusable-Design-Illustrated/dp/0471258393) and do a little reading and what I saw was such a great idea I realised I had to do everything I could not to forget... 


```java
public abstract class AbstractCommand {
	public final static CommandManager manager = new CommandManager();
	public abstract thePointOfThisClass();
}
```
    
Now this made me double take... You might be saying "So What?" but I said "What the what?".
    
See I write lots of code like this

```java
public class MyClass { 
	ThingManager thisThingManager = new ThingManager();
	Thing thisThing = new Thing();
	thisThingManager.doThisThingToThatOtherThing(thisThing);
}
```
    
I dig [separation of responsibility](http://en.wikipedia.org/wiki/Single_responsibility_principle) so I like to separate out a "manager" or "controller" class from the other classes who don't need the logic that it encapsulates.
    
But that pretty tightly couples everything together. If I manage to strip a lot of code out of something (as I did when I bought the excellent [Outlook redemption library](http://www.dimastr.com/redemption/) recently) then there's more to change.
    
Here all of the logic for the command is bound up within it even though `CommandManager` class is still separate. I like that and I hadn't realised you could do this kind of thing by declaring something as static... I like to find a nice little elegant bit of sugar like that.

```java
public class MyClass{
    Thing thisThing = new Thing();
    thisThing.DoThatThingToThisThing();
}
```
    
or even better with a little factory magic in the background

```java
public class MyClass{
	Thing.DoSomethingToThisThing(FactoryChoiceEnum.Choice);
}
```
    
So we've got one line of code and with reasonable variable names it doesn't even need comments. For Example...

```csharp
public class MyClass {
	currentMailItem.DealWithThisMailItem(MailResponseEnum.Unsubscribe);
}
```

I hope that you've stumbled on this post and it solves your problem.
