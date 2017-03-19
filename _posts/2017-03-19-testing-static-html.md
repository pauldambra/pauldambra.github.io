--- 
title: "Testing Static HTML!" 
layout: "post" 
permalink: "/2017/testing-static-sites.html" 
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

# Test the generated HTML

I chose a wonderful tool called [htmlproofer](https://github.com/gjtorikian/html-proofer) which, since it has a CLI, can be invoked as part of the build.

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

This checks the generated site directory. Ignoring the AMP folder. The list of checks this carries out (reproduced here from [the project readme](https://github.com/gjtorikian/html-proofer/blob/c95d21dd5221243c7a7cfb1218fd6fd853381765/README.md)):

------

### Images

img elements:

 * Whether all your images have alt tags
 * Whether your internal image references are not broken
 * Whether external images are showing
 * Whether your images are HTTP

### Links

a, link elements:

 * Whether your internal links are working
 * Whether your internal hash references (#linkToMe) are working
 * Whether external links are working
 * Whether your links are HTTPS
 * Whether CORS/SRI is enabled

### Scripts

script elements:

 * Whether your internal script references are working
 * Whether external scripts are loading
 * Whether CORS/SRI is enabled

### Favicon

 * Whether your favicons are valid.

### OpenGraph

Whether the images and URLs in the OpenGraph metadata are valid.
HTML

Whether your HTML markup is valid. This is done via Nokogiri, to ensure well-formed markup.

------

If the following invalid elements are added to the page and the htmlproofer script run...

```
<img src="foo.png"/>

<a href="/does-not-exist">invalid link</a>
```

...then the output highlights five errors.

```
Running ["HtmlCheck", "FaviconCheck", "ImageCheck", "LinkCheck", "ScriptCheck", "OpenGraphCheck"] on ["_site"] on *.html... 
Checking 310 external links...
Ran on 55 files!
- _site/2017/testing-static-sites.html
  *  External link http://pauldambra.github.io/2017/testing-static-sites.html failed: 404 No error
  *  External link http://pauldambra.github.io/amp/2017/testing-static-html failed: 404 No error
  *  image foo.png does not have an alt attribute (line 678)
  *  internal image foo.png does not exist (line 678)
  *  internally linking to /does-not-exist, which does not exist (line 680)
     <a href="/does-not-exist">invalid link</a>
htmlproofer 3.5.0 | Error:  HTML-Proofer found 5 failures!
The command "./htmltest.sh" exited with 1.
```

Three of these I expected:

 * that the image element doesn't have an alt attribute
 * that foo.png does not exist
 * and that the internal link to `/does-not-exist` does not, erm ,exist

## ruh roh

 Interestingly this also reveals a bug in the setup. 

```
  *  External link http://pauldambra.github.io/2017/testing-static-sites.html failed: 404 No error
  *  External link http://pauldambra.github.io/amp/2017/testing-static-html failed: 404 No errors
```

Grepping the generated html for those two external links finds them in the HEAD of the document.

I'd only run this process on existing, _published_ blog posts since adding it. This is the first time that it has run against a repo with a new, _unpublished_ blog post and it's correctly highlighting that the open graph URL for this article and the amplhtml link rel for this article don't exist. Because they don't - this article hasn't been published yet. 

The site's .travis.yml file currently has:

```
script:
  - "./build.sh"
  - "./htmltest.sh"
  - "./amp-validate.sh"
after_success:
  - "./deploy.sh"
```

this will have to become

```
script:
  - "./build.sh"
  - "./amp-validate.sh"
after_success:
  - "./deploy.sh"
  - "./htmltest.sh"
```

so that the HTML test only runs after the deploy has occurred. Ideally any published documents would be tested before deploy and could fail the build and newly published documents only after their first deploy as a smoke test. But this will do for now.

# Test the generated AMP

An AMP version of the site is generated at build time too. HTML-Proofer can't test the AMP site so these pages could be broken and that test doesn't protect us.

AMP is a dream to work with because the AMP debugger is well built and provides clear, actionable errors. Brilliantly that online debugger is available as an NPM package so as can be seen above there is an `amp-validate.sh` as part of the build.

```
#! /bin/bash

set -eu

npm install -g amphtml-validator

for f in `find _site/amp -type f -name '*.html'`; do
  amphtml-validator $f
done
```

Because the AMP debugger was so helpful when adding AMP generation the only warning this generated when it was added to build was many instances of

```
_site/amp/2009/05/anonymous-methods-when-invoking-in-vb/index.html:633:6 The extension 'amp-twitter extension .js script' was found on this page, but is unused (no 'amp-twitter' tag seen). This may become an error in the future. (see https://www.ampproject.org/docs/reference/extended/amp-twitter.html)
```

Each AMP page had the amp-twitter extension included whether or not there was a tweet embedded in the page. [This was easily fixed.](https://github.com/pauldambra/blog_source/commit/4329b333aa15c3e71827ba0a5c42e608616d881a)

And a single, old page which the AMP generator couldn't handle and so

```
_site/amp/2011/04/ssh-without-password/index.html:636:3 The attribute 'style' may not appear in tag 'span'.
_site/amp/2011/04/ssh-without-password/index.html:667:15 The tag 'paste' is disallowed.
```

[Again easily fixed by updating the HTML of the non-AMP post.](https://github.com/pauldambra/blog_source/commit/c82542fec278d97c2749f6c09961efae15df175c#diff-b584697099c805190a2a5cfaae07bfc1)

# And so?

When these two types of test were added there were 237 HTML errors and 9 AMP warnings and 2 AMP errors. From as simple as missing a favicon through to genuinely malformed pages. Adding these tests was straight-forward, added value to the CI for this blog, and is another good indication of the benefits of statically generated sites. 