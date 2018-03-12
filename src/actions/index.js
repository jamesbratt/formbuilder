
export const addContainer = (label, id) => {
  return {
    type: 'ADD_CONTAINER',
    id,
    parent: null,
    label
  }
}

export const addChild = (label, parent, id, uiType) => {
  return {
    type: 'ADD_CHILD',
    id,
    parent: parent[0],
    label,
    uiType
  }
}

export const addRowKey =  (parentId) => {
  return {
    type: 'ADD_ROW_KEY',
    id: parentId,
  }
}

export const addColumnKey =  (parentId) => {
  return {
    type: 'ADD_COLUMN_KEY',
    id: parentId,
  }
}

export const addColumn = (label, parent, id) => {
  return {
    type: 'ADD_COLUMN',
    id,
    parent: parent[0],
    label
  }  
}

export const updateColumn = (key, value, parent, id, index) => {
  return {
    type: 'UPDATE_COLUMN',
    key,
    value,
    parent,
    id,
    index
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

export const moveColumn = (dragIndex, hoverIndex, parentId) => {
  return {
    type: 'MOVE_COLUMN',
    dragIndex,
    hoverIndex,
    parentId
  }
}

export const getProperty = (key, id, elementType) => {
  return {
    type: 'GET_PROPERTY',
    key,
    id,
    elementType
  }
}