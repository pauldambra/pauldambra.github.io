---
title: "DRY - considered harmful"
layout: "post"
permalink: "/2018/03/harmful-dry.html"
date: "2018-03-30 10:00:00"
description: "DRY is about ideas not about code"
category: "programming"
tags: ["dry", "solid", "refactoring", "kotlin"]
---

# DRY or WET?

DRY, in software developement, stands for Don't Repeat Yourself. This is often taken to mean remove any duplication of lines of code. Take [this article](https://www.codementor.io/joshuaaroke/dry-code-vs-wet-code-89xjwv11w) from the [front page of Google results](https://www.google.co.uk/search?q=software+dry&oq=software+dry). Or on [this page](http://programmer.97things.oreilly.com/wiki/index.php/Don't_Repeat_Yourself) that says "Every line of code that goes into an application must be maintained, and is a potential source of future bugs. Duplication needlessly bloats the codebase"

Often this is compared to WET code - which stands for Write Everything Twice. Reinforcing the idea that this is about the amount you type. Below we're going to look at what the impact of removing duplication of lines of code does to some software, hopefully demonstrate that it isn't desirable as an absolute rule, and show what the better way might be.

<!--more-->

We're making an internet cafe and so we need software to make internet drinks

```kotlin

class Coffee(val milk: Int, val sugar: Int) {
    override fun toString() = "pour a Coffee(milk=$milk, sugar=$sugar)"
}

fun main(args: Array<String>) {
    val whiteCoffeeNoSugar = Coffee(1, 0)
    println(whiteCoffeeNoSugar)
}

```

This instructs the barista

```
pour a Coffee(milk=1, sugar=0)
```

Great, customers like it. Let's add tea!

```kotlin

class Coffee(val milk: Int, val sugar: Int) {
    override fun toString() = "Coffee(milk=$milk, sugar=$sugar)"
}

class Tea(val milk: Int, val sugar: Int) {
    override fun toString() = "Tea(milk=$milk, sugar=$sugar)"
}

fun main(args: Array<String>) {
    val whiteCoffeeNoSugar = Coffee(1, 0)
    println(whiteCoffeeNoSugar)

    val buildersTea = Tea(1, 3)
    println(buildersTea)
}

```

Woah! Wait! That violates DRY! There's loads of duplication. Let's remove it.

```kotlin

abstract class Drink(
  val name: String,
  val milk: Int,
  val sugar: Int
) {
    override fun toString() = "pour a $name(milk=$milk, sugar=$sugar)"
}

class Coffee(milk: Int, sugar: Int) : Drink("Coffee", milk, sugar)

class Tea(milk: Int, sugar: Int) : Drink("Tea", milk, sugar)

fun main(args: Array<String>) {
    val whiteCoffeeNoSugar = Coffee(1, 0)
    println(whiteCoffeeNoSugar)

    val buildersTea = Tea(1, 3)
    println(buildersTea)
}

```

Phew, now we won't get thrown out of the Agiles and can carry on building our internet cafe global super-company.

# Brilliant, that's DRY?

Yep, no repetition. Everything is hunky-dory.

The next feature request comes in.

```
As a User
I want to add warm milk
So that I can buy a warmer drink
```

