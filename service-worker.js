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

var precacheConfig = [["/2009/05/anonymous-methods-when-invoking-in-vb.html","cff9a0d47b7c98c61443b8460dbb95ee"],["/2009/10/bing-is-not-search-engine.html","31ceedcd449d3e39c553f5719a903626"],["/2009/10/quack-quack-says-duck.html","286ede0c118ef6fb2ff35cdf014b79c8"],["/2009/12/c-background-worker.html","fa50e4eff73cfe28a2af21d08d4c9491"],["/2010/03/quack-quack-says-duck-now-with-added.html","152d73f2be405110ae22c84e84974c36"],["/2010/05/theres-more-in-them-that-hills.html","f9dc86e09cae9a9cf3ba8690d437f25f"],["/2010/08/odd-odd-odd-login-behaviour.html","b65eeab0904aa77afce0b64a25ed11d4"],["/2010/10/refactor-fun.html","5a751fd094f36c6335dba402593e9ab0"],["/2011/04/ssh-without-password.html","87ac34310283ac4b03d4ea87af9c98dd"],["/2011/06/get-with-programming.html","4ca187aafafd44ff5070d72f25446b15"],["/2011/08/how-to-design-unsubscribe-link.html","8e43b15c8214abca0aefffb60b519423"],["/2011/09/unusbscribey-follow-up.html","f0e7f391bd9aafa1b8607ac81106b317"],["/2012/01/setting-up-mvc3-website-using-built-in.html","621069a493d79212bf0d4c3e4bd8e231"],["/2012/02/is-there-really-just-ipad-market.html","a7a6e25dd2e7952beb027975e0806ec0"],["/2012/07/y-u-no-sell-downloads-hollywood.html","4f62cc587d5f9ebd503e2d3485b0b4a7"],["/2012/09/obligatory-ios6-maps-post.html","19e878429b673776af57a061cb705d43"],["/2013/03/automagical-search-ux.html","967bba747619e6710d0535f9920d59d7"],["/2013/11/astronomical-database-identfier.html","535c8852f7b87c34fe100a989748ee4d"],["/2014/01/comparing-mongodb-and-tokumx.html","2643a7ba78b5b574711fbba85b96d658"],["/2014/02/websites-cms.html","836fc63e73b34df6416deeefe4741f00"],["/2014/03/testing-with-browserstack-and-selenium.html","f000cd7423d04b2948516d36dad2f4d0"],["/2014/03/website-cms-display-pages-part-2.html","d8ce7dac919a4b593a14a781ccc644b7"],["/2014/03/websites-cms-displaying-pages.html","e33fd479e94c20c2b5aaf7e3a8a709cb"],["/2014/04/a-dto-by-any-other-name-would-implement.html","9f54cf337bf948b79bdc4a63836f4391"],["/2016/yarn.html","6a1938d194091bc58131eaa920bc1d5c"],["/2017/05/big-pile-of-soil.html","01cbe66d4c602ef87cf04b61ad9c939b"],["/2017/05/ubictionary.html","f3aa640d1b7695422058123d53d4e390"],["/2017/06/radarban.html","be382a3bacfef4868fe396ac0f5f178a"],["/2017/07/retrosperiment.html","997f4e00c3b5b888aed4dc03a6bb30c7"],["/2017/10/constructiphor.html","af5c11bc74893c727b7255e10c892618"],["/2017/generating-static-amp.html","97c536310b35f934dca1fd19ca6ed52b"],["/2017/testing-meaning.html","3c8239b2448c03726a6fa9e7fa6b55eb"],["/2017/testing-static-sites.html","eb974ab82bb80853edcb03d3f8bc301b"],["/2018/01/direction.html","16801154c161a20cd7ceb1324f643ebf"],["/2018/02/serverless-1.html","b0441a496fb4c8b1a88dc0173350ac20"],["/2018/02/serverless-2.html","032476b9de2487e8ebb4366162973c01"],["/2018/02/serverless-3.html","77089f029d7c81b49b81853f50310cbd"],["/2018/02/serverless-4.html","7e1ce4352f1d5797bc98ed1e5d6613a2"],["/2018/03/harmful-dry.html","8ed766cfd6d5cb08eb22696921684d5f"],["/2018/06/serverless-5.html","d33e109f640a371b8535c706c86c1b7b"],["/2018/07/serverless-6.html","ce2a5164a752cea89baa476f0805423b"],["/2019/11/serverless-lessons-learned.html","a6f1a11b54fc0d613d8c47b0ec206d46"],["/2020/01/year-notes.html","67a7418f815c9df05665a7088a400d66"],["/2021/01/year-notes.html","b07b8a62c26b19e4eaebd333c2246be6"],["/2021/07/tech-debts.html","33588990eb8d0ee99a99ae1a3d2abc82"],["/2021/09/emotional-advice.html","da0563502dabb83b8deaeb1bbaccb939"],["/2022/07/weather-vane-or-sign-post.html","24470de0e5890e9f40bf60b21f076917"],["/2022/08/solar-panels.html","7034f6948d8bc0a0d0dc83da1588d816"],["/2023/01/year-notes.html","f735964f235cec1dbaef3f42fd8e8ff4"],["/2023/02/jan-month-notes.html","fca7a5d531a28e34d27deaece320a2c1"],["/2023/03/feb-month-notes.html","b75f96ac4639df8d33778b579c1eda07"],["/2023/03/mar-month-notes.html","5e62497acfe20369f71e0841e501fd2b"],["/2023/03/office-365-mega-thread.html","bcd31b3122628f2b98540f2cf27ecfe6"],["/2023/03/the-cloud.html","7ecd06a284ea88461ddf611082363a32"],["/2023/06/pauls-law.html","28c447e22ad498d42312cec44818cc3e"],["/2024/01/year-notes.html","b0ab646fbd9ef453d6a0788f634abc5a"],["/On-Page-Editing.html","5dd71e0112c02a60bb6bff7cb3ba3689"],["/Websites-CMS-Platform-Storing-Data.html","cc4ae7fb3bd4fccef78efeca27e6992c"],["/Websites-CMS-Platform-Storing-Data2.html","b1cb33141c1ab7d9c71b3691a6a45df8"],["/Websites-CMS-Platform-promises-part-2.html","019908cf0ab319707e9a672ebd75e07e"],["/Websites-CMS-Platform-promises.html","12decb03bb04ea65f39da2764c514ea1"],["/better-affordance-js.html","dc40e7d2ecf9c78cf64ad896d88292fd"],["/better-affordance.html","454b034d48230de9e74c550b7604a3e4"],["/categories.html","c60d5bf1b9491002e269e08b70be6201"],["/dear-diary-year-one.html","a9cba201cbd1510d1d76d2f3fc9c9eab"],["/fun-with-structs.html","feee0a4307c347a15f890dd6b93b3803"],["/happy-numbers-kata.html","3c15db6f2446374a0c14d8036cec144b"],["/images/1-no-event.jpg","23a00a9f3d691ac0cd5184ff8e195ab4"],["/images/1.jpg","20ec7a0bffd1f21b3deec19c8a6a57b0"],["/images/2-events-written.png","040b20d769d52378c157922f8b5b539f"],["/images/2-one-event.jpg","190461c63de549c51dc658c9307a1b87"],["/images/2.jpg","38f7a4d8c66cdf63a1d448219982b7d8"],["/images/2022-contributions.png","fc63b3d1f49413f48f03cdb5197ca30e"],["/images/2022-family.jpg","fc7f094500d684105d266c3b935f9ab2"],["/images/2022-travel.png","21e664c154698ec89f7c7cd4642ba463"],["/images/2023/03/01/drawing.png","4866ae63d15bc7d92ce1685dd58d2a5f"],["/images/2023/04/02/planning.jpg","57d2743c03e3bd0bf13203c4f002c1bc"],["/images/2023/04/02/pool.jpg","9942c4ca1dd7c78486f112b11a820650"],["/images/2023/07/blitzed.jpg","272dc30aaade7f5d5a419f5758b7eb7f"],["/images/2023/07/chopped.jpg","759ea68f7ca4a6d4ed0b5f606c4591e0"],["/images/2023/07/cooked-one.jpg","293bc28401a9f852f219c1a61dac3d44"],["/images/2023/07/cooked-two.jpg","333aa75c6b38968b5a1ae595523ac774"],["/images/2023/07/dough.jpg","bd4fcf275e6cc507141b8bf877937d20"],["/images/2023/07/ready for the oven two.jpg","54b85912e32edaf87309cbf2ecaa439d"],["/images/2023/07/ready for the oven.jpg","f9f2910a2f8cf246badaa24c7b7a3b4f"],["/images/2023/07/the plants.jpg","6315a9800087b768fd218dea86d546af"],["/images/2023/07/zucchini-focaccia-og.jpg","7bac1033c4890a1d2e7a0dc67fadc681"],["/images/2024/01/anzio-terrace.jpg","1e452a7907b08da9a03eb248bc98ddc2"],["/images/2024/01/toilet.jpg","eadbe0095851baa4717cfc70314a392a"],["/images/2024/01/travel.png","af201b8da566eab904d9d8ac632e5cfa"],["/images/3-many-events.jpg","9a21e9bbbdff7c37ef548fde1a13428f"],["/images/3.jpg","170cb9fd1ee78d5c9a4400d1bd4576ad"],["/images/300/1-no-event.jpg","6a638714de8bfd28349942e446f43693"],["/images/300/1.jpg","eed6e05113c12d051d733295f03113f2"],["/images/300/2-events-written.png","4e6b78b5d95c12ebaf1511ba86871765"],["/images/300/2-one-event.jpg","d7ef770973e0bae710d247103c52d080"],["/images/300/2.jpg","bc65c35eb4b3e06ad5c9affeea0a3c55"],["/images/300/2022-contributions.png","44f585abf44cd0be061952e601775dcc"],["/images/300/2022-family.jpg","910917766f6438b9cff0b0f0d0a490e7"],["/images/300/2022-travel.png","ec4b1cd07fb08379fdedda572c13c28c"],["/images/300/3-many-events.jpg","7d9e6cbc09f685c1084cf21f14f075f3"],["/images/300/3.jpg","eb3b3299964fe7f8c22a598b0bbee2c8"],["/images/300/4-new-readmodel.jpg","0ac6bcf864b898f78288b7caa976b2a8"],["/images/300/5-caught-up.jpg","08ef5a096bde083398c8d14dfb2ec76e"],["/images/300/6-graph.jpg","f89c9e5fd66c5566bebe152e8e58cc5c"],["/images/300/ABC.png","4f8f45b367c0fe8192f2a11cf5545341"],["/images/300/AMP-webmaster.png","061dcd8b511566630c7cad8afa01334e"],["/images/300/GitHub-Mark-Light-32px.png","27f7497bd771f103f6e40cd65981b529"],["/images/300/actual_different_styles_meme_by_zeurel-d38c306.png","784a96e25eed425bea76e90416b090c5"],["/images/300/affordance-loggedin.png","25ce7a37ad11294fbdbcd647a3122260"],["/images/300/affordance-loggedout.png","6dcae83c0f5dc5690de0b94ab53169d1"],["/images/300/agilecam.jpg","c1c46dc02e9c8ba40ef82bdad57948d7"],["/images/300/api-console-output.png","f89945aae64fb7a028e7dadd518155d5"],["/images/300/api-gateway.png","f8db040bbbc579dda0587633ff662019"],["/images/300/beach.jpg","e3adc5ef1ce26260bd1a3be95c51a932"],["/images/300/bill.png","b47bca807675a052788a92fae0f2a618"],["/images/300/both.png","e92a4e0620274778bad5647cfe74e6c2"],["/images/300/cardboard.jpg","91bcd9bb551746f717238ec71bab311d"],["/images/300/chickens.jpg","197beaa0b7f035971ddfffafaf47013a"],["/images/300/code.png","562b271e031b029b58de53b469bfd607"],["/images/300/common-language.jpg","710acf6eeb12fa31a7819595f7dcc353"],["/images/300/cqrs.jpg","31b515c4966584ec4f16be1202474d17"],["/images/300/crafts.jpg","963e862dc4c87d11f7d625304fb8268f"],["/images/300/current-sequence.jpg","95f8df61f343c35db6449c094c9d328c"],["/images/300/dog-2019-01-01.jpg","4d704e230b8c6a18a833f7b5abdf4cd4"],["/images/300/dog-2020-01-01.jpg","43fb6cbdf0c506b3939c438f641bc34f"],["/images/300/dog-2021-01-01.jpg","46dcafe0d3c0816e6951dc55ca148fe7"],["/images/300/dough-balls.jpg","c314ad70d625b8cc0d73bd6cabd60a75"],["/images/300/dough-wide.jpg","12b3c9fd3e69482e5547587d9f2d5232"],["/images/300/ducks.jpg","b6eaa8d942e771d88f36799530dadf73"],["/images/300/dynamo-cheap-perf.png","099e21ffcd8a2b89ae8c5c07a51dac92"],["/images/300/dynamo-console.png","0284c4b2f60cb35b410d732ea11f745e"],["/images/300/east.jpg","821de2e0eba9ab0cc1d3340593937fd6"],["/images/300/event-composed.jpg","e01b3401e7fcb49c591e5cd57888e13e"],["/images/300/event-notification.jpg","5c34bc523894f9f50aba23f1ebb3943f"],["/images/300/event-sourced.jpg","61b1b73fbe9180e78e951b3cfad2d317"],["/images/300/facebook-black-32.png","0addebf74bb9a8c6e3703e6560d4af69"],["/images/300/fifteen-dependencies.png","fd134e3b087d0cbaf26207f4a47f24b4"],["/images/300/first-slice-2.jpg","5019bf92bd771e8f1779bd4a4566b98c"],["/images/300/foggy-day.jpg","b0f8158a395e7a6a770644410b5a3752"],["/images/300/forecast.png","6ec65468e8713f4125282d4b07c0023a"],["/images/300/god-of-death.png","8f761c374513b0af3c8ada233a894b57"],["/images/300/helpful-advice.png","cbc82f28f14be9f8bb16e16fd5d1101d"],["/images/300/home404.png","29f958f6058bffd2a9847f333c9a756c"],["/images/300/homeBare.png","1461bc9f10cbc5bbd06b62a68a7f10ba"],["/images/300/homeCarousel.png","99f2bfc948ad0ef3f4bfd569f1665d9a"],["/images/300/homeFull.png","3d7c32c8eb68774a14741343277a92c5"],["/images/300/ideal-board.jpg","9896f4b7a09e53f064b54e05f111dcc3"],["/images/300/initial-commit-log.png","22f233b4456bd85b27515ad5a0d71a48"],["/images/300/integrates-with-github.png","c5360ed38c8cb45c796b62b1b52eb362"],["/images/300/interactive-spelling.png","21685e2e944d75c8fe86360e66546582"],["/images/300/lambda-console.png","e63a943ca3b6241649655c77e12d8874"],["/images/300/logo.png","317058a96e10f38798141f65f9d9ffa2"],["/images/300/lost.jpg","eda52e4a8ca7c9023d06f7701b97473c"],["/images/300/mockup_5.png","0d9a4ef1345c2864647cfe46ee81b9d7"],["/images/300/new-sequence.jpg","07bb0bbee5af86eaf82ddd863241874b"],["/images/300/nonewline.png","6813cbc3eb8afe823cc05aeced41ab25"],["/images/300/npm-run.png","cf4899325cb2aefcd0c15513313ba11b"],["/images/300/objects.png","0e0dc01e0cfed0200a9ac0810de749c4"],["/images/300/one-board.jpg","91a875922c63e676e20490185ee29221"],["/images/300/part-four-flow.jpg","2a6080fa750e06057da42adf2a9cb653"],["/images/300/pasta-fasule.jpg","9530163bcd2892d2c2bf686d40b0c568"],["/images/300/pepper-1.jpg","a48c0be1060a7615d9a796db2b097f25"],["/images/300/pepper-2.jpg","a5b04185a14e93d213db22450695fc66"],["/images/300/pepper-wide.jpg","222b63a74a30805e25c1f6d60847b3f3"],["/images/300/personal-access-tokens.png","7113e7629ba3524408e5b556faa3a861"],["/images/300/radar.jpg","cafc522c852ea351b5500d11d1ff4cb6"],["/images/300/reactotype_screenshot.png","cba80e65138a13fa848e8f3fd25300f2"],["/images/300/run-nightwatch.png","758af7c07d97bff4d893106389a4e06a"],["/images/300/run2.0.jpg","5aa4d7671d87f972f392fb275be33e1f"],["/images/300/second-slice-4.jpg","f110b30dc03b8d7ac6cb3899e239a61e"],["/images/300/serverless-maintenance.png","dba53ec396e094d71f4479cdd6613dcd"],["/images/300/serverless.jpg","fc6ac89960f062b16ed270abb8e3a27d"],["/images/300/stack.png","42640ec6d3da26036af6aabe65b06b2f"],["/images/300/start-api.png","9cfb5bbab8e027b3f720919e32fe25bb"],["/images/300/structs.png","6ac270e2b95c39e750a92c8c6759ccc9"],["/images/300/structured-data-crawled.png","ff2defc2641caf11731c01de65aa16a6"],["/images/300/sunny-day.jpg","73c14bd6ae06de29a2b06a2ccae68b1e"],["/images/300/tada.png","e4b20d85847f24086ce0940678a7096e"],["/images/300/testing-api-1.png","a5ff32526b95a01d4b487b95eeb62694"],["/images/300/testing-api-result-2.png","4551397b80adfbfab7bf8dc2cb3a5a8f"],["/images/300/the-chart-1.png","c434b9e786180f0aebd4a928c0703475"],["/images/300/the-discussion.png","1279adad1816245495f4ff891e4f2e09"],["/images/300/the-graph.png","479897d101df4f3fc43ef63e7a4ba979"],["/images/300/the-quadrants.png","bcaab776172def40e6c5adddeb589fb1"],["/images/300/toot.png","a0c9f4f8396fcb90ab862140b232d623"],["/images/300/travis.png","7be3d7abe869dda1dc17bcf3d1ae01e1"],["/images/300/tree.jpg","e5c832508d7cbd8872833c84894e4a99"],["/images/300/twitter-32.png","0e21335ff0b1b322f75eaaeb32b81ef9"],["/images/300/twitter-black-32.png","c279b87a4805d22ea078147ff065f8d3"],["/images/300/unhappiness.png","85bacffaf51f492c3f7d6539987e49aa"],["/images/300/votes.png","f0245b30b6a2d5cea34a26205105eea7"],["/images/300/weeknotes-autoload-graph.png","0a1e52aad139c65011f37afbfd84c833"],["/images/300/weeknotes.png","797ba5f8a4ec12b98e5561cc19b717c9"],["/images/300/yarn-desc.png","23fa10d31d5f0ec4ee02e50a5bf4e5d7"],["/images/300/yarn-run.png","864b2343f3f198e65180bcea9a4ebf6a"],["/images/300/zero-velocity.png","7bb87534fae005ab34e24a6d75b2291a"],["/images/4-new-readmodel.jpg","081f5934e30ac138f3c393387cc64763"],["/images/480/1-no-event.jpg","cc0deca3e64ab13a1277a3eda866e379"],["/images/480/1.jpg","646bfb151d20a10b90e62dcb5dd7b2c6"],["/images/480/2-events-written.png","6925b792d92d9e62a72dbaf2022e8cac"],["/images/480/2-one-event.jpg","f8d040db0ebca95e341527b13108dd39"],["/images/480/2.jpg","c4ff3e2c16f8bcb885674b59d6a093ce"],["/images/480/2022-contributions.png","45131f29b8175ebe968fc45384e6b890"],["/images/480/2022-family.jpg","691503023d2c0fd6760f52bcea5a84c4"],["/images/480/2022-travel.png","e7cc887cb8ad4ddf244fae54f7f6378b"],["/images/480/3-many-events.jpg","c84041977371d7f8be8fb9c42ad7e9dc"],["/images/480/3.jpg","cfa411c14b18c4243a619abca1ff3ff6"],["/images/480/4-new-readmodel.jpg","c774055d22f071d706383b529ab38ce0"],["/images/480/5-caught-up.jpg","a046745251bb29a1cc217b27d331557a"],["/images/480/6-graph.jpg","0d1f8a831e5754cf512c12bcf0354386"],["/images/480/ABC.png","9853d2641d2563e8b38535ef32b00757"],["/images/480/AMP-webmaster.png","bdbe5f42b7e0244ab534e36eb60e2137"],["/images/480/GitHub-Mark-Light-32px.png","27f7497bd771f103f6e40cd65981b529"],["/images/480/actual_different_styles_meme_by_zeurel-d38c306.png","ac643c5b79248706ea9da2a57ffdebee"],["/images/480/affordance-loggedin.png","e8aceb5813c33c695c4ae1d6a9a44506"],["/images/480/affordance-loggedout.png","1a558a10486de5c83e888249a3e7cf90"],["/images/480/agilecam.jpg","95ae03701445cdd7749b46f093c0a233"],["/images/480/api-console-output.png","a7e0bc0e8f12cd140acc3684cf59bdc3"],["/images/480/api-gateway.png","7e1b6f5a11b19bc817e4b21aabebbfd0"],["/images/480/beach.jpg","eb02975c6d638c90f9da7a0830d86694"],["/images/480/bill.png","fb1b2ed5a09e2b2ba463f0b565b4542d"],["/images/480/both.png","277e4a6d0fb68e032fd806bfc786186a"],["/images/480/cardboard.jpg","2d602e2279b0b3b438674141a9a2845d"],["/images/480/chickens.jpg","469fbf6271d3b5ca81d88150962fec62"],["/images/480/code.png","0b8cc6be79ec6efad46533083cd97569"],["/images/480/common-language.jpg","3fb797939a762ea6223969188bcf02ae"],["/images/480/cqrs.jpg","eca7d06a27f1de365c0aec50609c31d7"],["/images/480/crafts.jpg","1a6b5b2586435ca6a0001fb9692bb7f4"],["/images/480/current-sequence.jpg","805afe9c08023dcc7b133b4ee42486b2"],["/images/480/dog-2019-01-01.jpg","7c6b512e47a2c8608c2c7e42787135fd"],["/images/480/dog-2020-01-01.jpg","344eb3e3a916c656817a1bacc9c2c8cc"],["/images/480/dog-2021-01-01.jpg","fc138c3b4c25c40525f6e53e9e0b2d60"],["/images/480/dough-balls.jpg","5e3712ac8ae94cdc06ec335e86bffafd"],["/images/480/dough-wide.jpg","fba18d6ecf192f6fe9cdb9291254ac2f"],["/images/480/ducks.jpg","202bc2cac5f43ea95c0f8393bb2eee9e"],["/images/480/dynamo-cheap-perf.png","494ddbceba49bb20c45c4c4f406085a2"],["/images/480/dynamo-console.png","6435e98f9e91dd27accf2e603388503c"],["/images/480/east.jpg","158b9c5ea5da2ab75d3501b4274b360f"],["/images/480/event-composed.jpg","b759c4615163d3608248a50dfcf861c2"],["/images/480/event-notification.jpg","72eb6706e01efd6d9a623e4ec6d4b6e2"],["/images/480/event-sourced.jpg","1d2496e5b9c4d3a19e2f0d737af36532"],["/images/480/facebook-black-32.png","0addebf74bb9a8c6e3703e6560d4af69"],["/images/480/fifteen-dependencies.png","eae49faa47730bf720416dcadb423114"],["/images/480/first-slice-2.jpg","a688ee35d831eb0e09e81c62df18be0f"],["/images/480/foggy-day.jpg","ee8b1a1864e857a5105f77b876eb3dfa"],["/images/480/forecast.png","eed86bfe6506ce7f34ae809a63b4a637"],["/images/480/god-of-death.png","ea8eb809b875a0cf6a26ce842a302806"],["/images/480/helpful-advice.png","fa8496f5f007ad022a7b6d8c4ebc9d31"],["/images/480/home404.png","59ada13b74f1b492c6741c4727d2f001"],["/images/480/homeBare.png","8a150b28f5630b7dd31554c27bc2959c"],["/images/480/homeCarousel.png","c03424d0c94f0c0a05e64adc19288d9b"],["/images/480/homeFull.png","6a7d7885fe316263699f5944001b152e"],["/images/480/ideal-board.jpg","5c048be19435cceabc9b74b304f18382"],["/images/480/initial-commit-log.png","310070aa01bb2d25e1e3554e39376617"],["/images/480/integrates-with-github.png","b73f50c46f53ceb6e067e965a602e2e7"],["/images/480/interactive-spelling.png","906b17d6d8c3a4c9c4b25ac608173320"],["/images/480/lambda-console.png","d626a0d1299d57adf58eb30dcf4a1114"],["/images/480/logo.png","317058a96e10f38798141f65f9d9ffa2"],["/images/480/lost.jpg","5ed0715c169dcaded8b4c1d7774f546f"],["/images/480/mockup_5.png","26af744e85e37bd30b20c406e06bba7c"],["/images/480/new-sequence.jpg","560d69a16e6eca1e530a808b0a81a923"],["/images/480/nonewline.png","edce068946113218467f64c62aa81111"],["/images/480/npm-run.png","f2cf05fd64e88263f82a2886d104afec"],["/images/480/objects.png","b8f2893e5ea8dedb2e84815c5415a899"],["/images/480/one-board.jpg","395a46a2ce2f13fdb5b09cf25958d346"],["/images/480/part-four-flow.jpg","3123b740da4da941f63fd7303e89461b"],["/images/480/pasta-fasule.jpg","27f11ed09609d3c4cf98f3cc8df8fbf1"],["/images/480/pepper-1.jpg","6ee15909b8d62747d8b97361c230ab51"],["/images/480/pepper-2.jpg","3796c90ed5d943d4d362c878ad3ecbf8"],["/images/480/pepper-wide.jpg","c497cccb4a74618497b8ecb77234e04a"],["/images/480/personal-access-tokens.png","94bbaeb08c388ca104b66dd13bfe2a72"],["/images/480/radar.jpg","8d61913d3312e2d3fad892138f47391d"],["/images/480/reactotype_screenshot.png","62d4464d25f67c2d00438d7a5cba0450"],["/images/480/run-nightwatch.png","48113f1c496616348d3ef60f864ac8eb"],["/images/480/run2.0.jpg","64df257f04a2cb4ba90ee1fe00ae3392"],["/images/480/second-slice-4.jpg","665a78cc0484da8b40b1da20a29ad6d1"],["/images/480/serverless-maintenance.png","42858373a381afe9891b1a3be1ade2b9"],["/images/480/serverless.jpg","0fbdca4ec367fad84597c2f0b55143c0"],["/images/480/stack.png","24240b36962b1d96418648aa937354ec"],["/images/480/start-api.png","e5648919c6480ed701241def090ddfda"],["/images/480/structs.png","ae7dbb43d546affb70cc43d9a7ef6056"],["/images/480/structured-data-crawled.png","1673e677359faeb5f1a7dd1d68c369b4"],["/images/480/sunny-day.jpg","0a417388693dfa587dc637ffd37ec022"],["/images/480/tada.png","cc7e9f4ec69eea4ec5fdd5e4235ac96f"],["/images/480/testing-api-1.png","ff313643e8d317ad3083ff01a26a751d"],["/images/480/testing-api-result-2.png","85a44b1df26cf9d5db5b4cfb11eb633c"],["/images/480/the-chart-1.png","5af7b01897f6e1c1efdcffd3f8fd913d"],["/images/480/the-discussion.png","98d05ae151366ba3fc3cd6bfa20562f6"],["/images/480/the-graph.png","12bee515c3d4a79cc97544fa33b09702"],["/images/480/the-quadrants.png","51dff190328ac3b4c88e9d74e3382741"],["/images/480/toot.png","d2229c4c1b9979a302860c200e8237d0"],["/images/480/travis.png","349b9c4240a705b2a266b7eff1c1a91a"],["/images/480/tree.jpg","09ef55f6dc1e9b53430df36ce497e7ba"],["/images/480/twitter-32.png","0e21335ff0b1b322f75eaaeb32b81ef9"],["/images/480/twitter-black-32.png","c279b87a4805d22ea078147ff065f8d3"],["/images/480/unhappiness.png","37552d61617994845068ed4f49dfbafa"],["/images/480/votes.png","e45cd047cadc9d986ade700d8c3b1480"],["/images/480/weeknotes-autoload-graph.png","473597763ee99e9d08d474a380bed2a8"],["/images/480/weeknotes.png","237521b63b1701f2516e42ebbabd86dd"],["/images/480/yarn-desc.png","ff86eabf27cc1b301ef42d6e30c2b75f"],["/images/480/yarn-run.png","f42c80554a01dce7c4f1303d25330543"],["/images/480/zero-velocity.png","f1f7a92928df0f55fe3cad6c33fa6296"],["/images/5-caught-up.jpg","48ebd3de12d65f26d9159e5750f1eab8"],["/images/6-graph.jpg","4abfe067368561a2de7754d9196d98a0"],["/images/ABC.png","9853d2641d2563e8b38535ef32b00757"],["/images/AMP-webmaster.png","fa8306ad6566ac2aeff4370eda455f06"],["/images/GitHub-Mark-Light-32px.png","27f7497bd771f103f6e40cd65981b529"],["/images/actual_different_styles_meme_by_zeurel-d38c306.png","8fd3d1bfba7356b67429a2c6ea79d9a0"],["/images/affordance-loggedin.png","e8aceb5813c33c695c4ae1d6a9a44506"],["/images/affordance-loggedout.png","1a558a10486de5c83e888249a3e7cf90"],["/images/agilecam.jpg","46087723a08d49139f6c2235cafa74b9"],["/images/api-console-output.png","579717d63064a4618912bc348dae3dd3"],["/images/api-gateway.png","ffcf40157d19bc36677241f32107ea8a"],["/images/beach.jpg","558ec240dc80a4c65cd722e623a8d737"],["/images/bill.png","0c65907b0206644ca06ab5d277ab2330"],["/images/both.png","780e89422345a9ae6b18a93f204cdfed"],["/images/cardboard.jpg","815d6b98f0c01337c6b8e52e1f4be299"],["/images/chickens.jpg","d14a71bd7da2383afd4f499415af9fa8"],["/images/code.png","a41bb3070e31c3429cca2f52af6e2896"],["/images/common-language.jpg","be5c00f2bfece80af429e680503dfe46"],["/images/cqrs.jpg","33084d12c92636419b95eb945a1bf399"],["/images/crafts.jpg","e52a5eb8db5a4be241d21ed81139a263"],["/images/current-sequence.jpg","ce8305bc82dbe09e9939a2234ac653a0"],["/images/dear_diary_year_one/1.2017week1.png","14c7067175b4fe7ddb3e51ff9b4cf3c5"],["/images/dear_diary_year_one/10.2017week11.png","f092f0175888d5a5b34f3ce1a9053521"],["/images/dear_diary_year_one/11.2017week12.png","026470f234c6365b70dafeef4e0954f4"],["/images/dear_diary_year_one/12.2017week13.png","6343b7c5143cbdc1ad41ec0e674a8eac"],["/images/dear_diary_year_one/13.2018week1.png","6c728b10a0c57a65a9f7ec889b180e49"],["/images/dear_diary_year_one/14.2018week2.png","92aecb09ca5292dad51a71bf85dc24a1"],["/images/dear_diary_year_one/15.2018week3.png","a757cfe7249032d4e32645073c46ed05"],["/images/dear_diary_year_one/16.2018week4.png","c05e98417ba6f36d71d2dcd6749548e8"],["/images/dear_diary_year_one/17.2018week5.png","fd32de3fc67c0fb53acec759da3b8d1b"],["/images/dear_diary_year_one/18.2018week6.png","53a96952dd96873f598c078bf7e36916"],["/images/dear_diary_year_one/19.2018week7.png","944d98b762359dee4bdfc776dfc77cd5"],["/images/dear_diary_year_one/2.2017week2.png","3034124b2de5e032b52b6b55acad9f5f"],["/images/dear_diary_year_one/20.2018week8.png","4b8b885ebf0a756c419696e0cb0883b2"],["/images/dear_diary_year_one/21.2018week9.png","57fdfe4275a18b46f8d78ce708cc3d94"],["/images/dear_diary_year_one/22.2018week10.png","baf13ea472fb1878c194a6c5af69bd97"],["/images/dear_diary_year_one/23.2018week11.png","634e992bb990394b74032238a28bd937"],["/images/dear_diary_year_one/24.2018week12.png","12a16c102d4818d1b1cff162d237d9f9"],["/images/dear_diary_year_one/25.2018week13.png","8ad2fc7e3ee16ad056f3bbfc295541c7"],["/images/dear_diary_year_one/26.2018week14.png","bbee64e125d6bebfab9456700bbbf487"],["/images/dear_diary_year_one/27.2018week15.png","644a3ab4e91145eb395d386bb9dd2062"],["/images/dear_diary_year_one/28.2018week16.png","e901f3875c1202a415e16c51e72a3df8"],["/images/dear_diary_year_one/29.2018week17.png","e72986889e6fa158e15a7be0d37d6639"],["/images/dear_diary_year_one/3.2017week3.png","3fcb0902312504a1a1d898df49c7a075"],["/images/dear_diary_year_one/30.2018week18.png","091f747835dec5d168c025e51f0aab75"],["/images/dear_diary_year_one/31.2018week19.png","3ccaea946648cd6ab95c5afa5f921a6e"],["/images/dear_diary_year_one/32.2018week20and21.png","4fb9bacda295b0c80bfa3b2a587847f7"],["/images/dear_diary_year_one/33.2018week22.png","6cbd8e184952c6b27b134557a15f1af3"],["/images/dear_diary_year_one/34.2018week23.png","a4d2a3503eadbe3e8379b91a301b733e"],["/images/dear_diary_year_one/35.2018week24.png","6017308f8a701cd6896e6ac7c8186f87"],["/images/dear_diary_year_one/36.2018week25.png","62d703a3ab54c90342afc3ca07dd4550"],["/images/dear_diary_year_one/37.2018week26.png","06163eecc9967eab61629d0196d41694"],["/images/dear_diary_year_one/38.2018week27.png","2c4accf3ec27d58731598146820b51ac"],["/images/dear_diary_year_one/39.2018week28.png","e71205825b5b42acea8cb95639553b9a"],["/images/dear_diary_year_one/4.2017week4.png","4d82a3ab152a7062fbb6388cddbc8e72"],["/images/dear_diary_year_one/40.2018week29.png","2bf249f14334d2f5c02a701ac05774f2"],["/images/dear_diary_year_one/41.2018week30.png","1426d11ced5b604a34ad412764216cd9"],["/images/dear_diary_year_one/42.2018week31.png","6dc08d2275ca6ade92c9ab0f601b4b91"],["/images/dear_diary_year_one/43.2018week32.png","cc103879b4532a49df1c6f1a8ce028b1"],["/images/dear_diary_year_one/44.2018week33.png","57d87d660c43bfa923c2e22c842bb0b2"],["/images/dear_diary_year_one/45.2018week34.png","c69414fc5f7cc95528e9a0547d345446"],["/images/dear_diary_year_one/46.2018week35.png","f6a78bb1963cd3663e7e43044ffd800c"],["/images/dear_diary_year_one/47.2018week36.png","0abae18c076ca2161c37eb739983696e"],["/images/dear_diary_year_one/48.2018week37.png","4d212647549a7553ebf7a0cfb125a0a8"],["/images/dear_diary_year_one/49.2018week38.png","8643ed63c86ff774bf53dd2ba96af6f9"],["/images/dear_diary_year_one/5.2017week5and6.png","cba25b318cd1a48c350e16410e141592"],["/images/dear_diary_year_one/6.2017week7.png","68c4d7aba312db46ff8657c8c36f278d"],["/images/dear_diary_year_one/7.2017week8.png","412eac1a7d20f00779905a5ae337b1a1"],["/images/dear_diary_year_one/8.2017week9.png","22de0e9a48b3cdb20331bb3f93d1bb05"],["/images/dear_diary_year_one/9.2017week10.png","d3894eb2051688a0609a857899197e85"],["/images/dog-2019-01-01.jpg","ae91a77d13fe2bdf4b65b637558fbb19"],["/images/dog-2020-01-01.jpg","6b0411b2b33c79f969524fe04cdbf5ea"],["/images/dog-2021-01-01.jpg","3c317549e749e11fe3f62f51044da9c6"],["/images/dough-balls.jpg","7e28ca329a546f853083b35fcc39fe47"],["/images/dough-wide.jpg","f463bce84d51acaa6ee3247cb0415078"],["/images/ducks.jpg","23954ba9f0bc361024e5936dc211ac21"],["/images/dynamo-cheap-perf.png","886bd80261b5fdaef22ff41e25835f0d"],["/images/dynamo-console.png","eb41aa310038d59efa73a42fe8aafc5f"],["/images/east.jpg","411fe236431ae1cb3d3e2328cb4a06be"],["/images/event-composed.jpg","ce7c79cd1d363d96a3d1eeafe4cdea11"],["/images/event-notification.jpg","0cdfd30826534ec758ae06160e2e88bd"],["/images/event-sourced.jpg","153e0bce183b6ec8ea4a324a20ca8c45"],["/images/events/2-events-written.png","67a033a4ae5b596ebf499d80b929645c"],["/images/events/5/1-no-event.jpg","70168e4456388c01350576729a84d0f0"],["/images/events/5/2-one-event.jpg","cd75feda4a10d531fc2ce5e3008bdb99"],["/images/events/5/3-many-events.jpg","d84809dae82e55f31d0877c2b9f349bb"],["/images/events/5/4-new-readmodel.jpg","9dda45e60275570f33b0746e36f68c1d"],["/images/events/5/5-caught-up.jpg","fdad5af8791fc0a18a07d6b169da19a1"],["/images/events/5/6-graph.jpg","2cb774d4dc3966b9c056225594517731"],["/images/events/6/bill.png","0a3050d854e186b802c6f791e210d3ce"],["/images/events/6/current-sequence.jpg","3486dccd4a937cef7f941dba471e720d"],["/images/events/6/helpful-advice.png","cb07fad6486ba939fd91458dfe60ca1a"],["/images/events/6/new-sequence.jpg","46f44e9c2c1846562e2aa4bb18fd3ff6"],["/images/events/api-console-output.png","11d54779fa7e4fd3ca82847e6262890e"],["/images/events/api-gateway.png","29cdfe963460f2f62b1476080fe16209"],["/images/events/c4/1.jpg","c3ee3ea8942ec18854e0ab289e3e003c"],["/images/events/c4/2.jpg","5b4d7f542b5497f7e9fe40da740e28f7"],["/images/events/c4/3.jpg","4a6af9eb7929946b02554a11edc03978"],["/images/events/c4/first-slice-2.jpg","e07db3395b698125ffd1489a772a0425"],["/images/events/c4/second-slice-4.jpg","39dbff321bc46b2b3657147c2684bc58"],["/images/events/cqrs.jpg","7d3f1c9b1b1f1c117e9742f13fa2355e"],["/images/events/dynamo-console.png","194642d0077cfbd67fb7e3e8125f30c6"],["/images/events/east.jpg","788953a7200d8cef717d0f2df8c58483"],["/images/events/event-composed.jpg","ae616b97aec2d67d3f64688ec153c333"],["/images/events/event-notification.jpg","fcad6ec5a76ebdb15f962be3bd324762"],["/images/events/event-sourced.jpg","c7a48bca9e47506437049d4476c434f5"],["/images/events/lambda-console.png","5b7910271c8ae2ac56c67ea8a6c009a4"],["/images/events/part-four-flow.jpg","1cf13f9d84b5d64526315467b5be1824"],["/images/events/serverless.jpg","eb3d17136cf3526aa781ab5e613aeadf"],["/images/events/stack.png","3612bee6a7ba5356a8052d880c034b3c"],["/images/events/start-api.png","c408b21dd3dd2f0ca9ce0656b4fe0f3f"],["/images/events/testing-api-1.png","629bc6a72681c9746bb289c239e764a4"],["/images/events/testing-api-result-2.png","dd3a40d355e99902bceaad05a2b29ea9"],["/images/facebook-black-32.png","0addebf74bb9a8c6e3703e6560d4af69"],["/images/fifteen-dependencies.png","8d7d065c0f45e9c3f95821ef22a0a52e"],["/images/first-slice-2.jpg","e0c2f37feead4fdc176e4b15485c5e24"],["/images/foggy-day.jpg","90fba3be7a144f4141b47f6ada2f71b3"],["/images/forecast.png","d43771818701d9a14719216eafc63525"],["/images/god-of-death.png","bfac25909381711ab13c79d0dc1ac37e"],["/images/helpful-advice.png","297d26aded81bf1d2842a6be78bb0001"],["/images/home404.png","f36e2b3079f0fdac40afb8ff4178e72e"],["/images/homeBare.png","37c79b4c1ffb486869cbf3807969f6d4"],["/images/homeCarousel.png","9e80fd0e5461d3d74c97f3c9baa2e21b"],["/images/homeFull.png","30223b8d4e8d7195f081bde3aac777f8"],["/images/icons/icon-128x128.png","54cd283b0c1ec90108ce2051b15bf57a"],["/images/icons/icon-144x144.png","42b7873de7e33efe5bc966b4ff964dde"],["/images/icons/icon-152x152.png","30efdf4a576e11018b43d1df85665130"],["/images/icons/icon-192x192.png","2c5512011d149f48e7f3c210aa3c4584"],["/images/icons/icon-384x384.png","c202a45dfc404f2f315e8cc6cbf94d3a"],["/images/icons/icon-512x512.png","b9871b7b10d0582cbfcc8be37c31f9a4"],["/images/icons/icon-72x72.png","273f86f63d3eba378592de686ef6f33a"],["/images/icons/icon-96x96.png","157cf8c09db0ce0ee91cfd1fbf56135b"],["/images/ideal-board.jpg","48a87c4eaac70b7eadb445459e643fc4"],["/images/initial-commit-log.png","8e974d078a776eef4fcabba7546c5777"],["/images/integrates-with-github.png","9bd01982fe91d829017c7e96e250ad05"],["/images/interactive-spelling.png","5bf55827fa34ecac439c02cb6cedaea4"],["/images/lambda-console.png","89eb5bac0ac3f34cade99d1ed0d4d33b"],["/images/logo.png","317058a96e10f38798141f65f9d9ffa2"],["/images/lost.jpg","3f3ccd324fb94859cf1f4de080a15673"],["/images/mockup_5.png","38d55782c5f2e61a473d837e82d297ae"],["/images/new-sequence.jpg","1448424c0261bee045386e1cf74fc8bf"],["/images/nonewline.png","7b9eb7dd38a05fda17b18d47626638a0"],["/images/npm-run.png","9b851950476941ccbc29d99bf809bdd7"],["/images/objects.png","86468a5c7cafe6b65059d793f8242821"],["/images/office365/10.png","031cd3ea3569a163d80bdd65e15fc734"],["/images/office365/11.png","4d2d70e91bd99ea5a59efcf4dc533c50"],["/images/office365/12.png","b2b8e62d39b026301a49b6c6ef0afb78"],["/images/office365/14.png","91f0d277d39aae5dd08e6662d401bae3"],["/images/office365/15.png","d490e4568e3cd9fa16871718680c5715"],["/images/office365/21.png","46e16ef8707fa4f3c7b625b1aa85097e"],["/images/office365/22.png","3623920b00eeb1e0c414fb38bfb2ff8b"],["/images/office365/23.png","06a37d393363e7cf687cae4c62a3e769"],["/images/office365/25.png","7255578b47b644f215154cd0ad0df993"],["/images/office365/28.png","6e4a14da26d7cc530db920073045bb69"],["/images/office365/35.png","ad7550bf0f56dc1cc5bfd6a5c983c40c"],["/images/office365/40.png","3631c1372f8a30e431598c8ef3c6f177"],["/images/office365/42.png","e86f6dec5ff14c7829e2184678d36f61"],["/images/office365/46.png","49f8065354e9e17cf55ce72e7ad00569"],["/images/office365/47.png","a16d6184987dcb34f7df72ac9b51e135"],["/images/office365/48.png","e9ea49808c8ab61fbdf4ad0f3c9e22a8"],["/images/office365/5.png","785c18a10706d5c775f9c27536ef1a4d"],["/images/office365/50.png","db36f58f4cff55332cc7113c353032a4"],["/images/office365/51.png","b23c53ad38a9ec40ab1737c2d38ed826"],["/images/office365/52.png","f69450e57f7cdcdd1ec9029a6e41f4b0"],["/images/office365/54.png","cf6435593f00c899ae9c11d36538eab2"],["/images/office365/55.png","e4eb718efaf37dc043a1bb64bbc78852"],["/images/office365/57.png","f287a7df1647a28a10f1946770d146fc"],["/images/office365/58.png","cfecc32ffa5d988648b1b2482bd66199"],["/images/office365/60.png","8b13c4baba5499fe34587bd1f29f94e3"],["/images/office365/61.png","d4fb2bc8806721856610da9b9374a3cd"],["/images/office365/62.png","986d5fd7328e9e3dc915210213632a6c"],["/images/office365/65.png","187202435b7fc3e99420353a394eb600"],["/images/office365/68.png","bf257e29144e99df4ee00bbad7b55f97"],["/images/office365/7.png","9c8e29e7d5a9a3d92ebc2944bb681833"],["/images/office365/8.png","18f1b1af59e21ce4b9534b91b55d539b"],["/images/one-board.jpg","b2be2dd4c1af07749ac7249f2e49f99f"],["/images/part-four-flow.jpg","d9a5be67e5e4c0d089f90a22d140ea7c"],["/images/pasta-fasule.jpg","3ad06353d018dfd1ed9b697fd4cc27ce"],["/images/pepper-1.jpg","649ba6c81f77b4b5a80e2707198815f9"],["/images/pepper-2.jpg","27edc667547fd85b312531b6be2a6d7f"],["/images/pepper-wide.jpg","b0bd80ffd76c0472f047b1151cc4848b"],["/images/personal-access-tokens.png","bcfb487e6b499a9cde73c5005a74ef40"],["/images/radar.jpg","4a0e1d292f44e259bc30636794fff476"],["/images/reactotype_screenshot.png","4bf2e37a4f60909853833454fc48ac06"],["/images/rss.svg","a0ac3b30d914a734a53a18587a9f4761"],["/images/run-nightwatch.png","b98f376b1d9ec5fe69c0612efde8f316"],["/images/run2.0.jpg","46a220878333b5da0e8881b9d12a8206"],["/images/second-slice-4.jpg","b28d518d105ce03960585a32741cd657"],["/images/serverless-maintenance.png","6ed28854abadc2bc25b0389abeab316c"],["/images/serverless.jpg","4d2885a9427b2a99396d825c1ac98311"],["/images/solar/feed-in-tariff-graph.png","22b9337207bea9f83c36aa4449679e4b"],["/images/solar/panels-east.png","f869ea3b8845594697215f8dfec20fb9"],["/images/solar/panels-south.png","d263045d6fdad84b3597fdbe48d1c746"],["/images/solar/production.png","55b23a6cff30d955a499d0a58797ad87"],["/images/stack.png","153c23d1eca47b23e48239508e702080"],["/images/start-api.png","7d40da3a2467af1232ee3432db6c9fd5"],["/images/structs.png","0863fadc2949a8e769101a0be8b439c6"],["/images/structured-data-crawled.png","a0ddf81c0335489f9ba259f624ea8552"],["/images/sunny-day.jpg","77a89a3989df8bd49cff8d40e93224e3"],["/images/tada.png","1e94b4777a99c576ad68a7e2beafe93a"],["/images/tag.svg","34a504803dc8f5e431aae1dd5e0e9d6a"],["/images/tech-debts/actual_different_styles_meme_by_zeurel-d38c306.png","3a1266003cd719d97baa814a33423939"],["/images/tech-debts/tree.jpg","977a11d3e6a2bf039c20ba4359949517"],["/images/testing-api-1.png","76cf0d40b46ddbf619192fb552442991"],["/images/testing-api-result-2.png","713dc5d4d4ffddf3894850033e589950"],["/images/the-chart-1.png","a39e300b7e21dc2477767a9c5af159a1"],["/images/the-discussion.png","4cf7c92e6ea850baeb2a80b020b6c821"],["/images/the-graph.png","755468baa544bf34bb266fa94e9ab037"],["/images/the-quadrants.png","6d05f18ee9015e68f9f89b2eea353462"],["/images/toot.png","6b06c2fb1aec94c0409e562f1c63c3be"],["/images/travis.png","297f3ed18d37f2a5c4ba2433729fffe5"],["/images/tree.jpg","571cbd862547ae8ce3a469e8fb309a87"],["/images/twitter-32.png","0e21335ff0b1b322f75eaaeb32b81ef9"],["/images/twitter-black-32.png","c279b87a4805d22ea078147ff065f8d3"],["/images/unhappiness.png","c7530007f12b594e7ada515593661056"],["/images/votes.png","41794aa63b91c393eec9aa5bac85a13c"],["/images/weeknotes-autoload-graph.png","0369413e0710d8b2b6803beb3d8cac7a"],["/images/weeknotes.png","3fb31e00a52321e416b7cf4e73315540"],["/images/yarn-desc.png","1b9d17a78533154ccdb065058a674800"],["/images/yarn-run.png","c7b496ac6e9f9aa4335b1ae321e256be"],["/images/zero-velocity.png","d8037df3aa23e98c8a8a698de3a459c7"],["/index.html","a82d538329211b8c5f77ef7713a2258b"],["/kids-games.html","c8740daa38e95b8749fb24a544264e18"],["/kill-if-with-objects.html","2e08b56c29b76a07045ce82abed13778"],["/page2/index.html","2ab00a70ebe1f91958f5f2566a15823d"],["/page3/index.html","8d5c5f08439b7edd8c4efffae2bd5d26"],["/page4/index.html","d395dd62b33e9a8fa3d0387644750b6f"],["/page5/index.html","d696a41b00448df093b2cec9147d7ef2"],["/page6/index.html","ba60acc7f8ed86b92b22ccf79a5e7983"],["/page7/index.html","d2fb0b2e17e3c6fca4e5380facdbbbdd"],["/page8/index.html","b37241224aa4ceda17434a2be6bcb8d0"],["/page9/index.html","9ee7e6ca2f3d937bb84d12ac7d6c9681"],["/powershell-on-linux.html","9385d38bcb5eef182a8b9dfa9630268e"],["/rake-transforms.html","d030c486f030c1192ed48f59dffa4326"],["/reactotype/part-one.html","6b5d2845077179ac81b1febff49de6c9"],["/reactotype/part-three.html","dc1a013e21cd2b606b3624c43a5fba86"],["/reactotype/part-two.html","55e6ef7726ec804713c29b98be6bd04a"],["/real-vs-soft.html","899178ccdbe346e72e87e01cbafdd856"],["/recipes/2022/09/pepper-salad.html","8df5a6119e1754ce8af94ca68323b183"],["/recipes/2022/09/pizza-dough.html","101e9e0b6c7c0eb0852d1242f9ec7e24"],["/recipes/2023/01/pasta-e-fasule.html","54b1b34e32bd3d0fdcff8abd6b96a92b"],["/recipes/2023/07/zucchini-focaccia.html","936bbc6978ead66bacf25b9194c048d3"],["/static-factory-methods.html","416a7b9344941520bfc9f0dfacdd160c"],["/structured-data-with-jekyll.html","5ffe0257b7e81d272c9fa3e556e23040"],["/tags.html","a37e7a01e2dc3cedeb6795f531777c2a"],["/using-travis-to-build-jekyll.html","587b8b9052845886bffe8fe5d7891dc7"],["/websites-CMS-platform-logging-in.html","0b7d63a14c181cb41fd548c0d1eaf74a"],["/weeknotes.html","efb6f377d18817c146ebb528221fe94d"],["/weeknotes/2020/10.html","32bb46c01a0d547351767595975066b4"],["/weeknotes/2020/10.png","a3a11d87526187f38c04eee99e197fd0"],["/weeknotes/2020/11.html","5ad9a1cd2a603269cf9bfd4f210dae73"],["/weeknotes/2020/11.png","cac6a4a209438188a21d3aa08745a9ec"],["/weeknotes/2020/12.html","3b5c65522fd7454dbcf96e9f6d4f600a"],["/weeknotes/2020/12.png","ce151a7653425441a02097bbe1628745"],["/weeknotes/2020/13.html","e46da947c24b94a830a1df00714f692f"],["/weeknotes/2020/13.png","5c01c33c9a553013a52344cdeec97635"],["/weeknotes/2020/2.html","97f3366bd58a83762c4b0d502c6e84fc"],["/weeknotes/2020/2.png","fc5e2a815f92bf71f72fa7895239cef5"],["/weeknotes/2020/3.html","3c86b31ce2afac1868894390c693b81c"],["/weeknotes/2020/3.png","495db34d2d1759425fa251f3f429e89a"],["/weeknotes/2020/4.html","cf305cf37d819fce78bbf8b96ef97657"],["/weeknotes/2020/4.png","cd39fda0ba65ae4ad29ca99a3d3b645f"],["/weeknotes/2020/5.html","f04bf2b4b9f15070989a084800d31ec9"],["/weeknotes/2020/5.png","28178cafdee66be3fad36d994ea17427"],["/weeknotes/2020/6.html","b466321da1799190da4a57a688b058b4"],["/weeknotes/2020/6.png","ea034629667085fcab373b3f1c9f66a0"],["/weeknotes/2020/7.html","8dc01ef18c12f71d98b4ec2e56bb95f1"],["/weeknotes/2020/7.png","5379c9f3f920c20a7adffbfb9ec92ce0"],["/weeknotes/2020/9.html","dbe4026ad6bf0d876c883911915823dd"],["/weeknotes/2020/9.png","3f0e14436ba4c20f3fa846ff6a2c65cb"],["/weeknotes/2021/12.html","7e3bbd02453c8293aa742fc3547949be"],["/weeknotes/2021/12.png","a9a5eed69c695e60e74915a309def346"],["/weeknotes/2021/13.html","c438bb2cdd81dadaa4efd99fdec4e440"],["/weeknotes/2021/13.png","6a44e96064ecfbf3fc708a32e0e09140"],["/weeknotes/2021/14.html","c79fa20d7f1f58e8376999e7faf6114a"],["/weeknotes/2021/14.png","b898327d2383e1262b511bfdc85ab706"],["/weeknotes/2021/15.html","bd4969fad43b2963a349beb3b25afffb"],["/weeknotes/2021/15.png","0fcc7d362e606eb2d082ab9364a40eb1"],["/weeknotes/2021/16.html","a751cb0058b86bc7561c0d6c7906defb"],["/weeknotes/2021/16.png","a382d81c7ccdb049f0be948ee77024e8"],["/weeknotes/2021/17.html","921b7657712d7dfc43d9a425ac470cda"],["/weeknotes/2021/17.png","ee79779ec25314c7d8a22d868d1e2d1c"],["/weeknotes/2021/18.html","2669b2bf87ebe0116a28416d7949cd95"],["/weeknotes/2021/18.png","a5652df3c2db63703b08abf3b1249781"],["/weeknotes/2021/19.html","41069d0dc5daeae3efbba344868db37a"],["/weeknotes/2021/19.png","3ab18b7e7389c4e6dd2121dea9420a80"],["/weeknotes/2021/2.html","9e21b0033d32f731dba1a5e1e1bcabb4"],["/weeknotes/2021/2.png","bf276a8f3baebe2c952127de3c74fc57"],["/weeknotes/2021/20.html","e004cf0215af23a3ae006b885b410931"],["/weeknotes/2021/20.png","b1a30a36e0753f8417af3b713b09973b"],["/weeknotes/2021/21.html","13f354db1ff4c8c9ae1936e4664f8335"],["/weeknotes/2021/21.png","7ca5097dd4fc790df0134a173a66a0f6"],["/weeknotes/2021/23.html","3337bb2adb2e9decbafed920fbf66a4d"],["/weeknotes/2021/23.png","b74a46d38ad08376f38fcd3272f96a65"],["/weeknotes/2021/24.html","290171789afcaa948307f9d0a9cd8569"],["/weeknotes/2021/24.png","35fcb79ccfe5fcea068fcf4f3a2e3627"],["/weeknotes/2021/25.html","862900a632bf9caaa55f7b3205a00f68"],["/weeknotes/2021/25.png","c1b32a4aa3fc66bafb3b05e60b0f0006"],["/weeknotes/2021/26.html","d3cab092d486df50289e4cd5eeac5e2b"],["/weeknotes/2021/26.png","8dc2136429d5dce5138004f50a7ea411"],["/weeknotes/2021/27.html","18e372db8bf61a287f0006556221d193"],["/weeknotes/2021/27.png","d79410971767d54c58ae59a0b8e43c9c"],["/weeknotes/2021/28.html","00f9e9664b3950b8e8d37109af34272e"],["/weeknotes/2021/28.png","9fe38e3ed88afe8d4813bfb223a7c0b4"],["/weeknotes/2021/29.html","10644f0b5745971a162f4690667eb096"],["/weeknotes/2021/29.png","553e723aa8d2aac835c721df62a5af01"],["/weeknotes/2021/3.html","ba07ccb6fadfec79494f9c69321cccb4"],["/weeknotes/2021/3.png","44aeabd012779455b5def18fd44f6cd7"],["/weeknotes/2021/38.html","bc13dcfda5bba0ca58353619d159da0f"],["/weeknotes/2021/38.png","39aff35f6c65d575fe8b53b333df3819"],["/weeknotes/2021/39.html","d27bc6bcceae7f51c01bcdb7a5e49a70"],["/weeknotes/2021/39.png","9fb717586d4a0031fcc4017699bc66b9"],["/weeknotes/2021/4.html","7518978efe987c0f9eebb95030fa7e49"],["/weeknotes/2021/4.png","68169cb217fe287383a9a1569ec916b7"],["/weeknotes/2021/40.html","92e7a9c7ea4e39d0f1c96e10fcd4eb02"],["/weeknotes/2021/40.png","ea42d49e454eca98da49e1cf8c6d67b5"],["/weeknotes/2021/42.html","8441d025212958ab9c946313badb211d"],["/weeknotes/2021/42.png","772e007c9bfada16466a463d9eeed22c"],["/weeknotes/2021/44.html","6b9a07313fbe2ca5a1216dc203246b77"],["/weeknotes/2021/44.png","9a4a1582259e1b49907595aeae9636b8"],["/weeknotes/2021/45.html","00860f536ed123b9c00e4739f78d769f"],["/weeknotes/2021/45.png","3da0ddbbe46d6e5a48f92d3d09a3a018"],["/weeknotes/2021/46.html","8afbe9bdaa8a08e430352bb543e65060"],["/weeknotes/2021/46.png","1e10725d44ff9968fe73e264d1382416"],["/weeknotes/2021/5.html","6e704ab7488afd177858e84eec52613b"],["/weeknotes/2021/5.png","d0d0fe47a9f4df223e947f9ed6f691ec"],["/weeknotes/2021/6.html","072642f180021242d4272ede47723f97"],["/weeknotes/2021/6.png","936efe030e5b277bf69ae4682df59272"],["/weeknotes/2021/7.html","466263220206dc57a6c9b10ff8401841"],["/weeknotes/2021/7.png","6033fbe9c7912d8410c78530a310e1ba"],["/weeknotes/2021/8.html","3582b02a6734787b7ab8bba37601fe6d"],["/weeknotes/2021/8.png","a827280692df82b74d1e8f2ce64095b2"],["/weeknotes/2021/9.html","999658a13581f058d2ca1b766ac744e0"],["/weeknotes/2021/9.png","442d10d6a630650139d3994b0f5368f9"],["/weeknotes/page2/index.html","ddb7ef1289f0e81b85a9f41343ec40e4"],["/weeknotes/page3/index.html","c9ad45315eec35fc69300ae3601d7699"],["/weeknotes/page4/index.html","4dec42928677f2e47b55cd7e2adf7126"],["/weeknotes/page5/index.html","342545ad740cf3268da2b8bfcb752bb7"],["/wrapping_up.html","769c0d112073b46b1778cb34b8e168c4"]];
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







