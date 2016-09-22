# Chrome DevTool tips

## Debug CSS animations

By adding the the Animation tab in the DOM inspector, you can get a timeline with any CSS animation happening on the screen. The graph will show you the animation duration and all the affected DOM elements.

![image](https://cloud.githubusercontent.com/assets/352146/18744380/0e2f3e9e-80be-11e6-9e2f-4fad1da1b5f0.png)

---

## `$0` in Console

While inspecting a selected DOM element, you can enter `$0` to get a reference to it.  
If you want to see the element as a JavaScript object, you can type `console.dir($0)`

You can also wrap it in jQuery (if available):
```js
jQuery($0).fadeOut().delay(1000).fadeIn()
```

---

## Search by CSS path

Search in the Elements panel does also support CSS selectors. This can be particularly handy for automation testing.

![image](https://cloud.githubusercontent.com/assets/352146/18744811/c60960f2-80bf-11e6-8944-733712cc950b.png)

---

## `document.designMode = 'on'`

Enter `document.designMode = 'on'` in the Console tab and start editing any content on the website.

![image](https://cdn-images-1.medium.com/max/1200/1*Dh_hQ5HQePhiEOCrow2TBw.gif)

---

## Filtering on the Network tab

The search in the Network does also support filters:
- `domain`
- `method`
- `larger-than`
- `status-code`
- `mime-type`

![image](https://cloud.githubusercontent.com/assets/352146/18744929/5c1937fc-80c0-11e6-91c3-227c34ecc85d.png)

---

## Themes

Go into DevTool settings and choose different themes - just cuz it's cool!

![image](https://cloud.githubusercontent.com/assets/352146/18744959/8da927c8-80c0-11e6-8858-c2a6a1f20787.png)

---

## Snippets

You can store Snippets under Sources. In our case (mycs), particularly handy for working with the Configurators. You can have a snippet to get the current data structure, prices, design details, etc.

![image](https://cloud.githubusercontent.com/assets/352146/18744995/c2259644-80c0-11e6-96ea-45f832cd02af.png)

### Sample Snippet codes

#### Subscribe to structure changes
```js
var serv = angular.element('body').injector().get('StructureService')
serv.subscribe(console.log.bind(null, serv.getStructure))
```

#### Inject an Angular component
```js
var ng = angular.element('body').injector().get('$location')
console.log(ng.absUrl())
```

#### Get current data structure
```js
angular.element('body').injector().get('StructureService').getStructure()
```

#### Get current design details
```js
var tld = location.host.split('.').slice(-1)[0]
var uuid = location.pathname.split('/').slice(-1)[0]

$.get('//api.mycs.' + tld + '/designs/' + uuid)
  .done(function (response) { console.log(response[0]) })
```

#### Get price for current design
```js
var serv = angular.element('body').injector().get('StructureService')
var tld = location.host.split('.').slice(-1)[0]
var uuid = location.pathname.split('/').slice(-1)[0]
var struct = serv.getStructure()
var furnitureType = serv.getCurrentFurnitureType()

$.get('//api.mycs.' + tld + '/designs/prices/calculate?furniture_type=' + furnitureType + '&include_assembly=true&structure=' + JSON.stringify(struct))
  .done(function (response) { console.log(response) })
```
