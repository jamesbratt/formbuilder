
export const addContainer = (label, id) => {
  return {
    type: 'ADD_CONTAINER',
    id,
    parent: null,
    label
  }
}

export const addChild = (label, parent, id) => {
  return {
    type: 'ADD_CHILD',
    id,
    parent: parent[0],
    label
  }
}

export const addRowKey =  (parentId) => {
  return {
    type: 'ADD_ROW_KEY',
    id: parentId,
  }
}
 
export const moveContainer = (dragIndex, hoverIndex) => {
  return {
    type: 'MOVE_CONTAINER',
    dragIndex,
    hoverIndex
  }
}

export const moveRow = (dragIndex, hoverIndex, parentId) => {
  return {
    type: 'MOVE_ROW',
    dragIndex,
    hoverIndex,
    parentId
  }
}