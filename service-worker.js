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

var precacheConfig = [["/2009/05/anonymous-methods-when-invoking-in-vb.html","1ad150935d7d7db36ce7202ce720f79b"],["/2009/10/bing-is-not-search-engine.html","d6f9535e63c096a9947ff2609b1c0845"],["/2009/10/quack-quack-says-duck.html","95339e58044452c75b124b76c57a706d"],["/2009/12/c-background-worker.html","817a0d9fc0a06e5d81584731c183f688"],["/2010/03/quack-quack-says-duck-now-with-added.html","f4aa38647d845836dc50d3629e9147a2"],["/2010/05/theres-more-in-them-that-hills.html","970dbc5ac66d48db380ebfacd525f2d5"],["/2010/08/odd-odd-odd-login-behaviour.html","5475b3d9087babfacb6ff5b4f46287be"],["/2010/10/refactor-fun.html","2d614b9de5785e87927734a3d6a51743"],["/2011/04/ssh-without-password.html","024fb0efcb76a4f36a729443f4a29f40"],["/2011/06/get-with-programming.html","13f15cb1efdbe57c0e1e6a015cce1488"],["/2011/08/how-to-design-unsubscribe-link.html","9881a6aff9356506125fe8689392f6a0"],["/2011/09/unusbscribey-follow-up.html","b0bc31784db2b33ecb56f78d0cc6b4ee"],["/2012/01/setting-up-mvc3-website-using-built-in.html","9acd7d899a101dc9fa6b179365ae01d7"],["/2012/02/is-there-really-just-ipad-market.html","f1386fc91b9f60f3c208d5b67d6e71d2"],["/2012/07/y-u-no-sell-downloads-hollywood.html","e66ba74032fa9289255ffe5d8d121e47"],["/2012/09/obligatory-ios6-maps-post.html","e567610a6728e517f7fe4941f8f32615"],["/2013/03/automagical-search-ux.html","5a4c3189a8bf69a2b624538b2808b359"],["/2013/11/astronomical-database-identfier.html","d76d57fcf051e80d036029b748862eba"],["/2014/01/comparing-mongodb-and-tokumx.html","9b111c60db8788beea77479aa2545576"],["/2014/02/websites-cms.html","9e61003b9c717b8b7023a19a590b48c2"],["/2014/03/testing-with-browserstack-and-selenium.html","def41a277b1d3ae968b43f528ee2b08b"],["/2014/03/website-cms-display-pages-part-2.html","de78451b91218f9f7a90826dedde04f3"],["/2014/03/websites-cms-displaying-pages.html","471b4cf2ef4e6c6c542ea72cb9815c40"],["/2014/04/a-dto-by-any-other-name-would-implement.html","9b7d1d885384102524ffe97acf604317"],["/2016/yarn.html","ea08685051286f2470700e00af940374"],["/2017/05/big-pile-of-soil.html","92321c5a7276615859d2750e1251d097"],["/2017/05/ubictionary.html","2c620b978a56f5ae047d609a5cf62a00"],["/2017/06/radarban.html","f0ecba02f80f3b5420cfaf1f63b8af7d"],["/2017/07/retrosperiment.html","188b630ebbc6f3381d3b26efb08f2493"],["/2017/10/constructiphor.html","b0a2e6d145c5ac474e03869abc30261f"],["/2017/generating-static-amp.html","1b8fc6419838e1575795f2b60be523ea"],["/2017/testing-meaning.html","000dbcc8a6e19567e4e0a9112715e222"],["/2017/testing-static-sites.html","0fec5df8083e5023e5925dda67800feb"],["/2018/01/direction.html","2fcfb6d182f04ae9b05bc6e5a7d3f182"],["/2018/02/serverless-1.html","80b71c4740a0d3a51851b652828d9324"],["/2018/02/serverless-2.html","cc091ccedc539c15216cc20022bc623b"],["/2018/02/serverless-3.html","b6c9764e7e2c2bb37085cbd2c67a685f"],["/2018/02/serverless-4.html","53d267dcc6816ce29d6f14f4c78a03be"],["/2018/03/harmful-dry.html","c73088ccd741c2626479e5b3c2c99750"],["/2018/06/serverless-5.html","538a5c1aa3d6b3a2c4c49db45107e6e5"],["/2018/07/serverless-6.html","0ceb5066fe3adb9fe5c18c6428670b64"],["/2019/11/serverless-lessons-learned.html","7290ddabf08fa96ca6ba4da209d8d778"],["/2020/01/year-notes.html","47de549ccbfdaad4de37962bec34973a"],["/2021/01/year-notes.html","dc2b5465243ca9e78ba60a02cb4480ff"],["/2021/07/tech-debts.html","00ca56b3da6070bc528b449568ee0cb8"],["/2021/09/emotional-advice.html","8505dea3c4a6291ccc1585f1169bb19f"],["/On-Page-Editing.html","b466cdb9b88ec996c4e578de43021d47"],["/Websites-CMS-Platform-Storing-Data.html","9265ee4895d5af01c6d79b1fe7dc1dcf"],["/Websites-CMS-Platform-Storing-Data2.html","f894ba528cf3bbfe530d84c1eaf0e00b"],["/Websites-CMS-Platform-promises-part-2.html","5a73a3d7e61fad0ff483de69a6ac319e"],["/Websites-CMS-Platform-promises.html","ca0cefbbfb3dc637ca28471c2834c364"],["/better-affordance-js.html","d06552950df9d85cb39f694b3ac1f9b5"],["/better-affordance.html","772870cd37ae2bc1c3053eebf3dcac34"],["/categories.html","c24b77095e3a4ee864ce72fc4cd5e1d7"],["/dear-diary-year-one.html","676668794d63293b0e6e6e2755583a8d"],["/fun-with-structs.html","b5147488583666d2c3465afd68b1208a"],["/happy-numbers-kata.html","12ad38ed6456647c6c57de58ed7fa525"],["/images/1-no-event.jpg","1fed4f131651de4ab49e4aece56cfd88"],["/images/1.jpg","5f00566ed6cc0a69ea1d00217ed5755c"],["/images/2-events-written.png","67a033a4ae5b596ebf499d80b929645c"],["/images/2-one-event.jpg","ddb3c295e3f8f60c386b9c4eca9f4b9e"],["/images/2.jpg","1bb09839eca2a8320bf598a285c80324"],["/images/3-many-events.jpg","ced75a3200e46952147eb108ff869ad6"],["/images/3.jpg","08882002e7dba0267e0f4f2acf79ed6b"],["/images/300/1-no-event.jpg","8b415b02f32601887f6eed287164517c"],["/images/300/1.jpg","94519ab441c0cd1bd9ffcc5af58550f5"],["/images/300/2-events-written.png","4cf6a8d45bd32a765a9db56ab24450d4"],["/images/300/2-one-event.jpg","8e8ee314d0d770c405fcf2081f1a5d69"],["/images/300/2.jpg","8a9ebb45fd241701b86734adfc0fc159"],["/images/300/3-many-events.jpg","4a2384f470f9b968eb8eee760f3e5834"],["/images/300/3.jpg","0ab9a7d853c4dc4f69f365cf6cd159d3"],["/images/300/4-new-readmodel.jpg","f2b9d7c5a47762e6d95c80b38eacbe25"],["/images/300/5-caught-up.jpg","fd263b1a93c809e448ef57674214bdad"],["/images/300/6-graph.jpg","81145e84a5f648b049bad07084a1ba9c"],["/images/300/ABC.png","46a512d4dbbf5a638f74315b15caec32"],["/images/300/AMP-webmaster.png","c52aea35ba958f44f8da5fbc9cc28090"],["/images/300/GitHub-Mark-Light-32px.png","27f7497bd771f103f6e40cd65981b529"],["/images/300/actual_different_styles_meme_by_zeurel-d38c306.png","6c721ec9f658499bcc5436f26313f07b"],["/images/300/affordance-loggedin.png","07dd508c246919e33ac7a21aa0e093eb"],["/images/300/affordance-loggedout.png","c95f79bd89045b2f1ac1c57acdaee688"],["/images/300/agilecam.jpg","c50a086407a3f688626983a7caa21aa1"],["/images/300/api-console-output.png","0ec0ccf29504872fa879c64c2bf44377"],["/images/300/api-gateway.png","09915579beedd77eb202d37337b41315"],["/images/300/beach.jpg","aef5e20469908dc39f86abce46b22176"],["/images/300/bill.png","995afbfebccd69f42287f94e24684798"],["/images/300/both.png","834bc93867dcb752f5eef6da3cf2a3c1"],["/images/300/cardboard.jpg","11904351a6ee94c229bacaaadd2eb30d"],["/images/300/chickens.jpg","8ca47f1b2a43b0cb0e965dfb1f341604"],["/images/300/code.png","8dcb9460b3a367c8a1cabbf6798725b6"],["/images/300/common-language.jpg","c35f51cf0e31e4f6a23ecf5ec7c1f8ab"],["/images/300/cqrs.jpg","92f3b2d7f4c437d0b4cae246a5571af0"],["/images/300/crafts.jpg","86460ef882f76ffc03ba8fc9fca6ad9e"],["/images/300/current-sequence.jpg","f2fadf070382c839f38cc0a90ecaef6b"],["/images/300/dog-2019-01-01.jpg","fc410a9f2b93eab5702b03ba3ec6f355"],["/images/300/dog-2020-01-01.jpg","d6594d4b77ab53d11c3c7d363ee2343b"],["/images/300/dog-2021-01-01.jpg","00f13b473279d7a73c32db3cc9db9879"],["/images/300/ducks.jpg","3ecb3a183943b1151784f35d5c3047bd"],["/images/300/dynamo-cheap-perf.png","3ea433609df3e72c3bf4d8072e89a908"],["/images/300/dynamo-console.png","4d9ddb433093616b4ffdd27c574c3e37"],["/images/300/east.jpg","dd9d8cab2c708009aa34e01a8b53ce13"],["/images/300/event-composed.jpg","47afc74a716e7cde8bbf3f4247df661b"],["/images/300/event-notification.jpg","736d803982ef0beffdfbc313e3633966"],["/images/300/event-sourced.jpg","ce41ce31f8255d849c3b4767805b6fa1"],["/images/300/facebook-black-32.png","5c7605ac74aee44cf908538c46691c13"],["/images/300/fifteen-dependencies.png","c3ac74c8ab0db24ededf5d1354043adf"],["/images/300/first-slice-2.jpg","610e1ec20e490874fc81bd8460b273cc"],["/images/300/foggy-day.jpg","949fd4c4a0e515e5a58dc456433efed5"],["/images/300/forecast.png","fc8042ae1d18ce4e0a8913e85b8e09de"],["/images/300/god-of-death.png","74d94d013f99e23be2ff666fb50a439a"],["/images/300/helpful-advice.png","235df6eb267705312b31fcfb8c7207af"],["/images/300/home404.png","bebafde146b901baf9df57fc779d1730"],["/images/300/homeBare.png","96cb2ce62554dc03b0e16a8fb91c72ee"],["/images/300/homeCarousel.png","054dfd9c483881037bf8ac487dda5262"],["/images/300/homeFull.png","3a3a4deeba2857a6b73f5109f2609a2d"],["/images/300/ideal-board.jpg","3228ba64d204bcefb87a6704de71991b"],["/images/300/initial-commit-log.png","9fd7202b4bd298d180dc773a35d85341"],["/images/300/integrates-with-github.png","1f4739ecf9e065357391ad23763127f9"],["/images/300/interactive-spelling.png","6136e6199d4c162fae8a6acba328260d"],["/images/300/lambda-console.png","1886fdd1240b4a16c79060b6c4456807"],["/images/300/logo.png","694aa93fc50169105d632b82b5ad7f33"],["/images/300/lost.jpg","bef1030f009e3cfba7dd2d762d6a5907"],["/images/300/mockup_5.png","0109764e57efdcd990859479ee6a4513"],["/images/300/new-sequence.jpg","80e3bebf4ec0cf08877e00efa0af5fc7"],["/images/300/nonewline.png","1374e73abb337aa17cc401f4db5346af"],["/images/300/npm-run.png","ddd25c92d5f3baa7d69bf9fa50669e09"],["/images/300/objects.png","688f9cd06728befc16e77ba03155e9cf"],["/images/300/one-board.jpg","1b9d648e509979281697c095462777a0"],["/images/300/part-four-flow.jpg","95584ce15873d78830fe8f9e8690a0d8"],["/images/300/personal-access-tokens.png","19fd7b1512b4eb6249437180cdb56114"],["/images/300/radar.jpg","1c212f677d49a7c99ec26e501683693c"],["/images/300/reactotype_screenshot.png","769891963c483bcba1535fce0128b2d5"],["/images/300/run-nightwatch.png","17dbc2c513e0e4157344d27da04ea9fc"],["/images/300/run2.0.jpg","6632bf63cdb3d78f23e8cd34112ee44b"],["/images/300/second-slice-4.jpg","8c0e6c1d0549fa30bdfa56ba76b13e5d"],["/images/300/serverless-maintenance.png","658912fbabaa75162505fe8107ae03be"],["/images/300/serverless.jpg","c6c44646e69a53f2d9ecba87a2df498b"],["/images/300/stack.png","4aeef068982c01126c35e4068a09f16b"],["/images/300/start-api.png","e0ec0a4c6fb6c26e16f54eca5ae49fad"],["/images/300/structs.png","a92895807d8473341f4064bc2fe10a1a"],["/images/300/structured-data-crawled.png","21f480a644218bd03adc7a02774536f9"],["/images/300/sunny-day.jpg","188e7ea7a40dcaa7d8ac614fb4bedeaf"],["/images/300/tada.png","6a19bd23d1c99b7b32470ae4dd984833"],["/images/300/testing-api-1.png","4647459b1fb6cc73a243b7d27fd51740"],["/images/300/testing-api-result-2.png","5bf70cadbc7feb0b4a08543a27562b9e"],["/images/300/the-chart-1.png","082f6e2b26b2864a3cec426d9d337e48"],["/images/300/the-discussion.png","40dc38ffb136a5536bb64b5691edf42a"],["/images/300/the-graph.png","000399ea2efb4e355e4570fcc61fac23"],["/images/300/the-quadrants.png","89b7deb6fb5382d9e2dfa32b9fccdbed"],["/images/300/toot.png","1becd9cd4ebe4e7adfa8203457c5485a"],["/images/300/travis.png","9b8822912d80d2c7ae95b8065745f0ec"],["/images/300/tree.jpg","290f734fcdf49648d09ecc86250296e2"],["/images/300/twitter-32.png","0e21335ff0b1b322f75eaaeb32b81ef9"],["/images/300/twitter-black-32.png","c279b87a4805d22ea078147ff065f8d3"],["/images/300/unhappiness.png","1f2c8170b420c3ad4ebc4a8bb1af9d0a"],["/images/300/votes.png","4f5419207fca7e392a995164ccfbd004"],["/images/300/weeknotes-autoload-graph.png","6fe496702b8f1a81fed48d11592eb935"],["/images/300/weeknotes.png","2eadc54c31f4c79e2239b3aaa1aa32cd"],["/images/300/yarn-desc.png","e1392cec036db997d4a8e71ac2be8523"],["/images/300/yarn-run.png","5f5c27a364514228e9c6af5c54043462"],["/images/300/zero-velocity.png","8558fa64f3782d8c9ff38a31fbc289a5"],["/images/4-new-readmodel.jpg","abca23326d158047986f6ccb8221d156"],["/images/480/1-no-event.jpg","be0eeb53819930b79455e43730a03250"],["/images/480/1.jpg","2f88949815eb7cdc916840ce8a702fa6"],["/images/480/2-events-written.png","e32e74a826cd28240884dbef17f27998"],["/images/480/2-one-event.jpg","cc33b07109053e3146ebee10944c2318"],["/images/480/2.jpg","ac441d98aef0858b1c65a847921beed4"],["/images/480/3-many-events.jpg","dabe25c09d5ba16c47e2902b2f935162"],["/images/480/3.jpg","1b300ba9ddd0302acf512e8b60eac378"],["/images/480/4-new-readmodel.jpg","998aa6387d5a25e4457733647bed69bd"],["/images/480/5-caught-up.jpg","0b1a5b44929cdabe72540887ea47f52f"],["/images/480/6-graph.jpg","04544b19fd3a70729a6cd8d676cd4fde"],["/images/480/ABC.png","f57b16f8eb1ec6251fa9517acbcfd983"],["/images/480/AMP-webmaster.png","faa3f0e481fa440de7c3f3706e81991b"],["/images/480/GitHub-Mark-Light-32px.png","27f7497bd771f103f6e40cd65981b529"],["/images/480/actual_different_styles_meme_by_zeurel-d38c306.png","fd84f9d47e95a13c706d9cd62ad30d69"],["/images/480/affordance-loggedin.png","4acbfa0398b0e1876b0fd9fd0b2429de"],["/images/480/affordance-loggedout.png","6e05b899ce85cfee7ad05b432fdc699f"],["/images/480/agilecam.jpg","47387066f9964a972a84fdb86ad36350"],["/images/480/api-console-output.png","598580ce630e5e8213aa54207f33937c"],["/images/480/api-gateway.png","06caf16cb187fc71387d3561552cfd7a"],["/images/480/beach.jpg","fb25de4338ae12c5534eb181fa562ece"],["/images/480/bill.png","fa975a75bbdc34bd1d66aea1cd0479c4"],["/images/480/both.png","7c60fa5e45c27bed1328f213d51f8a2f"],["/images/480/cardboard.jpg","40f8a2ff39b597d0e4b9da032f475b13"],["/images/480/chickens.jpg","7e03fc3b2a53497455476c069e7478a0"],["/images/480/code.png","bd2e76c66cc65f111f5c45257aa362f8"],["/images/480/common-language.jpg","6176a1185e8cd216db2a077d954bd517"],["/images/480/cqrs.jpg","7cb0fd7e99f87d4ed05de3cd0f8892a3"],["/images/480/crafts.jpg","28691b36c88862bf82c507228f53e78d"],["/images/480/current-sequence.jpg","07d42f33bbfbfbea9dc1921e21eb7254"],["/images/480/dog-2019-01-01.jpg","d927f4f4046867e799990d08a3fff3a5"],["/images/480/dog-2020-01-01.jpg","74b8f0acfebe3bf89623be67f0f3dba5"],["/images/480/dog-2021-01-01.jpg","d837d9291d40cb85405ed988d9fac855"],["/images/480/ducks.jpg","5b89514470923fb20949612eac101aac"],["/images/480/dynamo-cheap-perf.png","f1fbe9f95fb258116704c0f63c75ff78"],["/images/480/dynamo-console.png","0c888dc2ef4cfb201587a2bf471be8d1"],["/images/480/east.jpg","c1235413e53d543f9a44d25d71082e71"],["/images/480/event-composed.jpg","a6b02faa73f7eb4316aaa68e5604ecef"],["/images/480/event-notification.jpg","f169f241929c0345ef25ac7a18647a0c"],["/images/480/event-sourced.jpg","bf11e76a3dd23ae7e21c4f7ef9683cef"],["/images/480/facebook-black-32.png","5c7605ac74aee44cf908538c46691c13"],["/images/480/fifteen-dependencies.png","43150fa804d067249897883c8f85f411"],["/images/480/first-slice-2.jpg","38d186d5d145424e07ed0dba1c668766"],["/images/480/foggy-day.jpg","6279c5a7b47073bc297152701a365535"],["/images/480/forecast.png","1654aa59b4a4ffa91b23e3e1444f5cbe"],["/images/480/god-of-death.png","32df77d03bbd35bd2592951d65cb4d25"],["/images/480/helpful-advice.png","d43b3bac23e638d3147f4cee52b897bc"],["/images/480/home404.png","9cb173be84a875b40e63c293026c83b7"],["/images/480/homeBare.png","8e6b26baa8a3b39535f68238a32edd28"],["/images/480/homeCarousel.png","2692660218e7ee9e6b1952b96430e9be"],["/images/480/homeFull.png","f2b9c6185f555ead58e56a2fb6fa63e9"],["/images/480/ideal-board.jpg","36f51069bf84b8e0d3a94d53258f49cf"],["/images/480/initial-commit-log.png","5b969618e5234aae1adf5d061cf635e3"],["/images/480/integrates-with-github.png","3dc77f1801b9271944ae7e72a99a3b36"],["/images/480/interactive-spelling.png","8910d256cb8259e41a416806899d82c0"],["/images/480/lambda-console.png","424b17cc189d7d174d1bb883cf1067e7"],["/images/480/logo.png","694aa93fc50169105d632b82b5ad7f33"],["/images/480/lost.jpg","ec5d7e5898e515ef4d0f06135e1e1847"],["/images/480/mockup_5.png","19dd04db2551a113bffcd8304ed5e4c6"],["/images/480/new-sequence.jpg","42d5476a1d17454364e8adeaae66f929"],["/images/480/nonewline.png","606b55fae5dad8a5e3efcc55e58a3b67"],["/images/480/npm-run.png","3b057e3aff5c81a7866b01f3f3b9244a"],["/images/480/objects.png","949e97f4240055930779e965a70fccb5"],["/images/480/one-board.jpg","8b83f596ea93fd9b2f1752514e5720ad"],["/images/480/part-four-flow.jpg","0b87ef49e953622a7541010a6126fbf1"],["/images/480/personal-access-tokens.png","fede6fa9cd520bf5ea8aa9721d284280"],["/images/480/radar.jpg","aae0514f9d4b2da363ee9f7129e38aa7"],["/images/480/reactotype_screenshot.png","808309af1379a01a3986ae4b978981e8"],["/images/480/run-nightwatch.png","029377b6ee7e81181eff584b9d5fc008"],["/images/480/run2.0.jpg","8d9476dd0de98978e7368bc39f5de8f8"],["/images/480/second-slice-4.jpg","07a86ec5d732acf06d64b93e9526945b"],["/images/480/serverless-maintenance.png","d8548d5a8a54bd49a1692deaa365b6a2"],["/images/480/serverless.jpg","5867fe9fa51fc4068b2b9f0eee973bfd"],["/images/480/stack.png","b3e3e510343c09e66fc0798ff84f035e"],["/images/480/start-api.png","159a4c8f4f60e61a6de0c2b1e55546e8"],["/images/480/structs.png","503c1fcc9d8fddb30510f8aac73fc649"],["/images/480/structured-data-crawled.png","fa8b0bb26128576c5d1bbe18ec8fde7d"],["/images/480/sunny-day.jpg","441835daeb175e742051c137eadc554b"],["/images/480/tada.png","647fa8196bf727a6d68887bdb3770135"],["/images/480/testing-api-1.png","607daa2b4bd7b4d357be91a2f6640fe1"],["/images/480/testing-api-result-2.png","54f539abbdeba364e2d3695c158c0f72"],["/images/480/the-chart-1.png","017ee742d12aa29eabe356450913dafb"],["/images/480/the-discussion.png","56acfe21e4104447b32b4d0931631e26"],["/images/480/the-graph.png","e2c75ce76a60d1e4d2c7e4f1c7a28903"],["/images/480/the-quadrants.png","877e3650a6621826a3e4e4be0ce94631"],["/images/480/toot.png","1b8fc1a6be2c8cf8033126b8bf608d67"],["/images/480/travis.png","886cda7b912c1535924304753b929cef"],["/images/480/tree.jpg","37855622ff1ad2a01ad60aad92e2fe73"],["/images/480/twitter-32.png","0e21335ff0b1b322f75eaaeb32b81ef9"],["/images/480/twitter-black-32.png","c279b87a4805d22ea078147ff065f8d3"],["/images/480/unhappiness.png","f32366249405aa4dd661b9f4f376534a"],["/images/480/votes.png","e944f47f3aa3a751e3b3199431c197f7"],["/images/480/weeknotes-autoload-graph.png","76eaed87458653e7e95e2710d839f650"],["/images/480/weeknotes.png","01618ca7cbe20103c25a503129e0f3ac"],["/images/480/yarn-desc.png","5d00326afdc2845c13f57fbbf0793bb2"],["/images/480/yarn-run.png","b555174f4f2ad7708481bd426f8e133c"],["/images/480/zero-velocity.png","95a4c4a148a4fc26644669d65097d7a0"],["/images/5-caught-up.jpg","a1c39e67a4d5fd9d20b569441c3564d9"],["/images/6-graph.jpg","0479708729b16c42155cd460f9f45bf4"],["/images/ABC.png","f57b16f8eb1ec6251fa9517acbcfd983"],["/images/AMP-webmaster.png","d27fa84d401044d9f7b4102e22173bb0"],["/images/GitHub-Mark-Light-32px.png","27f7497bd771f103f6e40cd65981b529"],["/images/actual_different_styles_meme_by_zeurel-d38c306.png","3a1266003cd719d97baa814a33423939"],["/images/affordance-loggedin.png","4acbfa0398b0e1876b0fd9fd0b2429de"],["/images/affordance-loggedout.png","6e05b899ce85cfee7ad05b432fdc699f"],["/images/agilecam.jpg","d76677e06ada3edeed1b0137be93c6e9"],["/images/api-console-output.png","11d54779fa7e4fd3ca82847e6262890e"],["/images/api-gateway.png","29cdfe963460f2f62b1476080fe16209"],["/images/beach.jpg","1112f690c57d20aeafc0e3caa0a70687"],["/images/bill.png","0a3050d854e186b802c6f791e210d3ce"],["/images/both.png","117be54b1fd4be093dbe09d86e8b9f39"],["/images/cardboard.jpg","c2fcdc95a4bbd8c9e37fdbd179fea6f5"],["/images/chickens.jpg","6045a8c71df67e2136dff627f8f9050b"],["/images/code.png","7dd836bb1dd9c95db01be8da8327de19"],["/images/common-language.jpg","f2efd3d553241239665916c8ecb132d1"],["/images/cqrs.jpg","9a43a1b926021619101b35e97ec67d71"],["/images/crafts.jpg","c6528adcb8618432dd22b0e05a389751"],["/images/current-sequence.jpg","340aa9724f411578a9adb93c6d563531"],["/images/dear_diary_year_one/1.2017week1.png","14c7067175b4fe7ddb3e51ff9b4cf3c5"],["/images/dear_diary_year_one/10.2017week11.png","f092f0175888d5a5b34f3ce1a9053521"],["/images/dear_diary_year_one/11.2017week12.png","026470f234c6365b70dafeef4e0954f4"],["/images/dear_diary_year_one/12.2017week13.png","6343b7c5143cbdc1ad41ec0e674a8eac"],["/images/dear_diary_year_one/13.2018week1.png","6c728b10a0c57a65a9f7ec889b180e49"],["/images/dear_diary_year_one/14.2018week2.png","92aecb09ca5292dad51a71bf85dc24a1"],["/images/dear_diary_year_one/15.2018week3.png","a757cfe7249032d4e32645073c46ed05"],["/images/dear_diary_year_one/16.2018week4.png","c05e98417ba6f36d71d2dcd6749548e8"],["/images/dear_diary_year_one/17.2018week5.png","fd32de3fc67c0fb53acec759da3b8d1b"],["/images/dear_diary_year_one/18.2018week6.png","53a96952dd96873f598c078bf7e36916"],["/images/dear_diary_year_one/19.2018week7.png","944d98b762359dee4bdfc776dfc77cd5"],["/images/dear_diary_year_one/2.2017week2.png","3034124b2de5e032b52b6b55acad9f5f"],["/images/dear_diary_year_one/20.2018week8.png","4b8b885ebf0a756c419696e0cb0883b2"],["/images/dear_diary_year_one/21.2018week9.png","57fdfe4275a18b46f8d78ce708cc3d94"],["/images/dear_diary_year_one/22.2018week10.png","baf13ea472fb1878c194a6c5af69bd97"],["/images/dear_diary_year_one/23.2018week11.png","634e992bb990394b74032238a28bd937"],["/images/dear_diary_year_one/24.2018week12.png","12a16c102d4818d1b1cff162d237d9f9"],["/images/dear_diary_year_one/25.2018week13.png","8ad2fc7e3ee16ad056f3bbfc295541c7"],["/images/dear_diary_year_one/26.2018week14.png","bbee64e125d6bebfab9456700bbbf487"],["/images/dear_diary_year_one/27.2018week15.png","644a3ab4e91145eb395d386bb9dd2062"],["/images/dear_diary_year_one/28.2018week16.png","e901f3875c1202a415e16c51e72a3df8"],["/images/dear_diary_year_one/29.2018week17.png","e72986889e6fa158e15a7be0d37d6639"],["/images/dear_diary_year_one/3.2017week3.png","3fcb0902312504a1a1d898df49c7a075"],["/images/dear_diary_year_one/30.2018week18.png","091f747835dec5d168c025e51f0aab75"],["/images/dear_diary_year_one/31.2018week19.png","3ccaea946648cd6ab95c5afa5f921a6e"],["/images/dear_diary_year_one/32.2018week20and21.png","4fb9bacda295b0c80bfa3b2a587847f7"],["/images/dear_diary_year_one/33.2018week22.png","6cbd8e184952c6b27b134557a15f1af3"],["/images/dear_diary_year_one/34.2018week23.png","a4d2a3503eadbe3e8379b91a301b733e"],["/images/dear_diary_year_one/35.2018week24.png","6017308f8a701cd6896e6ac7c8186f87"],["/images/dear_diary_year_one/36.2018week25.png","62d703a3ab54c90342afc3ca07dd4550"],["/images/dear_diary_year_one/37.2018week26.png","06163eecc9967eab61629d0196d41694"],["/images/dear_diary_year_one/38.2018week27.png","2c4accf3ec27d58731598146820b51ac"],["/images/dear_diary_year_one/39.2018week28.png","e71205825b5b42acea8cb95639553b9a"],["/images/dear_diary_year_one/4.2017week4.png","4d82a3ab152a7062fbb6388cddbc8e72"],["/images/dear_diary_year_one/40.2018week29.png","2bf249f14334d2f5c02a701ac05774f2"],["/images/dear_diary_year_one/41.2018week30.png","1426d11ced5b604a34ad412764216cd9"],["/images/dear_diary_year_one/42.2018week31.png","6dc08d2275ca6ade92c9ab0f601b4b91"],["/images/dear_diary_year_one/43.2018week32.png","cc103879b4532a49df1c6f1a8ce028b1"],["/images/dear_diary_year_one/44.2018week33.png","57d87d660c43bfa923c2e22c842bb0b2"],["/images/dear_diary_year_one/45.2018week34.png","c69414fc5f7cc95528e9a0547d345446"],["/images/dear_diary_year_one/46.2018week35.png","f6a78bb1963cd3663e7e43044ffd800c"],["/images/dear_diary_year_one/47.2018week36.png","0abae18c076ca2161c37eb739983696e"],["/images/dear_diary_year_one/48.2018week37.png","4d212647549a7553ebf7a0cfb125a0a8"],["/images/dear_diary_year_one/49.2018week38.png","8643ed63c86ff774bf53dd2ba96af6f9"],["/images/dear_diary_year_one/5.2017week5and6.png","cba25b318cd1a48c350e16410e141592"],["/images/dear_diary_year_one/6.2017week7.png","68c4d7aba312db46ff8657c8c36f278d"],["/images/dear_diary_year_one/7.2017week8.png","412eac1a7d20f00779905a5ae337b1a1"],["/images/dear_diary_year_one/8.2017week9.png","22de0e9a48b3cdb20331bb3f93d1bb05"],["/images/dear_diary_year_one/9.2017week10.png","d3894eb2051688a0609a857899197e85"],["/images/dog-2019-01-01.jpg","6fede355c9f5a1dbc915ec328431c783"],["/images/dog-2020-01-01.jpg","cabd5799879728620e528a33af49bbe3"],["/images/dog-2021-01-01.jpg","90f430f8a8ebd25f3c9eb55ce56c233d"],["/images/ducks.jpg","73c8eb91b7d788c57732b45db8fe99ea"],["/images/dynamo-cheap-perf.png","df79f29c0268929e045363f9b1715112"],["/images/dynamo-console.png","194642d0077cfbd67fb7e3e8125f30c6"],["/images/east.jpg","5231497a5f9229026c6db03a2b74612a"],["/images/event-composed.jpg","ac10d81fcd1c40f3b8ddfd1993ff1456"],["/images/event-notification.jpg","b4c7618a16038eeee7049419a7aaf831"],["/images/event-sourced.jpg","2d559ce2f60052cc296576f3f0613d63"],["/images/events/2-events-written.png","67a033a4ae5b596ebf499d80b929645c"],["/images/events/5/1-no-event.jpg","70168e4456388c01350576729a84d0f0"],["/images/events/5/2-one-event.jpg","cd75feda4a10d531fc2ce5e3008bdb99"],["/images/events/5/3-many-events.jpg","d84809dae82e55f31d0877c2b9f349bb"],["/images/events/5/4-new-readmodel.jpg","9dda45e60275570f33b0746e36f68c1d"],["/images/events/5/5-caught-up.jpg","fdad5af8791fc0a18a07d6b169da19a1"],["/images/events/5/6-graph.jpg","2cb774d4dc3966b9c056225594517731"],["/images/events/6/bill.png","0a3050d854e186b802c6f791e210d3ce"],["/images/events/6/current-sequence.jpg","3486dccd4a937cef7f941dba471e720d"],["/images/events/6/helpful-advice.png","cb07fad6486ba939fd91458dfe60ca1a"],["/images/events/6/new-sequence.jpg","46f44e9c2c1846562e2aa4bb18fd3ff6"],["/images/events/api-console-output.png","11d54779fa7e4fd3ca82847e6262890e"],["/images/events/api-gateway.png","29cdfe963460f2f62b1476080fe16209"],["/images/events/c4/1.jpg","c3ee3ea8942ec18854e0ab289e3e003c"],["/images/events/c4/2.jpg","5b4d7f542b5497f7e9fe40da740e28f7"],["/images/events/c4/3.jpg","4a6af9eb7929946b02554a11edc03978"],["/images/events/c4/first-slice-2.jpg","e07db3395b698125ffd1489a772a0425"],["/images/events/c4/second-slice-4.jpg","39dbff321bc46b2b3657147c2684bc58"],["/images/events/cqrs.jpg","7d3f1c9b1b1f1c117e9742f13fa2355e"],["/images/events/dynamo-console.png","194642d0077cfbd67fb7e3e8125f30c6"],["/images/events/east.jpg","788953a7200d8cef717d0f2df8c58483"],["/images/events/event-composed.jpg","ae616b97aec2d67d3f64688ec153c333"],["/images/events/event-notification.jpg","fcad6ec5a76ebdb15f962be3bd324762"],["/images/events/event-sourced.jpg","c7a48bca9e47506437049d4476c434f5"],["/images/events/lambda-console.png","5b7910271c8ae2ac56c67ea8a6c009a4"],["/images/events/part-four-flow.jpg","1cf13f9d84b5d64526315467b5be1824"],["/images/events/serverless.jpg","eb3d17136cf3526aa781ab5e613aeadf"],["/images/events/stack.png","3612bee6a7ba5356a8052d880c034b3c"],["/images/events/start-api.png","c408b21dd3dd2f0ca9ce0656b4fe0f3f"],["/images/events/testing-api-1.png","629bc6a72681c9746bb289c239e764a4"],["/images/events/testing-api-result-2.png","dd3a40d355e99902bceaad05a2b29ea9"],["/images/facebook-black-32.png","5c7605ac74aee44cf908538c46691c13"],["/images/fifteen-dependencies.png","3ffc601966da8eac80f48a2af0add3c5"],["/images/first-slice-2.jpg","da9312909b621990c26ae3609b77afa7"],["/images/foggy-day.jpg","caa63eabf76307b22998098b074830f2"],["/images/forecast.png","0dec546d740a84998e5ede60041f83fa"],["/images/god-of-death.png","9523f351ea74d10c382ca97dbdac7094"],["/images/helpful-advice.png","cb07fad6486ba939fd91458dfe60ca1a"],["/images/home404.png","b4ad9d10c8d8f771c7b5029bd50da432"],["/images/homeBare.png","aab499ba0c1c687bff7d60da3a83da5e"],["/images/homeCarousel.png","8054a67e81dcf1d2fde313a783a6f9cd"],["/images/homeFull.png","a3310503911535e2913214287f6d818d"],["/images/icons/icon-128x128.png","54cd283b0c1ec90108ce2051b15bf57a"],["/images/icons/icon-144x144.png","42b7873de7e33efe5bc966b4ff964dde"],["/images/icons/icon-152x152.png","30efdf4a576e11018b43d1df85665130"],["/images/icons/icon-192x192.png","2c5512011d149f48e7f3c210aa3c4584"],["/images/icons/icon-384x384.png","c202a45dfc404f2f315e8cc6cbf94d3a"],["/images/icons/icon-512x512.png","b9871b7b10d0582cbfcc8be37c31f9a4"],["/images/icons/icon-72x72.png","273f86f63d3eba378592de686ef6f33a"],["/images/icons/icon-96x96.png","157cf8c09db0ce0ee91cfd1fbf56135b"],["/images/ideal-board.jpg","92fa6deeb804a59f465ce2ea9887d563"],["/images/initial-commit-log.png","b0a6bdf1272a9e26350358a136c0aef2"],["/images/integrates-with-github.png","2172905f34eb6a44c908bfce1d60a501"],["/images/interactive-spelling.png","5c72133361d6a014f051a9e5ce52ce35"],["/images/lambda-console.png","5b7910271c8ae2ac56c67ea8a6c009a4"],["/images/logo.png","694aa93fc50169105d632b82b5ad7f33"],["/images/lost.jpg","4b3be674866c6247591da6077a89d092"],["/images/mockup_5.png","7e8a346b20c0c82e10c018d5cd48ef7b"],["/images/new-sequence.jpg","e4999e78f571992a9321ab99434efb62"],["/images/nonewline.png","5ae8bf57fdf185b6163b3bbf9e1b25e7"],["/images/npm-run.png","12746c403e0d9beb38006bc051518488"],["/images/objects.png","62ae5574aef54e97ee041318a87fef45"],["/images/one-board.jpg","943cc8002737af095ae31844e9565172"],["/images/part-four-flow.jpg","b2f35eb42bdbc40cc95518fa1f6faf7b"],["/images/personal-access-tokens.png","08cc595af59d3694bd190cf762b5db00"],["/images/radar.jpg","ebfb218bc80abb2d4aefab52bde73214"],["/images/reactotype_screenshot.png","f6aead9c67782b19138b15a01115c1bd"],["/images/rss.svg","f2a2d26956a21bc4c1e262c13b86b92c"],["/images/run-nightwatch.png","027d2f57764c4eb0db860af39977cbdd"],["/images/run2.0.jpg","e7436a10ea8f30c266add9e9a65ddd6f"],["/images/second-slice-4.jpg","04ad1d901864e5fcab58f5d4262830e4"],["/images/serverless-maintenance.png","e749f4b5bd5e3e0853d7c3af14a8027c"],["/images/serverless.jpg","2b5e25f5a8faa9ce655f835cee1cbb15"],["/images/stack.png","3612bee6a7ba5356a8052d880c034b3c"],["/images/start-api.png","c408b21dd3dd2f0ca9ce0656b4fe0f3f"],["/images/structs.png","20e52ced221b8657ce0092cfa75855e4"],["/images/structured-data-crawled.png","2055fb931d19b0627655eaf46291ec52"],["/images/sunny-day.jpg","47943c980a7e0bf94b034b439309944d"],["/images/tada.png","4d76d62a0249ba843899a30b8ec9d67b"],["/images/tag.svg","34a504803dc8f5e431aae1dd5e0e9d6a"],["/images/tech-debts/actual_different_styles_meme_by_zeurel-d38c306.png","3a1266003cd719d97baa814a33423939"],["/images/tech-debts/tree.jpg","977a11d3e6a2bf039c20ba4359949517"],["/images/testing-api-1.png","629bc6a72681c9746bb289c239e764a4"],["/images/testing-api-result-2.png","dd3a40d355e99902bceaad05a2b29ea9"],["/images/the-chart-1.png","0daed6266a23a8d5dbe1ab099e1164d2"],["/images/the-discussion.png","368647833e9f77ed21c3e86a58539ead"],["/images/the-graph.png","ca24c8130d51319114a1214f7e907264"],["/images/the-quadrants.png","e8bd5a9a6067c01ccfbbf1aa6c43b64b"],["/images/toot.png","98265e943395b18fd1bf9d0e8d39a1d5"],["/images/travis.png","b9ebe32d382c66382d91f2a187b0ea6d"],["/images/tree.jpg","ae695d1a52f6098847d55f3773e236d3"],["/images/twitter-32.png","0e21335ff0b1b322f75eaaeb32b81ef9"],["/images/twitter-black-32.png","c279b87a4805d22ea078147ff065f8d3"],["/images/unhappiness.png","f64c4bb1418782b59a87762be9a6e3e4"],["/images/votes.png","d4a02c6f0dc225adb9765de94ad50ec5"],["/images/weeknotes-autoload-graph.png","0c438bbc92251768375086b2084ab0b4"],["/images/weeknotes.png","e819bc1ab10021155905e1d7077c025f"],["/images/yarn-desc.png","84a3a4792dd41ba78ce955aeb374ebaa"],["/images/yarn-run.png","b195b8bce5baa57df6e6ea51a3dfafda"],["/images/zero-velocity.png","b0c33c81b898bb29e102f3a1c8351199"],["/index.html","bd80e77a4e1b15c87a00d0280dd0886d"],["/kill-if-with-objects.html","57a1b229d4e02c2f28e91c1c5117206a"],["/page2/index.html","f78b5e5ecc493e287847e6988edecff4"],["/page3/index.html","db4c3b543eb98f7d729eee919d52f9d7"],["/page4/index.html","104ac24c3b475dd7634d4c79dcf24787"],["/page5/index.html","067f80bf27ee26a29752bf1878f5c334"],["/page6/index.html","fc6f895f79885cedecc9f32c4fcdaa22"],["/page7/index.html","7501f6faf0666f8971d09053fbfab47b"],["/powershell-on-linux.html","6c6b2bd8f13fcb5050f6337aa707aea8"],["/rake-transforms.html","78aff54948c377fc3a3f17836c519de9"],["/reactotype/part-one.html","753948c0f16af9d3f0ee40d5c7e89307"],["/reactotype/part-three.html","78b8dfbab2689fb2b315e406fb25c838"],["/reactotype/part-two.html","b31213b8f0619ea3ae3f145d8fa6c53b"],["/real-vs-soft.html","d9191cb0cc38b8ba27a8fe889e899ff5"],["/static-factory-methods.html","a27c6d4f47424a98c0be9bbc6ea9ea8b"],["/structured-data-with-jekyll.html","27be5f27c47f7b1e23ada84381facf43"],["/tags.html","1408d7dd7524993a2a245fcf1a1896e1"],["/using-travis-to-build-jekyll.html","75e225903a6ee16aaa20a4f2f656180a"],["/websites-CMS-platform-logging-in.html","1ad75f2ca4dcd6b8d67d3a63d7facb88"],["/weeknotes.html","3fc0190e239635e8c02a09fbcb5e4e2e"],["/weeknotes/2020/10.html","01d1172f3a0a484b02343b4e015963da"],["/weeknotes/2020/10.png","c798cf5336b79ff8af3984ee015e1af5"],["/weeknotes/2020/11.html","54154e65f82cd5bcafe9b325d096a5b4"],["/weeknotes/2020/11.png","de9ca6185d46c1bd931878fe926cd7fd"],["/weeknotes/2020/12.html","bcbde0d94ff571e65109b2061a41f0e7"],["/weeknotes/2020/12.png","409362ec651359f02c107f9abe78a2e2"],["/weeknotes/2020/13.html","67b1473ee907a746c98c025889ad50f8"],["/weeknotes/2020/13.png","518e99b65ec40256d43c92fa2d5b838f"],["/weeknotes/2020/2.html","475dcce31afe772602dd99ea2e8d14d3"],["/weeknotes/2020/2.png","3fe95e77be8ae8f3c4b6affcbcf86e4b"],["/weeknotes/2020/3.html","86be43155dc634c44fc9ffed1de6535b"],["/weeknotes/2020/3.png","e191ea6b7cff592695f9adf2f9f91e98"],["/weeknotes/2020/4.html","a7bd0ed25c04a38b368012f1a9112b97"],["/weeknotes/2020/4.png","70fd2ab69fd2fc654d3726be0d505331"],["/weeknotes/2020/5.html","26f217fa571452b204e1a18ceafaa9e4"],["/weeknotes/2020/5.png","a8b0199d1e5bdcbc06943819452238d1"],["/weeknotes/2020/6.html","4755514e5dd183f34c87e3861189523d"],["/weeknotes/2020/6.png","f4f07c3d4972f30bea4f34ea72cc6523"],["/weeknotes/2020/7.html","d96e7a31e5d693d15629cd4031dd7cfe"],["/weeknotes/2020/7.png","bbde547140eb8db19b01be0e9f193554"],["/weeknotes/2020/9.html","0482f790eb98a0c42dd20c22252a9dce"],["/weeknotes/2020/9.png","29618698efadf7fbf0e7253cfab69c7d"],["/weeknotes/2021/12.html","436df57c6e421ef86f749f1b5e16cf4d"],["/weeknotes/2021/12.png","9cc63bbeb7ab23d9637c1c9e74088184"],["/weeknotes/2021/13.html","a2306425418e98d6080889d066e10453"],["/weeknotes/2021/13.png","8426bc5e02db09bea3750c58cbab578a"],["/weeknotes/2021/14.html","89a4a13616c501e561104e99b7312b38"],["/weeknotes/2021/14.png","9615ab9e5d26ef269339307c133be59c"],["/weeknotes/2021/15.html","6029e71173a9b7a930635646a0bd8dac"],["/weeknotes/2021/15.png","da743e203cf299d332778c907ecfc607"],["/weeknotes/2021/16.html","831ab4538f444b199d637855ffd3964d"],["/weeknotes/2021/16.png","35e2dafd6dace73fa6af780ca8781735"],["/weeknotes/2021/17.html","a8081afc1bad8f33f2840afe1d6d0828"],["/weeknotes/2021/17.png","258e0c5d731711f5c448cd69c9bde33f"],["/weeknotes/2021/18.html","9503d03c6bebe8351077b6b234672fc9"],["/weeknotes/2021/18.png","b0f9116ffc10090bb45f57bdde7fef94"],["/weeknotes/2021/19.html","0d314ec36d825c6d30717c42199bc03c"],["/weeknotes/2021/19.png","7a3e3fdeb217c9147764b157445961dd"],["/weeknotes/2021/2.html","5504bcdb871ea416f56c81743bf61336"],["/weeknotes/2021/2.png","d4188fead2ccf5cf1bf0ba7d8d56f152"],["/weeknotes/2021/20.html","ec28d57dd578b859054825431b8bcea9"],["/weeknotes/2021/20.png","0dfe21c37be10e8ae9619dd238c60f39"],["/weeknotes/2021/21.html","e0a4b94bad6e5ba17c880c6927578416"],["/weeknotes/2021/21.png","5511dd81c6d9d239750e08dd3af3f9b9"],["/weeknotes/2021/23.html","20873b9dd2f8bdd1f08edbc918e36f0d"],["/weeknotes/2021/23.png","6e1ca1a2ecb78ef9433ee02feead25b9"],["/weeknotes/2021/24.html","996a7be76fc3596f351634335199f9be"],["/weeknotes/2021/24.png","39527132f9d81c42f9622366482ac362"],["/weeknotes/2021/25.html","0d6800e82f221b2bef61e6262cbd123c"],["/weeknotes/2021/25.png","d2db44f3215c396f61f26ef935834e89"],["/weeknotes/2021/26.html","cee94e9790fa94ff1fa8686f874cd2f2"],["/weeknotes/2021/26.png","698763610b984a5ee3d484b227c68fd7"],["/weeknotes/2021/27.html","25fd185d7460d776142feaa5cdc41835"],["/weeknotes/2021/27.png","dd0f676c6ca6552e01a31f739659c223"],["/weeknotes/2021/28.html","d111404d02f4f8b46d99846fd60f2b39"],["/weeknotes/2021/28.png","62e61b4cc5b50af2dcc32c04dd5e6b11"],["/weeknotes/2021/29.html","cba9633ae4ea35b93b7ba8d3a4ee22a0"],["/weeknotes/2021/29.png","71b97dd09282878371c9681a26db4699"],["/weeknotes/2021/3.html","742465e1edf4ea8de3ab76962c666339"],["/weeknotes/2021/3.png","07f0213b81933391bb4314381ab3dbd9"],["/weeknotes/2021/38.html","2e9588c918db54402c3aa405a90c12a6"],["/weeknotes/2021/38.png","e96890c22d7977be9a35c8df83b24def"],["/weeknotes/2021/39.html","4a900ffce7bf08720ff8577fcce1540d"],["/weeknotes/2021/39.png","71c820e41ff4f8a3dc4af359cfe305a9"],["/weeknotes/2021/4.html","314401c0478b5440652d5d3bbf95c0c5"],["/weeknotes/2021/4.png","c20abfb1c24af0a4a56c575c2844c707"],["/weeknotes/2021/40.html","506deac0594cba4e3f1cbf39f1c051fd"],["/weeknotes/2021/40.png","f4e7f8f8a04da288833f747e8a74c6f3"],["/weeknotes/2021/42.html","c172f0f62609fc08844d24afd902a465"],["/weeknotes/2021/42.png","465fe63fba0b20cc8551471d77ad30f0"],["/weeknotes/2021/44.html","5f887da9f99f818d74429f62bbea15e7"],["/weeknotes/2021/44.png","8f141b148511983088b4f15a35fd8246"],["/weeknotes/2021/45.html","e5d59ca5612ec831164a86389453ff9e"],["/weeknotes/2021/45.png","0df996529fa6273eb1d0f5c40eaebb82"],["/weeknotes/2021/46.html","af45359327af5d91363b0c732218cc0a"],["/weeknotes/2021/46.png","ca36a0a5b48d342d0a2b589f92889eae"],["/weeknotes/2021/5.html","1c2e83c145f09d6cf579501e40bba1d5"],["/weeknotes/2021/5.png","48d4ce5ae0cb2a649937eb584e12e6b6"],["/weeknotes/2021/6.html","9852ed0e8a98c093fb7c45f6bf737f73"],["/weeknotes/2021/6.png","07fc74a9e3fcc53d8165340cd810b483"],["/weeknotes/2021/7.html","5f5a2cb43fa241d368263256c97b2ea7"],["/weeknotes/2021/7.png","f3dfbba14b528d46feefd43e7cb10129"],["/weeknotes/2021/8.html","57d31ad4cca8994c7f62cb83b3192a02"],["/weeknotes/2021/8.png","4a95c257aabaa33d1d5e1db144eb8c25"],["/weeknotes/2021/9.html","c9ae73a2d87b574f740ffd80ddfdd0db"],["/weeknotes/2021/9.png","799463fa3bedb14ef82cdc0b8ecc0a62"],["/weeknotes/page2/index.html","b521a8313c7edd447edd34aecd66c259"],["/weeknotes/page3/index.html","36762847ae38af1256fde43c8ce37a03"],["/weeknotes/page4/index.html","a2daf037a687989fc26855c7f83142ec"],["/weeknotes/page5/index.html","8798d0fbb2e44cc9c4b72b5954c6f1e3"],["/wrapping_up.html","e86dbbfcf8fbcda01261bd2da7ee200f"]];
var cacheName = 'sw-precache-v2-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
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
              return cache.add(new Request(cacheKey, {credentials: 'same-origin'}));
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

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
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







