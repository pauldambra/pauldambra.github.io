--- 
title: "Generating static AMP pages" 
layout: "post" 
permalink: "/2017/generating-static-amp.html" 
date: "2017-03-22 22:40:00"
description: "Using Jekyll plugins to generate AMP version of pages"
keywords: jekyll static AMP
category: "AMP"
tags: [series, blog, recursion, AMP, jekyll]
---

<aside class="series">
  <h1>
    This post is part of a series on improving this blog #recursion
  </h1>
  <div class="links">
    <div class="previous">
      <a href="/2017/testing-static-sites.html">Previous Post</a>
    </div>
    <div class="next">
      <a href="/2017/testing-meaning.html">Next Post</a>
    </div>
  </div>
</aside>

[AMP or Accelerated Mobile Pages](https://www.ampproject.org/learn/overview/) is a Google-backed project that allows you to use restricted HTML to delivery static content quickly. Since AMP HTML is restricted it isn't a fit for every site.

Since this blog is published as static HTML articles it is a good candidate for publishing an AMP version. An open source AMP jekyll plugin was amended to add AMP versions of pages. 

The major discovery was that the validation tooling around AMP is awesome. Compare that to Facebook Instant Articles where there is basically no validation tooling (that I could discover at least)...

This didn't feel like a topic that justified several posts so to avoid taking too long this is a bit of a whistle-stop tour of adding AMP pages to this blog.

<!--more-->

# Jekyll Plugin

The basic idea is adapted from a [Jekyll plugin on github](https://github.com/juusaw/amp-jekyll/).

There are several parts here:

 * Adding an AMP layout to the site
 * Adding a 'generator' to the Jekyll module
 * Adding an 'amp_images' filter
 * Adding an 'amp_tweets' filter

 This was a very manual process but not particularly onerous. Jekyll proved to be well-made for extension.

## Adding an AMP layout

 AMP has some [required markup](https://www.ampproject.org/docs/get_started/create/basic_markup). So an [amp-post.html](https://github.com/pauldambra/blog_source/blob/7a39e7851dfb2cdf93ae28464d5f97ed7c1ad4c1/_layouts/amp-post.html) was added to the `_layouts` folder. 

```html
{% raw  %}
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <title>{{ page.title }}</title>
    <link rel="canonical" href="{{ page.canonical_url | prepend: site.url }}" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Khula" rel="stylesheet">
    <style amp-custom>
      {% include syntax.css %}
      {% capture include_to_scssify %}
        {% include main.scss %}
      {% endcapture %}
      {{ include_to_scssify | scssify }}
    </style>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>

{% if page.body contains "florp-wrapper" %}
      <script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
{% endif %}

    <script async custom-element="amp-analytics"
    src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
    <script async src="https://cdn.ampproject.org/v0.js"></script>

<link rel="shortcut icon" href="/favicon.ico" />

    {% include openGraph.html %}
  </head>
  {% endraw %}
```

So, there's an `<style amp-boilerplate/>` element which has to be included and the `<html amp lang="en">` declaration.

`script` elements are declared async. Not just any javascript can be included. Here the amp-analytics script is loaded to allow adding google analytics to the page.

Currently the AMP validator considers including an unnecessary script a warning and not an error but that could change in future. So the amp-twitter script is loaded but only if there is an embedded tweet in the page.

### Styles

All styles are included in the head in the `<style amp-custom/>` element. It was found to be easier to just load all styles that way *even on non-AMP pages*. There was no measurable difference in page rendering with styles in a linked stylesheet versus in a style tag in the head. 

Previously the site used [bootstrap v3](http://getbootstrap.com/) for styling (which is burned into my muscle memory). But assessing how much of bootstrap was being used (hardly any) vs. how much was being copied into the head of the page (oodles) for AMP made bootstrap a difficult choice to keep.

[Bootstrap is MIT licensed](https://github.com/twbs/bootstrap/blob/9c469cd0e8abaac19c163622ed68b6783dfa366c/LICENSE) so just the used styles were copied into the site's scss file. Mixed in with the custom styles there are only c400 lines of styles.

Presumably it is not true for all sites that there is no performance difference between an in-page style element and a linked sheet but there's only 12Kb of SCSS to be compiled for this site... and a third of that is for syntax highlighting of code blocks.

## The Body

```html
{% raw %}
  {% capture header %}{% include header.html %}{% endcapture %}
  {{ header | amp_images: false, 32, 32 }}
  <div class="main">

  {% 
    include structuredData.html 
    headline=page.title
    genre=page.category
    keywords=page.keywords
    content=page.body
    link=page.permalink
    date=page.date
  %}
   
  <article>
  {% capture post_header %}{% include post_header.html %}{% endcapture %}
  {{ post_header | amp_images }}
      <div class="post">
      {{ page.body | markdownify | amp_images | amp_tweets }} 
    </div>
  </article> 

  </div>

  {% capture footer %}{% include footer.html %}{% endcapture %}
  {{ footer | amp_images: false, 25, 25 }}
{% endraw %}
```

All images have to be fed to the `amp_images` filter (see below).

Structured data is apparently not required for AMP but Google's webmaster tools were unhappy if it was not present so the structured data include is added.

The main content is also passed through the `amp_tweets` filter as well as the `amp_images` filter.

`{% raw %} {{ page.body | markdownify | amp_images | amp_tweets }} {% endraw %}`

So far so straightforward

# Adding a generator

Jekyll [generators](https://jekyllrb.com/docs/plugins/#generators) run as part of Jekyll's build and "create additional content based on your own rules". 

This generator is almost exactly the same as found on Github. 

```ruby
require 'thread'
require 'thwait'

  # Generates a new AMP post for each existing post
  class AmpGenerator < Generator
    priority :low
    def generate(site)
      dir = site.config['ampdir'] || 'amp'
      threads = site.posts.docs.map do |post|
        Thread.new do
          index = AmpPost.new(site, site.source, File.join(dir, post.id), post)
          index.render(site.layouts, site.site_payload)
          index.write(site.dest)
          site.pages << index
        end
      end
      ThreadsWait.all_waits(*threads)
    end
  end
end
```

For each of the posts in the site this initializes an `AmpPost` as a copy of that non AMP post and adds that new post into an amp folder in the output.

Site build was taking around 18 seconds after adding this generator (and the image and twitter filters). Amending the generator so that it creates a new thread for each AmpPost and then waits for all of those threads to finish reduce build time to around 7 seconds!

# Adding an 'amp_images' filter

[AMP images must be given an explicit size](https://www.ampproject.org/docs/reference/components/media/amp-img). And this filter, which is unchanged from that found on github, uses nokogiri to find each img element and convert it to an amp-image element.

So markup like

```html
<p>
  <img src="/images/yarn-desc.png" alt="Yarn description" />
</p>
```

becomes

```html
<p>
  <amp-img src="/images/yarn-desc.png" 
           alt="Yarn description" 
           width="900" 
           height="304" 
           layout="responsive">
  </amp-img>
</p>
```

# Adding an 'amp_tweets' filter

If you want to embed a tweet in a blog post (and I, for my sins, often do) then twitter provide HTML something like

```html

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">
  <a href="https://twitter.com/some_user">@some_user</a> the content content @sender (@sender) <a href="https://twitter.com/sender/status/IDFORTHETWEET">August 20, 2016</a></blockquote>
<script async="" defer="" src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

```

AMP insists this element has a known height and width so that has to be manually edited to

```html

<div class="florp-wrapper" data-width="292" data-height="350">
  <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">
    <a href="https://twitter.com/some_user">@some_user</a> the content content @sender (@sender) <a href="https://twitter.com/sender/status/IDFORTHETWEET">August 20, 2016</a></blockquote>
  <script async="" defer="" src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>

```

The amp_tweet filter then uses that `.florp-wrapper` class to find each tweet and convert it to an amp-twitter element.

```html
<div class="florp-wrapper" data-width="292" data-height="350">
  <div>
    <amp-twitter layout="responsive" data-tweetid="IDFORTHETWEET" width="292" height="350"></amp-twitter>
  </div>
</div>
```

The necessity to manually remember to wrap the embedded tweets in a div with the correct class is the least nice part of this whole process (but it's not the worst thing in the world).

(of course the tweets aren't really wrapped with [`florp-wrapper`](https://twitter.com/actioncookbook/status/684515262712967170?lang=en) but using the real class meant the script was included and so failed AMP validation :/)

# AMP Validation

The [AMP validator](https://validator.ampproject.org/) is fudging awesome! It was invaluable in figuring out if I'd set this all up correctly and then identifying old posts which were just imported HTML and not Markdown that Jekyll was building. Those old posts held the majority of the AMP issues identified.

You can 

 * paste the generated AMP html [directly to the validator](https://validator.ampproject.org/). 
 * [load via URL](https://validator.ampproject.org/#url=http%3A%2F%2Fpauldambra.github.io%2Famp%2F2011%2F04%2Fssh-without-password%2Findex.html)
 * have it as a [browser extension](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc?hl=en)
 * and [run it as part of a script](/2017/testing-static-sites.html)

# Google Webmaster tools

![Webmaster tools AMP pages](/images/AMP-webmaster.png)

Google webmaster tools are also, slowly, picking up that the AMP pages are present. Highlighting warnings and errors and linking out to the validator.


# And so...

If you're already generating articles using Jekyll it's well worth investigating a little time to get this setup. Either because it'll be interesting to do or because you believe you enough traffic from mobile devices to justify not making those readers wait before they can consume your awesome content.
