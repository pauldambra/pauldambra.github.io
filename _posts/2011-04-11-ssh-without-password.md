---
title: "SSH without password"
layout: "post"
permalink: "/2011/04/ssh-without-password.html"
date: "2011-04-11 09:05:00"
updated: "2011-04-11 12:49:19"
category: ssh
tags: [linux, windows, git, ssh, learning]
---

I've resolved to learn more about linux and have been slowly boggling at how easy some tasks are in comparison to the MS world...

Recently I've been working on what was intended to be a small and straight-forward website that has rapidly grown to be a large behemoth that will take credit card payments. 

<!--more-->

So I need revision control. 

Also, the site uses Drupal and Drupal use GIT for revision control. We're building a custom module and we'd like to contribute it back once it is done so we may as well use GIT now to make life easy.

Pretty exciting I can commit my changes and they are automatically pushed over to my test server on commit and then if I like them I can push them to my live server. Both pushes are by SSH and both times I have to type in a different, long, complex password.

Frustrating and inefficient for a god of business whose time is so important - no...

But the interwebs tell me that you can set up SSH so you don't need a password. They also tell me in a vaguely confusing manner... my resolve now is to add another vaguely confusing explanation to the interwebs.

![confusing explanation](http://1.bp.blogspot.com/-ogY-p6dRbUs/TaLFdgeiXlI/AAAAAAAAANY/zIbVsfwaGzQ/s1600/floor_one.png)

The task is to set my client.local machine to be able to SSH onto server.remote without any passwords changing hands.

This was relatively straight forward on my Mac and on my ubuntu box but of course my main dev machine is Windows 7...

_As an aside switching from Mac, to VMWare fusion Windows, to VMWare fusion, to Windows 7 and remoting between them means I *never* know which key is going to be @ and which " and the windows machines get reset to US keyboard every so often by the Macs which throws a spanner in the works._

On a linux or unix machine this turned out to be pretty straight forward

 1) Login to client.local
 2) run `ssh-keygen -t rsa`
 3) alter the path offered to rename the file sensibly in my case `~/.ssh/rsa_server.remote`
 4) `ssh-copy-id -i ~/.ssh/rsa_server.remote.pub '-p 8901 dinglehopper@server.remote'`
    * here note that I had to surround with single quotes the -p etc section of the command in order to use a non standard port
 5) still on client.local edit `~/.ssh/config` to add

> Host server.remote
> IdentityFile ~/.ssh/rsa_server.remote

 6) type `ssh dinglehopper@server.remote -p 8901` and watch in awe and wonder

Things aren't quite so straightforward on Windows but the basic steps remain.

On Windows I use the excellent PuTTy to enable all things SSHy and I'm going to behave as if you do to...

First things first ssh onto server.remote as the user you want to use in future  eg dinglehopper@server.remote and:

on your Windows clinet.local fire up puttygen.exe and hit generate. As a bit of fun you are asked to wiggle your mouse in order to provide randomness (I wonder if this is placebo)

![putty key generator](http://4.bp.blogspot.com/-XCmyhromqcY/TaL4vMTP3uI/AAAAAAAAAOo/pcakvSyDlIU/s1600/generating.png)

Once this is generated you'll see a box marked "Public key for pasting into authorized_keys file". Can you guess what that's for?

So grab that text in your clipboard, fire up ssh and connect to server.remote as the user you want to log in as.
Then 

`run echo "YOURKEYHERE" ~/.ssh/authorized_keys`

Now we need to configure PuTTy. So open PuTTy and either load a profile or start a new one. First we scroll down in the tree view to Connection > Data and put in the username we want to connect as...

![putty config](http://1.bp.blogspot.com/-oYtOIQEPgV0/TaL3d9ld-dI/AAAAAAAAAOY/lt6Ugaf9E0A/s1600/auto-username.png)

Then you move to Connection > SSH > Auth and enter the private key file that puttygen created...

![putty config](http://2.bp.blogspot.com/-mGRlfc_0eTc/TaL3rW1MmOI/AAAAAAAAAOg/yXxVcK29u1s/s1600/identity-file.png)

Now save this profile so you can just fire up the connection in future and away you go...

Now my git push doesn't bother me for a password.

There are obvious security concerns with passwordlessness so be mindful!
