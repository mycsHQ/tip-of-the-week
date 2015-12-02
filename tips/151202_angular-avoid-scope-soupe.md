# Avoid scope soup

In order to make the transition to angular 2 easier and make testing easier, we'd like to get rid of the usage of the scope in the controllers.

As an alternative, we should use `controllerAs` which will make the controller available in the template scope.
The property that used to be in the scope can now be a property of the function and is also accessible in the template.

E.g.: `$scope.bestSellers` becomes `this.bestSellers` in Javascript and `@bestSellers` in Coffeescript

Example (with a few tests): https://github.com/mycsHQ/configurator-frontend/commit/731bba21dc6ef3c7b15ef33109c69085cf0a3524

:warning: controllerAs works only if the controller returns `null or `undefined`. Since coffeescript automagically returns the last line, you need to add an empty `return` at the end of you controller (see commit [#731bba21dc6e](https://github.com/mycsHQ/configurator-frontend/commit/731bba21dc6ef3c7b15ef33109c69085cf0a3524))

### $watch 
One of the disadvantage is that you lose the useful methods associated with the scope like `$watch` or `$broadcast`/`$emit`.

To emulate this data-binding feature, we can use a native feature of ES5:
By defining `getters` and `setters` for a property, we can have custom code when this property changes (in the UI or in another controller/service).

Example:
```
Object.defineProperty(GoodController.prototype,
  "bestSellers", {
  enumerable: true,
  configurable: false,
  get: function () {
    return this._bestSellers;
  },
  set: function (val) {
    this._bestSellers = val;
  }
});
```
In this case, if the UI displays the property bestSellers, the get function will be called. You could retrieve the data from another service. If the UI changes the property, the set function will be called

Full example available here:
http://jsfiddle.net/jeremylikness/zba74rk3/

This syntax is more verbose than using `$broadcast` from angular, but we can reduce this boilerplate using Coffeescript:
```
Function::property = (prop, desc) ->
  Object.defineProperty @prototype, prop, desc

class Name
  constructor: (@first, @last) ->
  @property 'name',
    get: -> "#{@first} #{@last}"
    set: (name) -> [@first, @last] = name.split ' '
```

__Sources__:
- https://www.outlearn.com/learn/vkarpov15/ng-best-practices/1
- http://codetunnel.io/angularjs-controller-as-or-scope/
- http://bl.ocks.org/joyrexus/65cb3780a24ecd50f6df
