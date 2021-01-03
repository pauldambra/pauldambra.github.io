---
title: A DTO by any other name would implement ISweetSmellEquality
layout: post
permalink: "/2014/04/a-dto-by-any-other-name-would-implement.html"
date: "2014-04-01 20:44:00"
updated: "2014-04-02 23:03:07"
description: a discussion of the practice of calling the objects passed between application layers DTOs
category: software-engineering
tags: [learning, dto, cargo-cult, domain]
published: true
---

I've been thinking about what people call the objects they pass around and whether they are the right names and why... and when... and I feel like the dog running behind the television to see where the onscreen dog went - on the verge of a paradigm shifting change in perspective but not quite getting it (and possibly a bit smelly)

<!--more-->

# DTO
<!--alex ignore he-she --->
The most common is DTO or Data Transfer Object. [Fowler has a definition](http://martinfowler.com/eaaCatalog/dataTransferObject.html) "An object that carries data between processes in order to reduce the number of method calls." He extends this clarifying it should be an object that can be serialised.

[This out-of-date article from Microsoft](http://msdn.microsoft.com/en-us/library/ms978717.aspx) also defines this as an object that is used to reduce the number of calls to a remote interface in a distributed system. I suppose  [Android's Intent](http://developer.android.com/reference/android/content/Intent.html) are an example of serializable objects that communicate between processes without using the web - although I don't know enough Android to be sure about that.

However, in [this MSDN article](http://msdn.microsoft.com/en-us/magazine/ee236638.aspx#id0080022) DTOs are defined specifically as objects with properties but no methods used to isolate presentation from the domain - what Fowler calls "localDTO".

LocalDTO i.e. using DTO to describe objects passed between layers of a single application is so common that [Fowler has subsequently written](http://martinfowler.com/bliki/LocalDTO.html) to clarify:
<!--alex ignore randy --->
> Some people argue for them as part of a [Service Layer](http://martinfowler.com/eaaCatalog/serviceLayer.html) API because they ensure that service layer clients aren't dependent upon an underlying [Domain Model](http://martinfowler.com/eaaCatalog/domainModel.html). While that may be handy, I don't think it's worth the cost of all of that data mapping. As my contributor Randy Stafford says in [P of EAA](http://martinfowler.com/books/eaa.html) "Don't underestimate the cost of [using DTOs].... It's significant, and it's painful - perhaps second only to the cost and pain of object-relational mapping".

A relatively brief online search suggests there are more definitions that describe a DTO as between remote processes as opposed to between layers of an application ([here for example](http://www.servicedesignpatterns.com/RequestAndResponseManagement/DataTransferObject) or [here](http://c2.com/cgi/wiki?DataTransferObject)).

Of the ten hits for "Data Transfer Object" on Google right now eight agree with Fowler's definition, one is Fowler's Value Object page, and one is a J2EE definition for a transfer object which specifies that it can be used for transferring data between tiers - in PoEAA Fowler tells us that the Java community have since moved away from calling these classes Transfer Objects.

So it appears that while it is common to call objects passed between application tiers (at least in MS circles) DTOs it isn't technically correct but grew out of an [out-of-date J2EE usage of DTO including in its definition](http://www.adam-bien.com/roller/abien/entry/value_object_vs_data_transfer)  moving data between tiers.

# Domain Model
<!--alex ignore he-she simple --->
In the quote above local DTOs are used instead of passing Domain Models. [Fowler defines a Domain Model](http://martinfowler.com/eaaCatalog/domainModel.html) as "An object model of the domain that incorporates both behaviour and data." In Patterns of Enterprise Application Architecture [(shameless affiliate link)](http://www.amazon.co.uk/gp/product/B008OHVDFM/ref=as_li_ss_tl?ie=UTF8&amp;camp=1634&amp;creative=19450&amp;creativeASIN=B008OHVDFM&amp;linkCode=as2&amp;tag=mindlramblnon-21) he expands and in describing a Domain Model says: 

<!--alex ignore simple --->
>As a result I see two styles of Domain Model in the field. A simple Domain Model looks very much like the database design with mostly one domain object for each database table. A rich Domain Model can look different from the database design, with inheritance, strategies, and other Gang of Four patterns, and complex webs of small interconnected objects.

Further Fowler describes the [anemic domain model](http://www.martinfowler.com/bliki/AnemicDomainModel.html) where the domain model objects have little or no behaviour. This anemic model seems to be a good fit for the local DTOs described above. The solution to this anti-pattern seems to be to have read Eric Evan's DDD [(shameless affiliate link)](http://www.amazon.co.uk/gp/product/B00794TAUG/ref=as_li_ss_tl?ie=UTF8&amp;camp=1634&amp;creative=19450&amp;creativeASIN=B00794TAUG&amp;linkCode=as2&amp;tag=mindlramblnon-21) and where to implement as rich a domain model as appropriate for the application being built.

# Value Object

I have a tendency to call local DTOs "value objects" but using [Evan's definition](http://martinfowler.com/bliki/EvansClassification.html) this isn't strictly true. I had missed that a value object isn't only about representing the value. [It's more than that](http://martinfowler.com/bliki/ValueObject.html). Value objects should be immutable and any two value objects are only equal when their properties are equal. As such they don't map to the local DTOs described above.

However, I've been experimenting recently with passing structs around as immutable value objects when traversing layers (and at [a colleague](https://twitter.com/tomliversidge)'s suggestion have amended my R# auto property shortcut to create a private setter). I prefer these immutable objects as responses from queries into the domain but I haven't done any reading around whether that's a bad idea lots of people have already had.

# In conclusion...

...it seems that I really need to read DDD and maybe that the job isn't to find the correct name for an object passed between tiers but to start passing the domain model and lose the "DTOs" entirely
