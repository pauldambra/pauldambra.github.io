--- 
title: "Kill If With Objects" 
layout: "post" 
permalink: "/kill-if-with-objects.html" 
date: "2016-09-07 18:00:00"
description: "refactoring at the right time is super fun"
keywords: refactor refactoring behaviour objects
category: software-engineering
tags: [refactoring, c#]
---

Today I had super-fun spotting the oportunity for a refactoring and figuring out how to apply it. I wanted to think it through while it was fresh in my mind to try to cement any learning opportunity

The refactoring in question is ["Replace Conditional Dispatcher with Command"](https://www.industriallogic.com/xp/refactoring/conditionDispatcherWithCommand.html).

Quoting that source the opportunity for this refactoring is when:

> Conditional logic is used to dispatch requests and execute actions.

And the solution is: 

> Create a Command for each action. Store the Commands in a collection and
replace the conditional logic with code to fetch and execute Commands.

It's one of those subtle changes that has real power to tidy up and add to the expressiveness of your code.

If (pun intended) you aren't familiar with it I'd definitely recommend trying it on for size by looking for an opportunity to apply it in your systems.

<!--more-->

# Some Context

In this instance we have a seam in our system that will over time become an anti-corruption (or defuckulation) layer. However, we're not building the full ACL as we'd have to solve lots of the other problems in the system first to know what should go into it.

When one system "publishes" some data this class will be responsible for applying any translation and saving it in a second.

The initial implementation looked like this

```csharp
  public class ThingsPublisher : MagicSystemHook
  {
    private readonly IThingRepository _thingRepository;

    public ThingsPublisher(IThingRepository thingRepository)
    {
      _thingRepository = thingRepository;
    }

    public override void OnPublish(IEnumerable<Thing> publishedThings)
    {
      foreach (var thing in publishedThings
                            .Where(pt => pt.Type == "WhatWeDidFirst"))
      {
        var convertedThing = thing.Convert();
        _thingRepository.Upsert(convertedThing);
      }
    }
  }
```

Then over a few weeks we added a few more types that we needed to handle and uncovered some more detail in the requirements and ended up with something more like this

```csharp
  public class ThingsPublisher : MagicSystemHook
  {
    private readonly IThingRepository _thingRepository;

    private static readonly string[] _typesWeCareAbout =
    {
      "WhatWeDidFirst",
      "WhatWeDidSecond",
      "ATypeThatComesAlongWithWhatWeDidSecond",
      "AModificationToWhatWeDidSecond",
      "WhatWeDidThird"
    };

    private readonly KeyValuePair<string, string>[] _replacements =
    {
      new KeyValuePair<string, string>(@"/some-pattern/", "/its-pair/"),
      new KeyValuePair<string, string>(@"/another-pattern/", "/and-its-pair/"),
      new KeyValuePair<string, string>(@"/fiddly-detailed-pattern/", "/with-its-pair/"),
    };

    public ThingsPublisher(IThingRepository thingRepository)
    {
      _thingRepository = thingRepository;
    }

    public override void OnPublish(IEnumerable<Thing> publishedThings)
    {
      foreach (var thing in publishedThings.Where(WeCareAboutIt))
      {
        var convertedThing = ConvertThing(thing);

        if (thing.Replaceable.StartsWith("one-expectation") || thing.Replaceable.StartsWith("another-expectation"))
        {
          _thingRepository.Upsert(convertedThing);
        }
      }
    }

    private ConvertedThing ConvertThing(Thing thing)
    {
      // omitted for brevity
      // uses _replacements
      return new ConvertedThing();
    }

    private static bool WeCareAboutIt(Thing t) => _typesWeCareAbout.Contains(t.Type);
  }
```

# At this point

It's worth being clear (and not just because I was partially responsible for it) that I'm not saying that this code is _wrong_. 

We were learning about and from the system as we went so trying to write the "right" code would have definitely been wasteful previously.

When we hit this class to modify it today, however, there were a few signals that set off my spidey-senses:

* we were making the fourth change
* it didn't pass the squint test
* say what you see
  * when we were talking about it neither my colleague nor I could clearly express what we thought it did
  * when we were expressing what it did we were talking about things implicit in the code not things explicit

## Fourth Change

I like to have several examples within a system before I start to look for an abstraction. Or put another way "A little duplication is better than the wrong abstraction".

## The Squint Test

Sandi Metz proposed the squint test ([see this talk](https://www.youtube.com/watch?v=8bZh5LMaSmE)) as a quick way to see if the shape of your code or the grouping of colours in your editor suggests any problems with your code. Amusingly there's a [package for Atom](https://atom.io/packages/squint-test) to save you having to actually squint.

## Say what you see

If you are talking about the code and you aren't using the words on the screen. Or if you can't succinctly explain what the conditionals are. Then you should be looking at whether there's information in your brain or elsewhere in the system that would help clarify what is happening. It's really easy to not be aware of what you have to know to understand some code - it's why i <3 code reviews.

# The Refactored Code

As we talked about it we both realised that what we had was difficult to express because we'd accidentally discovered a new concept. Something that was unconsciously in our brains when we wrote it and hadn't made its way into the computer.

```csharp  
  public class ThingsPublisher : MagicSystemHook
  {
    private readonly IThingRepository _thingRepository;

    private interface IMightSaveThings
    {
      void MaybeSave(ConvertedThing convertedThing, IThingRepository thingRepository);
    }

    private class SaveUnchangedThing : IMightSaveThings
    {
      public void MaybeSave(ConvertedThing convertedThing, IThingRepository thingRepository)
      {
        thingRepository.Upsert(convertedThing);
      }
    }

    private class FilterAmendAndSaveThings : IMightSaveThings
    {
      private readonly Regex _thirdPartyPattern;
      private readonly string _replacementPattern;

      public FilterAmendAndSaveThings(string thirdPartyPattern, string replacementPattern)
      {
        _thirdPartyPattern = new Regex(thirdPartyPattern);
        _replacementPattern = replacementPattern;
      }

      public void MaybeSave(ConvertedThing convertedThing, IThingRepository thingRepository)
      {
        if (!_thirdPartyPattern.IsMatch(convertedThing.Replaceable)) return;

        convertedThing.Replaceable = _thirdPartyPattern.Replace(convertedThing.Replaceable, _replacementPattern);
        thingRepository.Upsert(convertedThing);
      }
    }

    private static readonly Dictionary<string, IMightSaveThings> _typeRules = new Dictionary<string, IMightSaveThings>
    {
      {"WhatWeDidFirst", new SaveUnchangedThing()},
      {"WhatWeDidSecond", new FilterAmendAndSaveThings(@"/some-pattern/", "/its-pair/")},
      {"ATypeThatComesAlongWithWhatWeDidSecond",new FilterAmendAndSaveThings(@"/another-pattern/", "/and-its-pair/")},
      {"AModificationToWhatWeDidSecond",new FilterAmendAndSaveThings(@"/fiddly-detailed-pattern/", "/with-its-pair/")},
      {"WhatWeDidThird", new SaveUnchangedThing()}
    };

    public ThingsPublisher(IThingRepository thingRepository)
    {
      _thingRepository = thingRepository;
    }

    public override void OnPublish(IEnumerable<Thing> publishedThings)
    {
      foreach (var thing in publishedThings)
      {
        if (!_typeRules.ContainsKey(thing.Type))
          continue;

        var typeRule = _typeRules[thing.Type];
        var convertedThing = ConvertThing(thing);
        typeRule.MaybeSave(convertedThing, _thingRepository);
      }
    }

    private static ConvertedThing ConvertThing(Thing thing)
    {
      // omitted for brevity
      //much simpler factory method
      return new ConvertedThing();
    }
  }
```

# So now 

there are concepts explicitly in the code that were hidden or accidental beforehand

* we only have rules for some types *and* now those rules are listed alongside the types in the `_typeRules` dictionary
* generally speaking the rule is that a thing might be saved. I.e. the rule is of type `IMightSaveThings`
* for some types we save it without changing it
  * these we always save so maybe the name could be even better
* other types we don't always save, and when we do save them we change them first

The beauty in this code is that not only should it be easier to grok for somebody new to it (or us in a few weeks) now if we need to add additional rules that don't break the `MaybeSave` contract we can do that easily and in one place. And changes that break the contract are obvious and prompt us to think about what the change means for the code.

And we didn't just improve the code... we had a lot of fun (within context) realising it and fixing it.
