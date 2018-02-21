import update from 'immutability-helper'

const elements = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_CHILD':
      const newChild = {
        id: action.id,
        label: action.label,
        parent: action.parent
      }
      
      return  update(state, {
        [action.parent]: {
          $push: [newChild]
        }
      })

    case 'ADD_ROW_KEY':
      return  update(state, {
        $merge: {[action.id]: []}
      })

    case 'MOVE_ROW':
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
 
export default elements