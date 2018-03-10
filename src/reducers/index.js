import { combineReducers } from 'redux'
import containers from './containers'
import elements from './elements'
import columns from './columns'
import properties from './properties'
 
const builderApp = combineReducers({
  containers,
  elements,
  columns,
  properties,
});
 
export default builderApp