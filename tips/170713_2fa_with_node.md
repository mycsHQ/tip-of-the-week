# Two-Factor Authentication with Node JS
Using npm package: [speakeasy](https://www.npmjs.com/package/speakeasy)
- one-time passcode generator
- supports Google Authenticator, Duo Security, Authy

## Basic steps
### 0. Install npm-package
```
npm install --save speakeasy
```

### 1. Generate a secret
- generate a unique secret key for the user and save it to DB
- used to validate 2FA codes

```
var speakeasy = require('speakeasy');

var secret = speakeasy.generateSecret({length: 20});
saveSecretToDB(secret.base32);
```
- secret.base32 example: `JFBVG4R7ORKHEZCFHZFW26L5F55SSP2Y`

### 2. Connect to App
- make the process easier by providing a QR code (for apps like Google Authenticator)

```
var QRCode = require('qrcode');

QRCode.toDataURL(secret.otpauth_url, (err, imageData) => {
  sendDataUrlToClient();
});
```
- user should scan the QR code with Google Authenticator App
- afterwards we should ask the user for a token, whenever he/she want's to login

#### 2.1 Get the current token for the user
- verify if the user proceeded with enabling 2FE
```
var secret = loadSecretFromDB();

var token = speakeasy.totp({
  secret: secret,
  encoding: 'base32'
});
```
- will return a 6 digit token, in case 2FE is activated

##### Sidenote
- `totp` --> time based token
- `htop` --> counter based token

### 3. Verify the token for the first time
- token is provided the by the user via request param

```
var userToken = params.get('token');
var secret = loadSecretFromDB();

var verified = speakeasy.totp.verify({
  secret: secret,
  encoding: 'base32',
  token: userToken
});
```

- `verify()` will be `true` if the token is successfully verified, `false` if not.
- proceed with the login if the token matched, otherwise prompt the user to try again

## Links
* [Demo](https://sedemo-mktb.rhcloud.com/)