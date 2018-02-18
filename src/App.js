import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import './assets/App.css';
import Layout from './components/Layout'
import NewComponent from './components/NewComponent'

class SortableSimple extends Component {
	render() {
		return (
			<div className="container">
				<Layout />
        <NewComponent label="Add Container" name="Container" />
        <NewComponent label="Add Row" name="Row" />
        <NewComponent label="Add Column" name="Column" />
			</div>
		)
	}
}

export default DragDropContext(HTML5Backend)(SortableSimple);
