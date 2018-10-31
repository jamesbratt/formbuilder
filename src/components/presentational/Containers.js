import React from 'react';
import PropTypes from 'prop-types';
import SingleContainer from './SingleContainer'

const style = {
  height: '100%'
}
 
const Containers = ({ containers, elements, columns }) => (
  <div style={style} className="container">
      <div style={style}>
          {containers.map((container, i) => (
            <SingleContainer
              index={i}
              key={container.id}
              id={container.id}
              label={container.label}
              children={elements[container.id]}
              columns={columns}
            />
          ))}
      </div>
  </div>
)
 
Containers.propTypes = {
  containers: PropTypes.array.isRequired,
}
 
export default Containers