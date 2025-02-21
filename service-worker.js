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

var precacheConfig = [["/2009/05/anonymous-methods-when-invoking-in-vb.html","2580b5aa353dabf3307ed2c62a10f8ad"],["/2009/10/bing-is-not-search-engine.html","798c620e1ffb566f108c15af34c22748"],["/2009/10/quack-quack-says-duck.html","62dae1c4e0554b81b27c1444b7b7ca35"],["/2009/12/c-background-worker.html","a7458526a1a573223e0c25b50ad460a0"],["/2010/03/quack-quack-says-duck-now-with-added.html","c039adf7fe3c6419e68d01c724bd9795"],["/2010/05/theres-more-in-them-that-hills.html","d57595224a61bb5704d7441d6dbfe90e"],["/2010/08/odd-odd-odd-login-behaviour.html","d217cb8e8db47afaf2bb1f12d887df90"],["/2010/10/refactor-fun.html","25a7a9bdd0bac6f8b4e8f473d7f6c953"],["/2011/04/ssh-without-password.html","f66a6e577b1caec33567cea5198fa579"],["/2011/06/get-with-programming.html","3c39584250facd0662eeffa1e9acce8f"],["/2011/08/how-to-design-unsubscribe-link.html","ff6a8d049f2a493160a2f754247e0b33"],["/2011/09/unusbscribey-follow-up.html","76670e72306895ddaf336e17ed5b09d4"],["/2012/01/setting-up-mvc3-website-using-built-in.html","aacdcf319cb79161466787ffaa15fea2"],["/2012/02/is-there-really-just-ipad-market.html","99182a79429ae9e0b51cebefce352caf"],["/2012/07/y-u-no-sell-downloads-hollywood.html","79f3531d04fcd48c85f42d4abe3fb09b"],["/2012/09/obligatory-ios6-maps-post.html","dde098d8943413860e87ef6aa0bf4d72"],["/2013/03/automagical-search-ux.html","5b405ea1a07a693119ffcd38f6287739"],["/2013/11/astronomical-database-identfier.html","2ac23d3c0265964766f3c77b141d5529"],["/2014/01/comparing-mongodb-and-tokumx.html","d8521cc0a1697e2d9d6095164d290a74"],["/2014/02/websites-cms.html","dd0a1f87b897fb6c014dce8638b3bbbe"],["/2014/03/testing-with-browserstack-and-selenium.html","f23de51f20aa2fa49152f7e63b3d7906"],["/2014/03/website-cms-display-pages-part-2.html","156934014261504af7504030c4b13568"],["/2014/03/websites-cms-displaying-pages.html","3f263f42ced2e16c4daf689b1454e812"],["/2014/04/a-dto-by-any-other-name-would-implement.html","2cc58e887a519c71ac7e8ccefd84bb32"],["/2016/yarn.html","afffb5893cdb53a8d2975460a9984b94"],["/2017/05/big-pile-of-soil.html","144b47ca6be00db5f1d675761bfc1146"],["/2017/05/ubictionary.html","ff889b4714d7ba21af57f83d3349e8f8"],["/2017/06/radarban.html","6171eb82c9a7207b44ae6e541bc36a64"],["/2017/07/retrosperiment.html","187546ef1484db10fac3f68b3a0779d4"],["/2017/10/constructiphor.html","068a2e47c6c59852a374afe29dbffaff"],["/2017/generating-static-amp.html","397becc5f2a70f3b306a27edfa30cd0c"],["/2017/testing-meaning.html","a2dd240e30e1a46d204fefc0172f3ace"],["/2017/testing-static-sites.html","b7f521c01fe3130c564a1364f0f7a424"],["/2018/01/direction.html","80442c9bbb960e57ffae4c2d9910112e"],["/2018/02/serverless-1.html","eb66ea12e334dd8b23a9644bcb063718"],["/2018/02/serverless-2.html","05a1c1ea4833e26212fc1578949de161"],["/2018/02/serverless-3.html","0c83c84fc5e874f2bdccbcc73aee8afc"],["/2018/02/serverless-4.html","c34a12bfbda73befa6a7eb5f5d659f69"],["/2018/03/harmful-dry.html","e8525931d08ff06d294f69d58359e3c7"],["/2018/06/serverless-5.html","8a510dd2b30a1059bc215cfdf59d45eb"],["/2018/07/serverless-6.html","4187ca7597461cdf40485d4650025bcf"],["/2019/11/serverless-lessons-learned.html","2bd5eaabbb9bfe19e3de36482493f275"],["/2020/01/year-notes.html","d04e150d09626d854de64c8728cdbb18"],["/2021/01/year-notes.html","60afeb68194e1ff3f18c5eac27c8e56a"],["/2021/07/tech-debts.html","e0ba2cb08cb8915e629d1e32066615d7"],["/2021/09/emotional-advice.html","66bebd28deb6bf3b50c62355e4c541a9"],["/2022/07/weather-vane-or-sign-post.html","d9aff47c16ab6932ac2ad07a165b1db1"],["/2022/08/solar-panels.html","e36e478db0324a8323c61452568f51da"],["/2023/01/year-notes.html","965ac3430a899d18a75d4f96606db255"],["/2023/02/jan-month-notes.html","256fa160bc13c35d1e6bc57f921beef4"],["/2023/03/feb-month-notes.html","f1f57a80207aeeee6840a046550e2a3d"],["/2023/03/mar-month-notes.html","fea1c1926cebf246dbf6a78af2680dbb"],["/2023/03/office-365-mega-thread.html","e9b22894dccb8a5d7b09c149e2e517f9"],["/2023/03/the-cloud.html","3083dd8ec13bc49eaf85fc0dacc7facf"],["/2023/06/pauls-law.html","ee7182be28f222eff1dede97d481b704"],["/2024/01/year-notes.html","4456253e9d358a018f849ed09d380017"],["/2024/09/wwmd.html","4e5d2710d4f107426ad759775bd4efe9"],["/On-Page-Editing.html","4c08b224f147b383bc945369d23d2306"],["/Websites-CMS-Platform-Storing-Data.html","2166496b13f14bc583d1844fb376b6ea"],["/Websites-CMS-Platform-Storing-Data2.html","8206f19dc9fe37268767b1a30308de31"],["/Websites-CMS-Platform-promises-part-2.html","ba1cba04ef6d3e887a773a65f40107ea"],["/Websites-CMS-Platform-promises.html","4600392862ccbd5b79dd949eddb6bb82"],["/better-affordance-js.html","11b7c02a3a2a8d39b9bfb1dcc1eeb66d"],["/better-affordance.html","83820fa98b59f74f4250fed3544864b9"],["/categories.html","2b1c7f3c8856ba80e39aa7bd561d6326"],["/dear-diary-year-one.html","ca375792740e4bc7845b2e149c9de6b3"],["/fun-with-structs.html","a4d3c804f0714d2a2d227bc2ee6a1443"],["/happy-numbers-kata.html","25a25a1f20e31efbeea9c31a29471cd9"],["/images/1-no-event.jpg","1fed4f131651de4ab49e4aece56cfd88"],["/images/1.jpg","5f00566ed6cc0a69ea1d00217ed5755c"],["/images/2-events-written.png","67a033a4ae5b596ebf499d80b929645c"],["/images/2-one-event.jpg","ddb3c295e3f8f60c386b9c4eca9f4b9e"],["/images/2.jpg","1bb09839eca2a8320bf598a285c80324"],["/images/2022-contributions.png","37c287f4ad4ed995c681e947f55f66a2"],["/images/2022-family.jpg","043b4f2e0a20ec765cb668b4589fee6d"],["/images/2022-travel.png","dcc6355497064c5dfe5b854f9aaded9a"],["/images/2023/03/01/drawing.png","4866ae63d15bc7d92ce1685dd58d2a5f"],["/images/2023/04/02/planning.jpg","077ffd2aa8f98ceed9c62a2cf2c40f31"],["/images/2023/04/02/pool.jpg","4ec778a59ea6ee4448c8a6e2adce53b4"],["/images/2023/07/blitzed.jpg","e479288b9e517b980a1e914d810c28cc"],["/images/2023/07/chopped.jpg","78408244e14cca4ef330329587e63dd8"],["/images/2023/07/cooked-one.jpg","93d643c8deb29b3bf5955bd9eb92cbf0"],["/images/2023/07/cooked-two.jpg","af46e7a1ef52044c151efe83d0946d12"],["/images/2023/07/dough.jpg","63a0a1e7f5d531ba32ee16ecacb5d1d5"],["/images/2023/07/ready for the oven two.jpg","eb077efc16d978f460471fe6e6dfcec0"],["/images/2023/07/ready for the oven.jpg","5b91c3d136e134385137dc23650b6805"],["/images/2023/07/the plants.jpg","498abbe6e9bf644beacfdd35afc84c34"],["/images/2023/07/zucchini-focaccia-og.jpg","4f4632b513eef596f89c90764cad15da"],["/images/2024/01/anzio-terrace.jpg","42e3b13ebbae7832f0a8b9d9dad76d26"],["/images/2024/01/toilet.jpg","7b1e2d9ed66cc10a1432cf7829ee29ac"],["/images/2024/01/travel.png","af201b8da566eab904d9d8ac632e5cfa"],["/images/3-many-events.jpg","ced75a3200e46952147eb108ff869ad6"],["/images/3.jpg","08882002e7dba0267e0f4f2acf79ed6b"],["/images/300/1-no-event.jpg","8b415b02f32601887f6eed287164517c"],["/images/300/1.jpg","94519ab441c0cd1bd9ffcc5af58550f5"],["/images/300/2-events-written.png","4cf6a8d45bd32a765a9db56ab24450d4"],["/images/300/2-one-event.jpg","8e8ee314d0d770c405fcf2081f1a5d69"],["/images/300/2.jpg","8a9ebb45fd241701b86734adfc0fc159"],["/images/300/2022-contributions.png","44f585abf44cd0be061952e601775dcc"],["/images/300/2022-family.jpg","910917766f6438b9cff0b0f0d0a490e7"],["/images/300/2022-travel.png","ec4b1cd07fb08379fdedda572c13c28c"],["/images/300/3-many-events.jpg","4a2384f470f9b968eb8eee760f3e5834"],["/images/300/3.jpg","0ab9a7d853c4dc4f69f365cf6cd159d3"],["/images/300/4-new-readmodel.jpg","f2b9d7c5a47762e6d95c80b38eacbe25"],["/images/300/5-caught-up.jpg","fd263b1a93c809e448ef57674214bdad"],["/images/300/6-graph.jpg","81145e84a5f648b049bad07084a1ba9c"],["/images/300/ABC.png","46a512d4dbbf5a638f74315b15caec32"],["/images/300/AMP-webmaster.png","c52aea35ba958f44f8da5fbc9cc28090"],["/images/300/GitHub-Mark-Light-32px.png","27f7497bd771f103f6e40cd65981b529"],["/images/300/actual_different_styles_meme_by_zeurel-d38c306.png","6c721ec9f658499bcc5436f26313f07b"],["/images/300/affordance-loggedin.png","07dd508c246919e33ac7a21aa0e093eb"],["/images/300/affordance-loggedout.png","c95f79bd89045b2f1ac1c57acdaee688"],["/images/300/agilecam.jpg","c50a086407a3f688626983a7caa21aa1"],["/images/300/api-console-output.png","0ec0ccf29504872fa879c64c2bf44377"],["/images/300/api-gateway.png","09915579beedd77eb202d37337b41315"],["/images/300/beach.jpg","aef5e20469908dc39f86abce46b22176"],["/images/300/bill.png","995afbfebccd69f42287f94e24684798"],["/images/300/both.png","834bc93867dcb752f5eef6da3cf2a3c1"],["/images/300/cardboard.jpg","11904351a6ee94c229bacaaadd2eb30d"],["/images/300/chickens.jpg","8ca47f1b2a43b0cb0e965dfb1f341604"],["/images/300/code.png","8dcb9460b3a367c8a1cabbf6798725b6"],["/images/300/common-language.jpg","c35f51cf0e31e4f6a23ecf5ec7c1f8ab"],["/images/300/cqrs.jpg","92f3b2d7f4c437d0b4cae246a5571af0"],["/images/300/crafts.jpg","86460ef882f76ffc03ba8fc9fca6ad9e"],["/images/300/current-sequence.jpg","f2fadf070382c839f38cc0a90ecaef6b"],["/images/300/dog-2019-01-01.jpg","fc410a9f2b93eab5702b03ba3ec6f355"],["/images/300/dog-2020-01-01.jpg","d6594d4b77ab53d11c3c7d363ee2343b"],["/images/300/dog-2021-01-01.jpg","00f13b473279d7a73c32db3cc9db9879"],["/images/300/dough-balls.jpg","c314ad70d625b8cc0d73bd6cabd60a75"],["/images/300/dough-wide.jpg","12b3c9fd3e69482e5547587d9f2d5232"],["/images/300/ducks.jpg","3ecb3a183943b1151784f35d5c3047bd"],["/images/300/dynamo-cheap-perf.png","3ea433609df3e72c3bf4d8072e89a908"],["/images/300/dynamo-console.png","4d9ddb433093616b4ffdd27c574c3e37"],["/images/300/east.jpg","dd9d8cab2c708009aa34e01a8b53ce13"],["/images/300/event-composed.jpg","47afc74a716e7cde8bbf3f4247df661b"],["/images/300/event-notification.jpg","736d803982ef0beffdfbc313e3633966"],["/images/300/event-sourced.jpg","ce41ce31f8255d849c3b4767805b6fa1"],["/images/300/facebook-black-32.png","5c7605ac74aee44cf908538c46691c13"],["/images/300/fifteen-dependencies.png","c3ac74c8ab0db24ededf5d1354043adf"],["/images/300/first-slice-2.jpg","610e1ec20e490874fc81bd8460b273cc"],["/images/300/foggy-day.jpg","949fd4c4a0e515e5a58dc456433efed5"],["/images/300/forecast.png","fc8042ae1d18ce4e0a8913e85b8e09de"],["/images/300/god-of-death.png","74d94d013f99e23be2ff666fb50a439a"],["/images/300/helpful-advice.png","235df6eb267705312b31fcfb8c7207af"],["/images/300/home404.png","bebafde146b901baf9df57fc779d1730"],["/images/300/homeBare.png","96cb2ce62554dc03b0e16a8fb91c72ee"],["/images/300/homeCarousel.png","054dfd9c483881037bf8ac487dda5262"],["/images/300/homeFull.png","3a3a4deeba2857a6b73f5109f2609a2d"],["/images/300/ideal-board.jpg","3228ba64d204bcefb87a6704de71991b"],["/images/300/initial-commit-log.png","9fd7202b4bd298d180dc773a35d85341"],["/images/300/integrates-with-github.png","1f4739ecf9e065357391ad23763127f9"],["/images/300/interactive-spelling.png","6136e6199d4c162fae8a6acba328260d"],["/images/300/lambda-console.png","1886fdd1240b4a16c79060b6c4456807"],["/images/300/logo.png","694aa93fc50169105d632b82b5ad7f33"],["/images/300/lost.jpg","bef1030f009e3cfba7dd2d762d6a5907"],["/images/300/mockup_5.png","0109764e57efdcd990859479ee6a4513"],["/images/300/mum.jpg","dc1b1a579afe66b474f982ff67faf610"],["/images/300/new-sequence.jpg","80e3bebf4ec0cf08877e00efa0af5fc7"],["/images/300/nonewline.png","1374e73abb337aa17cc401f4db5346af"],["/images/300/npm-run.png","ddd25c92d5f3baa7d69bf9fa50669e09"],["/images/300/objects.png","688f9cd06728befc16e77ba03155e9cf"],["/images/300/one-board.jpg","1b9d648e509979281697c095462777a0"],["/images/300/part-four-flow.jpg","95584ce15873d78830fe8f9e8690a0d8"],["/images/300/pasta-fasule.jpg","9530163bcd2892d2c2bf686d40b0c568"],["/images/300/pepper-1.jpg","a48c0be1060a7615d9a796db2b097f25"],["/images/300/pepper-2.jpg","a5b04185a14e93d213db22450695fc66"],["/images/300/pepper-wide.jpg","222b63a74a30805e25c1f6d60847b3f3"],["/images/300/personal-access-tokens.png","19fd7b1512b4eb6249437180cdb56114"],["/images/300/radar.jpg","1c212f677d49a7c99ec26e501683693c"],["/images/300/reactotype_screenshot.png","769891963c483bcba1535fce0128b2d5"],["/images/300/run-nightwatch.png","17dbc2c513e0e4157344d27da04ea9fc"],["/images/300/run2.0.jpg","6632bf63cdb3d78f23e8cd34112ee44b"],["/images/300/second-slice-4.jpg","8c0e6c1d0549fa30bdfa56ba76b13e5d"],["/images/300/serverless-maintenance.png","658912fbabaa75162505fe8107ae03be"],["/images/300/serverless.jpg","c6c44646e69a53f2d9ecba87a2df498b"],["/images/300/stack.png","4aeef068982c01126c35e4068a09f16b"],["/images/300/start-api.png","e0ec0a4c6fb6c26e16f54eca5ae49fad"],["/images/300/structs.png","a92895807d8473341f4064bc2fe10a1a"],["/images/300/structured-data-crawled.png","21f480a644218bd03adc7a02774536f9"],["/images/300/sunny-day.jpg","188e7ea7a40dcaa7d8ac614fb4bedeaf"],["/images/300/tada.png","6a19bd23d1c99b7b32470ae4dd984833"],["/images/300/testing-api-1.png","4647459b1fb6cc73a243b7d27fd51740"],["/images/300/testing-api-result-2.png","5bf70cadbc7feb0b4a08543a27562b9e"],["/images/300/the-chart-1.png","082f6e2b26b2864a3cec426d9d337e48"],["/images/300/the-discussion.png","40dc38ffb136a5536bb64b5691edf42a"],["/images/300/the-graph.png","000399ea2efb4e355e4570fcc61fac23"],["/images/300/the-quadrants.png","89b7deb6fb5382d9e2dfa32b9fccdbed"],["/images/300/toot.png","1becd9cd4ebe4e7adfa8203457c5485a"],["/images/300/travis.png","9b8822912d80d2c7ae95b8065745f0ec"],["/images/300/tree.jpg","290f734fcdf49648d09ecc86250296e2"],["/images/300/twitter-32.png","0e21335ff0b1b322f75eaaeb32b81ef9"],["/images/300/twitter-black-32.png","c279b87a4805d22ea078147ff065f8d3"],["/images/300/unhappiness.png","1f2c8170b420c3ad4ebc4a8bb1af9d0a"],["/images/300/votes.png","4f5419207fca7e392a995164ccfbd004"],["/images/300/weeknotes-autoload-graph.png","6fe496702b8f1a81fed48d11592eb935"],["/images/300/weeknotes.png","2eadc54c31f4c79e2239b3aaa1aa32cd"],["/images/300/yarn-desc.png","e1392cec036db997d4a8e71ac2be8523"],["/images/300/yarn-run.png","5f5c27a364514228e9c6af5c54043462"],["/images/300/zero-velocity.png","8558fa64f3782d8c9ff38a31fbc289a5"],["/images/4-new-readmodel.jpg","abca23326d158047986f6ccb8221d156"],["/images/480/1-no-event.jpg","be0eeb53819930b79455e43730a03250"],["/images/480/1.jpg","2f88949815eb7cdc916840ce8a702fa6"],["/images/480/2-events-written.png","e32e74a826cd28240884dbef17f27998"],["/images/480/2-one-event.jpg","cc33b07109053e3146ebee10944c2318"],["/images/480/2.jpg","ac441d98aef0858b1c65a847921beed4"],["/images/480/2022-contributions.png","45131f29b8175ebe968fc45384e6b890"],["/images/480/2022-family.jpg","691503023d2c0fd6760f52bcea5a84c4"],["/images/480/2022-travel.png","e7cc887cb8ad4ddf244fae54f7f6378b"],["/images/480/3-many-events.jpg","dabe25c09d5ba16c47e2902b2f935162"],["/images/480/3.jpg","1b300ba9ddd0302acf512e8b60eac378"],["/images/480/4-new-readmodel.jpg","998aa6387d5a25e4457733647bed69bd"],["/images/480/5-caught-up.jpg","0b1a5b44929cdabe72540887ea47f52f"],["/images/480/6-graph.jpg","04544b19fd3a70729a6cd8d676cd4fde"],["/images/480/ABC.png","f57b16f8eb1ec6251fa9517acbcfd983"],["/images/480/AMP-webmaster.png","faa3f0e481fa440de7c3f3706e81991b"],["/images/480/GitHub-Mark-Light-32px.png","27f7497bd771f103f6e40cd65981b529"],["/images/480/actual_different_styles_meme_by_zeurel-d38c306.png","fd84f9d47e95a13c706d9cd62ad30d69"],["/images/480/affordance-loggedin.png","4acbfa0398b0e1876b0fd9fd0b2429de"],["/images/480/affordance-loggedout.png","6e05b899ce85cfee7ad05b432fdc699f"],["/images/480/agilecam.jpg","47387066f9964a972a84fdb86ad36350"],["/images/480/api-console-output.png","598580ce630e5e8213aa54207f33937c"],["/images/480/api-gateway.png","06caf16cb187fc71387d3561552cfd7a"],["/images/480/beach.jpg","fb25de4338ae12c5534eb181fa562ece"],["/images/480/bill.png","fa975a75bbdc34bd1d66aea1cd0479c4"],["/images/480/both.png","7c60fa5e45c27bed1328f213d51f8a2f"],["/images/480/cardboard.jpg","40f8a2ff39b597d0e4b9da032f475b13"],["/images/480/chickens.jpg","7e03fc3b2a53497455476c069e7478a0"],["/images/480/code.png","bd2e76c66cc65f111f5c45257aa362f8"],["/images/480/common-language.jpg","6176a1185e8cd216db2a077d954bd517"],["/images/480/cqrs.jpg","7cb0fd7e99f87d4ed05de3cd0f8892a3"],["/images/480/crafts.jpg","28691b36c88862bf82c507228f53e78d"],["/images/480/current-sequence.jpg","07d42f33bbfbfbea9dc1921e21eb7254"],["/images/480/dog-2019-01-01.jpg","d927f4f4046867e799990d08a3fff3a5"],["/images/480/dog-2020-01-01.jpg","74b8f0acfebe3bf89623be67f0f3dba5"],["/images/480/dog-2021-01-01.jpg","d837d9291d40cb85405ed988d9fac855"],["/images/480/dough-balls.jpg","5e3712ac8ae94cdc06ec335e86bffafd"],["/images/480/dough-wide.jpg","fba18d6ecf192f6fe9cdb9291254ac2f"],["/images/480/ducks.jpg","5b89514470923fb20949612eac101aac"],["/images/480/dynamo-cheap-perf.png","f1fbe9f95fb258116704c0f63c75ff78"],["/images/480/dynamo-console.png","0c888dc2ef4cfb201587a2bf471be8d1"],["/images/480/east.jpg","c1235413e53d543f9a44d25d71082e71"],["/images/480/event-composed.jpg","a6b02faa73f7eb4316aaa68e5604ecef"],["/images/480/event-notification.jpg","f169f241929c0345ef25ac7a18647a0c"],["/images/480/event-sourced.jpg","bf11e76a3dd23ae7e21c4f7ef9683cef"],["/images/480/facebook-black-32.png","5c7605ac74aee44cf908538c46691c13"],["/images/480/fifteen-dependencies.png","43150fa804d067249897883c8f85f411"],["/images/480/first-slice-2.jpg","38d186d5d145424e07ed0dba1c668766"],["/images/480/foggy-day.jpg","6279c5a7b47073bc297152701a365535"],["/images/480/forecast.png","1654aa59b4a4ffa91b23e3e1444f5cbe"],["/images/480/god-of-death.png","32df77d03bbd35bd2592951d65cb4d25"],["/images/480/helpful-advice.png","d43b3bac23e638d3147f4cee52b897bc"],["/images/480/home404.png","9cb173be84a875b40e63c293026c83b7"],["/images/480/homeBare.png","8e6b26baa8a3b39535f68238a32edd28"],["/images/480/homeCarousel.png","2692660218e7ee9e6b1952b96430e9be"],["/images/480/homeFull.png","f2b9c6185f555ead58e56a2fb6fa63e9"],["/images/480/ideal-board.jpg","36f51069bf84b8e0d3a94d53258f49cf"],["/images/480/initial-commit-log.png","5b969618e5234aae1adf5d061cf635e3"],["/images/480/integrates-with-github.png","3dc77f1801b9271944ae7e72a99a3b36"],["/images/480/interactive-spelling.png","8910d256cb8259e41a416806899d82c0"],["/images/480/lambda-console.png","424b17cc189d7d174d1bb883cf1067e7"],["/images/480/logo.png","694aa93fc50169105d632b82b5ad7f33"],["/images/480/lost.jpg","ec5d7e5898e515ef4d0f06135e1e1847"],["/images/480/mockup_5.png","19dd04db2551a113bffcd8304ed5e4c6"],["/images/480/mum.jpg","9b8d101c1ac94fad802b921a672dd8e9"],["/images/480/new-sequence.jpg","42d5476a1d17454364e8adeaae66f929"],["/images/480/nonewline.png","606b55fae5dad8a5e3efcc55e58a3b67"],["/images/480/npm-run.png","3b057e3aff5c81a7866b01f3f3b9244a"],["/images/480/objects.png","949e97f4240055930779e965a70fccb5"],["/images/480/one-board.jpg","8b83f596ea93fd9b2f1752514e5720ad"],["/images/480/part-four-flow.jpg","0b87ef49e953622a7541010a6126fbf1"],["/images/480/pasta-fasule.jpg","27f11ed09609d3c4cf98f3cc8df8fbf1"],["/images/480/pepper-1.jpg","6ee15909b8d62747d8b97361c230ab51"],["/images/480/pepper-2.jpg","3796c90ed5d943d4d362c878ad3ecbf8"],["/images/480/pepper-wide.jpg","c497cccb4a74618497b8ecb77234e04a"],["/images/480/personal-access-tokens.png","fede6fa9cd520bf5ea8aa9721d284280"],["/images/480/radar.jpg","aae0514f9d4b2da363ee9f7129e38aa7"],["/images/480/reactotype_screenshot.png","808309af1379a01a3986ae4b978981e8"],["/images/480/run-nightwatch.png","029377b6ee7e81181eff584b9d5fc008"],["/images/480/run2.0.jpg","8d9476dd0de98978e7368bc39f5de8f8"],["/images/480/second-slice-4.jpg","07a86ec5d732acf06d64b93e9526945b"],["/images/480/serverless-maintenance.png","d8548d5a8a54bd49a1692deaa365b6a2"],["/images/480/serverless.jpg","5867fe9fa51fc4068b2b9f0eee973bfd"],["/images/480/stack.png","b3e3e510343c09e66fc0798ff84f035e"],["/images/480/start-api.png","159a4c8f4f60e61a6de0c2b1e55546e8"],["/images/480/structs.png","503c1fcc9d8fddb30510f8aac73fc649"],["/images/480/structured-data-crawled.png","fa8b0bb26128576c5d1bbe18ec8fde7d"],["/images/480/sunny-day.jpg","441835daeb175e742051c137eadc554b"],["/images/480/tada.png","647fa8196bf727a6d68887bdb3770135"],["/images/480/testing-api-1.png","607daa2b4bd7b4d357be91a2f6640fe1"],["/images/480/testing-api-result-2.png","54f539abbdeba364e2d3695c158c0f72"],["/images/480/the-chart-1.png","017ee742d12aa29eabe356450913dafb"],["/images/480/the-discussion.png","56acfe21e4104447b32b4d0931631e26"],["/images/480/the-graph.png","e2c75ce76a60d1e4d2c7e4f1c7a28903"],["/images/480/the-quadrants.png","877e3650a6621826a3e4e4be0ce94631"],["/images/480/toot.png","1b8fc1a6be2c8cf8033126b8bf608d67"],["/images/480/travis.png","886cda7b912c1535924304753b929cef"],["/images/480/tree.jpg","37855622ff1ad2a01ad60aad92e2fe73"],["/images/480/twitter-32.png","0e21335ff0b1b322f75eaaeb32b81ef9"],["/images/480/twitter-black-32.png","c279b87a4805d22ea078147ff065f8d3"],["/images/480/unhappiness.png","f32366249405aa4dd661b9f4f376534a"],["/images/480/votes.png","e944f47f3aa3a751e3b3199431c197f7"],["/images/480/weeknotes-autoload-graph.png","76eaed87458653e7e95e2710d839f650"],["/images/480/weeknotes.png","01618ca7cbe20103c25a503129e0f3ac"],["/images/480/yarn-desc.png","5d00326afdc2845c13f57fbbf0793bb2"],["/images/480/yarn-run.png","b555174f4f2ad7708481bd426f8e133c"],["/images/480/zero-velocity.png","95a4c4a148a4fc26644669d65097d7a0"],["/images/5-caught-up.jpg","a1c39e67a4d5fd9d20b569441c3564d9"],["/images/6-graph.jpg","0479708729b16c42155cd460f9f45bf4"],["/images/ABC.png","f57b16f8eb1ec6251fa9517acbcfd983"],["/images/AMP-webmaster.png","d27fa84d401044d9f7b4102e22173bb0"],["/images/GitHub-Mark-Light-32px.png","27f7497bd771f103f6e40cd65981b529"],["/images/actual_different_styles_meme_by_zeurel-d38c306.png","3a1266003cd719d97baa814a33423939"],["/images/affordance-loggedin.png","4acbfa0398b0e1876b0fd9fd0b2429de"],["/images/affordance-loggedout.png","6e05b899ce85cfee7ad05b432fdc699f"],["/images/agilecam.jpg","d76677e06ada3edeed1b0137be93c6e9"],["/images/api-console-output.png","11d54779fa7e4fd3ca82847e6262890e"],["/images/api-gateway.png","29cdfe963460f2f62b1476080fe16209"],["/images/beach.jpg","1112f690c57d20aeafc0e3caa0a70687"],["/images/bill.png","0a3050d854e186b802c6f791e210d3ce"],["/images/both.png","117be54b1fd4be093dbe09d86e8b9f39"],["/images/cardboard.jpg","c2fcdc95a4bbd8c9e37fdbd179fea6f5"],["/images/chickens.jpg","6045a8c71df67e2136dff627f8f9050b"],["/images/code.png","7dd836bb1dd9c95db01be8da8327de19"],["/images/common-language.jpg","f2efd3d553241239665916c8ecb132d1"],["/images/cqrs.jpg","9a43a1b926021619101b35e97ec67d71"],["/images/crafts.jpg","c6528adcb8618432dd22b0e05a389751"],["/images/current-sequence.jpg","340aa9724f411578a9adb93c6d563531"],["/images/dear_diary_year_one/1.2017week1.png","14c7067175b4fe7ddb3e51ff9b4cf3c5"],["/images/dear_diary_year_one/10.2017week11.png","f092f0175888d5a5b34f3ce1a9053521"],["/images/dear_diary_year_one/11.2017week12.png","026470f234c6365b70dafeef4e0954f4"],["/images/dear_diary_year_one/12.2017week13.png","6343b7c5143cbdc1ad41ec0e674a8eac"],["/images/dear_diary_year_one/13.2018week1.png","6c728b10a0c57a65a9f7ec889b180e49"],["/images/dear_diary_year_one/14.2018week2.png","92aecb09ca5292dad51a71bf85dc24a1"],["/images/dear_diary_year_one/15.2018week3.png","a757cfe7249032d4e32645073c46ed05"],["/images/dear_diary_year_one/16.2018week4.png","c05e98417ba6f36d71d2dcd6749548e8"],["/images/dear_diary_year_one/17.2018week5.png","fd32de3fc67c0fb53acec759da3b8d1b"],["/images/dear_diary_year_one/18.2018week6.png","53a96952dd96873f598c078bf7e36916"],["/images/dear_diary_year_one/19.2018week7.png","944d98b762359dee4bdfc776dfc77cd5"],["/images/dear_diary_year_one/2.2017week2.png","3034124b2de5e032b52b6b55acad9f5f"],["/images/dear_diary_year_one/20.2018week8.png","4b8b885ebf0a756c419696e0cb0883b2"],["/images/dear_diary_year_one/21.2018week9.png","57fdfe4275a18b46f8d78ce708cc3d94"],["/images/dear_diary_year_one/22.2018week10.png","baf13ea472fb1878c194a6c5af69bd97"],["/images/dear_diary_year_one/23.2018week11.png","634e992bb990394b74032238a28bd937"],["/images/dear_diary_year_one/24.2018week12.png","12a16c102d4818d1b1cff162d237d9f9"],["/images/dear_diary_year_one/25.2018week13.png","8ad2fc7e3ee16ad056f3bbfc295541c7"],["/images/dear_diary_year_one/26.2018week14.png","bbee64e125d6bebfab9456700bbbf487"],["/images/dear_diary_year_one/27.2018week15.png","644a3ab4e91145eb395d386bb9dd2062"],["/images/dear_diary_year_one/28.2018week16.png","e901f3875c1202a415e16c51e72a3df8"],["/images/dear_diary_year_one/29.2018week17.png","e72986889e6fa158e15a7be0d37d6639"],["/images/dear_diary_year_one/3.2017week3.png","3fcb0902312504a1a1d898df49c7a075"],["/images/dear_diary_year_one/30.2018week18.png","091f747835dec5d168c025e51f0aab75"],["/images/dear_diary_year_one/31.2018week19.png","3ccaea946648cd6ab95c5afa5f921a6e"],["/images/dear_diary_year_one/32.2018week20and21.png","4fb9bacda295b0c80bfa3b2a587847f7"],["/images/dear_diary_year_one/33.2018week22.png","6cbd8e184952c6b27b134557a15f1af3"],["/images/dear_diary_year_one/34.2018week23.png","a4d2a3503eadbe3e8379b91a301b733e"],["/images/dear_diary_year_one/35.2018week24.png","6017308f8a701cd6896e6ac7c8186f87"],["/images/dear_diary_year_one/36.2018week25.png","62d703a3ab54c90342afc3ca07dd4550"],["/images/dear_diary_year_one/37.2018week26.png","06163eecc9967eab61629d0196d41694"],["/images/dear_diary_year_one/38.2018week27.png","2c4accf3ec27d58731598146820b51ac"],["/images/dear_diary_year_one/39.2018week28.png","e71205825b5b42acea8cb95639553b9a"],["/images/dear_diary_year_one/4.2017week4.png","4d82a3ab152a7062fbb6388cddbc8e72"],["/images/dear_diary_year_one/40.2018week29.png","2bf249f14334d2f5c02a701ac05774f2"],["/images/dear_diary_year_one/41.2018week30.png","1426d11ced5b604a34ad412764216cd9"],["/images/dear_diary_year_one/42.2018week31.png","6dc08d2275ca6ade92c9ab0f601b4b91"],["/images/dear_diary_year_one/43.2018week32.png","cc103879b4532a49df1c6f1a8ce028b1"],["/images/dear_diary_year_one/44.2018week33.png","57d87d660c43bfa923c2e22c842bb0b2"],["/images/dear_diary_year_one/45.2018week34.png","c69414fc5f7cc95528e9a0547d345446"],["/images/dear_diary_year_one/46.2018week35.png","f6a78bb1963cd3663e7e43044ffd800c"],["/images/dear_diary_year_one/47.2018week36.png","0abae18c076ca2161c37eb739983696e"],["/images/dear_diary_year_one/48.2018week37.png","4d212647549a7553ebf7a0cfb125a0a8"],["/images/dear_diary_year_one/49.2018week38.png","8643ed63c86ff774bf53dd2ba96af6f9"],["/images/dear_diary_year_one/5.2017week5and6.png","cba25b318cd1a48c350e16410e141592"],["/images/dear_diary_year_one/6.2017week7.png","68c4d7aba312db46ff8657c8c36f278d"],["/images/dear_diary_year_one/7.2017week8.png","412eac1a7d20f00779905a5ae337b1a1"],["/images/dear_diary_year_one/8.2017week9.png","22de0e9a48b3cdb20331bb3f93d1bb05"],["/images/dear_diary_year_one/9.2017week10.png","d3894eb2051688a0609a857899197e85"],["/images/dog-2019-01-01.jpg","6fede355c9f5a1dbc915ec328431c783"],["/images/dog-2020-01-01.jpg","cabd5799879728620e528a33af49bbe3"],["/images/dog-2021-01-01.jpg","90f430f8a8ebd25f3c9eb55ce56c233d"],["/images/dough-wide.jpg","316385a0e544ad2a1541a030ad133bf1"],["/images/ducks.jpg","73c8eb91b7d788c57732b45db8fe99ea"],["/images/dynamo-cheap-perf.png","df79f29c0268929e045363f9b1715112"],["/images/dynamo-console.png","194642d0077cfbd67fb7e3e8125f30c6"],["/images/east.jpg","5231497a5f9229026c6db03a2b74612a"],["/images/event-composed.jpg","ac10d81fcd1c40f3b8ddfd1993ff1456"],["/images/event-notification.jpg","b4c7618a16038eeee7049419a7aaf831"],["/images/event-sourced.jpg","2d559ce2f60052cc296576f3f0613d63"],["/images/events/2-events-written.png","67a033a4ae5b596ebf499d80b929645c"],["/images/events/5/1-no-event.jpg","70168e4456388c01350576729a84d0f0"],["/images/events/5/2-one-event.jpg","cd75feda4a10d531fc2ce5e3008bdb99"],["/images/events/5/3-many-events.jpg","d84809dae82e55f31d0877c2b9f349bb"],["/images/events/5/4-new-readmodel.jpg","9dda45e60275570f33b0746e36f68c1d"],["/images/events/5/5-caught-up.jpg","fdad5af8791fc0a18a07d6b169da19a1"],["/images/events/5/6-graph.jpg","2cb774d4dc3966b9c056225594517731"],["/images/events/6/bill.png","0a3050d854e186b802c6f791e210d3ce"],["/images/events/6/current-sequence.jpg","3486dccd4a937cef7f941dba471e720d"],["/images/events/6/helpful-advice.png","cb07fad6486ba939fd91458dfe60ca1a"],["/images/events/6/new-sequence.jpg","46f44e9c2c1846562e2aa4bb18fd3ff6"],["/images/events/api-console-output.png","11d54779fa7e4fd3ca82847e6262890e"],["/images/events/api-gateway.png","29cdfe963460f2f62b1476080fe16209"],["/images/events/c4/1.jpg","c3ee3ea8942ec18854e0ab289e3e003c"],["/images/events/c4/2.jpg","5b4d7f542b5497f7e9fe40da740e28f7"],["/images/events/c4/3.jpg","4a6af9eb7929946b02554a11edc03978"],["/images/events/c4/first-slice-2.jpg","e07db3395b698125ffd1489a772a0425"],["/images/events/c4/second-slice-4.jpg","39dbff321bc46b2b3657147c2684bc58"],["/images/events/cqrs.jpg","7d3f1c9b1b1f1c117e9742f13fa2355e"],["/images/events/dynamo-console.png","194642d0077cfbd67fb7e3e8125f30c6"],["/images/events/east.jpg","788953a7200d8cef717d0f2df8c58483"],["/images/events/event-composed.jpg","ae616b97aec2d67d3f64688ec153c333"],["/images/events/event-notification.jpg","fcad6ec5a76ebdb15f962be3bd324762"],["/images/events/event-sourced.jpg","c7a48bca9e47506437049d4476c434f5"],["/images/events/lambda-console.png","5b7910271c8ae2ac56c67ea8a6c009a4"],["/images/events/part-four-flow.jpg","1cf13f9d84b5d64526315467b5be1824"],["/images/events/serverless.jpg","eb3d17136cf3526aa781ab5e613aeadf"],["/images/events/stack.png","3612bee6a7ba5356a8052d880c034b3c"],["/images/events/start-api.png","c408b21dd3dd2f0ca9ce0656b4fe0f3f"],["/images/events/testing-api-1.png","629bc6a72681c9746bb289c239e764a4"],["/images/events/testing-api-result-2.png","dd3a40d355e99902bceaad05a2b29ea9"],["/images/facebook-black-32.png","5c7605ac74aee44cf908538c46691c13"],["/images/fifteen-dependencies.png","3ffc601966da8eac80f48a2af0add3c5"],["/images/first-slice-2.jpg","da9312909b621990c26ae3609b77afa7"],["/images/foggy-day.jpg","caa63eabf76307b22998098b074830f2"],["/images/forecast.png","0dec546d740a84998e5ede60041f83fa"],["/images/god-of-death.png","9523f351ea74d10c382ca97dbdac7094"],["/images/helpful-advice.png","cb07fad6486ba939fd91458dfe60ca1a"],["/images/home404.png","b4ad9d10c8d8f771c7b5029bd50da432"],["/images/homeBare.png","aab499ba0c1c687bff7d60da3a83da5e"],["/images/homeCarousel.png","8054a67e81dcf1d2fde313a783a6f9cd"],["/images/homeFull.png","a3310503911535e2913214287f6d818d"],["/images/icons/icon-128x128.png","54cd283b0c1ec90108ce2051b15bf57a"],["/images/icons/icon-144x144.png","42b7873de7e33efe5bc966b4ff964dde"],["/images/icons/icon-152x152.png","30efdf4a576e11018b43d1df85665130"],["/images/icons/icon-192x192.png","2c5512011d149f48e7f3c210aa3c4584"],["/images/icons/icon-384x384.png","c202a45dfc404f2f315e8cc6cbf94d3a"],["/images/icons/icon-512x512.png","b9871b7b10d0582cbfcc8be37c31f9a4"],["/images/icons/icon-72x72.png","273f86f63d3eba378592de686ef6f33a"],["/images/icons/icon-96x96.png","157cf8c09db0ce0ee91cfd1fbf56135b"],["/images/ideal-board.jpg","92fa6deeb804a59f465ce2ea9887d563"],["/images/initial-commit-log.png","b0a6bdf1272a9e26350358a136c0aef2"],["/images/integrates-with-github.png","2172905f34eb6a44c908bfce1d60a501"],["/images/interactive-spelling.png","5c72133361d6a014f051a9e5ce52ce35"],["/images/lambda-console.png","5b7910271c8ae2ac56c67ea8a6c009a4"],["/images/logo.png","694aa93fc50169105d632b82b5ad7f33"],["/images/lost.jpg","4b3be674866c6247591da6077a89d092"],["/images/mockup_5.png","7e8a346b20c0c82e10c018d5cd48ef7b"],["/images/mum.jpg","9b8c4400ef4af16b38edf23549d2527a"],["/images/new-sequence.jpg","e4999e78f571992a9321ab99434efb62"],["/images/nonewline.png","5ae8bf57fdf185b6163b3bbf9e1b25e7"],["/images/npm-run.png","12746c403e0d9beb38006bc051518488"],["/images/objects.png","62ae5574aef54e97ee041318a87fef45"],["/images/office365/10.png","031cd3ea3569a163d80bdd65e15fc734"],["/images/office365/11.png","4d2d70e91bd99ea5a59efcf4dc533c50"],["/images/office365/12.png","b2b8e62d39b026301a49b6c6ef0afb78"],["/images/office365/14.png","91f0d277d39aae5dd08e6662d401bae3"],["/images/office365/15.png","d490e4568e3cd9fa16871718680c5715"],["/images/office365/21.png","46e16ef8707fa4f3c7b625b1aa85097e"],["/images/office365/22.png","3623920b00eeb1e0c414fb38bfb2ff8b"],["/images/office365/23.png","06a37d393363e7cf687cae4c62a3e769"],["/images/office365/25.png","7255578b47b644f215154cd0ad0df993"],["/images/office365/28.png","6e4a14da26d7cc530db920073045bb69"],["/images/office365/35.png","ad7550bf0f56dc1cc5bfd6a5c983c40c"],["/images/office365/40.png","3631c1372f8a30e431598c8ef3c6f177"],["/images/office365/42.png","e86f6dec5ff14c7829e2184678d36f61"],["/images/office365/46.png","49f8065354e9e17cf55ce72e7ad00569"],["/images/office365/47.png","a16d6184987dcb34f7df72ac9b51e135"],["/images/office365/48.png","e9ea49808c8ab61fbdf4ad0f3c9e22a8"],["/images/office365/5.png","785c18a10706d5c775f9c27536ef1a4d"],["/images/office365/50.png","db36f58f4cff55332cc7113c353032a4"],["/images/office365/51.png","b23c53ad38a9ec40ab1737c2d38ed826"],["/images/office365/52.png","f69450e57f7cdcdd1ec9029a6e41f4b0"],["/images/office365/54.png","cf6435593f00c899ae9c11d36538eab2"],["/images/office365/55.png","e4eb718efaf37dc043a1bb64bbc78852"],["/images/office365/57.png","f287a7df1647a28a10f1946770d146fc"],["/images/office365/58.png","cfecc32ffa5d988648b1b2482bd66199"],["/images/office365/60.png","8b13c4baba5499fe34587bd1f29f94e3"],["/images/office365/61.png","d4fb2bc8806721856610da9b9374a3cd"],["/images/office365/62.png","986d5fd7328e9e3dc915210213632a6c"],["/images/office365/65.png","187202435b7fc3e99420353a394eb600"],["/images/office365/68.png","bf257e29144e99df4ee00bbad7b55f97"],["/images/office365/7.png","9c8e29e7d5a9a3d92ebc2944bb681833"],["/images/office365/8.png","18f1b1af59e21ce4b9534b91b55d539b"],["/images/one-board.jpg","943cc8002737af095ae31844e9565172"],["/images/part-four-flow.jpg","b2f35eb42bdbc40cc95518fa1f6faf7b"],["/images/pepper-1.jpg","951c2328816bbbab26000acbc3b3b279"],["/images/pepper-wide.jpg","1d13326a7e4f7ae9393b23d3355bb710"],["/images/personal-access-tokens.png","08cc595af59d3694bd190cf762b5db00"],["/images/radar.jpg","ebfb218bc80abb2d4aefab52bde73214"],["/images/reactotype_screenshot.png","f6aead9c67782b19138b15a01115c1bd"],["/images/rss.svg","a0ac3b30d914a734a53a18587a9f4761"],["/images/run-nightwatch.png","027d2f57764c4eb0db860af39977cbdd"],["/images/run2.0.jpg","e7436a10ea8f30c266add9e9a65ddd6f"],["/images/second-slice-4.jpg","04ad1d901864e5fcab58f5d4262830e4"],["/images/serverless-maintenance.png","e749f4b5bd5e3e0853d7c3af14a8027c"],["/images/serverless.jpg","2b5e25f5a8faa9ce655f835cee1cbb15"],["/images/solar/feed-in-tariff-graph.png","358bbabff1aff602150e515060e9be0f"],["/images/solar/panels-east.png","dce455dfa894231703f15db73446e2c1"],["/images/solar/panels-south.png","33e75834dc6a885468e85b838f64f2b3"],["/images/solar/production.png","82f84fd541e711eda5121450909235de"],["/images/stack.png","3612bee6a7ba5356a8052d880c034b3c"],["/images/start-api.png","c408b21dd3dd2f0ca9ce0656b4fe0f3f"],["/images/structs.png","20e52ced221b8657ce0092cfa75855e4"],["/images/structured-data-crawled.png","2055fb931d19b0627655eaf46291ec52"],["/images/sunny-day.jpg","47943c980a7e0bf94b034b439309944d"],["/images/tada.png","4d76d62a0249ba843899a30b8ec9d67b"],["/images/tag.svg","34a504803dc8f5e431aae1dd5e0e9d6a"],["/images/tech-debts/actual_different_styles_meme_by_zeurel-d38c306.png","3a1266003cd719d97baa814a33423939"],["/images/tech-debts/tree.jpg","977a11d3e6a2bf039c20ba4359949517"],["/images/testing-api-1.png","629bc6a72681c9746bb289c239e764a4"],["/images/testing-api-result-2.png","dd3a40d355e99902bceaad05a2b29ea9"],["/images/the-chart-1.png","0daed6266a23a8d5dbe1ab099e1164d2"],["/images/the-discussion.png","368647833e9f77ed21c3e86a58539ead"],["/images/the-graph.png","ca24c8130d51319114a1214f7e907264"],["/images/the-quadrants.png","e8bd5a9a6067c01ccfbbf1aa6c43b64b"],["/images/toot.png","98265e943395b18fd1bf9d0e8d39a1d5"],["/images/travis.png","b9ebe32d382c66382d91f2a187b0ea6d"],["/images/tree.jpg","ae695d1a52f6098847d55f3773e236d3"],["/images/twitter-32.png","0e21335ff0b1b322f75eaaeb32b81ef9"],["/images/twitter-black-32.png","c279b87a4805d22ea078147ff065f8d3"],["/images/unhappiness.png","f64c4bb1418782b59a87762be9a6e3e4"],["/images/votes.png","d4a02c6f0dc225adb9765de94ad50ec5"],["/images/weeknotes-autoload-graph.png","0c438bbc92251768375086b2084ab0b4"],["/images/weeknotes.png","e819bc1ab10021155905e1d7077c025f"],["/images/yarn-desc.png","84a3a4792dd41ba78ce955aeb374ebaa"],["/images/yarn-run.png","b195b8bce5baa57df6e6ea51a3dfafda"],["/images/zero-velocity.png","b0c33c81b898bb29e102f3a1c8351199"],["/index.html","d3ccc482de736298309cb1e4c5bef618"],["/kids-games.html","eadc8b973b8f89d96a52bcded5eec9b7"],["/kill-if-with-objects.html","5914b60ef8375c1f732ac6036f63745d"],["/page2/index.html","b927b758153fd45b79f0b20d6cf0830c"],["/page3/index.html","5e0227acedbb5359d7db7ea49bd4bfb8"],["/page4/index.html","a1277cd0adfc59a8fc7bc031aeab7f01"],["/page5/index.html","4b066cafacef86fbc56c8bb1e8c07896"],["/page6/index.html","cbdef547dd38905fb2e3313e3e3fefd9"],["/page7/index.html","3c8b6d9856b9d8d9768a48a127e1a42d"],["/page8/index.html","bf2e304e66f14f0470caac5eca260277"],["/page9/index.html","c9016cc4a7179a267c7d877e17358c72"],["/powershell-on-linux.html","c8400ab5a8eae35a1ad837553243f7fa"],["/rake-transforms.html","c15e81eb9b7dc097dfa02ae5a4e649f0"],["/reactotype/part-one.html","66c3d948eec357a466b916505fd079bc"],["/reactotype/part-three.html","c43ed948e4c866cba71715504219cc76"],["/reactotype/part-two.html","45759caaf44b1f8c76d5a98ec98de53a"],["/real-vs-soft.html","5f678314385ecddd7269c74d8bbe2a0f"],["/recipes/2022/09/pepper-salad.html","607c63b004f7f4387ef5288cef759517"],["/recipes/2022/09/pizza-dough.html","a5ac30f8a7c07e460bffbb80032f240b"],["/recipes/2023/01/pasta-e-fasule.html","1c2fd33810ed17cfcdcbeaab2a61c1c3"],["/recipes/2023/07/zucchini-focaccia.html","e8adaf37933a1845ac1034538732bdfc"],["/static-factory-methods.html","e087c1693f62c46decde7af6ac8c2a27"],["/structured-data-with-jekyll.html","41b961f1dd9006e396fea4ed7723804e"],["/tags.html","894747a3a5bd165be69fada5f05c1e84"],["/using-travis-to-build-jekyll.html","b5a6326d29a78657b2d7f8a609406e21"],["/websites-CMS-platform-logging-in.html","d0261a1fbdfd9952d06439fa3765be5a"],["/weeknotes.html","154cad3d979cb6bc714caac77b13e538"],["/weeknotes/2020/10.html","ca9e6fb55cf8b47a0ae820eb142f8ab7"],["/weeknotes/2020/10.png","4f45a5a520c2b6b2faf90047bf3603bb"],["/weeknotes/2020/11.html","d612c8b3e8898c29498d002103d881a0"],["/weeknotes/2020/11.png","507f590fecc16c6a059ad216a602c0ab"],["/weeknotes/2020/12.html","7b23eaf9c7e5bf6f77958f7ffa0f966f"],["/weeknotes/2020/12.png","2b641524652fdac9d8909c4db20497e4"],["/weeknotes/2020/13.html","b334e1aa7d7a12288f408af80db6f4e9"],["/weeknotes/2020/13.png","ed94b10b816811328ab59d6e14f2ad6d"],["/weeknotes/2020/2.html","e1eadf1a56d13a9a1223e2b3bb9d7995"],["/weeknotes/2020/2.png","9583be86a6ed73ddb0e8cfa242f09928"],["/weeknotes/2020/3.html","e7ea81a1295c6a97a3805e0917427583"],["/weeknotes/2020/3.png","88792233ca46b5f3306a4eff17665b8d"],["/weeknotes/2020/4.html","db1c258f520796bdb749dcc860d9a481"],["/weeknotes/2020/4.png","c13496ed9d5fcedf4a3d427acfe6b4ec"],["/weeknotes/2020/5.html","858939d4f87c55b5c71ce7a36f23b74d"],["/weeknotes/2020/5.png","054aab25d82dd4bd3984373f043557fa"],["/weeknotes/2020/6.html","9eea94de70d546a6707ccf0d97324e23"],["/weeknotes/2020/6.png","170381d300a5f39fa7819ebb7f7a7073"],["/weeknotes/2020/7.html","9c649e65efc14b1720c8c45ae2eb891d"],["/weeknotes/2020/7.png","e35dd8f76a851ca7cf8ccbaa3c7a2797"],["/weeknotes/2020/9.html","3a7c5e53a0feea842fabf970d9095c02"],["/weeknotes/2020/9.png","48f1cbc8a9293f94dccf6e880ea22fae"],["/weeknotes/2021/12.html","932190099f1407019d83109d8c1295e8"],["/weeknotes/2021/12.png","c88c6a518cc9de8769f8a39a5dd6cd96"],["/weeknotes/2021/13.html","db9e8af3c5078b14c63b3fb08198f3b1"],["/weeknotes/2021/13.png","81227b96e7cb385f9fae0aa3a51f39c8"],["/weeknotes/2021/14.html","f951fb3c42d6579e20e49cc7fc0a16b0"],["/weeknotes/2021/14.png","043666be5fbdf9c11dafe9043a2c31bf"],["/weeknotes/2021/15.html","ea8582f0cee3044b9b567642776cc179"],["/weeknotes/2021/15.png","b5107060c33aa952a3ea158a1188546e"],["/weeknotes/2021/16.html","81190b74f3d540cb9b8f95789a9cbefd"],["/weeknotes/2021/16.png","a1dd4c993b2c39e270b952b42da6075d"],["/weeknotes/2021/17.html","a559babd93f2942ffab43446fda4172a"],["/weeknotes/2021/17.png","92d64a1ec3259589bebc94e858e02dcc"],["/weeknotes/2021/18.html","ee163346825d7afb450024bba18cba74"],["/weeknotes/2021/18.png","5d3ac70b8f1eb8302c9d4f80b8a4f646"],["/weeknotes/2021/19.html","a1e02b1616310f07b317b8b99934de32"],["/weeknotes/2021/19.png","e5ad8cf01b22e4ae88b3c4e76cd5f60e"],["/weeknotes/2021/2.html","a4af74481a5626ebda8601c37379046f"],["/weeknotes/2021/2.png","d1368acaadc371eae9c96227122dc6bb"],["/weeknotes/2021/20.html","2d2e16521e39e4876393b6dba77e2395"],["/weeknotes/2021/20.png","64b801f8e9799eb14a9c57110127df3d"],["/weeknotes/2021/21.html","2358c3c0ff9b8eb79ff146fdd96c2a00"],["/weeknotes/2021/21.png","14fa7b361683626b98b75593819f9b1c"],["/weeknotes/2021/23.html","46f0ab6cd3fc50ee23921947736291b2"],["/weeknotes/2021/23.png","d617d0dca985d84180ee51911de97f4b"],["/weeknotes/2021/24.html","cec172a3bd7f9c0dfe75be3faf6bada9"],["/weeknotes/2021/24.png","e2c52d745c8f66fc7c61538adbcd7cbd"],["/weeknotes/2021/25.html","d1a7074103a9091eee80fe48bbaa0f10"],["/weeknotes/2021/25.png","00b4542d11b7ffdde87d0af6200408bc"],["/weeknotes/2021/26.html","020a380dc2cbfbcc4a0ad946868d2d7a"],["/weeknotes/2021/26.png","35216791998911c16e8176836f8b2714"],["/weeknotes/2021/27.html","db8a82ca4180b33ccde1d56085327a4f"],["/weeknotes/2021/27.png","36fb1e9c70ba7043105966560754088a"],["/weeknotes/2021/28.html","2c342e576c1b79d62118fee171381bbd"],["/weeknotes/2021/28.png","a743a2119b8629f6938d98fd0f7095b1"],["/weeknotes/2021/29.html","760e64f833496cc36d3b328d6279dcdb"],["/weeknotes/2021/29.png","7998b72b1548cdf27c44ab25c683526e"],["/weeknotes/2021/3.html","11c56396ef646abef55b611727a1062e"],["/weeknotes/2021/3.png","57cc3c48b7dfbe694934b7cfb0b1b9df"],["/weeknotes/2021/38.html","128b8386dbd7b985ac5ce2239b0807e2"],["/weeknotes/2021/38.png","6e0d615b8610ce440a3cb0e431102051"],["/weeknotes/2021/39.html","758fedc1fef6bc509ce65277630b6d6a"],["/weeknotes/2021/39.png","e1235b29d0d7fc0d88b1e57802c320d4"],["/weeknotes/2021/4.html","88fd01d36307c42d750ccd5e08b25dca"],["/weeknotes/2021/4.png","2a14aa6a3f3f35e573c07a47f0c0f006"],["/weeknotes/2021/40.html","b368a87796eae44aa2d4ed0c0b863f78"],["/weeknotes/2021/40.png","c55a19dbb0a823c062399308b89bbb05"],["/weeknotes/2021/42.html","38126e4d2b1c6a94d4d3e60114d6817b"],["/weeknotes/2021/42.png","ce309ff60dc0cdb17ddcada292b7bb70"],["/weeknotes/2021/44.html","d8918c58530e25a8bdcb7d66dc14265e"],["/weeknotes/2021/44.png","a3310d5451f061aec21a1120051f9860"],["/weeknotes/2021/45.html","1536a44448ce2dce1b50086cb4a4d837"],["/weeknotes/2021/45.png","5a9394abfee90c783064831108eb47c1"],["/weeknotes/2021/46.html","724ccd9d5e1b7e09381247aed73dce25"],["/weeknotes/2021/46.png","c069c1a88a433527b7a3b123c768163c"],["/weeknotes/2021/5.html","d3e6987e1b3a3f5c6cc628d4f4238b5f"],["/weeknotes/2021/5.png","a3d4210940157426192f1b44b1d90cc9"],["/weeknotes/2021/6.html","5937cf9cc917dab8c86e849999e5a901"],["/weeknotes/2021/6.png","34df4821a9087480d45bedea7a9c298d"],["/weeknotes/2021/7.html","6ad75caf153ebf4c6fcad5cf465c4152"],["/weeknotes/2021/7.png","1d9f8dc963dde429d91a38a14ad6e939"],["/weeknotes/2021/8.html","b07fe11f53129ba81f69307f95797a6b"],["/weeknotes/2021/8.png","ed9cd6d165962e0d7df0c648fc2ec353"],["/weeknotes/2021/9.html","bb87c41103708e24b757a289c3fe9db3"],["/weeknotes/2021/9.png","ba9a8e26e5e04bec9ab2867b8c332eb7"],["/weeknotes/page2/index.html","56a7b940bae68f0ee3e9b981a71ba8ff"],["/weeknotes/page3/index.html","60a6ab043b1fa9d3268fcaf2d2a83ac8"],["/weeknotes/page4/index.html","22b8f65443c1a8c62a2fad3776d0c1dd"],["/weeknotes/page5/index.html","b2333705b214a1f3e98f8b8fabb720e2"],["/wrapping_up.html","e654316d68fb7b80b25b6c07c0f8951f"]];
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







