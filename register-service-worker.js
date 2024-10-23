
/* eslint-env browser */
'use strict'

const forTenSeconds = toast => parent => {
  parent.appendChild(toast)
  setTimeout(() => {
    toast.parentNode.removeChild(toast)
  }, 10000)
}

const toast = text => {
  const theDiv = document.createElement('div')
  theDiv.style.cssText = `width:200px;
      height:20px;
      height:auto;
      position:absolute;
      left:50%;
      margin-left:-100px;
      bottom:10px;
      background-color: #383838;
      color: #F0F0F0;
      font-size: 20px;
      padding:10px;
      text-align:center;
      border-radius: 2px;
      -webkit-box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);
      -moz-box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);
      box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);
  }`

  theDiv.textContent = text
  return theDiv
}

const appendTo = (parent, toastAppendTo) => toastAppendTo(parent)

// taken from https://raw.githubusercontent.com/GoogleChrome/sw-precache/master/demo/app/js/service-worker-registration.js

if ('serviceWorker' in navigator) {
  // Delay registration until after the page has loaded, to ensure that our
  // precaching requests don't degrade the first visit experience.
  // See https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration
  window.addEventListener('load', function () {
    // Your service-worker.js *must* be located at the top-level directory relative to your site.
    // It won't be able to control pages unless it's located at the same level or higher than them.
    // *Don't* register service worker file in, e.g., a scripts/ sub-directory!
    // See https://github.com/slightlyoff/ServiceWorker/issues/468
    navigator.serviceWorker.register('/service-worker.js').then(function (reg) {
      // updatefound is fired if service-worker.js changes.
      reg.onupdatefound = function () {
        // The updatefound event implies that reg.installing is set; see
        // https://w3c.github.io/ServiceWorker/#service-worker-registration-updatefound-event
        var installingWorker = reg.installing

        installingWorker.onstatechange = function () {
          switch (installingWorker.state) {
            case 'installed':
              if (navigator.serviceWorker.controller) {
                // At this point, the old content will have been purged and the fresh content will
                // have been added to the cache.
                // It's the perfect time to display a "New content is available; please refresh."
                // message in the page's interface.
                appendTo(document.body, forTenSeconds(toast('New or updated content is available.')))
                console.log('New or updated content is available.')
              } else {
                // At this point, everything has been precached.
                // It's the perfect time to display a "Content is cached for offline use." message.
                appendTo(document.body, forTenSeconds(toast('Content is now available offline!')))
                console.log('Content is now available offline!')
              }
              break

            case 'redundant':
              console.error('The installing service worker became redundant.')
              break
          }
        }
      }
    }).catch(function (e) {
      console.error('Error during service worker registration:', e)
    })
  })
}
