<p align="center"><img alt="Ghost logo" src="https://googledrive.com/host/0B7tNkEBh3dIna3pCcVVsa2tPVlk/logo-green.png" /></p>
<p align="center"><img alt="Ghost logo" src="https://googledrive.com/host/0B7tNkEBh3dIna3pCcVVsa2tPVlk/title.png" /></p>

<h2>Ghost Inspector</h2>

<p>Ghost Inspector provides a free Chrome recorder extension that allows you to record operations and assertions right in your web browser. If you’re familiar with Selenium IDE, this is similar but much more streamlined. Once you’re done recording a test, it’s saved to our cloud service and immediately processed. At that point, you can view, edit and automate the test within your account.</p>

* Visual Editor – No Code Required
* Screenshot Comparison
* Videos of Every Test Run
* Third Party Notification Alerts

<h2>Account</h2>

**Log in page**: [app.ghostinspector.com](https://app.ghostinspector.com/) <br />
* **Username**: service@mycs.com <br />
* **Password**: share with lastpass (ask Alex, Claudio or Ivan)
* [Sandbox](https://app.ghostinspector.com/tests/572c9211f50adfb315a76965) to play

<h2>Quick Start</h2>
1. Add Ghost Inspector [browser extension](https://chrome.google.com/webstore/detail/ghost-inspector-automated/aicdiabnghjnejfempeinmnphllefehc)<br /><br />
1. Record scenario in your browser [[Documentation](https://ghostinspector.com/docs/test-recorder/)] <br />
Extension records clicks, form submissions and more. You can then set assertions that must be made for your test to pass. <br /><br />
<img alt="Ghost logo" src="https://googledrive.com/host/0B7tNkEBh3dIna3pCcVVsa2tPVlk/test-recorder.gif" /><br /><br />
1. Try to correct the automatically generated huge css chains, for example: <br /><br />
**before:** `#cfg-panes > .tab-pane:nth-of-type(1) > .legs-tab > my-configurator-color-picker[type="ctop"] > div > .configurator-color-picker > .color-picker-box > .color.veneered_anthracite`<br />**after:** `my-configurator-color-picker .color.veneered_anthracite`<br /><br />
1. Extend the logic of the test, adding new steps and using the following operations: <br />
<br /><img src="https://googledrive.com/host/0B7tNkEBh3dIna3pCcVVsa2tPVlk/actions.png" alt="possible actions"/><br /><br />
**Useful features:** <br />
-`Javascript returns true` - to compare something using Javascript / JQuery<br />
-`Set variable` - set variable manually<br />
-`Extract from Javascript` - set variable with Javascript / JQuery<br /><br />
**New steps e.g:** <br /><img src="https://googledrive.com/host/0B7tNkEBh3dIna3pCcVVsa2tPVlk/adding-steps.png" alt="possible actions"/><br /><br />
1. Run test manually to check whether it pass. <br /> **To run test on different domains** (.ninja, .io, .com) use `more` -> ` Run Test with Custom Settings...`<br /><br />
<img src="https://googledrive.com/host/0B7tNkEBh3dIna3pCcVVsa2tPVlk/more.png" alt="possible actions"/><br /><br />
1. Go to `TEST RUNNER` -> `RUN` and import steps from your test, to allow run the test from one suit. Add new step and choose `import steps from test` and find created test. CircleCI and Gulp start `RUN` test. <br /><br />
<img src="https://googledrive.com/host/0B7tNkEBh3dIna3pCcVVsa2tPVlk/import.png" alt="possible actions"/><br /><br />

<h2>Localhost and CircleCI</h2>
* To test app locally use: `npm start ghost`
* CircleCI will run `TEST RUNNER` -> `RUN` automatically if you push smth. to configurator-frontend <br />

[`ghostinspector.sh`](https://github.com/mycsHQ/configurator-frontend/blob/master/test/ghostinspector.sh) is used to create [ngrok](https://ngrok.com/) tunel and to start the tests<br />
[`parse-ghostinspector.js`](https://github.com/mycsHQ/configurator-frontend/blob/master/test/parse-ghostinspector.js) is used to parse JSON response and to output result in console