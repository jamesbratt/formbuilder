import update from 'immutability-helper'

const columns = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_COLUMN':
      const newColumn = {
        id: action.id,
        label: action.label,
        parent: action.parent
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