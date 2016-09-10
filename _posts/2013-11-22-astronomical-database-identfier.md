---
title: "Astronomical Database Identfier"
layout: "post"
permalink: "/2013/11/astronomical-database-identfier.html"
date: "2013-11-22 20:51:00"
updated: "2013-11-22 21:24:28"
category: databases
tags: [entity-framework, oracle, wat, rant]
---

I dealt with an unusual requirement over the last few days. And wish I'd understood some of the more unusual ways that big numbers are handled in C#, Entity Framework, MS SQL and Oracle

<!--more-->

That requirement came about in the development of an App that will act as an API for a bunch of sales data. The data is provided by another 3rd party exported from their Oracle database.

That data ultimately ends up in pretty graphs on an iPad.

When I received the first set of demo data I noticed both negative IDs and 9 digit ids.

This immediately made me worry about whether we had the right data formats (everyone worries about data formats, right?) and I asked the question.

It turns out that the DB schema that the data is ultimately sourced from has the ID column defined as NUMBER(38).

I've never really used Oracle so I had to dig around to discover that [a NUMBER(38) field can hold 99999999999999999999999999999999999999x10<sup>125</sup> as its maximum value](http://docs.oracle.com/cd/B19306_01/server.102/b14237/limits001.htm)

OK, that's a big number. Let's put it into context - [the ESA estimates there are something like 10<sup>22</sup>&nbsp;to 10<sup>24&nbsp;</sup>&nbsp;stars in the known universe](http://www.esa.int/Our_Activities/Space_Science/Herschel/How_many_stars_are_there_in_the_Universe)

These IDs are used in the MS SQL DB Schema that we're importing into so I can't just ignore the possibility of an ID coming in with this massive value. So there're three distinct problems here...

 1. How do I represent these numbers in .Net (C# 4.5 to be precise)
 2. How do I have Entity Framework 6 map these potentially massive IDs
 3. How do I represent these numbers in the schema

## Representing a Vigintillion in Dot Net

 [A quick journey to MSDN](http://msdn.microsoft.com/en-us/library/exx3b86w(v=vs.110).aspx) and we can see that if we restrict ourselves to integral types then we have int and long... In short one of those will hold a lot, lot less than NUMBER(38) and the other a lot less.

All is not lost. Since .Net 4 we have had access to [BigInteger](http://msdn.microsoft.com/en-us/library/system.numerics.biginteger(v=vs.110).aspx) which allows for arbitrarily large numbers.

OK, so we can actually import the number into memory... that's a start

### Using BigDecimal as an ID in EF6

Let's fire up an EF project, create an entity model with a BigInteger ID, and add a DbSet for that model to a DbContext:

{% include image.html url="http://4.bp.blogspot.com/-PgeRsO_R89w/Uo-zpg99w-I/AAAAAAAAJTk/8CyZmhvxdCw/s640/HugeNumbers.PNG" alt="huge numbers code" %}

Having an integral type ID at this point and running Enable-Migrations from the console would work without complaint but with BigInteger as the Id an exception is thrown...

```
System.Data.Entity.ModelConfiguration.ModelValidationException: One or more validation errors were detected during model generation:

HugeNumbers.Proton: : EntityType 'Proton' has no key defined.

Define the key for this EntityType.

Protons: EntityType: EntitySet 'Protons' is based on type 'Proton' that has no keys defined.
```

Adding the [Key] data attribute doesn't help.

How about fangling the ModelBuilder directly?

{% include image.html url="http://1.bp.blogspot.com/-Sy-WWyCcbWg/Uo-1qZFYLQI/AAAAAAAAJTw/kaI76AZC15s/s1600/proton2.PNG" alt="huge numbers more code" %}

Progress! Kind of :

```
The property 'Id' cannot be used as a key property on the entity 'HugeNumbers.Proton' because the property type is not a valid key type. Only scalar types, string and byte[] are supported key types.
```

A negative result is still a result. So this is definitely progress! The [scalar types in SQL](http://my.safaribooksonline.com/book/databases/sql/9781449319724/2dot-types-and-domains/id2749129) include [numeric](http://msdn.microsoft.com/en-us/library/ms187746.aspx) which can hold 38 digits. Huzzah! And answers the question of how to represent the ID in the database.

#### So can we have a numeric ID in EF?!

So long as we can define a value type key we can have numeric in the DB. Ta da!

{% include image.html url="http://2.bp.blogspot.com/-5kh5vIIvp0w/Uo-7LImoKqI/AAAAAAAAJUA/i4OdUD5Coxo/s1600/Capture3.PNG" alt="huge numbers even more code" %}

We can enable migrations and then generate one:

{% include image.html url="http://1.bp.blogspot.com/-KelcMu1mi6w/Uo-7cv3auqI/AAAAAAAAJUI/lVSpjAvszNU/s1600/Capture4.PNG" alt="huge numbers even more code" %}

Wrong :

Decimal has the largest precision of the .Net value types and ["only" offers 28-29 significant digits](http://msdn.microsoft.com/en-us/library/364x0z75(v=vs.110).aspx)

### Is this peculiar to Entity Framework?

[The NHibernate docs](http://www.nhforge.org/doc/nh/en/#mapping-declaration-id) say 

> Any integral property type is thus supported.

so unless there is some funkiness possible with NHibernate (which I've never used in anger) then I'm guessing they've made a similar design decision to the EF team. And it wouldn't be possible there either...

### In conclusion

Entity Framework is not yet ready for storing an identifier for every proton in the universe and if you might want to be storing 38 digit identifiers (a phrase which I'm assured by my five-year old daughter actually kills `int32.MaxValue` fairies every time it is uttered) then you aren't going to be using Entity Framework and I'd guess you aren't going to be having a good time.

### And straight from the Magic Unicorns mouth

<blockquote class="twitter-tweet" lang="en"><a href="https://twitter.com/pauldambra">@pauldambra</a> As you concluded, it's not possible to map BigInt with EF. Easiest solution is probably to bypass EF for that data.

— Entity Framework (@efmagicunicorns) <a href="https://twitter.com/efmagicunicorns/statuses/403996143677235200">November 22, 2013</a></blockquote><script async="" charset="utf-8" src="//platform.twitter.com/widgets.js"></script>
