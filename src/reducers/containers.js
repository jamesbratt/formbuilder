const containers = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CONTAINER':
      return [
        ...state,
        {}
      ]
    case 'MOVE_CONTAINER':
    default:
      return state
  }
}
 
export default containers