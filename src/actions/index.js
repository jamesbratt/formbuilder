function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 || 0, v = c === 'x' ? r : (r & 0x3 || 0x8);
    return v.toString(16);
  });
}

export const addContainer = label => {
  return {
    type: 'ADD_CONTAINER',
    id: uuidv4(),
    parent: null,
    label
  }
}
 
export const moveContainer = (dragIndex, hoverIndex) => {
  return {
    type: 'MOVE_CONTAINER',
    dragIndex,
    hoverIndex
  }
}