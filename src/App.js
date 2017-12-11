import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Textinput from './form-components/text-input'
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.fields = [];
    this.state = {
      fields: this.fields
    };
  }

  addField = () => {
    this.fields.push(this.fields.length + 1);
    this.setState({
      fields: this.fields
    });
  }

  removeField = (key) => {
    this.fields.splice(key, 1);
    this.setState({
      fields: this.fields
    });
  }

  render() {
    const props = {
      onRemove: this.removeField,
    }
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
        <div id='form'>
          {this.state.fields.map((field, i) =>
            <Textinput key={i} id={i} placeholder={'this is id ' + i} {...props} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
