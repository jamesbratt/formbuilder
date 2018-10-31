import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import './assets/App.css';
import Layout from './components/Layout'
import { connect } from 'react-redux'
import NewComponent from './components/NewComponent'
import EditComponent from './components/EditComponent'
import { addContainer, addRowKey } from './actions'

const style = {
  height: '100%'
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 || 0, v = c === 'x' ? r : (r & 0x3 || 0x8);
    return v.toString(16);
  });
}

const mapStateToProps = state => {
  return state
}

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {dismissed: false};
    this.onDismiss = this.onDismiss.bind(this) 
  }

  onDismiss() {
    this.setState({dismissed: true})
  }

	render() {
    let info = null;
    if (!this.state.dismissed) {
      info = <div className="alert alert-success" role="alert">
      <h4 className="alert-heading">Formbuilder</h4>
      <p>Drag on form elements from the toolbox on the left. Use rows and columns to build the layout of the form.
        You can re-order elements on the canvas by dragging them vertically and horizontally.
        Columns always have to have a parent row, whilst rows can be nested infinitely within columns.
        Form elements must be nested inside columns.
        You can alter the width of columns by clicking on them and selecting the width on the right of the page.
      </p>
      <button className="btn-danger btn" onClick={this.onDismiss}>Dismiss</button>
      </div>
    }

    return info;
  }
}

class SortableSimple extends Component {

  componentDidMount() {
    const NewContainerId = uuidv4();
    this.props.dispatch(addContainer('container', NewContainerId))
    this.props.dispatch(addRowKey(NewContainerId))
  }

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
      <div style={style} className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <Info />
          </div>
        </div>
        <div style={style} className="row">
          <div className="col-md-2">
            <div className="card">
              <div className="card-header">
                Toolbox
              </div>
              <ul className="list-group list-group-flush">
                {/* <NewComponent label="Add Container" name="container" /> */}
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
