import update from 'immutability-helper'

const elements = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CHILD':
      const newChild = {
        id: action.id,
        label: action.label,
        parent: action.parent
      }
      
      return  update(state, {
        // $merge: {[action.id]: newChild}
        $push: [newChild]
      })

    default:
      return state
  }
}
 
export default elements