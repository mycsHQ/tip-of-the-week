"use strict";

(function () {
  var secret;

  /*******************************
   * Buffer Helper
   * - provide encode/decode for string to utf-8 text buffer int-array
   *******************************/
  var bufferWrapper = {

    encode: function(str) {
      var encoder = new TextEncoder("utf-8");
      return encoder.encode(str);
    },

    decode: function(buf) {
      var decoder = new TextDecoder("utf-8");
      return decoder.decode(buf);
    }

  };

  /*******************************
   * Crypto Options
   *******************************/
  var crypt = window.crypto.subtle;
  var notSaveSalt = bufferWrapper.encode("notVerySave");
  var entropy = window.crypto.getRandomValues(new Uint8Array(16));

  /*******************************
   * Crypto Helper
   * - wrap crypto API functions
   *******************************/
  var cryptoWrapper = {

    generateHash: function(val) {
      var buffer = bufferWrapper.encode(val);
      return crypt.digest({name: "SHA-256"}, buffer); // returns a promise
    },

    getUserPWKey: function() {
      // Get a Password from the user, which will be used to generate a crypto hash
      var buffer = bufferWrapper.encode(prompt("Please enter a password"));
      var usages = ["deriveKey"];

      // PBKDF2 converts a password to a cryptographic hash, which can then be used to generate a cryptographic key for subsequent operations.
      return crypt.importKey("raw", buffer, "PBKDF2", false, usages); // promise
    },

    getEncryptionKey: function(userPWKey, decrypt) {
      var params = {name: "PBKDF2", hash: "SHA-1", salt: notSaveSalt, iterations: 1000};

      // The derived key will be used to encrypt with AES.
      var alg = {name: "AES-GCM", length: 256};
      var usages = (decrypt) ? ["decrypt"] : ["encrypt"];

      return crypt.deriveKey(params, userPWKey, alg, false, usages); // promise
    },

    encrypt: function(key, val) {
      var buffer = bufferWrapper.encode(val);
      return crypt.encrypt({ name: "AES-GCM", iv: entropy }, key, buffer); // promise
    },

    decrypt: function(key, val) {
      return crypt.decrypt({ name: "AES-GCM", iv: entropy }, key, val); // promise
    }

  };


  /*******************************
   * Events
   *******************************/

  // HASH
  document.getElementById('hash').addEventListener('click', function() {
    var val = document.getElementById('input').value;

    cryptoWrapper.generateHash(val)
      .then(function(hash) {
        console.log("HASH: " + bufferWrapper.decode(hash));
      });

  }, false);

  // ENCRYPT
  document.getElementById('encrypt').addEventListener('click', function() {
    var val = document.getElementById('input').value;

    cryptoWrapper.getUserPWKey()
      .then(function(userPWKey) {
        console.log("... created cryptographic hash from password");
        console.log(userPWKey);
        return cryptoWrapper.getEncryptionKey(userPWKey, false);
      })
      .then(function(encryptKey) {
        console.log("... created AES key");
        console.log(encryptKey);
        return cryptoWrapper.encrypt(encryptKey, val);
      })
      .then(function(encryptedValue) {
        console.log("ENCRYPTED: " + bufferWrapper.decode(encryptedValue));
        console.log("... saved as secret");
        secret = encryptedValue;
      });

  }, false);

  // DECRYPT
  document.getElementById('decrypt').addEventListener('click', function() {

    cryptoWrapper.getUserPWKey()
      .then(function(userPWKey) {
        console.log("... created cryptographic hash from password");
        console.log(userPWKey);
        return cryptoWrapper.getEncryptionKey(userPWKey, true);
      })
      .then(function(encryptKey) {
        console.log("... created AES key");
        console.log(encryptKey);
        return cryptoWrapper.decrypt(encryptKey, secret);
      })
      .then(function(decryptedValue) {
        console.log("DECRYPTED: " + bufferWrapper.decode(decryptedValue));
        console.log("... from secret");
      })
      .catch(function(error) {
        console.error("Unable to Decrypt");
      });

  }, false);


}());
