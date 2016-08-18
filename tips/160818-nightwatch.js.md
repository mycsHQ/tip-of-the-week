# Nightwatch.js
## Browser automated testing

Presentation: [link to pdf](../images/nightwatch-slides/Nightwatch.js.pdf)

- describes itself an a Node.js powered end-to-end testing framework
- uses Selenium WebDriver API [there is 3.0 beta](http://selenium-release.storage.googleapis.com/index.html)

## Pros

- Similar to protractor.js (has all functionality)
- Nice documentation and API Reference
- Good configuration: Basic settings, Selenium settings, Test settings [doc.](http://nightwatchjs.org/guide)
- Working with Multiple Environments npm test --env staging
- Parallel Running of environments / browser
- Using Mocha and Chai [doc.](http://nightwatchjs.org/guide#using-mocha)
- Great output in console
- No tunnels
- Test’s speed (two times faster)


## Cons

- Similar to protractor.js
- Tests could fail
- It takes time to write tests

## Results

| Environment  | Started tests | Fails |
| ------------- | ------------- |
| local  | 10 | 2 |
| dev    | 10 | 1 |
| prod   | 10 | 1 |

## Simple test demo
```js
module.exports = {
  'Demo test Google' : function (browser) {
    browser
      .url('http://www.google.com')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=text]', 'nightwatch')
      .waitForElementVisible('button[name=btnG]', 1000)
      .click('button[name=btnG]')
      .pause(1000)
      .assert.containsText('#main', 'Night Watch')
      .end();
  }
};
```

## Using environments
```js
"test_settings": {
        "default": {
            "launch_url": "http://localhost:8000/",
            "silent": true,
            "screenshots": {
                "enabled": false,
                "path": ""
            },
            "desiredCapabilities": {
                "browserName": "firefox",
                "javascriptEnabled": true,
                "acceptSslCerts": true
            }
        },
        "dev": {
            "launch_url": "https://de.mycs.ninja/"
        },
        "prod": {
            "launch_url": "https://de.mycs.com/"
        }
    }
```