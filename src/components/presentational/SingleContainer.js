import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { moveContainer } from '../../actions'
import ItemTypes from '../../ItemTypes'
import flow from 'lodash/flow';
import Row from './Row';

const style = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	marginBottom: '.5rem',
	backgroundColor: 'white',
	cursor: 'move',
}

const singleContainerSource = {
	beginDrag(props) {
		return {
			id: props.id,
			index: props.index,
		}
	},
}

const singleContainerTarget = {
  drop(props, monitor) {
    const droppedOn = props.id;
		return { 
      parentId: droppedOn,
      index: props.index 
    }
	},
	hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index

    // If an item has no index it must be new
    if(dragIndex === undefined) {
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
      props.dispatch(moveContainer(dragIndex, hoverIndex))

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex
    }
	},
}

class SingleContainer extends Component {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		index: PropTypes.number.isRequired,
		isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    children: PropTypes.array.isRequired,
		label: PropTypes.string.isRequired,
	}

	render() {
		const {
      label,
      children,
			isDragging,
			connectDragSource,
			connectDropTarget,
		} = this.props
    const opacity = isDragging ? 0 : 1
    
    let rows = []

    if(children) {
      children.forEach(child => {
        rows.push(<Row label={child.label} />)
      });
    }

		return connectDragSource(
			connectDropTarget(<div style={{ ...style, opacity }}>{label}
        {rows}
      </div>),
		)
	}
}

SingleContainer = flow(
	DropTarget([ItemTypes.CONTAINER, ItemTypes.NEWCOMPONENT], singleContainerTarget, connect => ({
		connectDropTarget: connect.dropTarget()
	})),
	DragSource(ItemTypes.CONTAINER, singleContainerSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}))
)(SingleContainer);

export default connect()(SingleContainer);