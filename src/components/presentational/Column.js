import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from '../../ItemTypes'
import { connect } from 'react-redux'
import flow from 'lodash/flow';
 
const style = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	backgroundColor: 'white',
  cursor: 'move',
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
		isDragging: PropTypes.bool.isRequired,
  }

  render() {
		const {
      label,
      isDragging,
			connectDragSource,
			connectDropTarget,
    } = this.props
    const opacity = isDragging ? 0 : 1
		return connectDragSource(
      connectDropTarget(<div style={{ ...style, opacity }} className="col-md-6">
        {label}
      </div>),
		)
  }
}

Column = flow(
	DropTarget(ItemTypes.COLUMN, columnTarget, connect => ({
		connectDropTarget: connect.dropTarget()
	})),
	DragSource(ItemTypes.COLUMN, columnSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}))
)(Column);
 
export default connect()(Column);