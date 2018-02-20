import React from 'react'
import PropTypes from 'prop-types'
 
const Row = ({ label }) => (
  <div className="row">{label}</div>
)
 
Row.propTypes = {
  label: PropTypes.string.isRequired
}
 
export default Row