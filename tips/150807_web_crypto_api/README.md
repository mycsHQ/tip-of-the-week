# Web Crypto API

> The Window.crypto read-only property returns the Crypto object associated to the global object. This object allows web pages access to certain cryptographic related services.

> The SubtleCrypto interface represents a set of cryptographic primitives. It is available via the Crypto.subtle properties available in a window context (via Window.crypto).

Wrote a little sample script to hash, generate a symmetric key and en/decrypt data.
It's also possible to sign (using HMAC) data, generate and use asymmetric (private/public) keys and so on.

#### Can I use it?
  * [Window.crypto](http://caniuse.com/#search=Web%20crypto)

#### Source
  * [Tim Taubert: Keeping secrets with JavaScript | JSConf EU 2014](https://www.youtube.com/watch?v=yf4m9LdO1zI)
  * [MDN - SubtleCrypto](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto)
  * [MDN - TextEncoder (String -> Encoded Int-Array)](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder)
  * [MDN - TextDecoder (Encoded Int-Array -> String)](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder)
