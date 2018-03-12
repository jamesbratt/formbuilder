import React from 'react';
import PropTypes from 'prop-types';

const style = {
	border: '1px dashed blue',
  padding: '0.5rem 1rem',
  paddingBottom: '50px',
  marginBottom: '.5rem',
  marginTop: '.5rem',
	backgroundColor: 'white',
  cursor: 'move',
  marginLeft: '.5rem',
  marginRight: '.5rem',
}
 
const Row = ({ columns, opacity }) => (
  <div className="row">
    {columns}
  </div>
)
  
Row.propTypes = {
  columns: PropTypes.array,
  opacity: PropTypes.any,
}
 
export default Row