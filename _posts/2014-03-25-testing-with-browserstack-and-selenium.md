---
title: "Testing With Browserstack and Selenium"
layout: "post"
permalink: "/2014/03/testing-with-browserstack-and-selenium.html"
date: "2014-03-25 22:57:00"
updated: "2014-03-29 19:06:48"
category: testing
tags: [browserstack, selenium, testing, js]
---

This post is part of a series where I'm hoping to prove to myself that building a dynamic website with NodeJS is much more fun than using a CMS platform. [See the first post for an explanation of why](/2014/02/websites-cms.html)

[Previous Post]({/2014/03/website-cms-display-pages-part-2.html)

# Browserstack

I love [Browserstack's awesome service](http://www.browserstack.com/). It allows you to test your websites on different browsers and operating systems. Helping reduce the need to have access to physical devices for testing and reproducing bugs.

# Selenium WebDriver

BrowserStack allow automation using a Selenium web driver. You can access this with Python, Ruby, Java, C#, Perl, PHP, or Node.js. It is also possible to test publicly or locally available sites using BrowserStack.

<!--more-->

However, after a couple of hours trying to write tests following [the documentation](http://www.browserstack.com/automate/node" target="_blank) and attacking Google I wasn't getting very far. I was able to run tests on Browserstack and take screenshots to prove the page was loaded but I couldn't assert against the page. Frustration had begun to build!

I haven't used Selenium before and I just didn't grok how to assert against the page. I'm sure it was how I was reading the documentation but I wasn't moving forward. And then I discovered [nightwatch](http://nightwatchjs.org/" target="_blank) (by reading to the end of the documentation but still...)

# Nightwatch

Nightwatch is awesome! It only took a few minutes to get to the point where it was possible to run tests using it. The API is terse and expressive and it will output jUnit results so can be plugged into a CI pipeline.

A nightwatch test for the front page looks like:

```js
module.exports = {
  "Test the home page" : function (browser) {
    browser
      .url("http://omniclopse-v0-1.herokuapp.com/")
      .waitForElementVisible('body', 1000)
      .assert.elementPresent('#homeCarousel')
      //must have at least one image
      .assert.elementPresent('#homeCarousel .item img')
      .end();
  }
};
```

This demonstrates a very clear API. Load the page, wait till the body is visible, then assert that the carousel is present. 

## How to run the tests

Running this at the terminal using:
`nightwatch -t end-to-end-tests/* -c end-to-end-tests/settings.json`

```json 
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
```

Here the settings file sets the location of the tests folder(s), how and where to start Selenium and the capabilities of the browser to use for tests. Also my, fiendishly obduscated, browserstack credentials

Passing in a settings file like this means that different browser settings can be setup and run separately. For example:

```bash 
nightwatch -t end-to-end-tests/* -c end-to-end-tests/settingsWindowsFirefox.json
nightwatch -t end-to-end-tests/* -c end-to-end-tests/settingsOSXFirefox.json
nightwatch -t end-to-end-tests/* -c end-to-end-tests/settingsIPhone.json
nightwatch -t end-to-end-tests/* -c end-to-end-tests/settingsAndroid.json
```

Which would allow running all of the nightwatch tests against different operating systems and browsers on BrowserStack.

## Viewing results

![Results from the tests are displayed in the console](/images/run-nightwatch.png)

## Some more realistic tests for the home page

Switching out the test for carousel by id and instead testing by class (as this is less likely to change) and adding in some other tests for the page contents gives:

```js
module.exports = {
  "Test the home page" : function (browser) {
    browser
      .url("http://omniclopse-v0-1.herokuapp.com/")
      .waitForElementVisible('body', 1000)
      .assert.elementPresent('header img#brand')
      .assert.elementPresent('header .navbar')
      .assert.elementPresent('header .navbar li a')
      .assert.elementPresent('.carousel')
      .assert.elementPresent('.carousel .item img')
      .assert.elementPresent('.row.info')
      .assert.elementPresent('.row.info .panel')
      .end();
  }
};
```

## TL;DR

The combination of BrowserStack and Nightwatch made for a fantastic experience. This is definitely going to be something I wrap into my day-to-day work.
