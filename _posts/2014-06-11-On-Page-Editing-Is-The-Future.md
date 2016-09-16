--- 
title: "Websites != CMS Platform - On Page Editing" 
layout: "post" 
permalink: "/On-Page-Editing.html" 
date: "2014-06-11 08:11:00"
description: using contenteditable in HTML5 to make page management easy
keywords: contenteditable cms html5 jquery ajax
category: cms
tags: [learning, cms, design, web, series]
---

This post is part of a series where I'm hoping to prove to myself that building a dynamic website with NodeJS is much more fun than using a CMS platform. [See the first post for an explanation of why]({% post_url 2014-02-22-websites-cms %})

The code can be found on [GitHub](https://github.com/pauldambra/omniclopse)

[Previous Post](/Websites-CMS-Platform-Storing-Data2.html)

A.K.A. No More CMS-y Admin Section?

A traditional CMS framework or website has an admin section for logged in users. That section has a menu showing them which sections the user can edit and each section has a list of the pages they can edit and then the user can edit the text or upload images using a WYSIWYG editor. 

Don't fix it if it aint broken but... but... HTML5 includes [the `contenteditable` attribute](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_Editable) which makes (the text of) almost any element editable. 

If the admin section exists (in large part) to allow editing of content and editing of content can be completed in the page itself could this replace the admin section?

<!--more-->

### Could it?!

The benefit I can see here is that your edits are in place. They're immediately reflected on screen so the editing user can see the impact they're having. A user may not grok why a developer has put a 25 character limit on a title field. But if they simply change a title and it pushes the rest of the page out then it's their call whether that's OK.

I can think of two problems with this:

#### 1. Users expect an admin interface. 

They don't expect to edit in the page
	
I've previously referenced "Don't Make Me Think" [(shameless affiliate link)](https://www.amazon.co.uk/Dont-Make-Me-Think-Usability/dp/B00HJUBRPG/ref=sr_1_1?s=books&ie=UTF8&qid=1473701528&sr=1-1&keywords=Don%27t+Make+Me+Think%3A+A+Common+Sense+Approach+to+Web+Usability+%28Voices+That+Matter%29) and that approach would drive the position that there's no point confusing a user just to be funky. This may be doing just that...

#### 2. Is it discoverable?

The visual affordance to indicate that a user is able to edit an element needs to be worked in to the design.

If the user can't find what to edit then this doesn't work. Also, since part of the benefit is that the edits are in the page and the page has to change to indicate where edits are possible does that water down the benefit.

I'm well out of my depth as far as design goes right now! If this was a real project I'd want to get a real designer or some actual users at this point and find out if this is a developer only idea... 

# so how does it work? 
As part of this piece of development I switched view engine to the [hbs engine](https://github.com/donpark/hbs). I wanted partials and handlebars and this appears to offer both with little pain.	

```js 
require('./server/handlebars').init(hbs, app.locals);
hbs.registerPartials(__dirname + '/views/partials');
app.engine('html', hbs.__express);
```

This setup allows .hbs files stored in `/views/partials` to be used in `{% raw %}{{>partialName }}{% endraw %}` handlebars blocks

The feature here is to have three columns of editable content. That's pretty easily expressed in the home page layout...

```html 
{% raw %}
  <div class="row info">
    {{>panel panels.[0]}}
    {{>panel panels.[1]}}
    {{>panel panels.[2]}}
  </div>
{% endraw %}
```

Each line calls for the panel partial and passes the given element from the panels array (or undefined)

and a panel partial is simple too

```html 
{% raw %}
	<div class="col-md-4">
    <div class="panel panel-info">
		  <div class="panel-heading">
        <h1 {{elementShouldBeEditable}}>
          {{safeString title}}
        </h1>
      </div>
      <div class="panel-body" {{elementShouldBeEditable}}>
  		  {{safeString body}}
      </div>
    </div>
  </div>
{% endraw %}  
```

Each element that should be editable is marked with an `{% raw %}{{elementShouldBeEditable}}{% endraw %}` handlebars helper and the content from the model is marked as `safeString` so that any HTML entered in the WYSIWYG editor is not escaped.

## The Helpers

## An editable element

```js 
    handlebars.registerHelper('elementShouldBeEditable', 
                        function() {
                            if (appLocals.user) {
                                return 'contenteditable=true';
                            }
                        });
```

This is just a standard Handlebars helper which checks if a user is set and if it is renders `contenteditable=true` in place. 

### Safe Strings
If a WYSIWYG editor saves `{% raw %} <b>some bold text</b> {% endraw %}` then that is exactly what will be printed on screen as handlebars will escape the HTML to protect you from l33t haxxors. 

```js 
    handlebars.registerHelper('safeString', function(value) {
        return new handlebars.handlebars.SafeString(value);
    });
```

returning a handlebars safeString instead means that handlebars will trust the content and render **some bold text**

# The JS
This is the first JS I've added to the client. So, while I initially wrote the JS directly in the HTML, I eventually moved it into its own files and hooked up gulp to concat and uglify it.

### Gulp

```js 
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('processJS', function(){
  gulp.src(['./public/js/*.js'])
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/'));
});
```

The gulp task is straightforward. On any change in a JS file in the public/js folder  concat all the js files in that folder into a file called app.js, uglify that file and save it.

The main HTML page is then set to include that JS **when a user is logged in**

```html 
{% raw %}
    {{#if user}}
        <script src="/js/app.js"></script>
    {{/if}}
{% endraw %}  
```

### <a name="edit-event-js">Monitor the page for changes</a>
The first task is to watch any contenteditable elements for changes to their content and to do _something_ when a change is detected

```js 
(function(omniclopse, $) {
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
            timer = setTimeout(omniclopse.onContentEdited, 500);
          }
        });
    };    
}(window.omniclopse = window.omniclopse || {}, $));
```

This JS watched any element with a contenteditable attribute and if an element gets focus stores the HTML content as it was on focus. On keyup or paste if the content has changed then queue a call to the onContentEdited event handler.

This has a 500 millisecond delay so that the system waits until a person has stopped editing before taking any action.

### Respond to changes
When a change is detected then the page is PUT to the server to persist those changes

```js 
(function(omniclopse, $) {
    'use strict';

    //snip out addMessage for clarity of example
    
    omniclopse.onContentEdited = function() {
      var panels = $('.panel').map(function(index, el) {
        var title = $(el).find('h1');
        var body = $(el).find('.panel-body');
        return {
          title: title ? title.text() : '',
          body: body? body.html() : ''
        };
      }).get();

      var putData = {'panels': panels};
      $.ajax({
        url:'/pages/home',
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify(putData),
        type:'PUT'
      }).fail(function(xhr,status){
        addMessage('could not save your changes', 'alert-danger');
      }).done(function(){
        addMessage('saved changes', 'alert-success');
      });
    };

}(window.omniclopse = window.omniclopse || {}, $));
```

So here the page object expected by the server is gathered from the page and PUT using `$.ajax`. This bit of code is bound directly to the Home page at the moment but that's easily remedied when necessary.

An addMessage function shows a bootstrap alert to keep the user informed of what is happening. This is a pretty dull piece of code!

```js 
    function alertTimeout(wait){
        setTimeout(function(){
            $('#messageHolder').children('.alert:first-child').alert().alert('close');
        }, wait);
    }

    var addMessage = function(message, bootstrapType) {
      var outer = $('<div/>', {
        class: 'alert alert-dismissable ' + bootstrapType
      });
      var button = $('<button/>',{
        type:'button',
        class:'close',
        'data-dismiss':'alert',
        'aria-hidden':'true',
      });
      button.append('&times;');
      outer.append(button);
      outer.append(message);
      $('#messageHolder').append(outer);
      alertTimeout(3000);
    }; 
```

# Visual Affordance
I found this a pretty hard design decision. I'm not sure I'm happy it really calls out what is happening to a user and I think I'll grab a designer the next time I'm next to one and ask their opinion but...

![editable sections for anonymous users](/images/affordance-loggedout.png)

![editable sections for anonymous users](/images/affordance-loggedin.png)

```scss 
@mixin editorPencil($size) {
	content: "\270f  ";
	font-family: 'Glyphicons Halflings';
	font-style: normal;
	font-size: $size;
}

div[contenteditable]:before {
	@include editorPencil(1em);
}

h1[contenteditable]:before {
	@include editorPencil(0.5em);
}
```

Since the site is already using bootstrap CSS was added that uses `:before` to add a pencil icon to any contenteditable div or H1.

# CKEditor
Another little bonus is that CKEditor is aware of contenteditable elements so including that in the page gives you WYSIWYG power directly on any contenteditable.

All that was necessary to hook it up was to include it in the page and to switch from using the valid `{%raw%}<div content contenteditable/>{%endraw%}` to using `{%raw%}<div content contenteditable=true/>{%endraw%}` a change I can live with to get the power of WYSIWYG directly on page elements


# (How) does it work?
If you watch the GIF below it's clear this is a working prototype and not a finished product. But it does work!

The page content is jumping about as alert messages are added and that's not OK so a better mechanism is necessary for highlighting that changes have been persisted.

But this was really fun to add and it needed very little code to do so.

![editing the page](/images/editing.gif)
