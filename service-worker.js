/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/2009/05/anonymous-methods-when-invoking-in-vb.html","3ceabf869fd403749c9dafb0d41e4ab1"],["/2009/10/bing-is-not-search-engine.html","71a8dc0c1388becd81c466ac9877577f"],["/2009/10/quack-quack-says-duck.html","264638cd05da73b39a3d91c05ae3dca8"],["/2009/12/c-background-worker.html","1507bed53aae67cfadcc3fd54a1b5290"],["/2010/03/quack-quack-says-duck-now-with-added.html","a51cdc85af0885d3ab6775c8d2d5d293"],["/2010/05/theres-more-in-them-that-hills.html","dec7f5df1c37994733ed7d5a2c8018f7"],["/2010/08/odd-odd-odd-login-behaviour.html","f99675787b5a2fd5205ee4e9439687f2"],["/2010/10/refactor-fun.html","9aca360b54d0d34b789f37800ef83590"],["/2011/04/ssh-without-password.html","d038ae10b194a4bb85a9000b3e7af702"],["/2011/06/get-with-programming.html","054179bb06664320212c528aed9f576c"],["/2011/08/how-to-design-unsubscribe-link.html","c34573594485b13820a800a00eaa9f2f"],["/2011/09/unusbscribey-follow-up.html","269dd7fb18046832334b5db387fd190d"],["/2011/11/blackberry-desktop-software-design.html","e295a89ab6416330d795477f382d174e"],["/2012/01/setting-up-mvc3-website-using-built-in.html","d50169244b11cfb6c32578fa8b47b1dd"],["/2012/02/is-there-really-just-ipad-market.html","d5ebeec82e4a1aa7ee2261302fc6a282"],["/2012/07/y-u-no-sell-downloads-hollywood.html","b207fb68ebbdc0aea84998eb8a1bebd7"],["/2012/09/obligatory-ios6-maps-post.html","2e7d9c95ee5288aa56be4e0b800d72de"],["/2013/03/automagical-search-ux.html","8d6e6fb6469e96e067e64ca8c59b6753"],["/2013/11/astronomical-database-identfier.html","bfbe1b596cfca551c03059241eb323bc"],["/2014/01/comparing-mongodb-and-tokumx.html","547592d3a5e763423a16ece695d4ce32"],["/2014/02/websites-cms.html","0d088a9ef5f29c9c47d9e03691100845"],["/2014/03/testing-with-browserstack-and-selenium.html","28badc9b70ec69edf62727ce82ee1e65"],["/2014/03/website-cms-display-pages-part-2.html","627995f527a2dcdf14caaf3312572b29"],["/2014/03/websites-cms-displaying-pages.html","15cdbd6afe1e8cdc393fcec1d3516734"],["/2014/04/a-dto-by-any-other-name-would-implement.html","774f62541737ec27a918d9dd0d1e61c5"],["/2016/yarn.html","96d614f0c9ef6a9260cc0bf3d4848fff"],["/2017/05/big-pile-of-soil.html","ae98c7e68dc905e4e714d4b8403f2733"],["/2017/05/ubictionary.html","ca0fb7db54578df03d9cfedb606bb812"],["/2017/06/radarban.html","2b9a909efa91fab090ef1ca89377b55a"],["/2017/07/retrosperiment.html","067b9e87451ee339032873cde0deb4af"],["/2017/generating-static-amp.html","db219a9a6791bda6adfa85eb0296d715"],["/2017/testing-static-sites.html","6eda07a570be8f7495a1f768114e400b"],["/On-Page-Editing.html","23f54efc150ce2d002630170bc06c8b2"],["/Websites-CMS-Platform-Storing-Data.html","ddb56699708aa079f6b8d7e9031f5794"],["/Websites-CMS-Platform-Storing-Data2.html","4fa386676caa0224caf621ef334eb23d"],["/Websites-CMS-Platform-promises-part-2.html","80e549ef14b352bb2c5f6d14c0af4a8e"],["/Websites-CMS-Platform-promises.html","f2dc15d792d8fc341de78dcd6a6f17f4"],["/amp/2009/05/anonymous-methods-when-invoking-in-vb/index.html","db9088e8a0e258987c3eb2071273f348"],["/amp/2009/10/bing-is-not-search-engine/index.html","dde3437eba40433b5619ab3d82c4a2d0"],["/amp/2009/10/quack-quack-says-duck/index.html","58a72f57523e465b32e80374a15902dd"],["/amp/2009/12/c-background-worker/index.html","8d8e1d74d63c1c708ddaefddb7574865"],["/amp/2010/03/quack-quack-says-duck-now-with-added/index.html","c188e1b26fd4c3dafb49dfd67d0d3302"],["/amp/2010/05/theres-more-in-them-that-hills/index.html","d2ff8e8090247dc85081c6be0366a043"],["/amp/2010/08/odd-odd-odd-login-behaviour/index.html","b50659894d55a4d285c1a2f9c3d4c4dc"],["/amp/2010/10/refactor-fun/index.html","b22479c8924ecf2cfd1723c8a618344b"],["/amp/2011/04/ssh-without-password/index.html","9872313b057ee863dbf30547a4e8a285"],["/amp/2011/06/get-with-programming/index.html","0a752f493b120a8bd3e75856e7ced709"],["/amp/2011/08/how-to-design-unsubscribe-link/index.html","13d225db54d6f119677f3b991635a1a9"],["/amp/2011/09/unusbscribey-follow-up/index.html","85dabf6e7dcb9660e231f2001e620c5f"],["/amp/2011/11/blackberry-desktop-software-design/index.html","d4f3f409e0133fd5b7a84b63795d5c39"],["/amp/2012/01/setting-up-mvc3-website-using-built-in/index.html","3b141b96912055c83bb5aefe0cf1dab1"],["/amp/2012/02/is-there-really-just-ipad-market/index.html","6654cf29440bbdd8b65f7e6f288f25dd"],["/amp/2012/07/y-u-no-sell-downloads-hollywood/index.html","525a9ff3dba44ad085eaf433ca6226bd"],["/amp/2012/09/obligatory-ios6-maps-post/index.html","74a71bf4e9f1d6a7707fbbb2fc98da9b"],["/amp/2013/03/automagical-search-ux/index.html","bc715224d85ec6c2b8caa5479bc0b8f4"],["/amp/2013/11/astronomical-database-identfier/index.html","5d5f7e33a45a6905e56067bd4502efbd"],["/amp/2014/01/comparing-mongodb-and-tokumx/index.html","3cc72e01f630bc7a1963e02b26b72213"],["/amp/2014/02/websites-cms/index.html","9e88749345bba4c9436fb0940eafc77a"],["/amp/2014/03/testing-with-browserstack-and-selenium/index.html","4322987703467e941c8132a96dab1064"],["/amp/2014/03/website-cms-display-pages-part-2/index.html","f1f64272f0e3dc54563f54e856ddd383"],["/amp/2014/03/websites-cms-displaying-pages/index.html","9a32be2a9d0bc931058ad4200f05dda1"],["/amp/2014/04/a-dto-by-any-other-name-would-implement/index.html","7f8339f3ddc79f97b1bb33fd8fbff1ee"],["/amp/2016/yarn/index.html","aacb527390062bd6528f554591a19afb"],["/amp/2017/05/big-pile-of-soil/index.html","cf8e1654945983d5888eb683087228ac"],["/amp/2017/05/ubictionary/index.html","84a39ff410e341a938d6dee8c6707ee8"],["/amp/2017/06/radar/index.html","12e92f4a45f26c3aad8e9f7cb2da274d"],["/amp/2017/07/retrosperiment/index.html","6f3a5427bc9c0e9d9239ff593d2a4176"],["/amp/2017/generating-accelerated-mobile-pages/index.html","d075b7a8dc358acf15d06e1945dcb1dd"],["/amp/2017/testing-static-html/index.html","bfd42f2e856d1562b9f26d6e2c1783b2"],["/amp/On-Page-Editing-Is-The-Future/index.html","e5c8b11ecbabb922b1d7c74d071d8f67"],["/amp/Websites-CMS-Platform-Storing-Data/index.html","f028adf53c5d777463d4987e38cfc47f"],["/amp/Websites-CMS-platform-storing-data-2/index.html","ea2971719bb91be762af91d62696690a"],["/amp/better-affordance-2/index.html","838bcd1d27063e220ced9fe6e0051772"],["/amp/better-affordance/index.html","d3908ea39d24a0fff91b1a20a578009e"],["/amp/fun-with-structs/index.html","a75b1cc99bdd42f3ac451ebdfba6fd8a"],["/amp/happy-numbers-kata/index.html","fcae089799a58a35e07b88add59c5cb4"],["/amp/kill-if-with-objects/index.html","b4c5f3714263653523d324e5da7b8401"],["/amp/logging-in/index.html","37b787ffe98add0b83b32a291183e5c7"],["/amp/powershell-on-linux/index.html","315fd21a58789bd549c59e1ffe62bf98"],["/amp/promises-part-2/index.html","ea9ed8b56e42c9c62cff85503c4ccdef"],["/amp/promises/index.html","de2b9c1eb62f672c596fa9be85e31169"],["/amp/rake-transforms/index.html","c361aa82e52f92a7e67ad44b67143e10"],["/amp/reactotype/reactotype-1/index.html","3fbd339476a17f057b1628a99a3d9ff3"],["/amp/reactotype/reactotype-2/index.html","dd58bcd871a602b4a1b6074c0f306d85"],["/amp/reactotype/reactotype-3/index.html","4f9fd163e80b8f13f34dbf0d3e5716a1"],["/amp/realworld-engineering/index.html","115a1f038b41047c61e580b548fe00f3"],["/amp/static-factory-methods/index.html","b3957e4afaa83c73b5dbfb335d8367ae"],["/amp/structured-data-with-jekyll/index.html","9d1ae50d4cdf4f6bf4e543b4ca49f5ca"],["/amp/travis-to-build-jekyll/index.html","4adc764e75b7267c7ec200f29a299a99"],["/amp/wrapping-up/index.html","40248609b43364c5a8b17c42fed3393f"],["/better-affordance-js.html","0893e10a3473c422f4a0f5153f3f4172"],["/better-affordance.html","7ab38cc2934b6fcb31a88ae9974532b5"],["/categories.html","a8693c9a27362a37b58d300e350d4150"],["/fun-with-structs.html","b824b35602fabf73330efe87db23dea9"],["/happy-numbers-kata.html","3eeea1dd32a118cfa003af7a9b00f40c"],["/images/ABC.png","7a8d584a4892ed2d3fbab9d02d6145b7"],["/images/AMP-webmaster.png","609bc22a214b7b73165b76801eb2a46c"],["/images/GitHub-Mark-Light-32px.png","5677b96d59ca67965dc8bea587117495"],["/images/affordance-loggedin.png","9cd36606629930b01d2806eaef333991"],["/images/affordance-loggedout.png","971cb9cff9ba746f12f6b6c001914461"],["/images/beach.jpg","2b478fe0791469286e93a727d8ab5551"],["/images/both.png","c9aab6a20302fac9af04f10d42dc61a7"],["/images/cardboard.jpg","9750f995018229c5b323bbaf432c033b"],["/images/chickens.jpg","dfcbffc1a76ca67314ca54d9bcce1d93"],["/images/code.png","186f8ac5658a4c2dbfd57b7c8ce34839"],["/images/common-language.jpg","59c52274e89e4a977cc5920bd59ef29b"],["/images/facebook-black-32.png","00be10b069f57e5ed2ce929953837645"],["/images/fifteen-dependencies.png","f9cd23400bba5223c3060884c0ef453c"],["/images/home404.png","7236b5940cc80e8655da7ab6d29addd4"],["/images/homeBare.png","e9e7e36d4ef9db28a1766fa99c2b9db7"],["/images/homeCarousel.png","121c719715f0f14ccf0ed6484b683076"],["/images/homeFull.png","d6ff5fddc49581b59ff0f6635c309621"],["/images/icons/icon-128x128.png","49ed1bc846441fe75ef4c5d2121eadee"],["/images/icons/icon-144x144.png","1826954195a5ef5e335c4a0c6d8b5de8"],["/images/icons/icon-152x152.png","e527df167beeade145a586943e99803f"],["/images/icons/icon-192x192.png","1fb110950b622f5f9b8436f50255a1ec"],["/images/icons/icon-384x384.png","8f57eca3af59770543f9417c27e47cb1"],["/images/icons/icon-512x512.png","903cc86eb97a819b089ff4926dd95a36"],["/images/icons/icon-72x72.png","c5fe0cec4accdc6be1a9e3db2290b998"],["/images/icons/icon-96x96.png","523efb69c88bc3d5241a19124e123614"],["/images/ideal-board.jpg","27e82ae04f8cc2bc30c1898c94782045"],["/images/initial-commit-log.png","1f230e8e4ecf9e63823c380acaf9cb69"],["/images/integrates-with-github.png","0cac56caaa6ba525b0ad69fee7fc47c6"],["/images/logo.png","dc6c0ae1177f94f351f6e87d0e2f45af"],["/images/nonewline.png","939954cc136f49b20524bb1b933c68a6"],["/images/npm-run.png","06d99d86686d9d527439eff3e1db702d"],["/images/objects.png","0018a954176d95ab53b328d9ef7ac4d3"],["/images/one-board.jpg","dfe574eb355e900864d2d9815c2bd02e"],["/images/personal-access-tokens.png","ba0f080489be3a5188ab402410868c2b"],["/images/radar.jpg","d3904ed53da8bb1b6a8ef9cc963d1a52"],["/images/reactotype_screenshot.png","d53834a112f6e15d91ab47e513a7f609"],["/images/rss.svg","f2a2d26956a21bc4c1e262c13b86b92c"],["/images/run-nightwatch.png","0c57dd3da382616c049d6ce82b0788f0"],["/images/run2.0.jpg","9b11b90be80c347c14ab45c336a1f2a7"],["/images/structs.png","59480b596b53b143ed8b176d62d75e18"],["/images/structured-data-crawled.png","ade058e44afa942ee2e51bcfbb580281"],["/images/tada.png","1e686d96f172ed357910626ad0373c6b"],["/images/tag.svg","34a504803dc8f5e431aae1dd5e0e9d6a"],["/images/the-chart-1.png","c06a2b17dffed26deba4f329cf5c9b95"],["/images/the-discussion.png","560aad24c3707cf0ccd80490ad7aff9c"],["/images/the-graph.png","45327961f22e249f5f2c8b7d9a8f33fa"],["/images/the-quadrants.png","05c018a9534a7af3839384f34e753cc3"],["/images/travis.png","358b042b18fa88f835a07569b4cd021b"],["/images/twitter-32.png","43451e4380de91afaa5d87ee00ae88b1"],["/images/twitter-black-32.png","0f86b2e8dd0dd9d4a6019c92e49d5555"],["/images/unhappiness.png","b1201c1aa3a81b02934190d3ba2c12f9"],["/images/votes.png","5372d645a8af4a78b831c15c739f5179"],["/images/yarn-desc.png","e8615ece480d01dc475859b44c3950ea"],["/images/yarn-run.png","6410645f675138ba42d3ce0ac0fd93b3"],["/index.html","3d109c6520af734d966660050699dcd0"],["/kill-if-with-objects.html","4280469053e7bd6734178fee460563fc"],["/page2/index.html","4962f5618ff8d592d544f76b1d74f549"],["/page3/index.html","64d525c9d0a48591f0a316813e6e0d3b"],["/page4/index.html","8655f435b1f83f98375cb525925c6b28"],["/page5/index.html","154d36350d1141fe7a3586fda632fefc"],["/powershell-on-linux.html","70055b3e6db336418816c5b0b4d77854"],["/rake-transforms.html","1b119957a85c03e357858985b8ea67b8"],["/reactotype/part-one.html","2dcc729e89c5021aa8474303c1e5fd10"],["/reactotype/part-three.html","eab44d7d5b8421e14f928703b37f8fee"],["/reactotype/part-two.html","d3ee36cad6ec04a069d848e739ca107d"],["/real-vs-soft.html","ef967595cd56b2d49c4421a893dd3fc1"],["/static-factory-methods.html","f21d3969eff85596b68841b02e40647d"],["/structured-data-with-jekyll.html","058a0d25dc10070a0eea7361e2465115"],["/tags.html","9869d24629b0dc1be53835a35ebe0e1c"],["/using-travis-to-build-jekyll.html","605b67bedda5d19bd8dfb41a6d15c7cc"],["/websites-CMS-platform-logging-in.html","3d872bec4f8c39dcc1c465c18972c9c9"],["/wrapping_up.html","bd90978c959f5425219d78dad5cda071"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







