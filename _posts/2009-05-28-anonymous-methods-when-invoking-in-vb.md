---
title: "Anonymous methods when invoking in VB net"
layout: "post"
permalink: "/2009/05/anonymous-methods-when-invoking-in-vb.html"
date: "2009-05-28 19:32:00"
updated: "2009-05-28 20:32:18"
category: programming
tags: [vb.net, code]
---

Well obviously not but you can get close in some circumstances.

<!--more-->

I've got a situation where when a timer ticks I want to change the background colour of a textbox on a windows form. Since I don't need to pass in any parameters if I was using c# I could use Control.Invoke and an anonymous method... especially since I know I'll always be accessing this control in this method from a different thread.

But VB .Net doesn't support anonymous methods. Now I've seen all kinds of verbose ways around this on the web... google it - I dare you.

But if you just use Action as below you're pretty close to hardly any extra code...

```vbnet 
Public Sub removeHighlight() Handles timer.Elapsed
    timer.Stop()
	If txtSingleCheck.InvokeRequired Then
		txtSingleCheck.Invoke(New Action(AddressOf removeHighlight))
	Else
		txtSingleCheck.BackColor = Color.White
	End If
End Sub
```

So long as the delegate or action you are calling has the same signature as the method you're calling it in then you call InvokeRequired on the control in question and if true you call a new action with the AddressOf the method you're in otherwise you do what you wanted to do but on the appropriate thread.

Bot as powerful as anonymous methods I'll grant you but in situations like this it isn't that far removed... is it?
