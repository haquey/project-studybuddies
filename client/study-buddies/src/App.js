import React, { Component } from 'react';
import './App.css';
import Navbar from './navigation/Navbar'
import Notebook from './notebook/Notebook'

// can only use state when you extend component
class App extends Component {
  state = {
    userInput: ''
  }

  render() {
    return (
      <div  className="App-theme">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <Navbar/>
        <Notebook/>
      </div>
    );
  }
}

export default App;
