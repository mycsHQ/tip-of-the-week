# React Patterns and Anti-Patterns

* Create components patterns
  * [Create Class](https://github.com/mycsHQ/tip-of-the-week/blob/master/tips/react-hoc-components.md#create-class-deprecated)
  * [Extend Component](https://github.com/mycsHQ/tip-of-the-week/blob/master/tips/react-hoc-components.md#extend-component)
  * [Functional Component](https://github.com/mycsHQ/tip-of-the-week/blob/master/tips/react-hoc-components.md#functional-component-no-life-cycle-hooks)
  * There are even more...
* [High Order Components (HoC)](https://github.com/mycsHQ/tip-of-the-week/blob/master/tips/react-hoc-components.md#high-order-components)
  * [Typical case(can be or not a HoC)](https://github.com/mycsHQ/tip-of-the-week/blob/master/tips/react-hoc-components.md#typical-parent-child-relation)
  * [Enchace child with extra functionallity using React.cloneElement](https://github.com/mycsHQ/tip-of-the-week/blob/master/tips/react-hoc-components.md#enchace-child-with-extra-functionallity-using-reactcloneelement)
  * [Function as child](https://github.com/mycsHQ/tip-of-the-week/blob/master/tips/react-hoc-components.md#function-as-child)
  * [Looping/Manipulating children](https://github.com/mycsHQ/tip-of-the-week/blob/master/tips/react-hoc-components.md#loopingmanipulating-children)
  * [Function as enchacer](https://github.com/mycsHQ/tip-of-the-week/blob/master/tips/react-hoc-components.md#function-as-enchacers)
  * [Decorator as enchacer](https://github.com/mycsHQ/tip-of-the-week/blob/master/tips/react-hoc-components.md#decorators-as-enchacers)
  * There are even more...
* [React Anti-Patterns](https://github.com/mycsHQ/tip-of-the-week/blob/master/tips/react-hoc-components.md#react-anti-patterns)

## Create components

### Create class (deprecated)

```js
import React from 'react';

var Greeting = React.createClass({
  render: function() {
    return <h1>Hello, {this.props.name}</h1>;
  }
});
```

### Extend Component

##### Example 1
```js
import React, { Component } from 'react';

class Button extends Component {
  render(){
    return (<button></button>);
  }
}
```

##### Example 2
```js
import React, { Component } from 'react';

class Button extends Component {
  render(){
    return (<button></button>);
  }
}


class ExtraButton extends Button {
  // override base render
  render(){
    return (<button className="cta-button"></button>);
  }
}
```

### Functional Component (no life-cycle hooks)

```js
// Button.js
export default props => {
  return (
   <buttonn onClick={ e => this.props.onClick(e) }></buttonn>}>{ props.text }</button>
  );
}
```

## High Order Components

Normally presentational components should not hold business logic.
Business logic functionallity should come from Parent or High Order Components.

### Typical Parent-Child relation

Parent here has some presentational functionallity.

```js
import React, { Component } from 'react';

class Button extends Component {
  render(){
    return (<button onClick={ e => this.props.onClick(e)}>{ this.props.text }</button>);
  }
}

class Configurator extends Component {

  saveDesign(){
    ...
  }

  sendEmail(){
    ...
  }

  render(){
    return (
      <div className="configurator">
        <Button text="Save Design" onClick={ () => this.saveDesign() }></Button>
        <Button text="Send Email" onClick={ () => this.sendEmail() }></Button>
      </div>
    );
  }
}
```

### Enchace child with extra functionallity using React.cloneElement

Parent here has some presentational functionallity.

```js
import React, { Component } from 'react';

class Canvas extends Component {
  render(){
    return (<canvas onClick={ this.getMousePositionInsideContainer }></canvas>);
  }
}

class ClickEvents extends Component {

  getMousePositionInsideContainer(){
    ...
  }

  render(){
    return React.cloneElement(this.props.children, {
       getMousePositionInsideContainer: this.getMousePositionInsideContainer
    })
  }
  }
}

// We use it like

class Configurator extends Component {
  render(){
    return (
      <ClickEvents>
        <Canvas />
      </ClickEvents>
    )
  }
}

```

### Function as child

```js
class Fetch extends Component {
  render() {
    // See how we're calling the child as a function?
    //                        ↓
    return this.props.children()
  }
}


class Configurator extends Component {
  render(){
    return (
    <Fetch url="api.myself.com">
      {(result) => <p>{result}</p>}
    </Fetch>
    )
  }
}
```

### Looping/Manipulating children
React.Children.map/forEach are similar to Array.map/forEach, but they can
loop over functions/objects/DOMNodes (they dont throw).

```js
class List extends Component {
  render(){
    return (
      <div className="product-list">
        {React.Children.map(children, (child, i) => {
          // Ignore the first child
          if (i < 1) return
          return child;
        })}
      </div>
    )
  }
}
```

### Function as enchacers

Ofcourse we can create simple functions that can enchace components

```js
const pure = component => {
  component.prototype.shouldComponentUpdate = (nextProps){
    return !_.isEqual(nextProps, this.props);
  }
}

class Button extends Component{ ... }

export default pure(component);
```


### Decorators as enchacers

```js
 const isReactComponent = function( target, func )
 {
   if ( !target || !( target.prototype instanceof Component ) )
   {
     throw new StoreError( {
       message : 'connect() should wrap a React Component',
       context : Component.prototype,
     } );
   }
   func.call( this, target );
 };


export const connect = ( ...args ) => ( target ) => isReactComponent( target, ( target ) =>
 {
   const obj = Object.create( target.prototype );
   const willMount = obj.componentWillMount || noop;
   const willUnmount = obj.componentWillUnmount || noop;
   const onComplete = obj.onComplete || noop;
   const onError = obj.onError || ( stg => { throw new StoreError( stg ); } );

   /**
   * It is called when the Subjects stops pushing values
   */
   target.prototype.onComplete = function()
   {
     onComplete.call( this );
   };

   /**
   * It is called when an error happens on the store
   * @param  {Error object} err
   */
   target.prototype.onError = function( err )
   {
     /* isStopped is passed by rx and means that the stream has
     stopped due to an error, in that case err.message is not so
     meaningfull and its better to pass the stack as message,
     that can could change in the future */
     const message = this.isStopped ? err.stack : err.message;

     const settings = {
       ...err,
       message : message || 'An error in your store.',
       context : this,
     };

     onError.call( this, settings );
   };

   /**
   * Set the listener on componentWillMount
   * Listener will setState
   */
   target.prototype.componentWillMount = function()
   {
     this.__subscription = stateSubject
                            .map( state => args.length ? pick( state, args ) : state )
                            .subscribe( state => this.setState( state ),
                                        this.onError,
                                        this.onComplete );

     willMount.call( this );
   };

   /**
   * Remove subscriber on componentWillUnmount
   */
   target.prototype.componentWillUnmount = function()
   {
     this.unsubscribe();
     willUnmount.call( this );
   };

   /**
   * Provide an unsubscribe function to the underline component
   */
   target.prototype.unsubscribe = function()
   {
     try
     {
       this.__subscription.dispose();
     }
     catch ( err )
     {
       this.onError( err );
     }
   };

   return target;
 } );


// And we use it like
@connect( 'hello' )
class MyHelloWorldComponent extends Component
{
  render(){
    return <div>{ this.state.hello }</div>;
  }
}

 ```


 ### Decorators for multi-inheritance

```js
// And we use it like
@multiInherit( ClickOutside, OnViewPort )
class MyHelloWorldComponent extends Component
{
  ...
}

 ```

 Ofcourse same can be achieved doing

 ```html
 <ClickOutside>
  <OnViewPort>
    <MyHelloWorldComponent/>
  </OnViewPort>
 </ClickOutside>
```


# React Anti-Patterns

- Checking if a component is mounted using `isMounted` (will be soon deprecated)
- Calling `setState` in `componentDidMount`, triggers unessecery re-rendering. You can do it in `componentWillMount`
- Mutating DOM directly, outside of React's lifecycle using `jQuery` or even plain javascript query selectors.
- [Prefer composition instead of inheritance, to avoid deep hierarchy trees](https://en.wikipedia.org/wiki/Composition_over_inheritance)
- Attaching to the `this.state` props that are not related to the rendering. Attach them to `this` directly if needed.
- Using `bind` or `() => ` functions inside the JSX. You can not always avoid it (e.g. when you use `map`) but usually you can. It should be avoided because it creates new function on every rendering having performance impact. Prefer the `@bindComponent` or `@autobind` decorators. Also do not do
```js
class MyComponent extends Component {

  doSomething = () => {
    ....
  }

  render(){
    return(<button onClick={ this.doSomething }></button>)
  }
}
```

Although this works and it is not creating new function, it is not equivalent of using `bind`.

```js
class T {
  something = () => {}
  somethingElse(){}
}
console.log(T.prototype.something) // undefined
console.log(T.prototype.somethingElse) // function{...}
```

 It is treated as property and is created again and again per instance instead of being attached to the prototype. Its like doing:

 ```js
class T {
  constructor() {
      this.something = () => ...
  }
}
```

It means that you can not use the prototype to test it (if needed).

