import update from 'immutability-helper'

const columns = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_COLUMN':
      const newColumn = {
        id: action.id,
        label: action.label,
        parent: action.parent,
        column_length: '3'
      }
      
      return  update(state, {
        [action.parent]: {
          $push: [newColumn]
        }
      })

    case 'ADD_COLUMN_KEY':
      return  update(state, {
        $merge: {[action.id]: []}
      })

    case 'UPDATE_COLUMN':
      const column = {
        id: action.id,
        label: 'column',
        parent: action.parent,
        column_length: action.value,       
      }
      const index = parseInt(action.index)
      return  update(state, {
        [action.parent]: {
          [index]: {$set: column}
        }
      })

    case 'MOVE_COLUMN':
      const dragCard = state[action.parentId][action.dragIndex]
      return update(state, {
        [action.parentId]: {
          $splice: [[action.dragIndex, 1], [action.hoverIndex, 0, dragCard]],
        }
      })

    default:
      return state
  }
}
 
export default columns