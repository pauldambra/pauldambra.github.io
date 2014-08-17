--- 
title: "Albacore Rake" 
layout: "post" 
permalink: "/albacore-rake.html" 
date: "2014-08-11 08:11:00"
description: albacore rake is a fantastic replacement for msbuild
keywords: albacore rake msbuild build make
---

Replacing MSBuild with Albacore Rake
==========

#### Kill MSBuild with fire

Every time I have to deal with MSBuild I wake up far from home, covered in mud, and sobbing that there must be a better way. This weekend I've had vicious animal flu (my wife insists it was just a cold) so since I was sat about doing nothing I decided to investigate using [albacore rake](https://github.com/Albacore/albacore).

> Albacore is a professional quality suite of Rake tasks for building .NET or Mono based systems. It's like MSBuild or NAnt without all the stabby-bracket XML hell! [source](https://github.com/Albacore/albacore/tree/releases/v1.x#albacore)

That had me sold!

> If you're used to tinkering with CC.NET, NAnt, or MSBuild "scripts", you probably know to put aside several hours -- if not a day -- to work on your build tasks. The good news is that, with Albacore, you can have a working build in a few minutes. And, it will be maintainable and readable! [source](https://github.com/Albacore/albacore/wiki#albacore-quick-start)

even more so!

The thing that really sells it for me, though, is that it's code! Not xml, not json, code. So that means if I want to acheive some action, so long as I can write code to do it, then I can acheive that action. This is the same thing that makes Gulp stand out over Grunt for me.

The average build script
=====

#### read as - the build script tasks I need

* Clean
* Version
* Build
* Generate nuspec
* generate nupkg
* publish nupkg
* package for deploy
* web deploy

Clean 
=====

{% highlight ruby %}
msbuild :clean do |msb|
    msb.properties = {
        :configuration => BUILD_CONFIG,
        :VisualStudioVersion => 12.0
    }
    msb.targets :Clean
    msb.solution = "../FootClicks.Positioning.sln"
    msb.verbosity = :normal
end
{% endhighlight %}

{% highlight ruby %}
task :cleanNugetDirectory do
  FileUtils.rm_rf(Dir.glob('nuget/*'))
end
{% endhighlight %}

Version
=======

{% highlight ruby %}
task :version do 
  FileList["../**/Properties/AssemblyInfo.cs"].each { |assemblyfile|   
    cmd = AssemblyInfo.new()
    cmd.use(assemblyfile)
    cmd.version = cmd.file_version = BUILD_NUMBER
    cmd.company_name = "ROI inc."
    cmd.execute
  }
end
{% endhighlight %}
