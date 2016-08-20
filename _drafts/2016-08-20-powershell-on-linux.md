---
title: "Powershell on Linux"
layout: "post"
permalink: "/powershell-on-linux.html"
date: "2016-08-20 11:55:00"
description: "initial investigation of powershell on linux"
keywords: powershell bash linux
---

MS have open-sourced [powershell](https://github.com/PowerShell/PowerShell) and made it work on many platforms. Kudos to them - I'm loving the "new MS".

I've never really _got_ powershell. It's definitely an improvement on vbscript but as a task approaches some ill-defined level of complexity I'll just switch to C#, Ruby, or Node (depending on my mood and the platform) rather than writing a script. Not that those are the only options just I don't know Perl, or Python, or $yourFavouriteTool.

As a result I have barely written any Powershell on Windows and, as I've done more work on Linux over the last few years, I've also barely written any bash.

So, while I think it's a good thing that MS are opening up and releasing cross platform tools I was underwhelemed. But some colleagues were excited and people I think of as being *nix people too

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/dhobsd">@dhobsd</a> It&#39;s hard to fit in 140 chars, but powershell is an incredible improvement over unix shells and is generally amazingsauce.</p>&mdash; @jordansissel (@jordansissel) <a href="https://twitter.com/jordansissel/status/766879364289957892">August 20, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I thought I'd spend some time to compare the two.

<!--more-->

# The Simple Test

I've been watching [Gary Bernhardt's Destroy All Software screencasts](https://www.destroyallsoftware.com/screencasts) (which I heartily recommend) and enjoyed the examples he's used of looping over git revisions to carry out tasks in order to demonstrate either some git tool or bash itself.

The fake scenario I came up with was that there is a Big-Data problem where the amount of data was suddenly, and unexpectedly increased as a result of human error and that's caused all our systems to explode (something I've seen happen too so not _that_ fake). My task was to investigate and find out when the error occurred

<p><img src="/images/initial-commit-log.png" alt="the initial commit log" class="img-responsive img-thumbnail"/></p>

If you read that commit log you might be able to guess where the error occurred but let's pretend that the log is more complex and not so useful.

This particular big data company use a venerable, and well-trusted database technology - a file. I decided on a pretty simple approach

* get a list of commits
* loop over them checking each one out
* while checkout out count the lines in each file
* compare each linecount to the last
* break when the change in linecount breaches some arbitrary threshold
* clean up

This turns out to be pretty trivial in both bash:

```bash
#! /bin/bash

set -e

LASTCOMMIT=0

for commit in `git rev-list master --reverse`
do
	`git checkout $commit &> /dev/null`
    lines=$(wc -l < big-data.txt)
    linediff=`expr $lines - $LASTCOMMIT`
    if [[ $linediff -gt 10 ]]; then
    	echo "this is the bad commit $commit"
    	break
    fi

    LASTCOMMIT=$lines
done

`git checkout master &> /dev/null`
```

and PowerShell:

```PowerShell
$lastcommit = 0

foreach ($commit in iex "git rev-list master --reverse")
{ 
    iex "git checkout $commit" *> $null

    $lines=(iex "wc -l big-data.txt").Split(" ", [System.StringSplitOptions]::RemoveEmptyEntries)
    $linediff = $lines[0] - $lastcommit
    
    if ($linediff -gt 10) 
    {
        write-host "this is the bad commit $($commit)"
        break
    }

    $lastcommit = $lines[0]
}

iex "git checkout master" *> $null
```

There were a couple of differences because PowerShell insisted on evaluating the command strings and it turns '&' and '<' are reserved for future use. But I call a draw at this stage.

# More Complex Example

I downloaded [the stack overflow vote archive](https://archive.org/download/stackexchange/stackoverflow.com-Votes.7z)

   Especially considering this is an alpha release the install process was smooth (although I'd rather have been able to `brew install` on a Mac) and powershell ran without problems in oh-my-zsh