---
title: "Setting up an MVC3 website using built-in membership provider"
layout: "post"
permalink: "/2012/01/setting-up-mvc3-website-using-built-in.html"
date: "2012-01-12 13:38:00"
updated: "2012-01-12 13:38:33"
category: rant
tags: [mvc, visual-studio, membership-provider]
---

Oh wait... this is awful. AWRUCHKA. Right dry heaving done with.

It's a good job so few websites want to authenticate users and collect data on them otherwise we'd constantly have to write the same code ove... what's that? Oh my! Everyone is going through this.

<!--more-->

Jesus no wonder people bang on about RoR. It makes this *easy* in comparison

Anyway - I'll forget how to do this before I have to do it again

So

 * fire up a new MVC3 web application
 * Jump into nuget and Install-Package System.Web.Providers&nbsp;
 * Sort out a connection string for SQL CE
 * Add a key to make sure the login link always points to `LogOn`

Now my `web.config` looks like this (edited out parts I haven't touched for something approximating brevity)

```xml
<?xml version="1.0" encoding="utf-8"?>
<!--
  For more information on how to configure your ASP.NET application, please visit
  http://go.microsoft.com/fwlink/?LinkId=152368
  -->
<configuration>
  <connectionStrings>
    <add name="users" connectionString="Data Source=|DataDirectory|users.sdf;"
      providerName="System.Data.SqlServerCe.4.0"/>
    </connectionStrings>
  <appSettings>
    <add key="webpages:Version" value="1.0.0.0" />
    <add key="ClientValidationEnabled" value="true" />
    <add key="UnobtrusiveJavaScriptEnabled" value="true" />
    <add key="loginUrl" value="~/Account/LogOn" />
  </appSettings>
  <system.web>
    <authentication mode="Forms">
      <forms loginUrl="~/Account/LogOn" timeout="2880" />
    </authentication>
    <membership defaultProvider="DefaultMembershipProvider">
      <providers>
        <clear />
        <add name="DefaultMembershipProvider" type="System.Web.Providers.DefaultMembershipProvider, System.Web.Providers, Version=1.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" connectionStringName="users" enablePasswordRetrieval="false" enablePasswordReset="true" requiresQuestionAndAnswer="false" requiresUniqueEmail="false" maxInvalidPasswordAttempts="5" minRequiredPasswordLength="6" minRequiredNonalphanumericCharacters="0" passwordAttemptWindow="10" applicationName="/" />
      </providers>
    </membership>
    <profile defaultProvider="DefaultProfileProvider">
      <providers>
        <clear />
        <add name="DefaultProfileProvider" type="System.Web.Providers.DefaultProfileProvider, System.Web.Providers, Version=1.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" connectionStringName="users" applicationName="/" />
      </providers>
    </profile>
    <roleManager enabled="false" defaultProvider="DefaultRoleProvider">
      <providers>
        <clear />
        <add name="AspNetWindowsTokenRoleProvider" type="System.Web.Security.WindowsTokenRoleProvider" applicationName="/" />
        <add name="DefaultRoleProvider" type="System.Web.Providers.DefaultRoleProvider, System.Web.Providers, Version=1.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" connectionStringName="users" applicationName="/" />
      </providers>
    </roleManager>
    <sessionState mode="InProc" customProvider="DefaultSessionProvider">
      <providers>
        <add name="DefaultSessionProvider" type="System.Web.Providers.DefaultSessionStateProvider, System.Web.Providers, Version=1.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" connectionStringName="DefaultConnection" applicationName="/" />
      </providers>
    </sessionState>
  </system.web>
</configuration>
```

Now start a debug session for the web app. Click logon. Click Register. Fill in the form. Register. Click Logoff and stop the debug session in Visual Studio

You can see the new SQL CE database and have a look at the schema. The Memberships and Users tables have a new row. The new user. 

![ssms screenshots](http://4.bp.blogspot.com/-w1VYrhrRydw/Tw7Aak9b3tI/AAAAAAAAAWw/dQllCHJ7Qjo/s1600/new-sdf-file.PNG)

![ssms screenshots](http://2.bp.blogspot.com/-y4bJjVXY8js/Tw7AcoHn8lI/AAAAAAAAAW4/hnLZO6ShvaQ/s1600/schema.PNG)

![ssms screenshots](http://2.bp.blogspot.com/-tkP3-E66KgQ/Tw7Ad9z8n1I/AAAAAAAAAXA/Vcu-JkjCZrc/s1600/memberships.PNG)

![ssms screenshots](http://1.bp.blogspot.com/-Q83_Po9kXN4/Tw7AfVHsCcI/AAAAAAAAAXI/AvdnqwrMTvA/s1600/users-table.PNG)

Hurrah - all the information you'll ever need is collected.

What?! You want to know more than name and email. Now *that's* a turn up for the books.

It turns out you can store key-value pairs in the profiles table. I think that anyone that wrote ASP dot Net websites will be old-hand at this but I've never had to do that or this...

While you can do magic up a key-value pair whenever you feel the need to in your code it's probably better to use one of these new fangled Class thing-a-ma-bobs

```csharp

using System;
using System.Web.Profile;

namespace AcrHack.Models
{
    public class CustomProfile : ProfileBase
    {
        //magic string
        public static string ADDRESS = "address";

        public string Address
        {
            get { return this[ADDRESS] as String; }
            set { this[ADDRESS] = value; }
        }
    }
}
```

Now a quick edit to the web config above so that the providers opening tag becomes

```xml
<profile defaultprovider="DefaultProfileProvider" inherits="AcrHack.Models.CustomProfile"/>
```

which makes the Profile Provider aware of the new Profile class

Next step is to find the `RegisterModel` (this could just as easily be the `CreateModel` or some other model) and add an Address field

```csharp
public class RegisterModel
{
    [Required]
    [Display(Name = "User name")]
    public string UserName { get; set; }

    [Required]
    [DataType(DataType.EmailAddress)]
    [Display(Name = "Email address")]
    public string Email { get; set; }

    [Required]
    [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
    [DataType(DataType.Password)]
    [Display(Name = "Password")]
    public string Password { get; set; }

    [DataType(DataType.Password)]
    [Display(Name = "Confirm password")]
    [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
    public string ConfirmPassword { get; set; }
    
    //Added Address field
    [Required]
    public string Address { get; set; }
}
```

and edit the Register method in the controller

```csharp

[HttpPost]
public ActionResult Register(RegisterModel model)
{
    if (ModelState.IsValid)
    {
        // Attempt to register the user
        MembershipCreateStatus createStatus;
        Membership.CreateUser(model.UserName, model.Password, model.Email, null, null, true, null, out createStatus);

        if (createStatus == MembershipCreateStatus.Success)
        {
            FormsAuthentication.SetAuthCookie(model.UserName, false);
            //Changes here
            //Create loads or creates a profile based on searching for username
            var userProfile = ProfileBase.Create(model.UserName) as CustomProfile;
            userProfile.Address = model.Address;
            userProfile.Save();
            //End of changes
            return RedirectToAction("Index", "Home");
        }
        else
        {
            ModelState.AddModelError("", ErrorCodeToString(createStatus));
        }
    }

    // If we got this far, something failed, redisplay form
    return View(model);
}
```

*and* finally edit the view to add an editor field for the new property. (I'll leave that as an exercise for the reader)

Now we can go back to the Register page

![register page](http://2.bp.blogspot.com/-TZWnNTSKRvY/Tw7HgUSY_jI/AAAAAAAAAXQ/zFssEVG51_4/s1600/new+registration+form+bit.PNG)

Register and then have a look in the profile table.

![profile table](http://4.bp.blogspot.com/-oKVRwA7UVxM/Tw7Hnkm1AfI/AAAAAAAAAXY/hHvXOXRF3ug/s1600/persistedproperty.PNG)

Ta da!

So there's a mechanism for extending the default profile. 

Honestly, it feels messy and since at this point if there's a need for any data access layer then since there'll be a link on user name or user id anyway it's likely a better idea to have the additional data in the DAL and fangle the authentication and user models together in a `ViewModel`.

Having gone away and checked some code committed on another project by the lovely [OrangeTentacle](http://www.orangetentacle.co.uk/) that's just what he's done. So having figured it out for myself I'll probably just go and crib off his much tidier code

Additional Reading:

[`Simple.Web.Providers` announcement](http://www.hanselman.com/blog/IntroducingSystemWebProvidersASPNETUniversalProvidersForSessionMembershipRolesAndUserProfileOnSQLCompactAndSQLAzure.aspx)

