--- 
title: "Testing Static HTML!" 
layout: "post" 
permalink: "/2017/testing-static-html.html" 
date: "2016-10-19 18:40:00"
description: "Testing the generated site is one of the benefits of static HTML generators"
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
      <a href="/structured-data-with-jekyll.html">Previous Post</a>
    </div>
    <div class="next">
      
    </div>
  </div>
</aside>

One of the benefits of generating a site as a static artefact (here using [Jekyll](https://jekyllrb.com/) but there are a gazillion tools) is that the finished product is a known quantity. Anything that's a known quantity can be tested!

<!--more-->

I chose a wonderful tool called [htmlproofer](https://github.com/gjtorikian/html-proofer) which since it has a CLI can be invoked as part of the build.

```
#! /bin/bash

set -eu

bundle exec htmlproofer \
  _site \
  --file-ignore /amp/,/.git/ \
  --check-favicon \
  --check-html \
  --check-opengraph
```

This checks the generated site directory. Ignoring the AMP folder. The list of checks this carries out (reproduced here from [the project readme](https://github.com/gjtorikian/html-proofer/blob/c95d21dd5221243c7a7cfb1218fd6fd853381765/README.md))

------

## Images

img elements:

 * Whether all your images have alt tags
 * Whether your internal image references are not broken
 * Whether external images are showing
 * Whether your images are HTTP

## Links

a, link elements:

 * Whether your internal links are working
 * Whether your internal hash references (#linkToMe) are working
 * Whether external links are working
 * Whether your links are HTTPS
 * Whether CORS/SRI is enabled

## Scripts

script elements:

 * Whether your internal script references are working
 * Whether external scripts are loading
 * Whether CORS/SRI is enabled

## Favicon

 * Whether your favicons are valid.

## OpenGraph

Whether the images and URLs in the OpenGraph metadata are valid.
HTML

Whether your HTML markup is valid. This is done via Nokogiri, to ensure well-formed markup.

------

<img src="foo.png"/>

<<a href="/does-not-exist">invalid link</a>