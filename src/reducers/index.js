import { combineReducers } from 'redux'
import containers from './containers'
import elements from './elements'
 
const builderApp = combineReducers({
  containers,
  elements,
});
 
export default builderApp