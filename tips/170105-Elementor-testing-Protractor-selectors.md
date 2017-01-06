#Elementor: testing Protractor selectors from your browser and IDE.

### What is Elementor? 
Elementor is a Node.js application. It lets you test Protractor selectors from your browser and IDE. You can enter a protractor locator or expression and elementor will test it against a live protractor instance.

### How to launch?
All inctructions you will find here: https://github.com/andresdominguez/elementor

### Elementor provides 2 tools: Popup and DevTool
- Popup 

The popup is located next to the omnibox. Open it, enter a locator or an expression, and hit ENTER. The input will be evaluated by elementor and the results will be displayed on the popup menu.

When you enter a locator starting with by.<strategy> (e.g. by.css, by.model, by.binding, etc.) then it will be executed as a count expression element.all(<your locator>).count(). For example:

<img width="717" alt="screen shot 2017-01-06 at 10 44 20" src="https://cloud.githubusercontent.com/assets/11226631/21714014/2c36e3be-d3fd-11e6-9cd0-5cfea02f24db.png">


- DevTool

The developer tools extension tries to find protractor locators for the currently selected item and shows how many matches you have for these selectors (if it's unique or not). Go to Developer tools > Elements and then on the side pane (Styles, Computed, etc.) choose protractor.

<img width="300" alt="dev-tools" src="https://cloud.githubusercontent.com/assets/11226631/21714080/822f085a-d3fd-11e6-926e-2ea09098e84c.png">

The DevTools extension is limited because you cannot use it in the same browser tab launched by the elementor. To use the extension you need to duplicate the first tab of the browser (right click on tab > duplicate). Once the dev tools in the second tab is open then it will provide locator suggestions every time you change the selected element in the elements tab.


<img width="460" alt="screen shot 2017-01-06 at 10 48 15" src="https://cloud.githubusercontent.com/assets/11226631/21714123/aa2c6488-d3fd-11e6-9160-c4536e6d8afc.png">

### Elementor & Sublime

Elementor provides a very useful plugin for Sublime, which allows to run Protractor tests directly from the IDE.

<img width="400" alt="screenshot" src="https://cloud.githubusercontent.com/assets/11226631/21714246/44ff1546-d3fe-11e6-90dc-d3a75e74f3d7.png">

