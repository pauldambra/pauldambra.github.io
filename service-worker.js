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

var precacheConfig = [["/_includes/blogListItem.html","ed103e93e649ccd2a5995f181e0f4a92"],["/_includes/footer.html","bb0c6cc60a3825b64dc4051effeb6956"],["/_includes/header.html","87fcb32df2d5fea435282c75d176d6bd"],["/_includes/image.html","713d3d3c715221b01e7b5dc305969752"],["/_includes/openGraph.html","7670917808ad289d2cd1ed02ac8a9482"],["/_includes/post_header.html","4a20814596f2b8e4fde1158f676bbeca"],["/_includes/structuredData.html","600a920945f1ebe290f130272c4938f5"],["/_includes/tags.html","4cd1f148224f26d655629d618d4e8c46"],["/_layouts/amp-post.html","38f3c0b5357060351778385576ebf58d"],["/_layouts/default.html","79d82709256ec41a958d209a0af00e96"],["/_layouts/post.html","de3c97cfb1bb8556fb54348f9f26924d"],["/_layouts/sitemap.html","46b287d626c053cc0ba92d89c53c5f1e"],["/categories.html","c078ad4f5bf0774139c2378717870c0c"],["/images/ABC.png","7a8d584a4892ed2d3fbab9d02d6145b7"],["/images/AMP-webmaster.png","609bc22a214b7b73165b76801eb2a46c"],["/images/GitHub-Mark-Light-32px.png","5677b96d59ca67965dc8bea587117495"],["/images/affordance-loggedin.png","9cd36606629930b01d2806eaef333991"],["/images/affordance-loggedout.png","971cb9cff9ba746f12f6b6c001914461"],["/images/agilecam.jpg","e9a2d1853e22f76649584b0ebca90010"],["/images/beach.jpg","2b478fe0791469286e93a727d8ab5551"],["/images/blackberry-screenshot.png","c55e8b765b472803e56c55379f0d6295"],["/images/both.png","c9aab6a20302fac9af04f10d42dc61a7"],["/images/cardboard.jpg","9750f995018229c5b323bbaf432c033b"],["/images/chickens.jpg","dfcbffc1a76ca67314ca54d9bcce1d93"],["/images/code.png","186f8ac5658a4c2dbfd57b7c8ce34839"],["/images/common-language.jpg","59c52274e89e4a977cc5920bd59ef29b"],["/images/facebook-black-32.png","00be10b069f57e5ed2ce929953837645"],["/images/fifteen-dependencies.png","f9cd23400bba5223c3060884c0ef453c"],["/images/home404.png","7236b5940cc80e8655da7ab6d29addd4"],["/images/homeBare.png","e9e7e36d4ef9db28a1766fa99c2b9db7"],["/images/homeCarousel.png","121c719715f0f14ccf0ed6484b683076"],["/images/homeFull.png","d6ff5fddc49581b59ff0f6635c309621"],["/images/icons/icon-128x128.png","49ed1bc846441fe75ef4c5d2121eadee"],["/images/icons/icon-144x144.png","1826954195a5ef5e335c4a0c6d8b5de8"],["/images/icons/icon-152x152.png","e527df167beeade145a586943e99803f"],["/images/icons/icon-192x192.png","1fb110950b622f5f9b8436f50255a1ec"],["/images/icons/icon-384x384.png","8f57eca3af59770543f9417c27e47cb1"],["/images/icons/icon-512x512.png","903cc86eb97a819b089ff4926dd95a36"],["/images/icons/icon-72x72.png","c5fe0cec4accdc6be1a9e3db2290b998"],["/images/icons/icon-96x96.png","523efb69c88bc3d5241a19124e123614"],["/images/ideal-board.jpg","27e82ae04f8cc2bc30c1898c94782045"],["/images/initial-commit-log.png","1f230e8e4ecf9e63823c380acaf9cb69"],["/images/integrates-with-github.png","0cac56caaa6ba525b0ad69fee7fc47c6"],["/images/interactive-spelling.png","a2def282d9417b39dc85544fb068e926"],["/images/logo.png","dc6c0ae1177f94f351f6e87d0e2f45af"],["/images/mockup_5.png","43e0acda624d81acd0aace7d6d1348a5"],["/images/nonewline.png","939954cc136f49b20524bb1b933c68a6"],["/images/npm-run.png","06d99d86686d9d527439eff3e1db702d"],["/images/objects.png","0018a954176d95ab53b328d9ef7ac4d3"],["/images/one-board.jpg","dfe574eb355e900864d2d9815c2bd02e"],["/images/personal-access-tokens.png","ba0f080489be3a5188ab402410868c2b"],["/images/radar.jpg","d3904ed53da8bb1b6a8ef9cc963d1a52"],["/images/reactotype_screenshot.png","d53834a112f6e15d91ab47e513a7f609"],["/images/rss.svg","f2a2d26956a21bc4c1e262c13b86b92c"],["/images/run-nightwatch.png","0c57dd3da382616c049d6ce82b0788f0"],["/images/run2.0.jpg","9b11b90be80c347c14ab45c336a1f2a7"],["/images/structs.png","59480b596b53b143ed8b176d62d75e18"],["/images/structured-data-crawled.png","ade058e44afa942ee2e51bcfbb580281"],["/images/tada.png","1e686d96f172ed357910626ad0373c6b"],["/images/tag.svg","34a504803dc8f5e431aae1dd5e0e9d6a"],["/images/the-chart-1.png","c06a2b17dffed26deba4f329cf5c9b95"],["/images/the-discussion.png","560aad24c3707cf0ccd80490ad7aff9c"],["/images/the-graph.png","45327961f22e249f5f2c8b7d9a8f33fa"],["/images/the-quadrants.png","05c018a9534a7af3839384f34e753cc3"],["/images/toot.png","d1522a75f643380ee5c81b28be6fa05d"],["/images/travis.png","358b042b18fa88f835a07569b4cd021b"],["/images/twitter-32.png","43451e4380de91afaa5d87ee00ae88b1"],["/images/twitter-black-32.png","0f86b2e8dd0dd9d4a6019c92e49d5555"],["/images/unhappiness.png","b1201c1aa3a81b02934190d3ba2c12f9"],["/images/votes.png","5372d645a8af4a78b831c15c739f5179"],["/images/yarn-desc.png","e8615ece480d01dc475859b44c3950ea"],["/images/yarn-run.png","6410645f675138ba42d3ce0ac0fd93b3"],["/index.html","4c08298006681c6070f39a967d8bd93a"],["/tags.html","4d16e7dacb820db78674efb2c8154a03"]];
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







