# Service Worker API
Script that runs in the background, in an extra Thread, with no link to the DOM.
Could be used for:
- scheduling requests for later, when no internet connection is available
- receiving push notifications, even when the browser window is not open
- interrupt network requests, like a proxy between the browser JavaScript and the network.

## Basic usage
main.js
```
navigator.serviceWorker.register('worker.js')
  .then((reg) => {
    // Registered
  })
  .catch((error) => {
    // Failed to Register
  });
```

### worker.js
#### Stage 1: Install
```
this.addEventListener('install', (event) => {
  // Installed
  event.waitUntil(
    caches.open('assets').then(function(cache) {
      return cache.addAll([
        '/foo/index.html',
        '/foo/style.css',
        ...
      ]);
    })
  );
});
```
#### Stage 2: Activate
```
this.addEventListener('active', (event) => {
  // Activated
});

```
#### Stage 3: Do something
##### Schedule events for later, like saving a design
```
this.addEventListener('sync', (event) => {
  // example: send a request
  event.waitUntil(
    doSomeRequest() // will be sceduled for later until promise fullfills or fails
  );
});
```
##### Receive push notifications in the background
```
this.addEventListener('push', (event) => {
  // example: show a notification
  event.waitUntil(
    self.registration.showNotification(title, {
        ...
    })
  );
});
```
##### Interrupt network requests (Proxy)
```
this.addEventListener('fetch', (event) => {
  // example: respond with cached objects, when possible
  event.respondWith(
    caches.match(event.request)
  );
});
```

## Links

* [Using Service Wrokers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)
* [Can I use window.fetch](http://caniuse.com/#search=service%20worker)
* [Push](https://developers.google.com/web/updates/2015/03/push-notifications-on-the-open-web)
* [Sync](https://developers.google.com/web/updates/2015/12/background-sync)