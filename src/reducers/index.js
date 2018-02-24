import { combineReducers } from 'redux'
import containers from './containers'
import elements from './elements'
import columns from './columns'
 
const builderApp = combineReducers({
  containers,
  elements,
  columns,
});
 
export default builderApp