---
title: "Testing With Browserstack and Selenium"
layout: "post"
permalink: "/2014/03/testing-with-browserstack-and-selenium.html"
uuid: "4673132191976833110"
guid: "tag:blogger.com,1999:blog-6728560442491983758.post-4673132191976833110"
date: "2014-03-25 22:57:00"
updated: "2014-03-29 19:06:48"
description: 
blogger:
    siteid: "6728560442491983758"
    postid: "4673132191976833110"
    comments: "0"
categories: 
author: 
    name: "Paul D'Ambra"
    url: "https://plus.google.com/114260096260757534167?rel=author"
    image: "//lh5.googleusercontent.com/-nN3yNuaSWDs/AAAAAAAAAAI/AAAAAAAABQU/ESeyTW5Duf0/s512-c/photo.jpg"
---

This post is part of a series where I'm hoping to prove to myself that building a dynamic website with NodeJS is much more fun than using a CMS platform. [See the first post for an explanation of why]({% post_url 2014-02-22-websites-cms %})

[Previous Post]({% post_url 2014-03-23-website-cms-display-pages-part-2 %})

# Browserstack

I love [Browserstack's awesome service](http://www.browserstack.com/). It allows you to test your websites on different browsers and operating systems. Helping reduce the need to have access to physical devices for testing and reproducing bugs.

# Selenium WebDriver

BrowserStack allow automation using a Selenium web driver. You can access this with Python, Ruby, Java, C#, Perl, PHP, or Node.js. It is also possible to test publicly or locally available sites using BrowserStack.

<!--more-->

However, after a couple of hours trying to write tests following <a href="http://www.browserstack.com/automate/node" target="_blank">the documentation</a> and attacking Google I wasn't getting very far. I was able to run tests on Browserstack and take screenshots to prove the page was loaded but I couldn't assert against the page. Frustration had begun to build!

I haven't used Selenium before and I just didn't grok how to assert against the page. I'm sure it was how I was reading the documentation but I wasn't moving forward. And then I discovered <a href="http://nightwatchjs.org/" target="_blank">nightwatch</a> (by reading to the end of the documentation but still...)

# Nightwatch

Nightwatch is awesome! It only took a few minutes to get to the point where it was possible to run tests using it. The API is terse and expressive and it will output jUnit results so can be plugged into a CI pipeline.

A nightwatch test for the front page looks like:
<script src="http://gist-it.appspot.com/github/pauldambra/omniclopse/blob/ba6e169be1043f88ce5482eddd55a065648e9ba2/end-to-end-tests/homepageSpec.js"></script> This demonstrates a very clear API. Load the page, wait till the body is visible, then assert that the carousel is present. 

## How to run the tests

Running this at the terminal using:
`nightwatch -t end-to-end-tests/* -c end-to-end-tests/settings.json`

{% highlight json %}
{
  "src_folders" : ["./"],

  "selenium" : {
    "start_process" : false,
    "host" : "hub.browserstack.com",
    "port" : 80
  },

  "test_settings" : {
    "default" : {
      "launch_url" : "http://hub.browserstack.com",
      "selenium_port"  : 80,
      "selenium_host"  : "hub.browserstack.com",
      "silent": true,
      "screenshots" : {
        "enabled" : false,
        "path" : ""
      },
      "desiredCapabilities": {
        "browserName": "firefox",
        "javascriptEnabled": true,
        "acceptSslCerts": true,
        "browserstack.user": "username",
        "browserstack.key": "password"
      }
    }
  }
}
{% endhighlight %}

Here the settings file sets the location of the tests folder(s), how and where to start Selenium and the capabilities of the browser to use for tests. Also my, fiendishly obduscated, browserstack credentials

Passing in a settings file like this means that different browser settings can be setup and run separately. For example:
{% highlight bash %}
nightwatch -t end-to-end-tests/* -c end-to-end-tests/settingsWindowsFirefox.json
nightwatch -t end-to-end-tests/* -c end-to-end-tests/settingsOSXFirefox.json
nightwatch -t end-to-end-tests/* -c end-to-end-tests/settingsIPhone.json
nightwatch -t end-to-end-tests/* -c end-to-end-tests/settingsAndroid.json
{% endhighlight %}

Which would allow running all of the nightwatch tests against different operating systems and browsers on BrowserStack.

## Viewing results

<figure>
    <img src="/images/run-nightwatch.png" alt="Results from the tests are displayed in the console" class="img-responsive img-thumbnail"/>
    <figcaption>Results from the tests are displayed in the console</figcaption>
</figure>

## Some more realistic tests for the home page

Switching out the test for carousel by id and instead testing by class (as this is less likely to change) and adding in some other tests for the page contents gives:
<div><script src="http://gist-it.appspot.com/github/pauldambra/omniclopse/blob/25217572b4b77a9b90d25bba69b37b2cb411b4a6/end-to-end-tests/homepageSpec.js"></script> </div>

## TL;DR

The combination of BrowserStack and Nightwatch made for a fantastic experience. This is definitely going to be something I wrap into my day-to-day work.
