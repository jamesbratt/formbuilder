import { connect } from 'react-redux'
import Containers from './presentational/Containers'

const mapStateToProps = state => {
  return state
}

const ContainersList = connect(
  mapStateToProps
)(Containers)
 
export default ContainersList