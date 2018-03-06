import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import './assets/App.css';
import Layout from './components/Layout'
import NewComponent from './components/NewComponent'

class SortableSimple extends Component {
	render() {
		return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <NewComponent label="Add Container" name="container" />
            <NewComponent label="Add Row" name="row" />
            <NewComponent label="Add Column" name="column" />
          </div>
          <div className="col-md-9">
            <div className="container">
				      <Layout />
		    	  </div>
          </div>
        </div>
      </div>
		)
	}
}

export default DragDropContext(HTML5Backend)(SortableSimple);
