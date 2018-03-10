import update from 'immutability-helper'

const properties = (state = {}, action) => {
  switch (action.type) {
    case 'GET_PROPERTY':
      const activeElement = {
        key: action.key,
        elementType: action.elementType,
        id: action.id
      }
      
      return  update(state, {
        $merge: {'activeElement': activeElement}
      })

    default:
    return state
  }
}

export default properties