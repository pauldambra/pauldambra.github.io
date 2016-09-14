--- 
title: "Websites != CMS Platform - Better Editable Affordance" 
layout: "post" 
permalink: "/better-affordance.html" 
date: "2014-07-20 22:11:00"
description: using funky css3 magic to make a better visual affordance
keywords: css3 keyframes ux visual affordance
category: cms
tags: [learning, cms, design, web, series]
---
This post is part of a series where I'm hoping to prove to myself that building a dynamic website with NodeJS is much more fun than using a CMS platform. [See the first post for an explanation of why]({% post_url 2014-02-22-websites-cms %})

The code can be found on [GitHub](https://github.com/pauldambra/omniclopse)

[Previous Post](/On-Page-Editing.html)

In the last post I wasn't happy with the visual affordance that a page element is editable.

![editable sections for anonymous users](/images/affordance-loggedout.png)

![editable sections for anonymous users](/images/affordance-loggedin.png)

<!--more-->

I also wasn't happy that the page elements shifted around as alerts were added to the screen.

![editing the page](/images/editing.gif)

# So...

### That's what a proof of concept is for, right?

I still don't have a better idea of how to indicate that an element is editable but we can make it nicer!

### And...

There are two steps 

 * Make the affordance more betterer
 * Make the affordance give more info

# A more affordable affordance 

<sub> ouch! what a pun</sub>

The indicator that an element is editable has to be on the element itself otherwise how is a user to know what they can edit - but what we had didn't draw the eye. 

By using CSS3 keyframes we can cock a snoot at older browsers (without breaking them) and get the desired behaviour.

![Pulsing editor indicator](/images/pulse.gif)

```scss 
@mixin editorAffordance($size, $pos, $glow) {
	position: absolute;
	left: $pos;
	top: $pos;
	z-index: 900;
	color: $glow;
	font-size: $size;
	border-radius: 15px;
	padding: 5px;
}

[contenteditable] {
	-moz-user-select: none;
	-khtml-user-select: none;
	-webkit-user-select: none;
	-ms-user-select: none;
	user-select: none;
	outline: none;
	position:relative;
}

div[contenteditable] {
	.editable-affordance{
    	@include editorAffordance(1em, 0, $complementaryDarkTwo);
    	@include animation('darkpulse 2.5s infinite ease-in');
	}
}

h1[contenteditable] {
	.editable-affordance{
    	@include editorAffordance(0.5em, -0.5em, gold);
    	@include animation('goldpulse 2.5s infinite ease-in');
	}
}
```

The important bits here are:

## The positioning

Using the `[contenteditable]` rule to set `position:relative` on the editable elements means we can add an element as a child with `.editable-afforance` as one of its classes. That class has a rule that sets `position:absolute` and some positioning to put the element top left (but those positions are passed in so don't need to be top left).

Positioning something absolutely inside something that is positioned relatively positions the child in relation to the parent ([see - CSS is straight-forward](http://www.amazon.co.uk/gp/product/B00EZ3Y5RW/ref=as_li_ss_tl?ie=UTF8&camp=1634&creative=19450&creativeASIN=B00EZ3Y5RW&linkCode=as2&tag=mindlramblnon-21)
). 

Giving an element that indicates something is editable but doesn't push that editable content out of its way. 

# No blue outline

Adding `user-select:none` means that when the editable element is selected the browser doesn't (shouldn't?) add its default outline that indicates the item is selected.

# The magic

The `@include animation('dark pulse...` is where the magic happens.

[The animation.scss file](https://github.com/pauldambra/omniclopse/blob/1c99d8bd370132cad5c50ee6b0c97e5f4c9c4cdc/scss/animation.scss) has some scss goodness that pumps out browser specific versions of the rules required for the pulse effect. That complexity also hides what's going on somewhat.

As always the [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/CSS/animation) documentation is awesome. In (very) short the animation rule is passed the name of a keyframes rule. The keyframes rule tells the browser what CSS to apply at known points in the animation. Those known points are calculated using the animation duration.

So, if 2s is set as the animation-duration then a keyframe rule for 50% applies after 1 second.

Here there are three rules that set a cycling box shadow inside and outside of the element 

```scss 
@include keyframes(darkpulse) {
  0% { 
	box-shadow: inset 0px 0px 5px rgb(61,28,79),
		0px 0px 15px rgb(61,28,79); 
	}
  50% { 
  	box-shadow: inset 0px 0px 15px rgb(61,28,79), 
  		0px 0px 35px rgb(61,28,79); 
  }
  100% {  
  	box-shadow: inset 0px 0px 5px rgb(61,28,79), 
  		0px 0px 15px rgb(61,28,79); 
  	}
}
```

And here a codepen so you can play with the CSS that generates the effect
<p data-height="129" data-theme-id="7380" data-slug-hash="gIseG" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/pauldambra/pen/gIseG/'>gIseG</a> by Paul D'Ambra (<a href='http://codepen.io/pauldambra'>@pauldambra</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

The next post will cover the second objective of making the editable affordance give information about whether saving edits was successful.
