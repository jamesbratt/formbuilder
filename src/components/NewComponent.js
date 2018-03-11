import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import { connect } from 'react-redux'
import { addContainer, addChild, addRowKey, addColumn, addColumnKey } from '../actions'
import ItemTypes from '../ItemTypes'

const style = {
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.5rem 1rem',
	marginRight: '1.5rem',
	marginBottom: '1.5rem',
  cursor: 'move',
  display: 'block',
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 || 0, v = c === 'x' ? r : (r & 0x3 || 0x8);
    return v.toString(16);
  });
}

const componentSource = {
	beginDrag(props) {
		return {
			name: props.name,
		}
	},

	endDrag(props, monitor) {
    const dropResult = monitor.getDropResult()
    const NewContainerId = uuidv4()
    const NewComponentName = props.name
    let NewComponentContainerType = 'root'

    if(dropResult && dropResult.parentId) {

      if(NewComponentName === 'row' && dropResult.elementType === 'container') {
        props.dispatch(addChild(props.name, [dropResult.parentId, dropResult.index], NewContainerId))
        props.dispatch(addColumnKey(NewContainerId))
        return
      }

      if(NewComponentName === 'column' && dropResult.elementType === 'row') {
        props.dispatch(addColumn(props.name, [dropResult.parentId, dropResult.index], NewContainerId))
        props.dispatch(addRowKey(NewContainerId))
        return
      }

      if(NewComponentName === 'row' && dropResult.elementType === 'column') {
        props.dispatch(addChild(props.name, [dropResult.parentId, dropResult.index], NewContainerId))
        props.dispatch(addColumnKey(NewContainerId))
        return

      }

    } else if(NewComponentName === 'container') {
      props.dispatch(addContainer(props.label, NewContainerId))
      props.dispatch(addRowKey(NewContainerId))
      return
    }

    if(dropResult)
      NewComponentContainerType = dropResult.elementType
  
    alert('Oops! You cannot place a ' + NewComponentName + ' inside a ' + NewComponentContainerType)
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
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

	render() {
		const { isDragging, connectDragSource } = this.props
		const { label } = this.props
		const opacity = isDragging ? 0.4 : 1

		return connectDragSource(<div style={{ ...style, opacity }}>{label}</div>)
  }
}

NewComponent = DragSource(ItemTypes.NEWCOMPONENT, componentSource, collect)(NewComponent);

export default connect()(NewComponent);
