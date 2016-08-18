# Nightwatch.js
## Browser automated testing

```Presentation:``` :book: [link to pdf](../images/nightwatch-slides/Nightwatch.js.pdf)

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

## Simple test
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

## Simple mycs test

```js
module.exports = {
    'Homepage test' : function (browser) {
        var color = '';
        browser
            .url(browser.launch_url)
            .waitForElementVisible('body', 2000)
            .assert.elementPresent(".banner__product-links") // check banner
            .assert.elementPresent(".header__nav-left-container") // check logo
            .assert.elementPresent(".header__nav-menu") // check menu
            .click('#menu-0 > a') // go to configurator
            .waitForElementVisible('.configurator--rendering', 3000) // wait for configurator
            .assert.urlEquals(browser.launch_url + 'regal/LwAf6LoS') // check url
            .click('my-configurator-header-shelf > section > div > div > div:nth-child(4) > mx-icon-button > button') // change color
            .click('mx-color-picker-dropdown > mx-dropdown-button > div > mx-icon-button > button')
            .click('.dropdown-button__popover.fade.in > div.popover-inner > div > div > ng-repeat:nth-child(5) > div.dropdown-button__option > mx-icon-button > button')
            .click('mx-shelf-colors > div > div:nth-child(1) > span:nth-child(2) > mx-dropdown-button > div > mx-icon-button > button')
            .click('.dropdown-button__popover.fade.in > div.popover-inner > div > div > ng-repeat:nth-child(3) > div > mx-icon-button > button')
            .pause(1000)
            .end();
    }
};
```

## Results
<table>
<tr>
  <th>Environment</th>
  <th>Started tests</th>
  <th>Fails</th>
</tr>
<tr>
  <td>local</td>
  <td>10</td>
  <td>2</td>
<tr>
<tr>
  <td>dev</td>
  <td>10</td>
  <td>1</td>
<tr>
<tr>
  <td>prod</td>
  <td>10</td>
  <td>1</td>
<tr>
</table>
