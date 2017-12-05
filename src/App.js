import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Textinput from './form-components/text-input'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  addField() {
    const props = {
      placeholder: 'Type here...'
    }
    ReactDOM.render(
      <Textinput {...props} />,
      document.getElementById('form')
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To add more fields, click "Add New Field".
        </p>
        <button onClick={this.addField} className='btn-add'>Add New Field</button>
        <div id='form'></div>
      </div>
    );
  }
}

export default App;
