---
title: "Static Factory Methods FTW"
layout: "post"
permalink: "/static-factory-methods.html"
date: "2014-09-13"
description: using static factories to improve discoverability
category: software-engineering
tags: [c#, design-patterns]
---

It is relatively common to find (or write) a line of code like this

```csharp 
	var thingy = new Thingy(_someDependency, false);
```

Reading this line a person can know this is initialising a `Thingy` which takes a dependency on something... and something else is false.
<!--alex ignore easy --->
I'm really lazy and easily distracted so I don't like to have to think about anything except the one task I'm trying to not get distracted from. Having to think about what it means that something is false provides an opportunity for me to get distracted. 

<!--more-->

Also, this means there is some information or some decision that has been taken by a previous developer that they have kept in their brain - all the person reading this line sees is the result of that. Each time somebody comes to this class they may have to invest time reminding themselves what the boolean parameter means.

# Can it be better?

Well, C# (as well as other languages) allows [named parameters](http://msdn.microsoft.com/en-gb/library/dd264739.aspx) so this `Thingy` could be instantiated by using

```csharp 
	var thingy = new Thingy(_someDependency, disableUnexpectedBehaviour: false);
```

Now when a person reads this line of code they know more about what is happening and that should support them in introducing correct code. Here they learn that there is a mode where this class can do something in an unexpected way. Since the named parameter makes the intent clearer a developer can make a decision about how to instantiate the class with a reasonable idea of what will happen. 

However, the next time someone writes code that uses a `Thingy` they don't have to use a named parameter so it is still possible to use the form which obscures intent.

# Static Factory Method

It is possible to hide the constructor and provide [static factory methods](http://refactoring.com/catalog/replaceConstructorWithFactoryMethod.html) to create and return instances. Where there is more than one way to construct the object more than one factory method can be provided to clarify this difference.

These are my latest obsession - so I recommend taking the time to jump to the declaration of `Thingy` and do something like this:

```csharp 

class Thingy 
{
    private readonly SomeDependency _someDependency;
	private readonly bool _disableUnexpectedBehaviour

    // make the constructor private - this isn't necessary 
    // but enforces the use of the static factory methods
	private Thingy(SomeDependency someDependency, bool disableUnexpectedBehaviour) 
	{
		_someDependency = someDependency;
		_disableUnexpectedBehaviour = disableUnexpectedBehaviour;
	}
	
	//add static factory methods
	public static Thingy WithExpectedBehaviour(SomeDependency someDependency)
	{
		return new Thingy(someDependency, true);
	}

	public static Thingy WithUnexpectedBehaviour(SomeDependency someDependency)
	{
		return new Thingy(someDependency, false);
	}

	//<snip/>
}

	var thingy =  Thingy.WithExpectedBehaviour(_someDependency);
	var crazyThingy =  Thingy.WithUnexpectedBehaviour(_someDependency);

```

Now you can't construct a `Thingy` without using one of these methods. This means that your decision to use a `Thingy` includes an explicit decision about what it means for it to be included in your code. Yay for clarity!
