--- 
title: "Happy Numbers" 
layout: "post" 
permalink: "/happy-numbers-kata.html" 
date: "2014-11-22 23:00:00"
description: The Happy Numbers Kata in Five Seconds
keywords: tpl parallel happy numbers kata
---

I love C# but while we're trying to beat our deployment process into submission at work I'm only really writing Ruby and Powershell. So when a [few](http://silkandspinach.net/2014/11/08/the-happy-numbers-kata/), [different](http://silkandspinach.net/2014/11/13/happy-numbers-again-spoilers/) [articles](http://www.ryanwgough.com/blog/happy_numbers.html) about the Happy Numbers kata turned up on my twitter feed and I found myself with a large whisky and a sleeping family I thought I'd have a go.

The Happy Numbers kata is defined as

> Choose a two-digit number (eg. 23), square each digit and add them together. 
> Keep repeating this until you reach 1
> or the cycle carries on in a continuous loop. 
> 
> If you reach 1 then the number you started with is a “happy number”.
> 
> Can you find all the happy numbers between 1 and 100?

There is more info on [what a Happy Number is on wikipedia](http://en.wikipedia.org/wiki/Happy_number).

The second link [above](http://silkandspinach.net/2014/11/13/happy-numbers-again-spoilers/) has some spoilers in. Particularly that the order of the numbers doesn't matter, and that zeroes don't matter. I did previously rediscover that the order that you add numbers doesn't matter when working on some insurance software a few years back (although it took me a while :annoyedwithselfemoticon:) so let's be kind to me and assume I'd have got there on my own if I hadn't read the article first (although it was a _large_ whisky).

After writing a just a couple of tests:

{% highlight c# %}
[Test]
[TestCase(31, true)]
[TestCase(4, false)]
[TestCase(2, false)]
public void CanIdentifyHappyNumber(int i, bool expected)
{
    Assert.AreEqual(expected, i.IsAHappyNumber());
}
{% endhighlight %}

I realised that I really like Ruby's having a question mark on methods that return a boolean and miss that feature in C#.

And that the sensible public API was just a call to `IsAHappyNumber` directly on the integer so I could crank out a large test pretty easily.

{% highlight c# %}
// Taken from http://oeis.org/A007770
private static readonly int[] HappyNumbersUpTo1000 =
{
    1, 7, 10, 13, 19, 23, 28, 31, 32, 44, 49, 68, 70, 79, 82, 86, 91, 94, 97, 100, 103, 109, 129, 130, 133, 139,
    167, 176, 188, 190, 192, 193, 203, 208, 219, 226, 230, 236, 239, 262, 263, 280, 291, 293, 301, 302, 310, 313,
    319, 320, 326, 329, 331, 338, 356, 362, 365, 367, 368, 376, 379, 383, 386, 391, 392, 397, 404, 409, 440, 446,
    464, 469, 478, 487, 490, 496, 536, 556, 563, 565, 566, 608, 617, 622, 623, 632, 635, 637, 638, 644, 649, 653,
    655, 656, 665, 671, 673, 680, 683, 694, 700, 709, 716, 736, 739, 748, 761, 763, 784, 790, 793, 802, 806, 818,
    820, 833, 836, 847, 860, 863, 874, 881, 888, 899, 901, 904, 907, 910, 912, 913, 921, 923, 931, 932, 937, 940,
    946, 964, 970, 973, 989, 998, 1000
};

[Test]
public void CanTestAThousandNumbers()
{
    for (var i = 0; i < 1000; i++)
    {
        Assert.AreEqual(HappyNumbersUpTo1000.Contains(i), i.IsAHappyNumber());
    }
}
{% endhighlight %}

So, with a 1000 failing tests I could run through a few naive implementations to get to a reasonable one.

{% highlight c# %}
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace HappyNumbers
{
    // Choose a two-digit number (eg. 23), square each digit and add them together. 
    // Keep repeating this until you reach 1 or the cycle carries on in a continuous loop. 
    // If you reach 1 then the number you started with is a “happy number”.
    public static class HappyNumbers
    {
        private static readonly Dictionary<int, HashSet<int>> NumberChain = new Dictionary<int, HashSet<int>>(); 
        private static readonly Dictionary<string, bool> HappyNumberResults = new Dictionary<string, bool>();

        public static bool IsAHappyNumber(this int startingNumber)
        {
            var digitsToTest = startingNumber.GetDigits()
                                             .StripZeroes()
                                             .OrderedByDigit();

            var happyNumberKey = string.Join(",", digitsToTest);

            if (AlreadyKnowThatThisNumberIsHappy(happyNumberKey))
            {
                return HappyNumberResults[happyNumberKey];
            }

            GuardAgainstStrangeness(startingNumber);
            NumberChain.Add(startingNumber, new HashSet<int>{startingNumber});
            TestForHappiness(startingNumber, happyNumberKey);
            return HappyNumberResults[happyNumberKey];
        }

        private static void GuardAgainstStrangeness(int startingNumber)
        {
            if (NumberChain.ContainsKey(startingNumber))
            {
                throw new Exception(
                    string.Format(
                        "I didn't think we could have a number ({0}) without a result that was in the number chain at this point",
                        startingNumber));
            }
        }

        private static bool AlreadyKnowThatThisNumberIsHappy(string happyNumberKey)
        {
            return HappyNumberResults.ContainsKey(happyNumberKey);
        }

        private static void TestForHappiness(int startingNumber, string happyNumberKey)
        {
            var nextInChain = startingNumber;
            while (!HappyNumberCalculationIsCompleteFor(happyNumberKey))
            {
                nextInChain = nextInChain.GetSumOfSquaredDigits();
                if (nextInChain == 1)
                {
                    HappyNumberResults.Add(happyNumberKey, true);
                    break;
                }
                if (TheCalculationChainHasLoopedAround(startingNumber, nextInChain))
                {
                    HappyNumberResults.Add(happyNumberKey, false);
                    break;
                }
            }
        }

        /// <summary>
        /// If the last calculated sum of the squares of the digits is already in the set of calculated numbers
        /// then this number chain has looped around
        /// </summary>
        private static bool TheCalculationChainHasLoopedAround(int startingNumber, int sumOfSquaredDigits)
        {
            var canAddToTheNumbersInThisChain = NumberChain[startingNumber].Add(sumOfSquaredDigits);
            return !canAddToTheNumbersInThisChain;
        }

        private static bool HappyNumberCalculationIsCompleteFor(string happyNumberKey)
        {
            return HappyNumberResults.ContainsKey(happyNumberKey);
        }

        private static int GetSumOfSquaredDigits(this int number)
        {
            return number.GetDigits()
                         .Sum(digit => digit*digit);
        }

        private static IEnumerable<int> GetDigits(this int number)
        {
            return number.ToString(CultureInfo.InvariantCulture)
                         .Select(digit => int.Parse(digit.ToString(CultureInfo.InvariantCulture)));
        }

        private static IEnumerable<int> StripZeroes(this IEnumerable<int> numbers)
        {
            return numbers.Where(digit => digit != 0);
        }

        private static IEnumerable<int> OrderedByDigit(this IEnumerable<int> numbers)
        {
            return numbers.OrderBy(i=>i);
        }
    }
}

{% endhighlight %}

OK, there's a lot going on there. First there are two dictionaries: one which keeps track of the numbers generated while processing each number processed; the other which keeps track of the results for a key describing each number (not the number be being processed).

{% highlight c# %}
private static readonly Dictionary<int, HashSet<int>> NumberChain = new Dictionary<int, HashSet<int>>(); 
private static readonly Dictionary<string, bool> HappyNumberResults = new Dictionary<string, bool>();
{% endhighlight %}

The first dictionary is used for deciding when a number is sad - if a number is seen for a second time then either it was the start number or the process has started looping. The second dictionary is for shortcut results. That is since 123, 213, 321, 1203, 2130, 3021, etc all have the same result once we've seen 123 we can immediately return a result for all other numbers that have a single 1, 2, and 3 and any number of zeroes.

Then `var happyNumberKey = string.Join(",", digitsToTest);` because two instances of `int[]` aren't equal based on their contents it is necessary to generate a key that from the arrays so that they can be compared when adding to the HappyNumberResults dictionary.

There are a bunch of methods to help reveal intent - mainly for this method that does the meat of the work:
{% highlight c# %}
private static void TestForHappiness(int startingNumber, string happyNumberKey)
{
    var nextInChain = startingNumber;
    while (!HappyNumberCalculationIsCompleteFor(happyNumberKey))
    {
        nextInChain = nextInChain.GetSumOfSquaredDigits();
        if (nextInChain == 1)
        {
            HappyNumberResults.Add(happyNumberKey, true);
            break;
        }
        if (TheCalculationChainHasLoopedAround(startingNumber, nextInChain))
        {
            HappyNumberResults.Add(happyNumberKey, false);
            break;
        }
    }
}
{% endhighlight %}

This expresses the algorithm: take a number, get the sum of the square of its digits, test for a result, stop if you have one or do the same to that sum. I don't like the triple check of `HappyNumberIsCompleteFor`, `nextInChain==1`, and `TheCalculationChainHasLoopedAround` but I can't immediately see how to split that up without it being too meh.

Results
=======
My first naive implementation didn't order digits or strip zeroes and reached around 320,000 in five seconds. I added ordering of digits but (since I was drinking) I used an integer array as the key on the HappyNumbersResults dictionary - doh! At least when performance didn't improve I realised what I'd done.

Switching to a string key for the short-cut dictionary had, as could be expected, no impact for unordered digits but pushes the maximum reached up to around 2,000,000 for ordered digits. 

Removing zeroes from the digits array didn't have much impact - presumably because calculating the square of zero isn't very expensive.

Can this be improved?
=====================
Processing two million numbers in five seconds is pretty good but I wondered if this could be improved on with some of the fangling available in the [TPL library](http://msdn.microsoft.com/en-us/library/dd460717(v=vs.110).aspx).

First lesson here was that I don't get the TPL at all... _at all_

My first attempt at parallel processing of the list meant adding the cost of starting a thread for every number (as the Happy Numbers are processed one at a time) so I added an extension method to call `AreHappyNumbers` on a list of integers.

{% highlight c# %}
public static Dictionary<int, bool> AreHappyNumbers(
    this IEnumerable<int> numbersToProcess, 
    CancellationToken cancellationToken)
{
    var numbers = numbersToProcess as int[] ?? numbersToProcess.ToArray();
    var results = new Dictionary<int, bool>(numbers.Count());
    foreach (var number in numbers)
    {
        if (cancellationToken.IsCancellationRequested)
        {
            Debug.WriteLine("returning before processing {0} on cancel", number);
            return results;
        }
        results.Add(number, number.IsAHappyNumber());
    }
    return results;
} 
{% endhighlight %}

This method takes a range of numbers and a cancellation token. It then loops over the numbers calculating if they are happy and testing for cancellation before each number.

After quite a few false starts and confusions with the TPL I ended up with the following:

{% highlight c# %}
[Test]
public void ParallelRunForFiveSeconds()
{
    var watch = Stopwatch.StartNew();
    var cancellationTokenSource = new CancellationTokenSource();
    var tasks = new List<Task<Dictionary<int, bool>>>();
    var count = 0;

    //without this line the whole thing runs to completion
    cancellationTokenSource.CancelAfter(5000);

    try
    {
        foreach (var index in Enumerable.Range(0, 10))
        {
            var cancellationToken = cancellationTokenSource.Token;
            tasks.Add(Task.Factory.StartNew(
                () => Enumerable.Range(index * 1000000, 1000000)
                                .AreHappyNumbers(cancellationToken)));
        }

        //without timeout the stopwatch measures around 6.5 seconds
       Task.WaitAll(tasks.Cast<Task>().ToArray(), timeout: TimeSpan.FromSeconds(5));
       count = tasks.Select(t => t.Result).Sum(result => result.Count);
    }
    catch (TaskCanceledException)
    {
        Debug.WriteLine("task was cancelled and that's ok");
    }

    Debug.WriteLine("watch has been running for {0} seconds", watch.Elapsed.TotalSeconds);

    Debug.WriteLine("In five seconds the number of numbers was {0}", count);
}
{% endhighlight %}

So, yes that's not a test and it is probably awful TPL code but I'm pretty damn sure it doesn't run for more than 5 seconds and it calculates...

`<drumroll/>`

around *SEVEN AND A HALF MILLION NUMBERS* in those five seconds. Yes, they're not consecutive - but that's a pretty good improvement from two million. Such a good improvement that I'm doubting myself (although I can't see the error if there was one!)

# So...

I thought the Happy Numbers kata would be a little diversion for an evening but the addition of a five second limit suggested [in Kevin Rutherford's post](http://silkandspinach.net/2014/11/08/the-happy-numbers-kata/) made for a really interesting challenge.

I don't tend to work on problems that lead me to need to optimise as heavily as I have done here. That meant I had to think very differently about what I was doing and that's always a good thing (I think). Although it has lead to some pretty ugly code. Maybe after a little rest I'll see if I can keep the performance and make it smell less - it's definitely ended up as a ball of mud!

If anyone does grok the TPL and can point out what I've done badly or could be improved [the code is on GitHub](https://github.com/pauldambra/HappyNumbersKata) and I'd appreciate any pointers.

