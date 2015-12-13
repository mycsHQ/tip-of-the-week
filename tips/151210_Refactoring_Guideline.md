# Refactoring Guidelines

### Identifying Smart & Dumb components:

Refactoring is done easier bottom up - creating the dumb components first and then wrapping them with the smart components and business logic.

__Dumb Components__:

The dumb components are re-usable basic componants, that could vary between smallers units such as buttons & inputs, to bigger blocks, such as headers and footers in our application for example.

A dumb component will usualy be a directive, and will have a template and style associated with it.
It will hold its state, and will react on a state change using a defined handler.

For example:

A checkbox dumb component has the following interface:
- checked: marks the initial state of the checkbox.
- label: text that appears on the label.
- input-id: set the checkbox input id in order to link it to the label.
- disabled: allows the wrapping component to communicate to the checkbox whether it is disabled.
- on-change: defines the handler that is invoked on state change.

Those inputs will all be used in the template as follows:

```
<input type="checkbox"
       id="{{ ::inputId }}"
       ng-model="checkbox.checked"
       ng-disabled="disabled"
       ng-change="onChange({ isChecked: checkbox.checked })"/>
<label class="checkbox__label checkbox__label--noMargin" for="{{ ::inputId }}">{{ ::checkbox.label }}</label>
``` 

__Smart Components__:

Smart components will usually be controllers or services. They will wrap the dumb components and connect them to the business logic. They define the functionality associated with the dumb components and handle the data state and api-communication.

For managing communication between components, they might expose properties using getters and setters, as explained in this entry by Nicolas:
[Getting rid of the scope soup](https://github.com/mycsHQ/tip-of-the-week/blob/master/tips/151202_angular-avoid-scope-soupe.md)

The getters and setters allow us to 'listen' on property changes without the need to actually bind handlers to events or emit events, and in this way reduce the events interaction dramatically.
As the property changes create the re-rendering for us, it removes the responsibility of triggering and managing the re-rendering from the developers.

For example:

The `ShoppingCartService` smart component [exposes it's `cart` property](https://github.com/mycsHQ/configurator-frontend/blob/MYCS-2755/app/src/shared/services/ShoppingCartService.coffee#L493). The state of the cart is kept and handled on the service side. Any interaction that leads to a cart state change, such as removing an item, [results in a change of the cart property](https://github.com/mycsHQ/configurator-frontend/blob/MYCS-2755/app/src/shared/services/ShoppingCartService.coffee#L274).

This change will be reflected in the `CartListItemsController` because it is using the `ShoppingCartService.cart` property in its own exposed property, `itemsList`:
```
@property 'itemsList',
    get: -> @ShoppingCartService.cart
```
The `CartListItemsController.itemsList` is then used in the cart-list template, for rendering the cart list items.

Therefor, When the cart will be updated on the `ShoppingCartService`, the itemsList will be auto-updated and re-rendered for us.

*This helps a lot in cleaning the code - removing redundent re-rendering methods, removing waiting on promises.*
By keeping state and exposing cart properties we have reduced the number of calls to `ShoppingCartService.getCart` from 6 to 2.

### RsJX & Dom Manipulaiton:

Sometime we still need to react on property change with DOM manipulation, creating some visual effect for example.
We tried using RxJS which seemed too bloated for managing the handlers. For our testcase, creating an event bus (`$rootScope.$new()`) and subscribing to it is enough.


### BEMifying:

We added [expressive BEM](http://codepen.io/andersschmidt/post/expressive-bem-with-sass-a-different-approach) helper mixins in order to make use of sass advantages along with BEM.

*The mixin names were changed: `new` -> `block`, `has` -> `element`, `when` -> `modifier`*

Starting to work with dumb components makes it also easier to transition to BEM, since it forces us to decouple those components and all their uses - their css should handle all their options. Generally: The component scope should be the Block, it's inner html elements will be the Elements, and the different display options are the Modifiers.

For example:
```
<label class="checkbox__label checkbox__label--noMargin" for="{{ ::inputId }}">
  {{ ::checkbox.label }}
</label>
```
The block is the checkbox, the inner element is the label, and it is modified here to have no margin.

The BEM-ed sass looks as follows:
````
+block(checkbox)

  +element(label)
    +inline-block
    cursor: pointer
    font-size: 13px
    line-height: 19px
    
    +modifier(noMargin)
      margin: 0
```


### Isolated scope

__3 ways to bind parameters__

"@" Local Scope Property
Used to pass a string value into the directive
```
angular.module('directivesModule').directive('myIsolatedScopeWithName', function () {
    return {
        scope: {
            name: '@'
        },
        template: 'Name: {{ name }}'
    };
});
```
The directive can be used in the following way:
```
<div my-isolated-scope-with-name name="{{ customer.name }}"></div>
```
---
"=" Local Scope Property
Used to create a two-way binding to an object that is passed into the directive
```
angular.module('directivesModule').directive('myIsolatedScopeWithModel', function () {
    return {
        scope: {
            customer: '=' //Two-way data binding
        },
        template: '<ul><li ng-repeat="prop in customer">{{ prop }}</li></ul>'
    };
});
```
To pass data into the directive the following code can be used:
```
<div my-isolated-scope-with-model customer="customer"></div>
```
Note: with the "=" local scope property we don’t pass expression {{ customer }} as with @.

---
"&" Local Scope Property
Allows an external function to be passed into the directive and invoked
```
angular.module('directivesModule').directive('myIsolatedScopeWithModelAndFunction', function () {
    return {
        scope: {
            datasource: '=',
            action: '&'
        },
        template: '<ul><li ng-repeat="prop in datasource">{{ prop }}</li></ul> ' + '<button ng-click="action({paramName: value})">Change Data</button>'
    };
});
```
Here’s an example of using the directive.
```
<div my-isolated-scope-with-model-and-function 
     datasource="customer" 
     action="changeData(paramName)">
</div>
```
---

__No $scope soup, bindToController__

Use bindToController alongside controllerAs syntax, which treats Controllers as Class-like Objects, instantiating them as constructors and allowing us to namespace them once instantiated. Example:
```
app.directive('someDirective', function () {
  return {
    scope: {},
    bindToController: {
      someObject: '=',
      someString: '@',
      someExpr: '&'
    }
    controller: function () {
      this.name = 'Pascal';
    },
    controllerAs: 'ctrl',
    template: '<div>{{ctrl.name}}</div>'
  };
});
```

### Migrating to Angular 1.5+
Link: http://toddmotto.com/exploring-the-angular-1-5-component-method/

__directive() to .component()__

```
// before
.directive('counter', function counter() {
  return {
    
  };
});

// after
.component('counter', {
    
});
```

__“scope” and “bindToController”, to “bindings”__

```
// before
.directive('counter', function counter() {
  return {
    scope: {},
    bindToController: {
      count: '='
    }
  };
});

// after
.component('counter', {
  bindings: {
    count: '='
  }
});
```

__Controller and controllerAs changes__

Angular automatically uses the name of the Component you’ve created to instantiate the Controller with that alias.
```
.component('counter', {
  bindings: {
    count: '='
  },
  controller: function () {
    function increment() {
      this.count++;
    }
    function decrement() {
      this.count--;
    }
    this.increment = increment;
    this.decrement = decrement;
  },
  template: [
    '<div class="todo">',
      '<input type="text" ng-model="counter.count">',
      '<button type="button" ng-click="counter.decrement();">-</button>',
      '<button type="button" ng-click="counter.increment();">+</button>',
    '</div>'
  ].join('')
});
```
Note: We also can use next syntax to define an alias for controller.
```
...
controller: 'SomeCtrl as smth'
...
```
