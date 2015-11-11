# Manual tests on different browsers and OS'

## Browserstack

1. Install the [Browserstack extension](https://chrome.google.com/webstore/detail/browserstack-loader/ficmbjfmibnkmehkbngghpjnmmjolnmi?hl=en) for Chrome

2. Establish a connection between your local machine and Browserstack ([documentation](https://www.browserstack.com/local-testing))
  ```
  npm run browserstack
  ```

3. Use the Chrome extension to select different browsers. The first time you will have to login:
  ```
  user: ...
  pass: ...
  ```

4. Enter you local url, ie: `http://localhost:8000`


## Test on different Mac devices (iPhone, iPad, etc.)

0. This only work on Mac

1. Download and install the latest version of [xcode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)

2. Launch the Simulator (`cmd + space` and enter: `simulator`)

3. Select a device: `Hardware` > `Device` > ...

You can also debug using the Web Inspector through Safari ([tutorial](http://www.webascender.com/Blog/ID/634/Setup-iOS-8-Simulator-on-OS-X#.VkNIIK6rRTY))
