import update from 'immutability-helper'

const containers = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CONTAINER':
      const newContainer = {
        id: action.id,
        label: action.label,
        parent: action.parent
      }
      
      return  update(state, {
        $push: [newContainer]
      })

    case 'MOVE_CONTAINER':
      const dragCard = state[action.dragIndex]
      return update(state, {
        $splice: [[action.dragIndex, 1], [action.hoverIndex, 0, dragCard]],
      })

    default:
      return state
  }
}
 
export default containers