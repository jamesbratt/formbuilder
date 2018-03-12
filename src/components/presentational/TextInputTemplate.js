import React from 'react';
import PropTypes from 'prop-types';

 
const TextInput = ({ columns, opacity }) => (
  <div className="form-group">
    <label>New Text Input</label>
    <input placeholder="Placeholder" className="form-control" type="text" />
  </div>
)
  
TextInput.propTypes = {
  opacity: PropTypes.any,
}
 
export default TextInput