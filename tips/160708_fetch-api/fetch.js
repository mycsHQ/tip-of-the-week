"use strict";

(function () {

  /*
   * Basic usage
  */
  document.getElementById('getReq').addEventListener('click', () => {

    console.log('Make basic GET request');

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

});


  /*
   * Use of Request and Header objects
   */
  document.getElementById('putReq').addEventListener('click', () => {

    console.log('Make PUT request with Authorization');

    let setOrderStatus = (transactionId, status) => {
      // Create a header object with initial values
      let headers = new Headers({
        'Content-Type': 'application/json'
      });

      headers.append('Authorization', 'Bearer TOKEN1'); // Or use "append", "has", "get", "set", and "delete"

      // Create a request object
      let request = new Request('http://localhost:3000/orders/update/status/', {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({
          data: [
            { transaction_id: transactionId, status: status}
          ]
        })
        // Send a Form?
        // body: new FormData(document.getElementById('some-form-element'))
      });

      // Make the call
      return fetch(request).then((response) => {
          return response.json(); // ReadableByteStream
      })
    };

    let promise1 = setOrderStatus(551904089, 'shipping');
    let promise2 = setOrderStatus(552469489, 'billed');

    // Promise.race([promise1, promise2]);
    Promise.all([promise1, promise2])
      .then((responses) => {
        responses.forEach((json) => {
          console.log(json)
        });
      })
      .catch((error) => {
        console.error(error)
      });

  });

}());