import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import './assets/App.css';
import Layout from './components/Layout'
import NewComponent from './components/NewComponent'

class SortableSimple extends Component {
	render() {
		return (
      <div className="containerfluid">
        <div className="row">
          <div className="col-md-3">
            <NewComponent label="Add Container" name="Container" />
            <NewComponent label="Add Row" name="Row" />
            <NewComponent label="Add Column" name="Column" />
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
