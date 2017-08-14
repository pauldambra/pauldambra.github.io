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

var precacheConfig = [["/2009/05/anonymous-methods-when-invoking-in-vb.html","43daeef264bdf5f78acad817008fbcc9"],["/2009/10/bing-is-not-search-engine.html","656f50d86b4530310f45022db5132926"],["/2009/10/quack-quack-says-duck.html","6a7d53e62733b3ab614fce8998a01153"],["/2009/12/c-background-worker.html","3883a566026c01b710656cf39e486195"],["/2010/03/quack-quack-says-duck-now-with-added.html","b3c4db874154f0b5f2f9b344bb094a7b"],["/2010/05/theres-more-in-them-that-hills.html","e692b14b0ad86489efd928d41082f271"],["/2010/08/odd-odd-odd-login-behaviour.html","2c8066bc06de1b7d43c522f1c91aebda"],["/2010/10/refactor-fun.html","c5dcefe8d3c648eaa31b31f478b056b4"],["/2011/04/ssh-without-password.html","7163a0487f021f096b537123582d6526"],["/2011/06/get-with-programming.html","af2a0a35973d70fc3a95e7bcab285875"],["/2011/08/how-to-design-unsubscribe-link.html","1b1b00a59a3aca8c9eb97960b1f0287f"],["/2011/09/unusbscribey-follow-up.html","be370ab35b462e71e0f725a88718ab06"],["/2011/11/blackberry-desktop-software-design.html","ad016366810f2c4435401f3cfcd84d56"],["/2012/01/setting-up-mvc3-website-using-built-in.html","ea8ef6d6bc2ed07a350a5d3ffff83c6c"],["/2012/02/is-there-really-just-ipad-market.html","db96466f911ca1edd5ce33be96513d5c"],["/2012/07/y-u-no-sell-downloads-hollywood.html","709547530676ddb92f9e05323ff8462d"],["/2012/09/obligatory-ios6-maps-post.html","186f6cc06e8ea1718d88274549e4e0dd"],["/2013/03/automagical-search-ux.html","a4cb0d4e29091033fd2223c037285bdb"],["/2013/11/astronomical-database-identfier.html","15988615c4e9a5a4e3447eb452ebe2fc"],["/2014/01/comparing-mongodb-and-tokumx.html","31a4bd99216da8cc3cac864069613023"],["/2014/02/websites-cms.html","a955b5a5bf88bb369cf91d92c036dce5"],["/2014/03/testing-with-browserstack-and-selenium.html","a1a6f7875c382d8b5f5b8258b9cd0630"],["/2014/03/website-cms-display-pages-part-2.html","74d41cef1c8b8269ef66dc092ecb1a98"],["/2014/03/websites-cms-displaying-pages.html","9c7d412bc804e3a6d60cb7b65da4058f"],["/2014/04/a-dto-by-any-other-name-would-implement.html","4f4152683043ebdeafe8ab9c8bea013c"],["/2016/yarn.html","ddfd53de87a15ddb70f73eadb3dc7e36"],["/2017/05/big-pile-of-soil.html","84e5c229c838f3fba7059fa95bd88a74"],["/2017/05/ubictionary.html","750d91ce88921b430ff74583c940272b"],["/2017/06/radarban.html","7557abc62eb29226e32d47c3d03d2a51"],["/2017/07/retrosperiment.html","39756acb0bcebe7d6a78ec46b91322cf"],["/2017/generating-static-amp.html","55965ee5e70c96d575551afbe72548ea"],["/2017/testing-static-sites.html","f156ef40c83647cd0ee0196bbbf6eb06"],["/On-Page-Editing.html","3c0030b775bf8b9e8629cc195371b660"],["/Websites-CMS-Platform-Storing-Data.html","374bdefbe5c54f95e8835128d889258f"],["/Websites-CMS-Platform-Storing-Data2.html","20534d60f45f9532652ed37e3e8c24e9"],["/Websites-CMS-Platform-promises-part-2.html","3f54f72f22ec8e2f5dd5ee483e627e79"],["/Websites-CMS-Platform-promises.html","ac224a74c5d75ea092661ae6ed9b9830"],["/amp/2009/05/anonymous-methods-when-invoking-in-vb/index.html","c38aa99d54c3958a2b88144e45bd646e"],["/amp/2009/10/bing-is-not-search-engine/index.html","553da2b86d1a779978ef46851592b8a5"],["/amp/2009/10/quack-quack-says-duck/index.html","8b844cb50d546ac8bd61bf3770578e11"],["/amp/2009/12/c-background-worker/index.html","f636165e641eab0dd699116d07dc7289"],["/amp/2010/03/quack-quack-says-duck-now-with-added/index.html","fc44ad1d88e68d559a2aca04093cda50"],["/amp/2010/05/theres-more-in-them-that-hills/index.html","0d56a3acc66b1265fcdf1b05e33ed6ec"],["/amp/2010/08/odd-odd-odd-login-behaviour/index.html","830b1dc2fbef963bd257facdfa979326"],["/amp/2010/10/refactor-fun/index.html","fda4532a63da584aba00ec79e9089a5b"],["/amp/2011/04/ssh-without-password/index.html","837d3b661c74cacc3515c16e677eec70"],["/amp/2011/06/get-with-programming/index.html","4d9578c75c551b4efeb6cb350bb01822"],["/amp/2011/08/how-to-design-unsubscribe-link/index.html","49a45bb8f5047be93f42672141b3ad62"],["/amp/2011/09/unusbscribey-follow-up/index.html","eb989d995ebb72bccf0ab91ab6d26187"],["/amp/2011/11/blackberry-desktop-software-design/index.html","97cf25184310b3bc7b64e870a19358d4"],["/amp/2012/01/setting-up-mvc3-website-using-built-in/index.html","c1c4300feb7e69fc26600a59787cd1b6"],["/amp/2012/02/is-there-really-just-ipad-market/index.html","e2a6218e4ecfb5209b4251c1a4de420d"],["/amp/2012/07/y-u-no-sell-downloads-hollywood/index.html","32ab19ab45150590577f9054716f9739"],["/amp/2012/09/obligatory-ios6-maps-post/index.html","5c09ec461ad473a65f5f997c2353bada"],["/amp/2013/03/automagical-search-ux/index.html","4b1019412f08da8054af4db98ab1e129"],["/amp/2013/11/astronomical-database-identfier/index.html","516845280e6831668ddc22739f448c35"],["/amp/2014/01/comparing-mongodb-and-tokumx/index.html","b44236335b7e05aefc33ddbb0c318bd7"],["/amp/2014/02/websites-cms/index.html","6ece4b7b6b35f894067c2d1fa7a5b9c0"],["/amp/2014/03/testing-with-browserstack-and-selenium/index.html","31b7f4bc07d22a5818b2a18c297ee3e2"],["/amp/2014/03/website-cms-display-pages-part-2/index.html","7cc0369cba617010a1bf5136088717cd"],["/amp/2014/03/websites-cms-displaying-pages/index.html","914378055f332c0f60998883c0e03160"],["/amp/2014/04/a-dto-by-any-other-name-would-implement/index.html","68a3cd22d088c3fa06dfabef64458529"],["/amp/2016/yarn/index.html","0e983aa1221a9de5d85002cb077f9455"],["/amp/2017/05/big-pile-of-soil/index.html","6a2433e78628c0a9125b3a8c0f49265e"],["/amp/2017/05/ubictionary/index.html","08cf30f18310af7d82980290669898dd"],["/amp/2017/06/radar/index.html","1caac5734d687333413ce7c1ae43753d"],["/amp/2017/07/retrosperiment/index.html","eb0dd6497c709f46975a6e0ba310e81e"],["/amp/2017/generating-accelerated-mobile-pages/index.html","92dc72be41b298d1ffa7fdab0ae8a990"],["/amp/2017/testing-static-html/index.html","3243e7c4fb89089a1ed7be11e948e999"],["/amp/On-Page-Editing-Is-The-Future/index.html","c2892aecce862ccd970eb113ef698e4c"],["/amp/Websites-CMS-Platform-Storing-Data/index.html","4df3a8bf83ed7ec6c2ea830ac5839b94"],["/amp/Websites-CMS-platform-storing-data-2/index.html","a6bf8f3f15b80d938f48b9f1463c00cd"],["/amp/better-affordance-2/index.html","4606becca3d076746749d28b153d51d3"],["/amp/better-affordance/index.html","e5f663228ac62b1a68ac382e4893a4f0"],["/amp/fun-with-structs/index.html","754a751a9847656e8c6c4db41ce2d5fa"],["/amp/happy-numbers-kata/index.html","183440db24fd94ff9150575664c0e971"],["/amp/kill-if-with-objects/index.html","cb7ca094a6b0020815fe7e61bd61a556"],["/amp/logging-in/index.html","14345868de97e0e08c16a1d9257b183f"],["/amp/powershell-on-linux/index.html","3e29905dd4d22a6aa9e779b3dec43c98"],["/amp/promises-part-2/index.html","a1af7432f41be79e97b8a6e8327f494b"],["/amp/promises/index.html","1fddc68d1bbd8aceea4b7ea6aa938a1f"],["/amp/rake-transforms/index.html","85650592c3f7bbdc4f3543b33d28a3e9"],["/amp/reactotype/reactotype-1/index.html","9f6546d3fdf824606d9e208f4857ca1f"],["/amp/reactotype/reactotype-2/index.html","912591eece3cf03f1c0579a8abb05853"],["/amp/reactotype/reactotype-3/index.html","fc892e98cfa58c2404f19e530d6e75f9"],["/amp/realworld-engineering/index.html","85f6c5ca3716729b35d54ddb836bb583"],["/amp/static-factory-methods/index.html","d8685f97323d9d26fd432a78979b4faf"],["/amp/structured-data-with-jekyll/index.html","89e18cb4a5357594cbb7282aced252d4"],["/amp/travis-to-build-jekyll/index.html","5deea2451e4bae5ef321f73696626fd9"],["/amp/wrapping-up/index.html","926188989520fcfd7ac7e3d306899619"],["/better-affordance-js.html","a3d15fbc1dff0dffde987972c6f16ab4"],["/better-affordance.html","255374ff5743e2e9dc0ec71833d5ba6c"],["/categories.html","98f7914e89954d3b11f11ca3ce8edceb"],["/fun-with-structs.html","bcb94af87af3912ce9d91040eba99040"],["/happy-numbers-kata.html","64b65801daa11870eb0aac4a6d659991"],["/images/ABC.png","7a8d584a4892ed2d3fbab9d02d6145b7"],["/images/AMP-webmaster.png","609bc22a214b7b73165b76801eb2a46c"],["/images/GitHub-Mark-Light-32px.png","5677b96d59ca67965dc8bea587117495"],["/images/affordance-loggedin.png","9cd36606629930b01d2806eaef333991"],["/images/affordance-loggedout.png","971cb9cff9ba746f12f6b6c001914461"],["/images/beach.jpg","2b478fe0791469286e93a727d8ab5551"],["/images/both.png","c9aab6a20302fac9af04f10d42dc61a7"],["/images/cardboard.jpg","b4e1528a1b66435a4f36f7fbc3a32fa0"],["/images/chickens.jpg","dfcbffc1a76ca67314ca54d9bcce1d93"],["/images/code.png","186f8ac5658a4c2dbfd57b7c8ce34839"],["/images/common-language.jpg","59c52274e89e4a977cc5920bd59ef29b"],["/images/facebook-black-32.png","00be10b069f57e5ed2ce929953837645"],["/images/fifteen-dependencies.png","f9cd23400bba5223c3060884c0ef453c"],["/images/home404.png","7236b5940cc80e8655da7ab6d29addd4"],["/images/homeBare.png","e9e7e36d4ef9db28a1766fa99c2b9db7"],["/images/homeCarousel.png","121c719715f0f14ccf0ed6484b683076"],["/images/homeFull.png","d6ff5fddc49581b59ff0f6635c309621"],["/images/icons/icon-128x128.png","49ed1bc846441fe75ef4c5d2121eadee"],["/images/icons/icon-144x144.png","1826954195a5ef5e335c4a0c6d8b5de8"],["/images/icons/icon-152x152.png","e527df167beeade145a586943e99803f"],["/images/icons/icon-192x192.png","1fb110950b622f5f9b8436f50255a1ec"],["/images/icons/icon-384x384.png","8f57eca3af59770543f9417c27e47cb1"],["/images/icons/icon-512x512.png","903cc86eb97a819b089ff4926dd95a36"],["/images/icons/icon-72x72.png","c5fe0cec4accdc6be1a9e3db2290b998"],["/images/icons/icon-96x96.png","523efb69c88bc3d5241a19124e123614"],["/images/ideal-board.jpg","27e82ae04f8cc2bc30c1898c94782045"],["/images/initial-commit-log.png","1f230e8e4ecf9e63823c380acaf9cb69"],["/images/integrates-with-github.png","0cac56caaa6ba525b0ad69fee7fc47c6"],["/images/logo.png","dc6c0ae1177f94f351f6e87d0e2f45af"],["/images/nonewline.png","939954cc136f49b20524bb1b933c68a6"],["/images/npm-run.png","06d99d86686d9d527439eff3e1db702d"],["/images/objects.png","0018a954176d95ab53b328d9ef7ac4d3"],["/images/one-board.jpg","dfe574eb355e900864d2d9815c2bd02e"],["/images/personal-access-tokens.png","ba0f080489be3a5188ab402410868c2b"],["/images/radar.jpg","d3904ed53da8bb1b6a8ef9cc963d1a52"],["/images/reactotype_screenshot.png","d53834a112f6e15d91ab47e513a7f609"],["/images/run-nightwatch.png","0c57dd3da382616c049d6ce82b0788f0"],["/images/run2.0.jpg","9b11b90be80c347c14ab45c336a1f2a7"],["/images/structs.png","59480b596b53b143ed8b176d62d75e18"],["/images/structured-data-crawled.png","ade058e44afa942ee2e51bcfbb580281"],["/images/tada.png","1e686d96f172ed357910626ad0373c6b"],["/images/the-chart-1.png","c06a2b17dffed26deba4f329cf5c9b95"],["/images/the-discussion.png","560aad24c3707cf0ccd80490ad7aff9c"],["/images/the-graph.png","45327961f22e249f5f2c8b7d9a8f33fa"],["/images/the-quadrants.png","05c018a9534a7af3839384f34e753cc3"],["/images/travis.png","358b042b18fa88f835a07569b4cd021b"],["/images/twitter-32.png","43451e4380de91afaa5d87ee00ae88b1"],["/images/twitter-black-32.png","0f86b2e8dd0dd9d4a6019c92e49d5555"],["/images/unhappiness.png","b1201c1aa3a81b02934190d3ba2c12f9"],["/images/votes.png","5372d645a8af4a78b831c15c739f5179"],["/images/yarn-desc.png","e8615ece480d01dc475859b44c3950ea"],["/images/yarn-run.png","6410645f675138ba42d3ce0ac0fd93b3"],["/index.html","e9824fabe44217809410ea4a87aec820"],["/kill-if-with-objects.html","cfde0d1758b68a75fee5ccaa240d2d5f"],["/node_modules/boom/images/boom.png","9616ed764d840b3a389550f642b4ff51"],["/node_modules/cli-width/coverage/lcov-report/cli-width/index.html","e24c783ae98db98685ad454fcab64930"],["/node_modules/cli-width/coverage/lcov-report/cli-width/index.js.html","44f21581f1568e6c2bcc091d88982375"],["/node_modules/cli-width/coverage/lcov-report/index.html","4aafb0a47b1f224472950d2b5f02bf4a"],["/node_modules/cli-width/coverage/lcov-report/sort-arrow-sprite.png","70204d3a4999d42a7767ef188cea1333"],["/node_modules/hawk/images/hawk.png","db4661636a00a277d0715ba758308548"],["/node_modules/hawk/images/logo.png","42adf1f72b07c8d265b5444f31eb3131"],["/node_modules/hoek/images/hoek.png","1c4f2b93d82d13ed4e86e91212db4d9f"],["/node_modules/node-pre-gyp/lib/util/nw-pre-gyp/index.html","5d9f0cacc0b6309bc395739d8ef1bce9"],["/node_modules/sprintf-js/demo/angular.html","61276ccc42eb16f69df6f9dc82527ff2"],["/node_modules/through2/LICENSE.html","bb8031aeb39f1781e22716925f7589ac"],["/node_modules/vfile-sort/history.html","567add54fa7ca6ea4e9cbe867aa985b6"],["/page2/index.html","3d391418b110d53b19e2a0ae234f47f3"],["/page3/index.html","96da462eae9663cb08fe4045fea2bdcd"],["/page4/index.html","d586562d33b1a5a7cb76c305c22a4f30"],["/page5/index.html","c77994f14c51854bccb1dcfa7faf7423"],["/powershell-on-linux.html","fe4e41882283db87dd34776cbc5b4ec8"],["/rake-transforms.html","e4fb5692952a212a0f1d9f3a8d2bbc59"],["/reactotype/part-one.html","ff9c55d8b135442e6ea2baa12f9abe65"],["/reactotype/part-three.html","5de7e2424a7298e560a87e74cac5bba8"],["/reactotype/part-two.html","dff6b803754a42f63eb2380a04fa2405"],["/real-vs-soft.html","eb8f3c4df3cdae2822027af532a036d0"],["/static-factory-methods.html","02e7668444496ecec2380f7ee1de30f9"],["/structured-data-with-jekyll.html","42596cbe25adfbd6352da70ad73d2370"],["/tags.html","3513d7c712408bba9963b790b3355c49"],["/using-travis-to-build-jekyll.html","060630ac3ebfc2222e2902710c72c6bd"],["/websites-CMS-platform-logging-in.html","73b0faa950f0091342c35861d9d2fbbc"],["/wrapping_up.html","52a3cfd1b1e774707f41a7c9bcbe4f63"]];
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







