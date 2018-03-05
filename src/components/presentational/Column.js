import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from '../../ItemTypes'
import { moveColumn } from '../../actions'
import { connect } from 'react-redux'
import flow from 'lodash/flow';
import Row from './Row';
 
const style = {
	border: '1px dashed red',
  padding: '0.5rem 1rem',
  paddingBottom: '50px',
	backgroundColor: 'white',
  cursor: 'move',
}

const mapStateToProps = state => {
  return state
}

const columnSource = {
	beginDrag(props) {
		return {
      label: props.label,
      index: props.index,
      parentId: props.parentId
		}
	},
}

const columnTarget = {
  drop(props, monitor) {
		const hasDroppedOnChild = monitor.didDrop()
		if (hasDroppedOnChild) {
			return
		}
    const droppedOn = props.id;
		return { 
      parentId: droppedOn,
      elementType: 'column',
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
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      
      // Get horizontal middle
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Get pixels to the left
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;

      const upwards = dragIndex > hoverIndex && hoverClientY > hoverMiddleY;
      const downwards = dragIndex < hoverIndex && hoverClientY < hoverMiddleY;
      const leftwards = dragIndex > hoverIndex && hoverClientX > hoverMiddleX;
      const rightwards = dragIndex < hoverIndex && hoverClientX < hoverMiddleX;

      if (upwards && (leftwards || rightwards)){
        return;
      }

      if (downwards && (leftwards || rightwards)){
        return;
      }

      props.dispatch(moveColumn(dragIndex, hoverIndex, props.parentId))
      monitor.getItem().index = hoverIndex
    }
  }
}

class Column extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    id: PropTypes.any.isRequired,
		isDragging: PropTypes.bool.isRequired,
  }

  render() {
		const {
      label,
      isDragging,
      id,
			connectDragSource,
			connectDropTarget,
    } = this.props
    const opacity = isDragging ? 0 : 1

    let childRows = []
    let columnLabel = label

    if(this.props.elements[id] !== undefined) {
      if(this.props.elements[id].length > 0) {
        columnLabel = ''
        this.props.elements[id].forEach((child, i) => {
          childRows.push(<Row 
            label={child.label}
            index={i}
            key={child.id}
            id={child.id}
            parentId={id}
            children={[]}
            />)
        });
      }
    }

		return connectDragSource(
      connectDropTarget(<div style={{ ...style, opacity }} className="col-md-6">
        {childRows}
      </div>),
		)
  }
}

Column = flow(
	DropTarget([ItemTypes.COLUMN, ItemTypes.NEWCOMPONENT], columnTarget, connect => ({
		connectDropTarget: connect.dropTarget()
	})),
	DragSource(ItemTypes.COLUMN, columnSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}))
)(Column);
 
export default connect(
  mapStateToProps
)(Column);