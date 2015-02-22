--- 
title: "Websites != CMS Platform - Better Editable Affordance with JS for great good" 
layout: "post" 
permalink: "/better-affordance-js.html" 
date: "2014-07-30 22:11:00"
description: using funky js magic to make a better visual affordance
keywords: js ux visual affordance
---
This post is part of a series where I'm hoping to prove to myself that building a dynamic website with NodeJS is much more fun than using a CMS platform. [See the first post for an explanation of why]({% post_url 2014-02-22-websites-cms %})

The code can be found on [GitHub](https://github.com/pauldambra/omniclopse)

[Previous Post](/better-affordance.html)

In the last post a better visual affordance that a page element is editable was added. But didn't solve the problem that notifications of success or failure were obtrusive and disconnected from the edited element.

<figure>
<img src="/images/pulse.gif" alt="pulsing affordance" class="img-responsive img-thumbnail"/>
<figcaption>Pulsing editor indicator</figcaption>
</figure>

<!--more-->

The desired behaviour is that when a change is made the entire current page is persisted to the server and the user is made aware of success or failure without interrupting their workflow unnecessarily.

<figure>
	<img src="/images/affordance-with-state.gif" alt="editable indicator changing state" class="img-responsive img-thumbnail"/>
	<figcaption>Editable indicator changing state</figcaption>
</figure>

So here as the text is changed the indicator changes to the save icon. On success to a tick and after a short delay back to the editable icon.

But how?!

# Changing the icon
The actual switch is really simple

{% highlight js %}
(function(omniclopse) {
  'use strict';

  omniclopse.ux = omniclopse.ux || {};

  var switchIcons = function(element, oldClass, newClass) {
    element.classList.remove(oldClass);
    element.classList.add(newClass);
  };

  omniclopse.ux.saveContentStarted = function(element) {
    switchIcons(element, 'fa-pencil', 'fa-save');
  };

  omniclopse.ux.saveContentCompleted = function(element) {
    switchIcons(element, 'fa-save', 'fa-check');
    setTimeout(function() {
      switchIcons(element, 'fa-check', 'fa-pencil');
    }, 3000);
  };

  omniclopse.ux.saveContentFailed = function(element) {
    switchIcons(element, 'fa-save', 'fa-times');
  };
}(window.omniclopse = window.omniclopse || {}));
{% endhighlight %}

Since the site is using the well-named [Font-awesome icon library](http://fortawesome.github.io/Font-Awesome/) all that is needed to change the icon is to alter the fa classes on the element. 

As an exercise in hipsterism this is done with [vanilla javascript](http://vanilla-js.com/) but it would be trivial to pass JQuery into this IIFE and use the class addition and removal functions it provides instead.

So, 

* when saving content has started the pencil icon is switched out for a save icon
* when saving completes the save icon is switched for a check and timeout is set to switch that check back to the original pencil
* when saving fails the save icon is switched for an X. 

Right now this behaviour on fail is pretty rubbish as the user doesn't get an error message and there's no way to retry. Really hovering over or clicking on the X should display the error message. The icon should change to a retry symbol or clicking on it should prompt for retry and the page should use localstorage so that your edits aren't lost. But that's for another day!

# Wiring it up

{% highlight js %}
(function(omniclopse, $) {
    'use strict';
    
    var getEditableElementsForUpload = function() {
      return $('.panel').map(function(index, el) {
        var title = $(el).find('h1');
        var body = $(el).find('.panel-body');
        return {
          title: title ? title.text() : '',
          body: body? body.html() : ''
        };
      }).get();
    };

    omniclopse.onContentEdited = function(element) {
      var icon = $(element).find('i')[0];
      
      omniclopse.ux.saveContentStarted(icon);
      var panels = getEditableElementsForUpload();

      var putData = {'panels': panels};
      $.ajax({
        url:'/pages/home',
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify(putData),
        type:'PUT'
      }).fail(function(xhr,status){
        omniclopse.ux.saveContentFailed(icon);
      }).done(function(){
        omniclopse.ux.saveContentCompleted(icon);
      });
    };

}(window.omniclopse = window.omniclopse || {}, $));
{% endhighlight %}

When the onContentEdited event is fired for an element 

* the child i element which holds the editable indicator is found 
* the parts of the page that need to be persisted are gathered
* saveContentStarted is called
* the jquery.ajax method is used to persist the page (yes, with a hardcoded URL this is a work-in-progress after all)
* the ajax methods fail and done promises are associated with the saveContentFailed and saveContentCompleted methods respectively

This did need a slight change to the JS that watches for changes to the page that was introduced [in a previous article](/On-Page-Editing.html#edit-event-js)

{% highlight js %}
(function(omniclopse, $, ckedit) {
    'use strict';

    //shamelessly borrowed from http://stackoverflow.com/a/14027188/222163
    omniclopse.bindEvents = function() {

        var before;
        var timer;
        $('*[contenteditable]').on('focus', function() {
          before = $(this).html();
        }).on('keyup paste', function() { 
          if (before != $(this).html()) { 
            clearTimeout(timer);
            var el = $(this)[0];
            timer = setTimeout(function() {
              omniclopse.onContentEdited(el);
            }, 500);
          }
        });

        //ckeditor replaces content when it inits against an element - yay
        ckedit.on('instanceReady', function(e) {
          $(e.editor.element.$).append('<i class="fa fa-pencil editable-affordance"></i>');
        });

    };    
}(window.omniclopse = window.omniclopse || {}, $, CKEDITOR));
{% endhighlight %}

This now adds the i child element which indicates that a particular element is editable which is necessary because of how ckeditor alters the DOM when it picks up on a contenteditable element.

And, rather than simply calling `omniclopse.onContentEdited` it now passes in the page element that triggered the event so its editable indicator can be updated.

# The result
is a pretty, funky, pulsing indicator that shows an element is editable and changes state with the element to keep the user informed of what is happening in the background.
<figure>
	<img src="/images/affordance-with-delay.gif" alt="editable indicator changing state after typing finishes" class="img-responsive img-thumbnail"/>
	<figcaption>Editable indicator changing state *after typing finishes*</figcaption>
</figure>

# Doh-stscript
## a postscript but also doh
The eagle-eyed will notice a difference between the first example gif of the end result and this one. Which is the result of a really simple (and stupid) bug I introduced.

The code above which actually fires the onContentEdited event uses a timeout so that the event doesn't fire until after content has finished changing.

In the original version it looked like `timer = setTimeout(omniclopse.onContentEdited, 500);` which says call the `omniclopse.onContentEdited` event after 500 milliseconds.

When I had to pass in the element so its state could be updated I made the simplest (and stupidest) change possible so that the line of code now read `timer = setTimeout(omniclopse.onContentEdited($(this)[0]), 500);`

Even without viewing these side-by-side JS ninjas might see what I did...

{% highlight js %}
timer = setTimeout(omniclopse.onContentEdited, 500);
timer = setTimeout(omniclopse.onContentEdited($(this)[0]), 500);
{% endhighlight %}

Because the second version has brackets against the function name JS evaluates the function as soon as it parses it which isn't what we want to happen.

This is definitely what qualifies as an [ID-10T](http://en.wikipedia.org/wiki/User_error) problem.

What this meant was as soon as the HTML changed and even while the user is still typing the system starts to update. That wasn't the desired behaviour!

This code should read (as it does above)...

{% highlight js %}
    var el = $(this)[0];
    timer = setTimeout(function() {
      omniclopse.onContentEdited(el);
    }, 500);
{% endhighlight %}

This now captures the element that is being edited in the `el` variable and then passes a function to setTimeout which *when SetTimeout actually runs* calls onContentEdited.

The even more eagle-eyed will notice I've stopped bothering to write tests for these little bits of JS and now I'm introducing bugs by changing old bits of code. Who could have guessed?!