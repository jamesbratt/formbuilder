import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from '../../ItemTypes'
import { moveRow } from '../../actions'
import { connect } from 'react-redux'
import flow from 'lodash/flow';
import Column from './Column';
 
const style = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  marginTop: '.5rem',
	backgroundColor: 'white',
  cursor: 'move',
  marginLeft: '.5rem',
  marginRight: '.5rem',
}

const rowSource = {
	beginDrag(props) {
		return {
      label: props.label,
      index: props.index,
      parentId: props.parentId
		}
	},
}

const rowTarget = {
  drop(props, monitor) {
    const droppedOn = props.id;
		return { 
      parentId: droppedOn,
      elementType: 'row',
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
     if (monitor.getItem().parentId !== props.parentId) {
      return
    }

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
      props.dispatch(moveRow(dragIndex, hoverIndex, props.parentId))

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex
    }
	},
}

class Row extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    id: PropTypes.any.isRequired,
    children: PropTypes.array,
		isDragging: PropTypes.bool.isRequired,
  }

  render() {
		const {
      label,
      id,
      children,
      isDragging,
			connectDragSource,
			connectDropTarget,
    } = this.props
    const opacity = isDragging ? 0 : 1

    let columns = []
    let rowLabel = label

    if(children !== undefined) {
      if(children.length > 0) {
        rowLabel = ''
        children.forEach((child, i) => {
          columns.push(<Column 
            label={child.label}
            index={i}
            key={child.id}
            id={child.id}
            parentId={id}
            />)
        });
      }
    }

		return connectDragSource(
      connectDropTarget(<div style={{ ...style, opacity }} className="row">
        {rowLabel}
        {columns}
      </div>),
		)
  }
}

Row = flow(
	DropTarget([ItemTypes.ROW, ItemTypes.NEWCOMPONENT], rowTarget, connect => ({
		connectDropTarget: connect.dropTarget()
	})),
	DragSource(ItemTypes.ROW, rowSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}))
)(Row);
 
export default connect()(Row);
console.log('registered');