import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ColorSegregator, HierarchyGenerator } from './image-processor'
import tImage from './test.png'

class App extends Component {

  componentDidMount() {
    let cSegregator = new ColorSegregator();
    cSegregator.segregate(tImage).then(components => {
      console.log(components);
      let hGenertator = new HierarchyGenerator();
      let tree = [];
      
      components.forEach((element) => {
        let didPush = false;
        tree.forEach((node)=> {
          if(hGenertator.pushToTree(node,element)) {
            didPush = true;
          }
        });
        
        if (!didPush) {
          tree.push(hGenertator.nodeFromFormFactor(element));
        }
      });
    
      console.log('Tree Parsing Done');
      console.log('Tree',tree);

    }).catch(err => {
      console.log('Error', err);
    })
  }

  render() {

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
