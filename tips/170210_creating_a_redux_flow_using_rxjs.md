# Re-creating Redux with Rx.js

Extracting the state from certain parts of an app and having a single source of truth can be useful in order to reduce bugs and structure a code base. The Flux architecture, especially with Redux, has been a popular way to do so. But is it really necessary to install Redux when your app already uses Rx.js?

## You can re-create the core functionality of Redux with one line of Rx.js
```
const store$ = action$.startWith(initState).scan(reducer);
```
* `action$` is an observable
* `.startWith()` prepends the observable state with initial values
* `initState` is our initial state
* `.scan()` does the magic: it acts as an accumulator that will return the resolved state after it's been reduced
* `reducer` is a plain [Redux reducer](http://redux.js.org/docs/basics/Reducers.html)

One drawback for this solution is that it's not supported by the Redux devtools.

## Links:
* A tweet in which Dan Abramov (author of Redux) mentions that Redux isn't needed with Rx.js: https://twitter.com/dan_abramov/status/662260314155712512?ref_src=twsrc%5Etfw  
* Dan Abramov mentioning this at Reactive 2015:  https://www.youtube.com/watch?v=9cIEtC-V2XE&feature=youtu.be&t=8h48m30s  
* Rudi Yardley explaining us his approach: http://rudiyardley.com/redux-single-line-of-code-rxjs/
