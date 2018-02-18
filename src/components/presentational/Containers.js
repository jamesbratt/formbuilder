import React from 'react';
import PropTypes from 'prop-types';
import SingleContainer from './SingleContainer'

const style = {
  minHeight: '400px'
}
 
const Containers = ({ containers }) => (
  <div className="container">
      <div style={style}>
          {containers.map((container, i) => (
            <SingleContainer
              index={i}
              key={container.id}
              id={container.id}
              label={container.label}
            />
          ))}
      </div>
  </div>
)
 
Containers.propTypes = {
  containers: PropTypes.array.isRequired,
}
 
export default Containers