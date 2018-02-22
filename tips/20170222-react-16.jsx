//////
/////
//// What's new in React 16
///
//
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const rollDice = () => Math.ceil(Math.random()* 6)


// It's possible to return simple strings without wrapping
const UpperCase = props => props.children.toUpperCase()


// Same for arrays. You need to provide a key for each item, though.
const ListB = props => props.things.map((thing, i) => <strong key={i}>{thing}</strong>)

const List = () => (
  [
    <div key="a">aaaa</div>,
    <div key="b">bbbb</div>,
    <div key="c">cccc</div>,
    <div key="d">dddd</div>
  ]
)

// With fragments you can return array without providing keys (there will be no wrapping element)
const Fragments = () => (
  <React.Fragment>
    <div>this</div>
    <div>has</div>
    <div>no</div>
    <div>wrapper</div>
  </React.Fragment>
)
/* Newer syntax (will be supported by Babel 7) */
// <>
//   <div>this</div>
//   <div>has</div>
//   <div>no</div>
//   <div>wrapper</div>
// </>



class Broken extends Component {
  render() {
    return <div>{ this.props.msg.text }</div>
  }
}


const Portal = props => ReactDOM.createPortal(<h1>{props.children}</h1>, document.getElementById('portal'))



class App extends Component {
  state = {
    msg: {
      text: 'still working...'
    },
    n: rollDice(),
    hasError: false
  }
  
  update = () => this.setState({msg: null})
  
  componentDidCatch() {
    console.log('Handle error inside component')
    this.setState({hasError: true})
  }
  
  render() {
    return (
      <div style={{background: '#def', padding: 10, margin: 50}}>

        <UpperCase>mycs</UpperCase>
        <hr />

        <List />
        <hr />

        <ListB things={['a', 'b', 'c']} />

        <Fragments />
        <hr />
        {/* This button will throw cause an error in <Broken />. This error will be caught in this component. If you comment out the componentDidCatch method however, whole app will unmount. */}
        <button onClick={ this.update }>Break</button>
        {this.state.hasError ? <span style={{color: 'red'}}>this component is broken</span> : <Broken update={this.update} msg={this.state.msg}/> }

        <hr />
        {/* Portals render outside the main root, check out the index.html or devtools */}
        <button onClick={() => this.setState({n: rollDice()})}>Roll</button>
        <Portal>{this.state.n}</Portal>
      </div>
    );
  }
}

export default App;



// In React 16.3 these methods will be deprecated:
// componentWillMount — please use componentDidMount instead
// componentWillUpdate — please use componentDidUpdate instead
// componentWillReceiveProps — a new function, static getDerivedStateFromProps is introduced