(yep, _I_ know that's an awful user story but this imaginary dev team think they are nailing it)

Taking advantage of named and default parameters we can add a warm milk property to drinks.

```kotlin

abstract class Drink(
  val name: String = "Drink",
  val milk: Int = 0,
  val warmMilk: Int = 0,
  val sugar: Int = 0
) {
    override fun toString()
      = "pour a $name(milk=$milk, warmMilk=$warmMilk, sugar=$sugar)"
}

class Coffee(milk: Int = 0, warmMilk: Int = 0, sugar: Int = 0)
  : Drink("Coffee", milk, warmMilk, sugar)

class Tea(milk: Int = 0, warmMilk: Int = 0, sugar: Int = 0)
  : Drink("Tea", milk, warmMilk, sugar)

fun main(args: Array<String>) {
    val whiteCoffeeNoSugar = Coffee(milk = 1, sugar = 0)
    println(whiteCoffeeNoSugar)

    val buildersTea = Tea(milk = 1, sugar = 3)
    println(buildersTea)

    val warmerCoffee = Coffee(warmMilk =  2, sugar = 2)
    println(warmerCoffee)
}

```

And the next request:

```

As a User
I want to order chocolate sprinkles
So that I can spend more money

```

```kotlin

abstract class Drink(
  val name: String = "Drink",
  val milk: Int = 0,
  val warmMilk: Int = 0,
  val sugar: Int = 0,
  val chocolateSprinkles: Int = 0
) {
    override fun toString()
      = "pour a $name(milk=$milk, warmMilk=$warmMilk, sugar=$sugar, chocolateSprinkles=$chocolateSprinkles)"
}

class Coffee(milk: Int = 0, warmMilk: Int = 0, sugar: Int = 0, chocolateSprinkles: Int = 0)
    : Drink("Coffee", milk, warmMilk, sugar, chocolateSprinkles)

class Tea(milk: Int = 0, warmMilk: Int = 0, sugar: Int = 0)
    : Drink("Tea", milk, warmMilk, sugar)

fun main(args: Array<String>) {
    val whiteCoffeeNoSugar = Coffee(milk = 1, sugar = 0)
    println(whiteCoffeeNoSugar)

    val buildersTea = Tea(milk = 1, sugar = 3)
    println(buildersTea)

    val warmerCoffee = Coffee(warmMilk =  2, sugar = 2)
    println(warmerCoffee)

    val mocha = Coffee(warmMilk =  2, sugar = 2, chocolateSprinkles = 4)
    println(mocha)
}

```

The money is pouring in. And our code is as DRY as possible. We added chocolate sprinkles without breaking a sweat.

Next we can add lemon in tea and hazelnut syrup in coffee in a single code change. We're on fire!

```kotlin

abstract class Drink(
  val name: String = "Drink",
  val milk: Int = 0,
  val warmMilk: Int = 0,
  val sugar: Int = 0,
  val chocolateSprinkles: Int = 0,
  val lemon: Int = 0,
  val hazelnutSyrup: Int = 0
) {

    override fun toString() =
      "pour a $name(milk=$milk, " +
        "warmMilk=$warmMilk, " +
        "sugar=$sugar, " +
        "chocolateSprinkles=$chocolateSprinkles, " +
        "lemon=$lemon, " +
        "hazelnutSyrup=$hazelnutSyrup)"
}

class Coffee(milk: Int = 0, warmMilk: Int = 0, sugar: Int = 0, chocolateSprinkles: Int = 0, hazelnutSyrup: Int = 0)
    : Drink("Coffee", milk, warmMilk, sugar, chocolateSprinkles, hazelnutSyrup)

class Tea(milk: Int = 0, warmMilk: Int = 0, sugar: Int = 0, lemon: Int = 0)
    : Drink("Tea", milk, warmMilk, sugar, lemon)

fun main(args: Array<String>) {
    val whiteCoffeeNoSugar = Coffee(milk = 1, sugar = 0)
    println(whiteCoffeeNoSugar)

    val buildersTea = Tea(milk = 1, sugar = 3)
    println(buildersTea)

    val warmerCoffee = Coffee(warmMilk =  2, sugar = 2)
    println(warmerCoffee)

    val mocha = Coffee(warmMilk =  2, sugar = 2, chocolateSprinkles = 4)
    println(mocha)
}

```

Pretty soon after deployment disaster strikes! Barista Mike Acawfe reports

> this latest software version is a disaster. It's adding lemon to hazelnut coffee and chocolate sprinkes to tea ordered with lemon.

ugh, I knew we should have tried that new fangled unit testing. All the code compiles but the [position of the parameters matters](http://connascence.io/position.html) in how they get from the `Coffee` and `Tea` classes to the base `Drink` class.

You can fix this with more named parameters!

```kotlin

abstract class Drink(
  val name: String = "Drink",
  val milk: Int = 0,
  val warmMilk: Int = 0,
  val sugar: Int = 0,
  val chocolateSprinkles: Int = 0,
  val lemon: Int = 0,
  val hazelnutSyrup: Int = 0
) {

    override fun toString() =
      "pour a $name(milk=$milk, " +
        "warmMilk=$warmMilk, " +
        "sugar=$sugar, " +
        "chocolateSprinkles=$chocolateSprinkles, " +
        "lemon=$lemon, " +
        "hazelnutSyrup=$hazelnutSyrup)"
}

class Coffee(milk: Int = 0, warmMilk: Int = 0,
  sugar: Int = 0, chocolateSprinkles: Int = 0, hazelnutSyrup: Int = 0)
  : Drink("Coffee", milk = milk, warmMilk = warmMilk,
  sugar = sugar, chocolateSprinkles = chocolateSprinkles, hazelnutSyrup = hazelnutSyrup)

class Tea(milk: Int = 0, warmMilk: Int = 0, sugar: Int = 0, lemon: Int = 0)
  : Drink("Tea", milk = milk, warmMilk = warmMilk, sugar = sugar, lemon = lemon)

fun main(args: Array<String>) {
    val whiteCoffeeNoSugar = Coffee(milk = 1, sugar = 0)
    println(whiteCoffeeNoSugar)

    val buildersTea = Tea(milk = 1, sugar = 3)
    println(buildersTea)

    val warmerCoffee = Coffee(warmMilk =  2, sugar = 2)
    println(warmerCoffee)

    val mocha = Coffee(warmMilk =  2, sugar = 2, chocolateSprinkles = 4)
    println(mocha)

    val lemonTea = Tea(lemon = 1)
    println(lemonTea)
}

```

But, something is bothering you. It was hard to spot this bug because even though there's no duplication of code there's actually lots of duplication of names. This lovely DRY code uses the word milk nine times. In fact each of the ingredients is mentioned nine times. So any new ingredient means edits in nine places.

And the call through to the base class constructor duplicates the constructor on the line above. Any changes to the ingredients and you'll need to change both constructors.

You meet a friend for coffee and, since it's on your mind, ask how they would remove this last duplication?!

## Each idea once and only once

Your friend explains that [DRY isn't about code. It's about ideas!](http://wiki.c2.com/?DontRepeatYourself) The reason you're struggling is that the idea that some drinks have milk and others lemon is hidden because you've treated removing lines of code as an absolute rule.

They offer to help you rewrite your code with that in mind.

The first idea that's missing is that there are types of ingredients.

The second idea is that each drink is a collection of ingredients that should be printed out for the baristas.

So you start with a marker interface and a set of data classes. Each drink then allows you to add a subset of the possible interfaces and prints out the barista's instructions.

At the same time you add the concept of temperature to milk so you don't have to have implicitly cold milk separately from warm milk.

```kotlin

interface Ingredient

enum class Temperature {
    WARM, COLD
}

data class Sugar(val spoons: Int) : Ingredient
data class Milk(val glugs: Int, val temperature: Temperature = Temperature.COLD) : Ingredient
data class ChocolateSprinkles(val pinches: Int) : Ingredient
data class HazelnutSyrup(val shots: Int) : Ingredient
data class Lemon(val squeezes: Int) : Ingredient

class Coffee {
    private val ingredients: MutableList<Ingredient> = mutableListOf()

    fun withIngredient(ingredient: Sugar): Coffee {
        ingredients.add(ingredient)
        return this
    }

    fun withIngredient(ingredient: Milk): Coffee {
        ingredients.add(ingredient)
        return this
    }

    fun withIngredient(ingredient: ChocolateSprinkles): Coffee {
        ingredients.add(ingredient)
        return this
    }

    fun withIngredient(ingredient: HazelnutSyrup): Coffee {
        ingredients.add(ingredient)
        return this
    }

    override fun toString()
      = "pour a Coffee(${ingredients.joinToString(",")})"
}

class Tea {
    private val ingredients: MutableList<Ingredient> = mutableListOf()

    fun withIngredient(ingredient: Sugar): Tea {
        ingredients.add(ingredient)
        return this
    }

    fun withIngredient(ingredient: Milk): Tea {
        ingredients.add(ingredient)
        return this
    }

    fun withIngredient(ingredient: Lemon): Tea {
        ingredients.add(ingredient)
        return this
    }

    override fun toString()
      = "pour a Tea(${ingredients.joinToString(",")})"
}

fun main(args: Array<String>) {
    val whiteCoffeeNoSugar = Coffee().withIngredient(Milk(1))
    println(whiteCoffeeNoSugar)

    val sugaryCoffee = Coffee().withIngredient(Sugar(3))
    println(sugaryCoffee)

    val warmerCoffee = Coffee().withIngredient(Milk(2, Temperature.WARM)).withIngredient(Sugar(3))
    println(warmerCoffee)

    val mocha = Coffee()
      .withIngredient(Milk(2, Temperature.WARM))
      .withIngredient(Sugar(2))
      .withIngredient(ChocolateSprinkles(4))
    println(mocha)

    val theFancyCoffee = Coffee()
      .withIngredient(Milk(2, Temperature.WARM))
      .withIngredient(Sugar(2))
      .withIngredient(ChocolateSprinkles(4))
      .withIngredient(HazelnutSyrup(2))

    println(theFancyCoffee)

    val buildersTea = Tea().withIngredient(Milk(1)).withIngredient(Sugar(3))
    println(buildersTea)

    val lemonTea = Tea().withIngredient(Lemon(1))
    println(lemonTea)
}

```

This prints out

```

pour a Coffee(Milk(glugs=1))
pour a Coffee(Sugar(spoons=3))
pour a Coffee(WarmMilk(glugs=2),Sugar(spoons=3))
pour a Coffee(WarmMilk(glugs=2),Sugar(spoons=2),ChocolateSprinkles(pinches=4))
pour a Coffee(WarmMilk(glugs=2),Sugar(spoons=2),ChocolateSprinkles(pinches=4),HazelnutSyrup(shots=2))
pour a Tea(Milk(glugs=1),Sugar(spoons=3))
pour a Tea(Lemon(squeezes=1))

```

Notice the awesome `toString` output that Kotlin's data classes give you for the `Ingredient`s.

Now the word milk is only in the code three times. Once when it is declared and once in each drink.

But there is still duplication of the idea that a drink can have ingredients added. In fact each drink has almost the same method repeated for each ingredient. All to avoid being able to put chocolate sprinkles in tea.

So the _idea_ that chocolate sprinkles aren't a tea ingredient is implicit in the fact that there's no method for it. It isn't represented [once and only once](http://wiki.c2.com/?OnceAndOnlyOnce). 

One option is to accept any ingredient to the method but explicitly refuse ones that shouldn't be added

```kotlin

class Coffee {
    class ItIsNotOKToPutLemonInCoffee : Throwable()

    private val ingredients: MutableList<Ingredient> = mutableListOf()

    fun withIngredient(ingredient: Ingredient): Coffee {
        if (ingredient is Lemon) {
            throw ItIsNotOKToPutLemonInCoffee()
        }

        ingredients.add(ingredient)
        return this
    }

    override fun toString()
      = "pour a Coffee(${ingredients.joinToString(",")})"
}

class Tea {
    class ItIsNotOKToPutThisIngredientInTea(ingredient: Ingredient)
      : Throwable("It is not OK to put $ingredient in tea")

    private val ingredients: MutableList<Ingredient> = mutableListOf()

    fun withIngredient(ingredient: Ingredient): Tea {
        if (ingredient is HazelnutSyrup
            || ingredient is ChocolateSprinkles) {
            throw ItIsNotOKToPutThisIngredientInTea(ingredient)
        }

        ingredients.add(ingredient)
        return this
    }

    override fun toString()
      = "pour a Tea(${ingredients.joinToString(",")})"
}

```

But there's still duplication of the idea. You'll have to change `Tea` or `Coffee` any time you add a new ingredient. And even though the `withIngredient` method only knows about the marker interface in its signature it has to know about concrete implementations of the interface to work. Yuk!

```kotlin

enum class Temperature {
    WARM, COLD
}

interface Ingredient {
    fun canBeAddedTo(drink: Drink) = true
}

data class Sugar(val spoons: Int) : Ingredient
data class Milk(val glugs: Int, val temperature: Temperature = Temperature.COLD) : Ingredient

data class ChocolateSprinkles(val pinches: Int) : Ingredient {
    override fun canBeAddedTo(drink: Drink) = drink is Coffee
}

data class HazelnutSyrup(val shots: Int) : Ingredient {
    override fun canBeAddedTo(drink: Drink) = drink is Coffee
}

data class Lemon(val squeezes: Int) : Ingredient {
    override fun canBeAddedTo(drink: Drink) = drink is Tea
}

abstract class Drink {
    class IsNotFitForConsumptionWithThisIngredient(ingredient: Ingredient, drink: Drink)
      : Throwable("It is not OK to put $ingredient in ${drink.javaClass.simpleName}")

    private val ingredients: MutableList<Ingredient> = mutableListOf()

    fun withIngredient(ingredient: Ingredient): Drink {
        if (!ingredient.canBeAddedTo(this)) {
            throw Drink.IsNotFitForConsumptionWithThisIngredient(ingredient, this)
        }

        ingredients.add(ingredient)
        return this
    }

    override fun toString()
      = "pour a ${this.javaClass.simpleName}(${ingredients.joinToString(",")})"
}

class Coffee : Drink()

class Tea : Drink()

```

So now ingredients know whether they can be added to a drink. They default to it being ok that they are added to any drink

```kotlin

interface Ingredient {
    fun canBeAddedTo(drink: Drink)= true
}

```

but can be specified as allowed only for certain drinks

```kotlin

data class ChocolateSprinkles(val pinches: Int) : Ingredient {
    override fun canBeAddedTo(drink: Drink) = drink is Coffee
}

```

This means that new ingredients that are added shouldn't need any modifications to the drinks.

Now `Drink` as an abstract class reappears. The individual drinks now only need to have a type for the `canBeAddedTo(drink:Drink)` check. It's ok to [allow code to get more complex while you're working on it]({{ site.baseurl }}{% post_url 2017-05-14-big-pile-of-soil %}) as happened here when the `withIngredient` methods were exploded into `Coffee` and `Tea`.

```kotlin

abstract class Drink {
    class IsNotFitForConsumptionWithThisIngredient(ingredient: Ingredient, drink: Drink) : Throwable("It is not OK to put $ingredient in ${drink.javaClass.simpleName}")

    private val ingredients: MutableList<Ingredient> = mutableListOf()

    fun withIngredient(ingredient: Ingredient): Drink {
        if (!ingredient.canBeAddedTo(this)) {
            throw Drink.IsNotFitForConsumptionWithThisIngredient(ingredient, this)
        }

        ingredients.add(ingredient)
        return this
    }

    override fun toString()
      = "pour a ${this.javaClass.simpleName}(${ingredients.joinToString(",")})"
}

```

I'm still confused by Java allowing methods in interfaces. `Ingredient` can be an interface but because `Drink` wants to override `ToString` it has to be an abstract class. Without that it could be an interface too ¯\\\_(ツ)\_/¯

One idea that is still implicit is that the ingredients are printed out for the barista. So let's add an `OrderPrinter` and take the need to descibe itself out of the `Drink`

We can also take the opportunity, since we're exposing the drink's ingredients, to make them an immutable list.

```kotlin

enum class Temperature {
    WARM, COLD
}

interface Ingredient {
    fun canBeAddedTo(drink: Drink) = true
}

data class Sugar(val spoons: Int) : Ingredient
data class Milk(val glugs: Int, val temperature: Temperature = Temperature.COLD) : Ingredient

data class ChocolateSprinkles(val pinches: Int) : Ingredient {
    override fun canBeAddedTo(drink: Drink) = drink is Coffee
}

data class HazelnutSyrup(val shots: Int) : Ingredient {
    override fun canBeAddedTo(drink: Drink) = drink is Coffee
}

data class Lemon(val squeezes: Int) : Ingredient {
    override fun canBeAddedTo(drink: Drink) = drink is Tea
}

abstract class Drink {
    class IsNotFitForConsumptionWithThisIngredient(ingredient: Ingredient, drink: Drink)
        : Throwable("It is not OK to put $ingredient in ${drink.javaClass.simpleName}")

    var ingredients: List<Ingredient> = emptyList()
        private set

    fun withIngredient(ingredient: Ingredient): Drink {
        if (!ingredient.canBeAddedTo(this)) {
            throw Drink.IsNotFitForConsumptionWithThisIngredient(ingredient, this)
        }

        ingredients += ingredient
        return this
    }
}

class OrderPrinter {
    companion object {
        fun instructBarista(drink:Drink)
          = "pour a ${drink.javaClass.simpleName}(${drink.ingredients.joinToString(",")})"
    }
}

class Coffee : Drink()

class Tea : Drink()

fun main(args: Array<String>) {
    val whiteCoffeeNoSugar = Coffee()
      .withIngredient(Milk(1))

    println(OrderPrinter.instructBarista(whiteCoffeeNoSugar))

    val sugaryCoffee = Coffee()
      .withIngredient(Sugar(3))

    println(OrderPrinter.instructBarista(sugaryCoffee))

    val warmerCoffee = Coffee()
      .withIngredient(Milk(2, Temperature.WARM))
      .withIngredient(Sugar(3))

    println(OrderPrinter.instructBarista(warmerCoffee))

    val mocha = Coffee()
      .withIngredient(Milk(2, Temperature.WARM))
      .withIngredient(Sugar(2))
      .withIngredient(ChocolateSprinkles(4))

    println(OrderPrinter.instructBarista(mocha))

    val theFancyCoffee = Coffee()
      .withIngredient(Milk(2, Temperature.WARM))
      .withIngredient(Sugar(2))
      .withIngredient(ChocolateSprinkles(4))
      .withIngredient(HazelnutSyrup(2))

    println(OrderPrinter.instructBarista(theFancyCoffee))

    val buildersTea = Tea()
      .withIngredient(Milk(1))
      .withIngredient(Sugar(3))

    println(OrderPrinter.instructBarista(buildersTea))

    val lemonTea = Tea().withIngredient(Lemon(1))

    println(OrderPrinter.instructBarista(lemonTea))

    try {
        Tea().withIngredient(ChocolateSprinkles(2))
    } catch (e: Drink.IsNotFitForConsumptionWithThisIngredient) {
        println("excellently did not allow chocolate in tea: $e")
    }
}

```
<!--alex ignore simple --->
This is about twice as much code as the original DRY version. But is much more flexible for adding new ingredients without changing existing code. What DRY misses is the much more expressive [four rules of simple design](https://martinfowler.com/bliki/BeckDesignRules.html).

 1. Runs all the tests
 2. Has no duplicated logic. Be wary of hidden duplication like parallel class hierarchies
 3. States every intention important to the programmer
 4. Has the fewest possible classes and methods

These are in order of importance. The code in this article is manually tested but doesn't pass this as the rule is *runs* all the tests. Before fixing anything else my fictional friend should have made me write tests.

Rules 2, 3 and 4 are in tension with each other. If I want to state every intention to the future reader I can't only remove as many classes and methods as possible. The wonderful design pressure as I tried to show here is that you want the smallest amount of code to communicate the largest amount of the ideas it represents.

So, stop looking for duplicated lines of code. Stop automatically making every string a constant. And start having empathy for the future reader of your code. Leave as little of the information needed to change the code in your brain as possible by putting it in the code.

[All of the code can be found on Github](https://github.com/pauldambra/dry-coffee)
