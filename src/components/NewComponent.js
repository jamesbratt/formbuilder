import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import ItemTypes from '../ItemTypes'

const style = {
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.5rem 1rem',
	marginRight: '1.5rem',
	marginBottom: '1.5rem',
	cursor: 'move',
	float: 'left',
}

const boxSource = {
	beginDrag(props) {
		return {
			name: props.name,
		}
	},

	endDrag(props, monitor) {
    const dropResult = monitor.getDropResult()
    if(dropResult && dropResult.parentId)
      props.addChild(props.name, [dropResult.parentId, dropResult.index])
    else
      props.addComponent(props.name);

    return
	},
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

class NewComponent extends Component {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    addContainer: PropTypes.func.isRequired,
    addChild: PropTypes.func.isRequired,
	}

	render() {
		const { isDragging, connectDragSource } = this.props
		const { label } = this.props
		const opacity = isDragging ? 0.4 : 1

		return connectDragSource(<div style={{ ...style, opacity }}>{label}</div>)
	}
}

export default DragSource(ItemTypes.NEWCOMPONENT, boxSource, collect)(NewComponent);
