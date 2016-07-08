# Fetch API
Used to make AJAX requests.
Can be used instead of the complicated XMLHttpRequest.

## Basic usage
```
fetch('https://api.mycs.com/elements/101.112.00', { method: 'GET' })
  .then((response) => {
    return response.json(); // ReadableByteStream
  })
  .then((json) => {
    console.log(json);
  })
  .catch((error) => {
    console.error(error);
  });
```

##### Response Object methods
- response.text()
- response.json()
- response.blob()
- response.formData()
- ...

see: [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Response)

## Use of Request and Header objects

##### Create a header object with initial values
```
let headers = new Headers({
  'Content-Type': 'application/json'
});
```

##### Or use "append", "has", "get", "set" and "delete"
```
headers.append('Authorization', 'Bearer xyz...');
```


##### Create a request object using the header object with the following options:
- method: GET, POST, PUT, DELETE, HEAD
- headers: associated Headers object
- referrer: referrer of the request
- mode: cors, no-cors, same-origin
- credentials: should cookies go with the request? omit, same-origin
- redirect: follow, error, manual
- cache: cache mode (default, reload, no-cache)
- body: ...

```
let request = new Request('http://localhost:3000/orders/update/status/', {
  method: 'PUT',
  headers: headers,
  body: JSON.stringify({
    data: [
      { transaction_id: 551904089, status: 'shipping'}
    ]
  })
});
```

##### Easy to send Form Data
```
...
  body: new FormData(document.getElementById('some-form-element'))
...
```

#### Fetch the Request Object
```
fetch(request)
  .then((response) => {
     return response.json(); // ReadableByteStream
  })
  .then((json) => {
    console.log(json);
  })
  .catch((error) => {
    console.error(error);
  });
```

## Links

* [Docs - MDN](https://developer.mozilla.org/en/docs/Web/API/Fetch_API)
* [Can I use window.fetch](http://caniuse.com/#search=Web%20crypto)
* [A window.fetch JavaScript polyfill](http://github.github.io/fetch/)