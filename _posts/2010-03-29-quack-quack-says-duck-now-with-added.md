--- 
title: "Quack Quack Says The Duck now with added threading" 
layout: "post" 
permalink: "/2010/03/quack-quack-says-duck-now-with-added.html" 
date: "2010-03-29 12:01:00" 
updated: "2010-03-29 12:42:39" 
category: windows-mobile
tags: [parenting, microsoft, vb-net, ux]
---

In a [previous post](http://mindlessramblingnonsense.blogspot.com/2009/10/quack-quack-says-duck.html) I advertised an application I'd made for WinMo to entertain my toddler.



Having watched her play with it and having been [reminded to K.I.S.S](http://stackoverflow.com/questions/2498609/handle-windows-mobile-click-event-so-that-it-doesnt-queue-while-my-program-is). I've fixed a bug that highlighted the difference in expectations between myself and a toddler.

<!--more-->

No not the world-weary pessimism I'm practising instead when I tested and used the app I would click and then wait for something to happen... whereas my toddler would bash at the screen having got the link between doing so and stuff happening.

While the UI was blocking the OS would register all the clicks and then process them before updating the screen.

In the context of this application that meant that you could have a sheep on screen that was barking like a dog.... not teaching my kid the lessons I was hoping!

I moved the actual sound playing onto a background thread and set a boolean flag to try to control the click event

```visualbasic
Private Sub picBox_Click(ByVal sender As Object, ByVal e As EventArgs) Handles picBox.Click
    If Not isPlaying Then
        isPlaying = True
        Dim t As Threading.Thread = New Threading.Thread(New Threading.ThreadStart(AddressOf playSound))
        t.Start()
        t.Join()
        'playSound has finished now so...
        refreshScreen()
    End If
End Sub

Private Sub playSound()
    If currentObject.getSoundLocation() <> "" Then
        currentObject.playSound()
    End If
End Sub

Private Sub refreshScreen()
    picBox.Image = Nothing
    currentObject = thisCollectionOfThings.getNextObject()
    If Not currentObject Is Nothing Then addImage()
    playTimer.Enabled = True
End Sub

Private Sub playTimer_Tick(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles playTimer.Tick
    playTimer.Enabled = False
    isPlaying = False
End Sub
```

The astute among you (pat yourselves on the back) will notice that there's also a timer in there... I found that if I hit the screen 5 times (for example) during the sound playing the last one or two clicks would be picked up and their audio played
before the image finally refreshed.

I guess the UI was blocking briefly as processing control passed from the spawned thread back to the UI thread.

So I added a short timer that is started by the refreshScreen method and which stops itself and resets the isPlaying flag on its first tick.

That might be a bit hacky and there might be a better way but since that seems to work I'm happy with it.

And now I have a slightly more toddler-proof toddler game.

At the time of writing you could view all of the source code and download an install cab at codeplex `qqstd.codeplex.com` but that site is dead now :( You can see it [in the wayback machine](https://web.archive.org/web/20130301150839/http://qqstd.codeplex.com/)
