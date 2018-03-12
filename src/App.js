import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import './assets/App.css';
import Layout from './components/Layout'
import { connect } from 'react-redux'
import NewComponent from './components/NewComponent'
import EditComponent from './components/EditComponent'

const mapStateToProps = state => {
  return state
}

class SortableSimple extends Component {

	render() {

    let currentColumns = {column: [], index: null}

    if(this.props.properties.activeElement) {
      const columnId = this.props.properties.activeElement.id
      const columnSet = this.props.columns[this.props.properties.activeElement.key]

      columnSet.forEach((column, index) => {
        if(column.id === columnId) {
          currentColumns.column.push(column)
          currentColumns.index = index
        }
      });
    }
		return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <div className="card">
              <div className="card-header">
                Toolbox
              </div>
              <ul className="list-group list-group-flush">
                <NewComponent label="Add Container" name="container" />
                <NewComponent label="Add Row" name="row" />
                <NewComponent label="Add Column" name="column" />
                <NewComponent label="Add Text Input" name="ui-element" uiType="text" />
              </ul>
            </div>          
          </div>
          <div className="col-md-8">
            <Layout />
          </div>
          <div className="col-md-2">
            <EditComponent component={currentColumns.column} componentIndex={currentColumns.index} />
          </div>
        </div>
      </div>
		)
	}
}

export default connect(
  mapStateToProps
)(DragDropContext(HTML5Backend)(SortableSimple));
