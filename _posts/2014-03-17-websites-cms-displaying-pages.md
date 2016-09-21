---
title: "Websites != CMS Platform - Displaying pages"
layout: "post"
permalink: "/2014/03/websites-cms-displaying-pages.html"
date: "2014-03-17 11:08:00"
updated: "2014-04-11 18:24:10"
category: cms
tags: [learning, cms, design, web, series]
---

This post is part of a series where I'm hoping to prove to myself that building a dynamic website without a CMS is comparable to building one with a known CMS. [See the first post for an explanation of why](/2014/02/websites-cms.html)

[Previous Post](/2014/02/websites-cms.html)
[Next Post](/2014/03/website-cms-display-pages-part-2.html)

# Setup

So, it's relatively easy to get an Hello World page displaying... 

<!--more-->

The steps I take when I'm setting up a new project look like:

![](http://1.bp.blogspot.com/-bOVBV3wcEbE/Uya7PQnFeMI/AAAAAAAANOA/Hz_2p5XZpOY/s1600/Screenshot+2014-03-17+09.05.33.png)

I should probably start using [Yeoman](http://yeoman.io/" target="_blank) but I don't start enough projects to feel the need to automate this step of the setup.

I already know I want to use express for the server, that I want to test express using mocha, &nbsp;and to use the awesome [supertest](https://github.com/visionmedia/supertest" target="_blank) module, so I can run:&nbsp;

```bash
npm install --save express

npm install --save-dev supertest

npm install --save-dev mocha
```

Before I carry on I grab the Node .gitignore file

```bash
wget https://raw.github.com/github/gitignore/master/Node.gitignore

mv Node.gitignore .gitignore
```

and can make an empty but initialised commit

# The First Test

```js
var request = require('supertest');

var server = require('../server').app;

describe('GET /', function(){

 it('respond with html', function(done){

   request(server)

      .get('/')

      .set('Accept', 'text/html')

      .expect('Content-Type', /html/)

      .expect(200, done);

   });

   });
```

There's quite a lot going on there if you haven't used Mocha or Supertest then head off and read about them. How they work is out of the scope of this post. But what we're asserting here is that if you ask our server application for the root route then you get some HTML and HTTP status 200.

The simplest express server that makes this test pass is:

```js
var app = require('express')();

app.get('/', function(req, res){

  res.send('Hello World');

  });

  app.listen(1337);

  exports.app = app;
```

Running `node server` at the terminal I can point my browser at it:

![](http://2.bp.blogspot.com/-8RKwf5NLHDc/UybPd8r9L0I/AAAAAAAANQA/rb_3_4W-22c/s1600/Screenshot+2014-03-17+10.32.47.png)

All of which has us set up to test our server and ready to display something meaningful with very little work at all.

In [the next part of the series](/2014/03/website-cms-display-pages-part-2.html) we'll look at adding a simple template and making this look a little more like a real website
