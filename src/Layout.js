import React, { Component } from 'react'
import update from 'immutability-helper'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Container from './Container'
import NewComponent from './NewComponent'

const style = {
  width: 400,
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

  addChild(newChild, parent) {
    return
  }
  
  addComponent(label) {
    const { containers } = this.state

    const newCard = {
      id: ++containers.length,
      name: 'Empty ' + label,
    };

		this.setState(
			update(this.state, {
				containers: {
					$push: [newCard],
				},
			}),
		)
	}

	render() {
		const { containers } = this.state

		return (
      <div>
        <div style={style}>
          {containers.map((container, i) => (
            <Container
              key={container.id}
              index={i}
              id={container.id}
              name={container.name}
              moveContainer={this.moveContainer}
              addChild={this.addChild}
            />
          ))}
        </div>
        <NewComponent label="Add Container" name="Container" addComponent={this.addComponent} />
        <NewComponent label="Add Row" name="Row" addComponent={this.addComponent} />
        <NewComponent label="Add Column" name="Column" addComponent={this.addComponent} />
      </div>
		)
	}
}

export default DragDropContext(HTML5Backend)(Layout);