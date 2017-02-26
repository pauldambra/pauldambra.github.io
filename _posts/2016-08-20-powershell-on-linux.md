---
title: "Powershell on Linux"
layout: "post"
permalink: "/powershell-on-linux.html"
date: "2016-08-28 09:55:00"
description: "initial investigation of powershell on linux"
keywords: powershell bash linux
comments: true
category: software-engineering
tags: [learning, powershell, bash, linux, python]
---

MS have open-sourced [powershell](https://github.com/PowerShell/PowerShell) and made it work on many platforms. Kudos to them - I'm loving the "new MS".

I've never really _got_ powershell. Although it's definitely an improvement on vbscript so I have used it when I've needed to automate windows. 

But as a task approaches some ill-defined level of complexity I switch to C#, Ruby, or Node rather than writing a script. Not that those are the only options just I don't know Perl, or Python, or $yourFavouriteTool.

As a result I have barely written any Powershell on Windows and, as I've done more work on Linux over the last few years, I've also barely written any bash.

So, while I think it's a good thing that MS are opening up and releasing cross platform tools I was underwhelmed. But...

<!--more-->

...some colleagues were excited and people I think of as being *nix people too

<div class="tweet-wrapper" data-width="292" data-height="350">
  <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/dhobsd">@dhobsd</a> It&#39;s hard to fit in 140 chars, but powershell is an incredible improvement over unix shells and is generally amazingsauce.</p>&mdash; @jordansissel (@jordansissel) <a href="https://twitter.com/jordansissel/status/766879364289957892">August 20, 2016</a></blockquote>
<script async defer src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>

I thought I'd spend some time to compare the two.

# The Simple Test

I've been watching [Gary Bernhardt's Destroy All Software screencasts](https://www.destroyallsoftware.com/screencasts) (which I heartily recommend). I enjoyed his use of looping over git revisions to carry out tasks to show either some git tool or bash itself.

I came up with a fake scenario of having a Big-Data problem. The amount of data was suddenly, and unexpectedly increased as a result of human error. And that’s caused all our systems to explode (something I’ve seen happen too so not that fake). My task was to investigate and find out when the error occurred.

<p><img src="/images/initial-commit-log.png" alt="the initial commit log" class="img-responsive img-thumbnail"/></p>

If you read that commit log you might be able to guess where the error occurred. Let’s pretend that the log is more complex and not so useful.

#### Aside

If you like that Git log output run:

```
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

_NB scroll to the right to copy that text it's really long._

And then use `git lg` to run it

#### Carrying on

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

There were a couple of differences because PowerShell insisted on evaluating the command strings. And it turns out ‘&’ and ‘<’ are "reserved for future use".

Both were relatively easy to write, relatively easy to read, run correctly, and give the correct output.

# More Complex Example

I downloaded [the stack overflow vote archive](https://archive.org/download/stackexchange/stackoverflow.com-Votes.7z). At time of writing this is a 10 Gigabyte xml file. I want to know how many of the votes are from 2010 and a breakdown of the types of votes in that year.

<p><img src="/images/votes.png" alt="the stackoverflow votes file" class="img-responsive img-thumbnail"/></p>

## Bash

```bash
#! /bin/bash

set -e

non_data_lines_count=3
lines=$(( $(wc -l < $1) - $non_data_lines_count ))

twenty_ten_regex="CreationDate=\"2010"
vote_type_regex="VoteTypeId=\"([0-9]+)\""

declare -a vote_types

while read line ; do
    if [[ $line =~ $vote_type_regex ]]; then 
        vote_type_id="${BASH_REMATCH[1]}"
        ((vote_types[vote_type_id]++))
    fi
done < <(grep $twenty_ten_regex $1)

twenty_ten_count=0
for k in "${!vote_types[@]}"
do
  twenty_ten_count=$(($twenty_ten_count + vote_types[$k]))
  echo "VoteTypeId: $k had ${vote_types[$k]} votes"
done

echo "there were $lines total votes in the file"
echo "there were $twenty_ten_count total votes in 2010"
```

This script:

 * counts the lines in the file 
   * subtracting three because there are three lines that aren't vote data in the file
 * it also reads the lines in the file from 2010 one by one
 * then increments a count in an associative array if it can capture a VoteTypeId from the line
 * when finished it sums those VoteTypeIds to count the 2010 v0tes
 * finally it prints out some output

running `time ./process-votes.sh ~/Downloads/Votes.xml` gives the following:

```
 VoteTypeId: 1 had 467439 votes
 VoteTypeId: 2 had 4198861 votes
 VoteTypeId: 3 had 256759 votes
 VoteTypeId: 4 had 200 votes
 VoteTypeId: 5 had 380887 votes
 VoteTypeId: 8 had 8632 votes
 VoteTypeId: 9 had 8578 votes
 VoteTypeId: 10 had 199344 votes
 VoteTypeId: 11 had 13231 votes
 VoteTypeId: 12 had 535 votes
 VoteTypeId: 15 had 965 votes
 there were 105301744 total votes in the file
 there were 5535431 total votes in 2010
 ./process-votes.sh ~/Downloads/Votes.xml  581.57s user 408.41s system 105% cpu 15:36.35 total
```

## PowerShell

```powershell
Param ([string] $filePath = $null)

$reader = [System.IO.File]::OpenText($filePath)

$voteTypes = @{}
$lines=-3
$twentyTenLines=0

while($null -ne ($line = $reader.ReadLine())) 
{
    $lines++
    if ($line -match "CreationDate=""2010")
    {
        $xml = [xml]"$line"
        $twentyTenLines++
        $voteTypes[$xml.row.VoteTypeId]++
    }
}

foreach ($voteTypeCount in $voteTypes.GetEnumerator()) {
    Write-Host "VoteTypeId: $($voteTypeCount.Name) had $($voteTypeCount.Value) votes"
}

write-host "there were $($lines) total votes in the file"
write-host "there were $($twentyTenLines) total votes in 2010"
```

The process followed here is almost the same. The script:

 * reads each line of the file one at a time
   * as it does so it counts them
   * starting from minus three because there are three lines that aren't vote data in the file 
 * it checks each line to see if it is from 2010
   * if it is it parses that line as XML
   * increments a count of lines in 2010
   * and increments a count of the VoteTypeId
 * finally it prints out some output

running `time powershell ./process-votes.ps1 ~/Downloads/Votes.xml` gives the output: 

```
VoteTypeId: 8 had 8632 votes
VoteTypeId: 4 had 200 votes
VoteTypeId: 12 had 535 votes
VoteTypeId: 1 had 467439 votes
VoteTypeId: 10 had 199344 votes
VoteTypeId: 3 had 256759 votes
VoteTypeId: 9 had 8578 votes
VoteTypeId: 11 had 13231 votes
VoteTypeId: 2 had 4198861 votes
VoteTypeId: 5 had 380887 votes
VoteTypeId: 15 had 965 votes
there were 105301745 total votes in the file
there were 5535431 total votes in 2010
powershell ./process-votes.ps1 ~/Downloads/Votes.xml  279.78s user 7.00s system 99% cpu 4:49.45 total
```

At first I parsed every line as xml so I could access the CreationDate but that took nearly ten times as long.

I also tried out the same approach of reading and counting every line instead of grepping just 2010 lines in bash. That slowed the bash implementation down even further.

## Confirmation Bias!

Is my tendency to move away from scripts justified by these results? I know little Python so it seemed a fair comparison to try a Python version.

```python
import sys
import re

class Counter(dict):
    def __missing__(self, key):
        return 0

line_counter = 0
vote_types = Counter()

creation_date_regex = re.compile('CreationDate="2010')
vote_type_regex = re.compile('VoteTypeId=\"(\d+)\"')

with open(sys.argv[1], "r") as file:
    for line in file:
        line_counter += 1
        if creation_date_regex.findall(line):
            vote_type_id = vote_type_regex.findall(line)[0]
            vote_types[vote_type_id] += 1

for key, value in vote_types.iteritems():
    print "VoteTypeId: %s had %s votes" % (key, value)

print "there were %s total votes in the file" % line_counter
print "there were %s total votes in 2010" % sum(vote_types.values())
```

Running this was *much* faster

```
VoteTypeId: 11 had 13231 votes
VoteTypeId: 10 had 199344 votes
VoteTypeId: 12 had 535 votes
VoteTypeId: 15 had 965 votes
VoteTypeId: 1 had 467439 votes
VoteTypeId: 3 had 256759 votes
VoteTypeId: 2 had 4198861 votes
VoteTypeId: 5 had 380887 votes
VoteTypeId: 4 had 200 votes
VoteTypeId: 9 had 8578 votes
VoteTypeId: 8 had 8632 votes
there were 105301745 total votes in the file
there were 5535431 total votes in 2010
python ./stack/process-votes.py ~/Downloads/Votes.xml  59.06s user 4.65s system 98% cpu 1:04.41 total

```

This supports switching away from scripting languages for complex tasks.

## Aside

If you're observant you'll have noticed that the bash implementation reports one fewer line than the others. It turns out this is because the Votes.xml file doesn't have a newline character at the end.

<p><img src="/images/nonewline.png" alt="tailing the votes file" class="img-responsive img-thumbnail"/></p>

The percent symbol at the end of this output demonstrates that. 

The POSIX definition states that a file ends with an empty line (see [this awesome StackOverflow answer](http://stackoverflow.com/a/25322168/222163) for a breakdown) and since the Votes.xml file is non-compliant `wc` counts it incorrectly.

## So What?

You can see the code I ran [on github](https://github.com/pauldambra/bash_vs_powershell). Both powershell and bash are pretty new for me (for anything beyond trivial tasks). Also, I can count on the fingers of one hand the number of times I've had to directly process a large file like this so I might be doing something naive. As a result I'd really welcome feedback! 

<table class="table">
  <thead>
    <tr>
      <th>Language</th>
      <th>Run Time (s)</th>
      <th>Lines per Second</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>bash</td>
      <td>581.57</td>
      <td>181</td>
    </tr>
    <tr>
      <td>PowerShell</td>
      <td>279.78</td>
      <td>376,373</td>
    </tr>
    <tr>
      <td>Python</td>
      <td>59.06</td>
      <td>1,784,775</td>
    </tr>
  </tbody>
</table>

PowerShell runs stably on Mac OS. And while it is slower than Python (for the given task) it runs significantly faster than bash.

This was actually pretty good fun. Both bash and powershell are more complex than I imagined but not as hard to write as I thought. That said I _really_ missed being able to write tests - especially when the runs to prove the scripts against the full dataset took tens of minutes.

If you're at a windows shop and already have PowerShell chops this could be a useful way to begin to introduce linux into the environment without having to learn a whole new toolchain all at once.

And being able to dip into the .Net framework from PowerShell and pipe structured data between commands is an intriguing opportunity. I still <3 the new Microsoft.

That said... looking at the Python result and being mindful that Python has run on Windows and *nix for years maybe we should all learn Python instead of Bash or PowerShell