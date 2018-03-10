import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import './assets/App.css';
import Layout from './components/Layout'
import { connect } from 'react-redux'
import NewComponent from './components/NewComponent'

const mapStateToProps = state => {
  return state
}

class SortableSimple extends Component {
	render() {

    let column = null

    if(this.props.properties.activeElement) {
      const columnId = this.props.properties.activeElement.id
      const columnSet = this.props.columns[this.props.properties.activeElement.key]
      const col = columnSet.filter(function(column) {
        return column.id == columnId;
      });
      column = col
    }
		return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <NewComponent label="Add Container" name="container" />
            <NewComponent label="Add Row" name="row" />
            <NewComponent label="Add Column" name="column" />
          </div>
          <div className="col-md-8">
            <div className="container">
				      <Layout />
		    	  </div>
          </div>
          <div className="col-md-2">
          </div>
        </div>
      </div>
		)
	}
}

export default connect(
  mapStateToProps
)(DragDropContext(HTML5Backend)(SortableSimple));
