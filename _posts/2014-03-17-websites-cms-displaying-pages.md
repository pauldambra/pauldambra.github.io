---
title: "Websites != CMS Platform - Displaying pages"
layout: "post"
permalink: "/2014/03/websites-cms-displaying-pages.html"
uuid: "6514583045587463894"
guid: "tag:blogger.com,1999:blog-6728560442491983758.post-6514583045587463894"
date: "2014-03-17 11:08:00"
updated: "2014-04-11 18:24:10"
description: 
blogger:
    siteid: "6728560442491983758"
    postid: "6514583045587463894"
    comments: "0"
categories: 
author: 
    name: "Paul D'Ambra"
    url: "https://plus.google.com/114260096260757534167?rel=author"
    image: "//lh5.googleusercontent.com/-nN3yNuaSWDs/AAAAAAAAAAI/AAAAAAAABQU/ESeyTW5Duf0/s512-c/photo.jpg"
---

This post is part of a series where I'm hoping to prove to myself that building a dynamic website without a CMS is comparable to building one with a known CMS. [See the first post for an explanation of why](http://mindlessramblingnonsense.blogspot.co.uk/2014/02/websites-cms.html)

<div style="text-align: right;"><a href="http://mindlessramblingnonsense.blogspot.co.uk/2014/02/websites-cms.html" style="float: left;">Previous Post</a><a href="http://mindlessramblingnonsense.blogspot.co.uk/2014/03/website-cms-display-pages-part-2.html" style="float: right;">Next Post</a></div><h1 style="clear: both;">Setup</h1>So, it's relatively easy to get an Hello World page displaying... 

<!--more-->

The steps I take when I'm setting up a new project look like:<br /><div class="separator" style="clear: both; text-align: center;"><a href="http://1.bp.blogspot.com/-bOVBV3wcEbE/Uya7PQnFeMI/AAAAAAAANOA/Hz_2p5XZpOY/s1600/Screenshot+2014-03-17+09.05.33.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://1.bp.blogspot.com/-bOVBV3wcEbE/Uya7PQnFeMI/AAAAAAAANOA/Hz_2p5XZpOY/s1600/Screenshot+2014-03-17+09.05.33.png" height="400" width="391" /></a></div><div class="separator" style="clear: both; text-align: left;">I should probably start using <a href="http://yeoman.io/" target="_blank">Yeoman</a> but I don't start enough projects to feel the need to automate this step of the setup.</div><div class="separator" style="clear: both; text-align: left;"><br /></div><div class="separator" style="clear: both; text-align: left;">I already know I want to use express for the server, that I want to test express using mocha, &nbsp;and to use the awesome <a href="https://github.com/visionmedia/supertest" target="_blank">supertest</a> module, so I can run:&nbsp;</div><pre>npm install --save express<br />npm install --save-dev supertest<br />npm install --save-dev mocha<br /></pre><br /><div class="separator" style="clear: both;">Before I carry on I grab the Node .gitignore file</div><div class="separator" style="clear: both;"><br /></div><pre>wget https://raw.github.com/github/gitignore/master/Node.gitignore<br />mv Node.gitignore .gitignore<br /></pre><div class="separator" style="clear: both;"><br /></div><div class="separator" style="clear: both;">and can make an empty but initialised commit</div><h1 style="clear: both;">The First Test</h1><div><pre class="brush: js">var request = require('supertest');<br />var server = require('../server').app;<br /><br />describe('GET /', function(){<br /> it('respond with html', function(done){<br />   request(server)<br />      .get('/')<br />      .set('Accept', 'text/html')<br />      .expect('Content-Type', /html/)<br />      .expect(200, done);<br />   });<br />});<br /></pre><div><br /></div><div>There's quite a lot going on there if you haven't used Mocha or Supertest then head off and read about them. How they work is out of the scope of this post. But what we're asserting here is that if you ask our server application for the root route then you get some HTML and HTTP status 200.</div><div><br /></div><div>The simplest express server that makes this test pass is:</div><pre class="brush: js">var app = require('express')();<br /><br />app.get('/', function(req, res){<br />  res.send('Hello World');<br />});<br /><br />app.listen(1337);<br /><br />exports.app = app;<br /></pre><div>Running 'node server' at the terminal I can point my browser at it:</div><div></div><div class="separator" style="clear: both; text-align: center;"><a href="http://2.bp.blogspot.com/-8RKwf5NLHDc/UybPd8r9L0I/AAAAAAAANQA/rb_3_4W-22c/s1600/Screenshot+2014-03-17+10.32.47.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://2.bp.blogspot.com/-8RKwf5NLHDc/UybPd8r9L0I/AAAAAAAANQA/rb_3_4W-22c/s1600/Screenshot+2014-03-17+10.32.47.png" /></a></div><div>All of which has us set up to test our server and ready to display something meaningful with very little work at all.<br /><br />In <a href="http://mindlessramblingnonsense.blogspot.co.uk/2014/03/website-cms-display-pages-part-2.html">the next part of the series</a> we'll look at adding a simple template and making this look a little more like a real website</div></div>
</div>