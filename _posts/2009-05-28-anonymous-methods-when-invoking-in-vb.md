---
title: "Anonymous methods when invoking in VB net"
layout: "post"
permalink: "/2009/05/anonymous-methods-when-invoking-in-vb.html"
uuid: "6144026864715179282"
guid: "tag:blogger.com,1999:blog-6728560442491983758.post-6144026864715179282"
date: "2009-05-28 19:32:00"
updated: "2009-05-28 20:32:18"
description: 
blogger:
    siteid: "6728560442491983758"
    postid: "6144026864715179282"
    comments: "0"
categories: 
author: 
    name: "Paul D'Ambra"
    url: "https://plus.google.com/114260096260757534167?rel=author"
    image: "//lh5.googleusercontent.com/-nN3yNuaSWDs/AAAAAAAAAAI/AAAAAAAABQU/ESeyTW5Duf0/s512-c/photo.jpg"
---

Well obviously not but you can get close in some circumstances.

<div>I've got a situation where when a timer ticks I want to change the background colour of a textbox on a windows form. Since I don't need to pass in any parameters if I was using c# I could use Control.Invoke and an anonymous method... especially since I know I'll always be accessing this control in this method from a different thread.</div><div><br /></div><div>but VB .Net doesn't support anonymous methods. Now I've seen all kinds of verbose ways around this on the web... google it - I dare you.</div><div><br /></div><div>But if you just use Action as below you're pretty close to hardly any extra code...</div><div><br /></div>
<div>
{% highlight vbnet %}
Public Sub removeHighlight() Handles timer.Elapsed
    timer.Stop()
	If txtSingleCheck.InvokeRequired Then
		txtSingleCheck.Invoke(New Action(AddressOf removeHighlight))
	Else
		txtSingleCheck.BackColor = Color.White
	End If
End Sub
{% endhighlight %}
<div>so long as the delegate or action you are calling has the same signature as the method you're calling it in then you call InvokeRequired on the control in question and if true you call a new action with the AddressOf the method you're in otherwise you do what you wanted to do but on the appropriate thread.</div><div><br /></div><div>Not as powerful as anonymous methods I'll grant you but in situations like this it isn't that far removed... is it?</div></div>
</div>