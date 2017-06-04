import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ColorSegregator } from './image-processor/color-segregator'
import tImage from './test.png'

class App extends Component {

  componentDidMount() {
    let cSegregator = new ColorSegregator();
    cSegregator.segregate(tImage).then(components => {
      /*
      let treeGenerator = (parent, start, end, collection) => {
        let tree = [];
        let i = start;
        while (i < end) {
          let element = collection[i];
          let siblings = [];
          if (!parent) {
            let data = treeGenerator(element, i + 1, end, collection);
            siblings = data.siblings;
            i = data.index;
            i++;
          }
          else {
            if (parent.contains(element)) {
              let data = treeGenerator(element, i + 1, end, collection);
              siblings = data.siblings;
              if (siblings.length > 0) {
                i = data.index;
              }
              i++;
            }
          }

          let node = {
            type: (element.percent() > 0.5 ? 1 : 0),
            siblings: (siblings.length > 0 ? siblings : undefined),
            formfactor: element
          }

          tree.push(node);
        }
        return {
          siblings: tree,
          index: i
        }
      }

      console.log('TREEs')
      let treeGen = treeGenerator(undefined, 0, components.length, components);
      console.log('TREE', treeGen);
      */

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
