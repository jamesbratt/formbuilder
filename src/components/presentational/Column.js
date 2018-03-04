import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from '../../ItemTypes'
import { connect } from 'react-redux'
import flow from 'lodash/flow';
import Row from './Row';
 
const style = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
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
    return
	},
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
      connectDropTarget(<div style={{ ...style, opacity }} className="col-md-12">
        {columnLabel}
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