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

var precacheConfig = [["/2009/05/anonymous-methods-when-invoking-in-vb.html","730dab3708ad33f37884b69ab8091150"],["/2009/10/bing-is-not-search-engine.html","f6805d2cf837a03e7ba0924532698077"],["/2009/10/quack-quack-says-duck.html","c1c68e715c4b9e53a55ed7715615bfe2"],["/2009/12/c-background-worker.html","9e63b9c44640fb39dc893753ccbd626d"],["/2010/03/quack-quack-says-duck-now-with-added.html","a5b6cca48b5770f407dd671ee20b7b39"],["/2010/05/theres-more-in-them-that-hills.html","9cceaec0a224f77894f08cb2cebbe452"],["/2010/08/odd-odd-odd-login-behaviour.html","c71b3b29e87c1b7ee75f47241ff048ad"],["/2010/10/refactor-fun.html","d6e50a44136a11312a6e505de97ad2b2"],["/2011/04/ssh-without-password.html","7ba86f437c54a7e59a07333da63e994f"],["/2011/06/get-with-programming.html","bc08f9b03bda98ae1b393fe605f53dfb"],["/2011/08/how-to-design-unsubscribe-link.html","fd47dd448ab47b7204e536432c5886db"],["/2011/09/unusbscribey-follow-up.html","48f424f758fcd9b2e68f7c6b82c39c48"],["/2012/01/setting-up-mvc3-website-using-built-in.html","1b5536c617b875037d3e1e82b3bbca16"],["/2012/02/is-there-really-just-ipad-market.html","319ffc3617d100487f9ad17ef95d5fc8"],["/2012/07/y-u-no-sell-downloads-hollywood.html","4c4ec77731fe3475016dca869c134c79"],["/2012/09/obligatory-ios6-maps-post.html","0ad7c96e642c890c069723aee8e0e2c5"],["/2013/03/automagical-search-ux.html","5d62ebdd8957ece63f5ffe4502c0c76a"],["/2013/11/astronomical-database-identfier.html","94d9e3fadc0a273c052bd8e12100842f"],["/2014/01/comparing-mongodb-and-tokumx.html","b1df643486364368bb7e84a47918f21a"],["/2014/02/websites-cms.html","99db5a69461a96b01d6fc6c8f6424ffc"],["/2014/03/testing-with-browserstack-and-selenium.html","a39a4dcc4235f45a69d0115a3ba9514f"],["/2014/03/website-cms-display-pages-part-2.html","15056980cc73fee729d43e6b113a3915"],["/2014/03/websites-cms-displaying-pages.html","7d4d4f5217e560ddfc7d012a55b52864"],["/2014/04/a-dto-by-any-other-name-would-implement.html","ca8a3f7d15f7efef459b9c9b843efec2"],["/2016/yarn.html","11f0eff580d9b8a61ef710a4e6dbc20e"],["/2017/05/big-pile-of-soil.html","972d9468451a7c14c11566a523583703"],["/2017/05/ubictionary.html","38b41adb0c93465820abe71cab701821"],["/2017/06/radarban.html","8647f1d7b0ee9ce9ed9204d45f61bea1"],["/2017/07/retrosperiment.html","1bbedaae3a79e868d0e19a11c2bdc17d"],["/2017/10/constructiphor.html","a19ba38e042d281debe9e5d577250a82"],["/2017/generating-static-amp.html","22f472bf490a155af0d16e5b525a4410"],["/2017/testing-static-sites.html","562ed149481ccb167070db647fe232e6"],["/2018/01/direction.html","868493606e292474eba8d631d657f7e6"],["/2018/02/serverless-1.html","59a1d0b8fe334aa0b16e683a4d0c01ce"],["/2018/02/serverless-2.html","877687217544ca92d7062942b2b7d895"],["/2018/02/serverless-3.html","91a1f9b1438a033639a47e83b4518872"],["/2018/02/serverless-4.html","72c5164c691aef4c66c96455427940be"],["/2018/03/harmful-dry.html","dfc5026ecb419a99bfb4204ac0acabfb"],["/2018/06/serverless-5.html","756e40219d1ac0d8bcf9354bc667952b"],["/2018/07/serverless-6.html","ef109978bea4a73774e3e59ecaa68e2e"],["/2019/11/serverless-lessons-learned.html","cd90152f48f547e489803ba5414ed20d"],["/2020/01/year-notes.html","3e64dc1eada02b17f321a5a110d019e4"],["/2021/01/year-notes.html","92f82f3a58114765f90b2d11748c53c0"],["/On-Page-Editing.html","7409d01c8ccdbf404fe695cda30bb928"],["/Websites-CMS-Platform-Storing-Data.html","d86f617df3f7d18fad990d9816886804"],["/Websites-CMS-Platform-Storing-Data2.html","f895f61dcde18d151e92bbce8a98cffc"],["/Websites-CMS-Platform-promises-part-2.html","6e02d2907d03bf998f4250c5959f6a10"],["/Websites-CMS-Platform-promises.html","2fb3aec5c856fe50e82c10ade12313e8"],["/better-affordance-js.html","57fb41ad7a51458f3defcad31eb26350"],["/better-affordance.html","342daef46bd4d0fe8d01afb6b85233c7"],["/categories.html","2856a89f7aad8ffc60512a9952090741"],["/dear-diary-year-one.html","9139b9cd741789e9eff25c1250e9c659"],["/fun-with-structs.html","c4449ebb804a03fbe51b109e5d4a8080"],["/happy-numbers-kata.html","be3362b268a93b38bbbafc2390ac074f"],["/images/ABC.png","7a8d584a4892ed2d3fbab9d02d6145b7"],["/images/AMP-webmaster.png","609bc22a214b7b73165b76801eb2a46c"],["/images/GitHub-Mark-Light-32px.png","5677b96d59ca67965dc8bea587117495"],["/images/affordance-loggedin.png","9cd36606629930b01d2806eaef333991"],["/images/affordance-loggedout.png","971cb9cff9ba746f12f6b6c001914461"],["/images/agilecam.jpg","e9a2d1853e22f76649584b0ebca90010"],["/images/beach.jpg","2b478fe0791469286e93a727d8ab5551"],["/images/both.png","c9aab6a20302fac9af04f10d42dc61a7"],["/images/cardboard.jpg","9750f995018229c5b323bbaf432c033b"],["/images/chickens.jpg","dfcbffc1a76ca67314ca54d9bcce1d93"],["/images/code.png","186f8ac5658a4c2dbfd57b7c8ce34839"],["/images/common-language.jpg","59c52274e89e4a977cc5920bd59ef29b"],["/images/crafts.jpg","5da1461779d59a9a2c65e6aca8167b79"],["/images/dear_diary_year_one/1.2017week1.png","6a3e5b2ee3b1bf483f7ba3ada4fb3a04"],["/images/dear_diary_year_one/10.2017week11.png","db0a5df098f047043ac34c9d3819e9b2"],["/images/dear_diary_year_one/11.2017week12.png","1f7cc3ec650422b3bfdc39f09b4d0f4f"],["/images/dear_diary_year_one/12.2017week13.png","7069ae3a4c97ed7a68d375cccb8615e6"],["/images/dear_diary_year_one/13.2018week1.png","e4a55ccfa7e66ebc636d58da1279c9de"],["/images/dear_diary_year_one/14.2018week2.png","86fcce7c6cebaaa0ccc37690a935c6ab"],["/images/dear_diary_year_one/15.2018week3.png","6d9b0e01582686253add36415a973f0b"],["/images/dear_diary_year_one/16.2018week4.png","74410c2b80500a45b71e8d3949196c14"],["/images/dear_diary_year_one/17.2018week5.png","0941e7e58f63d5fa174390eb96463f9c"],["/images/dear_diary_year_one/18.2018week6.png","0be8718fc8b5c561eba138a93c0bd206"],["/images/dear_diary_year_one/19.2018week7.png","b5bb5f8c8b59125c6ccc42959b8b20e5"],["/images/dear_diary_year_one/2.2017week2.png","d81bb269323702af21a1c2cace6a7323"],["/images/dear_diary_year_one/20.2018week8.png","d63f54e5bb210b6fc1f4815f50a17cc3"],["/images/dear_diary_year_one/21.2018week9.png","291defedcaaaef67d35328a92c340f8b"],["/images/dear_diary_year_one/22.2018week10.png","486c5aedec569ee2c0abe6c62a2dd966"],["/images/dear_diary_year_one/23.2018week11.png","367e1877d740b218f563fe12df620a67"],["/images/dear_diary_year_one/24.2018week12.png","79b81890a173a5cc4613ccfc1dc0856d"],["/images/dear_diary_year_one/25.2018week13.png","566b22922d52af34b658173b91ccee11"],["/images/dear_diary_year_one/26.2018week14.png","f71f9ac48bb09508232d90bbea05f1c4"],["/images/dear_diary_year_one/27.2018week15.png","1f73745b7e8e80157c5cb84f2365cb14"],["/images/dear_diary_year_one/28.2018week16.png","6754659d91490639bf6da2d7c47371d1"],["/images/dear_diary_year_one/29.2018week17.png","a68e3cacdbb6f565827c3a8554171846"],["/images/dear_diary_year_one/3.2017week3.png","bd5036013c30aef8d4190e948734c8e8"],["/images/dear_diary_year_one/30.2018week18.png","1a5d0c7d0cb44fc39510448f91199afb"],["/images/dear_diary_year_one/31.2018week19.png","ce46b240decd5a854537cc3bf999aecc"],["/images/dear_diary_year_one/32.2018week20and21.png","0d0915c70c56d238903a69aca0ed33b0"],["/images/dear_diary_year_one/33.2018week22.png","08d5ba098c18ea71a27109be777e0404"],["/images/dear_diary_year_one/34.2018week23.png","019b7b81678e5693ca055ca4b1fa815a"],["/images/dear_diary_year_one/35.2018week24.png","28ed2b8d653cd697574644a8bc28fef4"],["/images/dear_diary_year_one/36.2018week25.png","29a616bd45910d8a5d530c00b7bcba72"],["/images/dear_diary_year_one/37.2018week26.png","874c05f5dff744d823f12b77dd2b2224"],["/images/dear_diary_year_one/38.2018week27.png","6a04af2d1f33564cf44b59a525963cb1"],["/images/dear_diary_year_one/39.2018week28.png","96c81cf0e0d57cbd3ec92336b0fc1c27"],["/images/dear_diary_year_one/4.2017week4.png","3e6dbfb1830e4c2c496e6f29468a71fe"],["/images/dear_diary_year_one/40.2018week29.png","56d1675615417d9d191b6d62d52bb225"],["/images/dear_diary_year_one/41.2018week30.png","f8e6c58272db3dcdacb8470590bff173"],["/images/dear_diary_year_one/42.2018week31.png","109e49da14c1967eb21293dbc6eb7278"],["/images/dear_diary_year_one/43.2018week32.png","007b4e5e6889cd691c029fc0d6bd6337"],["/images/dear_diary_year_one/44.2018week33.png","632eba66514de8c5ddaeeb8a611bf013"],["/images/dear_diary_year_one/45.2018week34.png","150ab15a7d52a397a69b79d5e90de70a"],["/images/dear_diary_year_one/47.2018week36.png","74b3d9bdfa31b8d288d18219990ca712"],["/images/dear_diary_year_one/48.2018week37.png","8a1fd7777728c9ba2e2e6838bfcdd677"],["/images/dear_diary_year_one/49.2018week38.png","29589aa7bafd24f8efe88b878726ff30"],["/images/dear_diary_year_one/5.2017week5and6.png","49440f5bf7212054ce7aea50088c7b5e"],["/images/dear_diary_year_one/6.2017week7.png","7caa1be5b2198525ca0e46ba3044e2a0"],["/images/dear_diary_year_one/7.2017week8.png","3f6130f25aaaf5ad507123a158e991dc"],["/images/dear_diary_year_one/8.2017week9.png","0caf3037378d80a11f8d8386e14b8bd8"],["/images/dear_diary_year_one/9.2017week10.png","1020ad4037ce098ba7cef20b2959f270"],["/images/dog-2021-01-01.jpg","4f110dbd4a2605d09fa5e3a01271baf6"],["/images/dynamo-cheap-perf.png","c5772145333dd10f08aaec56f4947067"],["/images/events/2-events-written.png","967c54057645847155e6536e6a314534"],["/images/events/5/1-no-event.jpg","573fb147f7b4bce88bf965fc5ca340fd"],["/images/events/5/2-one-event.jpg","16f077749f49183e6ff01ecdf79fc025"],["/images/events/5/3-many-events.jpg","3b7965afb9af71ab765ede8538070c26"],["/images/events/5/4-new-readmodel.jpg","5b0caf490099c1359e1b063b48547c43"],["/images/events/5/5-caught-up.jpg","7ba052008a6c14de17acf34ace32112a"],["/images/events/5/6-graph.jpg","70eb794dde48fa081c485c0bc1924033"],["/images/events/6/bill.png","b5477117523720f9c3f0890f81d8dedc"],["/images/events/6/current-sequence.jpg","297623c44bc0171daef7147928f9d9cf"],["/images/events/6/helpful-advice.png","214d531c8733eaf3c49a300a81e48c94"],["/images/events/6/new-sequence.jpg","3e96d5078d8575732c8e1cbb20415305"],["/images/events/api-console-output.png","f986c2f5653fee92fa9c357831586a13"],["/images/events/api-gateway.png","b9032fc9373874707e2cb9deefda598c"],["/images/events/c4/1.jpg","4713e9cb292cd1bb336b393d50725ccd"],["/images/events/c4/2.jpg","b4ff1e3babd24ad0647d98c12811c980"],["/images/events/c4/3.jpg","6cae7e524c1ab4d4042880d03e7fc96c"],["/images/events/c4/first-slice-2.jpg","7a00f0329980fa7f36914e8a8a8c5605"],["/images/events/c4/second-slice-4.jpg","9ff852155ef8de7a4612d45c8fd49a88"],["/images/events/cqrs.jpg","172fb81a3392cc05ce47a8a32258c105"],["/images/events/dynamo-console.png","8bd587f1660e5910219d7d27bdfaff55"],["/images/events/east.jpg","9ba67afb3ae000d2af668d036dab33d5"],["/images/events/event-composed.jpg","ddce3324d51d374422e89a08224a75e9"],["/images/events/event-notification.jpg","a147da27138136d5ec81fcf1b7dde186"],["/images/events/event-sourced.jpg","8200d9c37808c4ee4bb3dc62b54a62ed"],["/images/events/lambda-console.png","6d9c1f5a813323d7351a8103684f2cf2"],["/images/events/part-four-flow.jpg","1c209e6e8ef528d75fa460738b7862c0"],["/images/events/serverless.jpg","3763083840ff4936f2e4c67496a412a1"],["/images/events/stack.png","87520c52124ce4b7093d2e6a8931d26d"],["/images/events/start-api.png","d4159054ed2fc46e51a2e1cc76f84a22"],["/images/events/testing-api-1.png","f3feb64dc015b9ded9383b9a45de0e97"],["/images/events/testing-api-result-2.png","078bd4b1219846ee3762b38310244091"],["/images/facebook-black-32.png","00be10b069f57e5ed2ce929953837645"],["/images/fifteen-dependencies.png","f9cd23400bba5223c3060884c0ef453c"],["/images/forecast.png","155fbf1399790c351fc0c4bb73c31b0f"],["/images/god-of-death.png","ce3418bbf57a96e9e2068c09f34357b3"],["/images/home404.png","7236b5940cc80e8655da7ab6d29addd4"],["/images/homeBare.png","e9e7e36d4ef9db28a1766fa99c2b9db7"],["/images/homeCarousel.png","121c719715f0f14ccf0ed6484b683076"],["/images/homeFull.png","d6ff5fddc49581b59ff0f6635c309621"],["/images/icons/icon-128x128.png","49ed1bc846441fe75ef4c5d2121eadee"],["/images/icons/icon-144x144.png","1826954195a5ef5e335c4a0c6d8b5de8"],["/images/icons/icon-152x152.png","e527df167beeade145a586943e99803f"],["/images/icons/icon-192x192.png","1fb110950b622f5f9b8436f50255a1ec"],["/images/icons/icon-384x384.png","8f57eca3af59770543f9417c27e47cb1"],["/images/icons/icon-512x512.png","903cc86eb97a819b089ff4926dd95a36"],["/images/icons/icon-72x72.png","c5fe0cec4accdc6be1a9e3db2290b998"],["/images/icons/icon-96x96.png","523efb69c88bc3d5241a19124e123614"],["/images/ideal-board.jpg","27e82ae04f8cc2bc30c1898c94782045"],["/images/initial-commit-log.png","1f230e8e4ecf9e63823c380acaf9cb69"],["/images/integrates-with-github.png","0cac56caaa6ba525b0ad69fee7fc47c6"],["/images/interactive-spelling.png","a2def282d9417b39dc85544fb068e926"],["/images/logo.png","dc6c0ae1177f94f351f6e87d0e2f45af"],["/images/lost.jpg","4354a9a6c54e81b6c1c202670dc6b4f7"],["/images/mockup_5.png","43e0acda624d81acd0aace7d6d1348a5"],["/images/nonewline.png","939954cc136f49b20524bb1b933c68a6"],["/images/npm-run.png","06d99d86686d9d527439eff3e1db702d"],["/images/objects.png","0018a954176d95ab53b328d9ef7ac4d3"],["/images/one-board.jpg","dfe574eb355e900864d2d9815c2bd02e"],["/images/personal-access-tokens.png","ba0f080489be3a5188ab402410868c2b"],["/images/radar.jpg","d3904ed53da8bb1b6a8ef9cc963d1a52"],["/images/reactotype_screenshot.png","d53834a112f6e15d91ab47e513a7f609"],["/images/rss.svg","f2a2d26956a21bc4c1e262c13b86b92c"],["/images/run-nightwatch.png","0c57dd3da382616c049d6ce82b0788f0"],["/images/run2.0.jpg","9b11b90be80c347c14ab45c336a1f2a7"],["/images/serverless-maintenance.png","401e692a387f5b26bea893b5867a982a"],["/images/structs.png","59480b596b53b143ed8b176d62d75e18"],["/images/structured-data-crawled.png","ade058e44afa942ee2e51bcfbb580281"],["/images/sunny-day.jpg","8dafb70d06205fa8211d3262816c384c"],["/images/tada.png","1e686d96f172ed357910626ad0373c6b"],["/images/tag.svg","34a504803dc8f5e431aae1dd5e0e9d6a"],["/images/the-chart-1.png","c06a2b17dffed26deba4f329cf5c9b95"],["/images/the-discussion.png","560aad24c3707cf0ccd80490ad7aff9c"],["/images/the-graph.png","45327961f22e249f5f2c8b7d9a8f33fa"],["/images/the-quadrants.png","05c018a9534a7af3839384f34e753cc3"],["/images/toot.png","d2125a047084965df10885ab2b61f342"],["/images/travis.png","358b042b18fa88f835a07569b4cd021b"],["/images/twitter-32.png","43451e4380de91afaa5d87ee00ae88b1"],["/images/twitter-black-32.png","0f86b2e8dd0dd9d4a6019c92e49d5555"],["/images/unhappiness.png","b1201c1aa3a81b02934190d3ba2c12f9"],["/images/votes.png","5372d645a8af4a78b831c15c739f5179"],["/images/weeknotes.png","810a2a3867a7932c830ab404a98d7281"],["/images/yarn-desc.png","e8615ece480d01dc475859b44c3950ea"],["/images/yarn-run.png","6410645f675138ba42d3ce0ac0fd93b3"],["/images/zero-velocity.png","7c6d9a9a5d62c51051f0c4bd932bb598"],["/index.html","9a7eb48847658ead6958999251078dc3"],["/kill-if-with-objects.html","4ce31857757d6104381f8a0f7c8150f0"],["/page2/index.html","6d4a5dd9f6c222218174d5a847c26d0c"],["/page3/index.html","bfdc88948b97727f58d458def80ddc28"],["/page4/index.html","60e67f3bb320357b2a37b26962bafa89"],["/page5/index.html","b2ee11839eb3a543305c99e038f4939a"],["/page6/index.html","3641b6fef17e5337164e9bacbc995855"],["/page7/index.html","6558c35394d1ad6b2c5d2b11c8952b71"],["/powershell-on-linux.html","25bb57dd5012ed87eeb0b80ee340b433"],["/rake-transforms.html","aff956613f700d6539e99d462df1cb0b"],["/reactotype/part-one.html","32f764a8e90c3a74be2a626885579248"],["/reactotype/part-three.html","0f1aaf3a4686153f9aedd74a2d883c0f"],["/reactotype/part-two.html","56901543632874182da6e25f05b7329a"],["/real-vs-soft.html","1083a0350e9541a7c72214177fd9d3a8"],["/static-factory-methods.html","87b12b11974c6f3a2624299e4dae6e41"],["/structured-data-with-jekyll.html","00a174552b7e3df505d3edd8461b19e5"],["/tags.html","763958dceacc15f909d4aa7ed7623c4e"],["/using-travis-to-build-jekyll.html","fde24a0244ef6b85e1a18c54d67acbdb"],["/websites-CMS-platform-logging-in.html","bba4516f34d7cc56e968d65c084c6128"],["/weeknotes.html","812597e365491860c5e787aa48904e51"],["/weeknotes/2020/10.html","71a1a18e00a073608a39cd348f30fd88"],["/weeknotes/2020/11.html","c2d61b3f23fa7b74cf02c54ba71c98d9"],["/weeknotes/2020/12.html","cff6c072947cf7067941ffa350ace219"],["/weeknotes/2020/13.html","9a6a2cedf2315e70e03f8a59277239f4"],["/weeknotes/2020/2.html","5a70f4332065d73a52c8ebadd7472279"],["/weeknotes/2020/3.html","a6ff02db5ea70564aadd56fd79a14520"],["/weeknotes/2020/4.html","d2f816c442f2543cf3291fe145a67a16"],["/weeknotes/2020/5.html","b94e5a7ede91e390755faf6243a9cdcb"],["/weeknotes/2020/6.html","b3480dcfe29da354d02427188fda752a"],["/weeknotes/2020/7.html","981510c80d6cfa5c98b2d2238ab02d8b"],["/weeknotes/2020/9.html","b51599126e9c8d52d1c4bb859701aca2"],["/weeknotes/2021/12.html","8105e4f338a47dc8d5c872ced8485174"],["/weeknotes/2021/13.html","c92f1eb0f5384c890a28dc6009338a20"],["/weeknotes/2021/14.html","b2b82864c6c0e42cc63ec702b9f4c377"],["/weeknotes/2021/15.html","4cb173ed1216c8c320a6c519a028a799"],["/weeknotes/2021/16.html","ad80c8c6ba69a19eb95f49862b31aaab"],["/weeknotes/2021/17.html","c35dc7403f9c6f06cf3a2e096a4a1be5"],["/weeknotes/2021/18.html","77a958bdd7bd600fffb12d709f6d6ede"],["/weeknotes/2021/19.html","fd14de2447b01915bf1200c76301a3b5"],["/weeknotes/2021/2.html","c8cd819f2c6792c3fd35bf6a89e1b8ef"],["/weeknotes/2021/20.html","a8de084a33dbfaeb0c3117cb313b8db9"],["/weeknotes/2021/21.html","af2d2868c7c7dfa3af2b01c486c3fbe0"],["/weeknotes/2021/23.html","2c3f125e7bf9220079cf9b2c565557e7"],["/weeknotes/2021/3.html","f7200294fd00cea024ecd72337951ad5"],["/weeknotes/2021/4.html","75e730ddc3e000d71329f373c1cb3db2"],["/weeknotes/2021/5.html","3efbfbacdb3d8be3ca10d410d997ed78"],["/weeknotes/2021/6.html","42963e5d17da10de2f7af44197c2a0f8"],["/weeknotes/2021/7.html","a141cb91ae75b137b7ccaee25a343ca5"],["/weeknotes/2021/8.html","3647296dbc22f4bb6e55d322e25e7fab"],["/weeknotes/2021/9.html","909e06fbc4b3c69d3ca57286d81d2ed9"],["/weeknotes/page2/index.html","21acd772c1d51bf4358de48073228b64"],["/weeknotes/page3/index.html","23c38fee2e167fa9112298a3476641e0"],["/wrapping_up.html","367b7c4c25df165818b3c3d66c5ab0a3"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
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

var createCacheKey = function(originalUrl, paramName, paramValue,
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

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
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

var stripIgnoredUrlParameters = function(originalUrl,
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







