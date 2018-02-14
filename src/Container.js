import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'
import flow from 'lodash/flow';

const style = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	marginBottom: '2.5rem',
	cursor: 'move',
}

const cardSource = {
	beginDrag(props) {
		return {
			id: props.id,
			index: props.index,
		}
	},
}

const cardTarget = {
  drop(props, monitor) {
    const droppedOn = props.index;
		return { parentId: droppedOn }
	},

	hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index

    // If an item has no index it must be new
    if(dragIndex === undefined || dragIndex === null) {
      return
  
    } else {  
      const hoverIndex = props.index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      props.moveContainer(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex
    }
	},
}

class Container extends Component {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		index: PropTypes.number.isRequired,
		isDragging: PropTypes.bool.isRequired,
		id: PropTypes.any.isRequired,
		name: PropTypes.string.isRequired,
    moveContainer: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
	}

	render() {
		const {
			name,
			isDragging,
			connectDragSource,
      connectDropTarget,
      isOver,
		} = this.props
    const opacity = isDragging ? 0 : 1;
    const isActive = isOver;

    let backgroundColor = '#FFF'
		if (isActive) {
			backgroundColor = '#eeeeee'
		}

		return connectDragSource(
			connectDropTarget(<div className='ui-container' style={{ ...style, opacity, backgroundColor }}>{name}</div>),
		)
	}
}

export default flow(
	DropTarget([ItemTypes.CONTAINER, ItemTypes.NEWCOMPONENT], cardTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
	})),
	DragSource(ItemTypes.CONTAINER, cardSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}))
)(Container);
