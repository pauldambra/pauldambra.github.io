--- 
title: "Transforming web.config values with Rake" 
layout: "post" 
permalink: "/rake-transforms.html" 
date: "2014-11-06 23:00:00"
description: transforming web.config with rake
keywords: rake web.config transforming
---

I've really been enjoying using Albacore Rake instead of MSBuild at work. It's enabled us to get everyone involved (because ugh, msbuild xml) and to improve our CI/CD pipeline.

Today we were talking about reducing the number of build configurations we have... which we only have in order to support config transforms.

<!--more-->

NB: this is all with Albacore Rake version one.

Here's a simple rakefile that will clean and build a .Net solution

{% highlight ruby %}
require 'albacore'

SOLUTION_FILE = "../SolutionName.sln"
BUILD_CONFIG = ENV['Configuration'] || "Release"

MSBUILD_PROPERTIES = {
  :configuration => BUILD_CONFIG,
  :VisualStudioVersion => 12.0 # or you have to edit csproj for this to work
}

task :default => [:build]

msbuild :clean do |msb|
    msb.properties = MSBUILD_PROPERTIES
    msb.targets :Clean
    msb.solution = SOLUTION_FILE
    msb.verbosity = :normal
end

msbuild :build=>[:clean] do |msb|
    msb.properties = MSBUILD_PROPERTIES
    msb.targets :Build
    msb.solution = SOLUTION_FILE
    msb.verbosity = :normal
end
{% endhighlight %}

In this scenario I want to replace the value of an app setting key. The section in the web.config in question:

{% highlight xml %}
  <appSettings>
    <add key="TheSetting" value="value that needs to change"/>
  </appSettings>
{% endhighlight %}

###aside: don't always do this!
The web.config transform to replace one or two values is pretty straightforward so if you don't have many different configurations or many things to change then you can probably stick with that. 

But if you want to be able to apply the transform outside of packaging/deploying or if things are getting gnarly then I definitely recommend exploring [albacore](https://github.com/Albacore/albacore)

# A template web.config
I keep rake files in a folder at the root of the solution named Build (but they don't have to be there). And so I added a folder named templates to that. Then added a copy of the web.config to that folder.

This annoys and worries me as it will need to be kept in sync as the web.config changes (say someone adds a Nuget package to the project that alters the web.config). And so this feels like a potential source of error. But...

In this file any value that needs changing can be replaced with a [ruby string interpolation format placeholder thingy](http://blog.revathskumar.com/2013/01/ruby-multiple-string-substitution-in-string-template.html) (hmmm, did I give away that I don't ruby programming language much?)

So...

{% highlight xml %}
  <appSettings>
    <add key="TheSetting" value="%{the_setting}"/>
  </appSettings>
{% endhighlight %}

# YAML
YAML or YAML Ain't Markup Language is a ["human friendly data serialization
  standard for all programming languages."](http://www.yaml.org/). There's more to learn about [yaml in ruby here](http://yaml4r.sourceforge.net/doc/)

For each build config add a yaml file. In this example case I added a release.yaml file to the Build/templates folder:

{% highlight yaml %}
:the_setting: altered-value
{% endhighlight %}

Complex, right? Wrong! If anything there's too little text in here for my tastes (although I'm unfamiliar with yaml so it may just be the effort I have to expend to parse it)

The important thing here is that the yaml key begins with a colon to support the string replacement method used below.

# The rake task
The rakefile should look like this:
{% highlight ruby %}
require 'albacore'
require 'yaml'

SOLUTION_FILE = "../SolutionName.sln"
BUILD_CONFIG = ENV['Configuration'] || "Release"
WEBCONFIG_PATH = "../ProjectName/Web.config"

MSBUILD_PROPERTIES = {
  :configuration => BUILD_CONFIG,
  :VisualStudioVersion => 12.0
}

task :default => [:build]

msbuild :clean do |msb|
    msb.properties = MSBUILD_PROPERTIES
    msb.targets :Clean
    msb.solution = SOLUTION_FILE
    msb.verbosity = :normal
end

msbuild :build=>[:clean] do |msb|
    msb.properties = MSBUILD_PROPERTIES
    msb.targets :Build
    msb.solution = SOLUTION_FILE
    msb.verbosity = :normal
end

task :transform_config do 
  configHash = YAML.load_file("templates/#{BUILD_CONFIG}.yaml")
  templateConfig = File.read("templates/web.config") 
  newConfig = templateConfig % configHash
  File.write(WEBCONFIG_PATH, newConfig)
end
{% endhighlight %}

This file has a new task which loads the settings from the yaml file into a hash. And then loads the contents of the web.config template as a string.

It then uses the `string % hash` method of string interpolation that has been available since Ruby 1.9.2

This mechanism requires that the hash keys are symbols and not strings which is why the keys in the yaml file have to begin with a colon.

# Does this solve my problems?
More config yaml files can be added. Whole sections can be excluded from configs by being replaced with empty strings. And more importantly the project and solution files don't need to know about these configurations just to support different values in different deployments.

There might be pain points here I haven't discovered in this (admittedly super simple) example but I like what I see so far!
 