import React, { Component } from 'react'
import update from 'immutability-helper'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Container from './Container'
import NewComponent from './NewComponent'

const style = {
  'min-height': '100px'
}

class Layout extends Component {
	constructor(props) {
		super(props)
    this.moveContainer = this.moveContainer.bind(this);
    this.addComponent = this.addComponent.bind(this);
    this.addChild = this.addChild.bind(this);
		this.state = {
      containers: [],
      domStructure: {}
		}
	}

	moveContainer(dragIndex, hoverIndex) {
		const { containers } = this.state
		const dragCard = containers[dragIndex]

		this.setState(
			update(this.state, {
				containers: {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
				},
			}),
		)
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  addChild(newChild, parent) {
    const child = {
      id: this.uuidv4(),
      name: 'Empty ' + newChild,
      parent: parent[0]
    };

    const { containers } = this.state
		this.setState(
			update(this.state, {
				domStructure: {
          $merge: {[child.id]: child}
        },
			}),
		)
  }
  
  addComponent(label) {
    const { containers } = this.state
    const newComponent = {
      id: this.uuidv4(),
      name: 'Empty ' + label,
      parent: null
    };

		this.setState(
			update(this.state, {
				domStructure: {
          $merge: {[newComponent.id]: newComponent}
        },
				containers: {
          $push: [newComponent]
				},
			}),
		)
	}

	render() {
		const { containers } = this.state

		return (
      <div className="container">
        <div style={style}>
          {containers.map((container, i) => (
            <Container
              key={container.id}
              index={i}
              id={container.id}
              name={container.name}
              moveContainer={this.moveContainer}
            />
          ))}
        </div>
        <NewComponent label="Add Container" name="Container" addComponent={this.addComponent} addChild={this.addChild} />
        <NewComponent label="Add Row" name="Row" addComponent={this.addComponent} addChild={this.addChild} />
        <NewComponent label="Add Column" name="Column" addComponent={this.addComponent} addChild={this.addChild} />
      </div>
		)
	}
}

export default DragDropContext(HTML5Backend)(Layout);