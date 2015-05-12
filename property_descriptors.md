# Property Descriptors in Javascript, why to not pass null to apply/bind, and "pseudomentatory" parameters in coffeescript functions (Avraam)

## Property Descriptors in Javascript

Prior to ES5 there was no way to have restrictions on an Objects properties. With ES5 there is a new method called `Object.defineProperty` which can be used to define properties on an object and set **restrictions** to that. The restictions are `writable`, `enumerable`, `configurable`.

```js
var mycs = {};
Object.defineProperty(mycs, 'age', {
   value: 1,
   writable: true,
   enumerable: true,
   configurable: true
})
//mycs = Object {age: 1}
```

By default the values are set true. 

### Writable

If we set `writable: false` the property became pseudoconstant
```js
var mycs = {};
Object.defineProperty(mycs, 'age', {
   value: 1,
   writable: false,
   enumerable: true,
   configurable: true
})

console.log(mycs.age); // 1
mycs.age = 10;
console.log(mycs.age); // 1 (Havent change value)
"use strict";
mycs.age = 10; //Type Error in strict mode
```

### Configurable
If a property is  configurable, we can modify its descriptor definition:
```js
var mycs = {};
mycs.age = 1;

Object.defineProperty( mycs, "age", {
    value: 1,
    writable: true,
    configurable: false // not configurable
});


Object.defineProperty( mycs, "age", {
    value: 2,
    writable: true, 
    configurable: true, 
    enumerable: true
} ); // TypeError

```
There is one exception, if the property is already `configurable:false`, `writable` can change from `true` to `false` without error, but not back to `true` if already `false`.

To create a "real" consant propety we should set both `writable` and `configurable` to `false`.

Also if we set `configurable:false` we cannot delete that property.

### Enumerable
The `enumerable` is defining if a property will appear in case of a `for in` loop.

```js
mycs = {
 team: 15
}
Object.defineProperty(mycs, 'age',{
  value: 1,
  enumerable:true
});
Object.defineProperty(mycs, 'age',{
  address: "Berlin",
  enumerable:false
});

for(p in mycs){
  console.log(p, mycs[p]);
}
// team 15
// age 1
```

`Object.defineProperty` is also useful in case you want to create computing property names in an object. e.g.
```js
var prefix = 'year';
var suffix = 'ofBirth';

var mycs = {
  prefix + suffix: "2014";
} //Syntax Error

var mycs = Object.defineProperty({}, prefix + suffix, {value: "2014"});
console.log(mycs); // Object {yearofBirth: "2014"}
```

ES6 support computing property names e.g. 
```js
var mycs = {
  [prefix + suffix]: "2014";
}
```

###Other usefull methods:
* `Object.preventExtensions`  prevents adding new properties to an object.
* `Object.seal` calls Object.preventExtensions and also set `configurable: false`
* `Object.freeze` calls Object.seal and also set `writable: false`


## Why to not pass null to apply/bind
```js
function foo(a){
  this.age = 10 + a;
  return this.age;
}

c = foo.apply(null, [10]);

console.log(window.age); // 20 !!!OOPS
```
We created accidentaly a new property to the `window` because null is not an empty object, every time you pass null in reallity you pass the context. Its safer to pass an empty object:

```js
function foo(a){
  this.ages = 10 + a;
  return this.ages;
}

c = foo.apply({}, [10]);

console.log(window.ages); // undefined
```

## "Pseudomentatory" parameters in coffeescript functions

We can force a function in coffeescript to throw an error if one of the parameters is not defined by defining a small helper functions:

```coffee
 _err = (message) -> throw new Error(message);
 
 getSum = (a = _err('a is not defined'), b = _err('b is not defined')) -> a + b
   
 getSum(10) // throw Error, b is not defined
 ```
