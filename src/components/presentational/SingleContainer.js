import React from 'react'
import PropTypes from 'prop-types'
 
const SingleContainer = ({ name }) => (
  <div className='container'>{name}</div>
)
 
SingleContainer.propTypes = {
  containers: PropTypes.array.isRequired,
}
 
export default SingleContainer