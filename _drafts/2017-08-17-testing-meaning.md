--- 
title: "Testing Meaning in HTML!" 
layout: "post" 
permalink: "/2017/testing-meaning.html" 
date: "2017-08-17 22:40:00"
description: "Testing the meaning of what you generate"
keywords: jekyll static html testing
category: "continuous delivery"
tags: [series, blog, recursion, testing, jekyll, travisci]
---

<aside class="series">
  <h1>
    This post is part of a series on improving this blog #recursion
  </h1>
  <div class="links">
    <div class="previous">
      <a href="/2017/generating-static-amp.html">Previous Post</a>
    </div>
  </div>
</aside>

One of the benefits of generating a site as a static artefact (here using [Jekyll](https://jekyllrb.com/) but there are a gazillion tools) is that the finished product is a known quantity. Anything that's a known quantity can be tested!

A previous post in this series looked at testing the generated HTML for technical correctness... Things like if the HTML is well-formed or that links go to real destinations.

This post describes testing the _meaning_ of the text in the generated HTML

<!--more-->

# Test the markdown itself

This first is straight-forward. Since the html is generated from markdown is that markdown valid. 

```
node_modules/.bin/remark . --use lint --frail
```

[Remark](https://github.com/wooorm/remark) is a tool that allows the use of more than one plugin for proccessing markdown.

Here the `--use lint` adds the linting plugin and `--frail` set it to exit with a non-zero code on warnings as well as errors.

In CI this is very much dotting the is and crossing the ts because the markdown has been used to generate HTML. And that HTML has been tested but locally this is really useful. There are still old posts I grabbed from Blogger that are very messy HTML. Periodically I'll switch one to MarkDown and this helps catch errors fast.

# Even better - test the spelling in the markdown

After _yet another_ occassion where I proof-read a post, published it, read it, and immediately saw a spelling mistake I'd missed it was time to automate the solution.

```
  node_modules/.bin/mdspell _posts/**.md \
    --en-gb \
    --ignore-numbers \
    --ignore-acronyms \
    --report
```

[MarkDown spellcheck](https://github.com/lukeapage/node-markdown-spellcheck) is a tool for doing just that.

Here it 

 * grabs all the `.md` files
 * sets the dictionary to `--en-gb`
 * ignores numbers and acronyms
 * and is set to run in `report` mode

The tool has a `report` mode which just outputs spelling errors and then exits with a non-zero code. And an `interactive` mode which pauses on each potential mistake allowing you to choose to ignore, add to dictionary, or correct.

![example interactive spelling output](/interactive-spelling.png)

The interactive spelling mode can be pretty slow at checking the dictionary. There is [an open issue about this](https://github.com/lukeapage/node-markdown-spellcheck/issues/33).

As you train this tool it populates a `.spelling` file so that you don't have to keep teaching it the domain-specific language you use. [Mines already hundreds of lines long](https://github.com/pauldambra/blog_source/blob/c71413210bde13f195e4b4adac28caa74f35761a/.spelling).

# Testing the meaning...

This is, as you might expect, less clear-cut. And... it isn't really meaning - that's just the clickbait title to draw you in.

[Alex](http://alexjs.com/) is a tool for catching inconsiderate or insensitive language.

Their is very little cost to modifying your language (replacing "guys" with "everyone" or "his" with "their") and compared to the cost of excluding even one person I consider it a worthwhile thing to try to improve.

Alex has a very simple call: `node_modules/.bin/alex _posts --diff --why`

Here the `--diff` checks if it is running on Travis and then only checks lines that have changed so you can ignore a warning once and not worry about it next time.

And `--why` tries to output a source for the warning

## he-she rule

```
_posts/2014-06-01-promises-part-2.md
  197:160-197:162  warning  `he` may be insensitive, use `they`, `it` instead            he-she          retext-equality
```

Here I am referring to a man so I could just ignore this warning. Or spend the (literal) second to convert that reference to `they` and the sentence is still grammatically correct.

Context is k̶i̶n̶g̶ key so just because Alex warns that a use of gender pronoun might be insensitive you needn't change it. But it's good to consider it!

## A file with more errors

```
_posts/2010-05-08-theres-more-in-them-that-hills.md
    17:123-17:130  warning  Don’t use “bitchin”, it’s profane                           bitchin         retext-profanities
    17:153-17:160  warning  Don’t use “bitchin”, it’s profane                           bitchin         retext-profanities
    19:229-19:235  warning  Be careful with “failed”, it’s profane in some cases        failed          retext-profanities
    25:4-25:7  warning  Reconsider using “God”, it may be profane                           god             retext-profanities
    31:360-31:365  warning  `idiot` may be insensitive, use `foolish`, `ludicrous`, `silly` instead
Source: http://www.autistichoya.com/p/ableist-words-and-terms-to-avoid.html
```

Here's another example of the importance of context but also the unthinking use of language.

I wrote that post seven years ago... I don't think I'd use that voice any more but I'm ok with `bitchin'` in the context it was in.

Next `failed is profane in some cases`... in this post it's talking about software failing to send emails. Someone is welcome to enlighten me but I'm good with that too.

Then a warning about "Oh God it's awful" - and there I'm talking about software I wrote :/

I feel relatively strongly that blasphemy isn't a thing to worry about. I'm not going to go out of my way to blaspheme (although I don't normally capitalise God) but I think the idiom in English of saying "oh god it's awful" is common enough.

And in fact I don't want Alex to warn me about the word 'god'

I should be able to set my `.alexrc` file to contain

```
{
  "allow": [
    "god"
  ]
}
```

but that doesn't seem to work. I'll try to make time to see if it's me or I can raise a PR to fix it. The `verify.sh` script has the `--diff` flag so I'll only see the warning locally anyway and it won't clutter CI output.

`Idiot` is a word I use less and less since it's so easy to replace. And on reading the paragraph it was in seven-years-later me thinks it doesn't add anything to the post at all... so I remove it entirely. Whether or not `idiot` is OK to use the prompt allows me to reconsider a superflous paragraph.

