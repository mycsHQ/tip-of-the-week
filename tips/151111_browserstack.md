# Manual tests on different browsers and OS'

## Browserstack

1. Install the [Browserstack extension](https://chrome.google.com/webstore/detail/browserstack-loader/ficmbjfmibnkmehkbngghpjnmmjolnmi?hl=en) for Chrome

2. Downlaod the binary to establish a connection between your local machine and Browserstack
  ```
  https://www.browserstack.com/local-testing#command-line
  ```

3. Run the Browserstack script with your [access key](https://www.browserstack.com/accounts/local-testing)
  ```
  ./BrowserStackLocal your-access-key
  ```

4. Use the Chrome extension to select different browsers

5. Enter you local url, ie: `http://localhost:8000`


## Test on different Mac devices (iPhone, iPad, etc.)

0. This only work on Mac

1. Download and install the latest version of [xcode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)

2. Launch the Simulator (`cmd + space` and enter: `simulator`)

3. Select a device: `Hardware` > `Device` > ...

You can also debug using the Web Inspector through Safari ([tutorial](http://www.webascender.com/Blog/ID/634/Setup-iOS-8-Simulator-on-OS-X#.VkNIIK6rRTY))
