import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateColumn } from '../actions'


class EditComponent extends Component {
	static propTypes = {
    component: PropTypes.array,
  }

  updateProperties = (e) => {
    e.preventDefault();
    this.props.dispatch(updateColumn('column_length', e.target.value, this.props.component[0].parent, this.props.component[0].id, this.props.componentIndex))
  }

	render() {
    let componentForm = "Click a column to adjust it's width"
    if(this.props.component.length !== 0) {
      const times = 13
      let options = []
      for(let i=0; i < times; i++){
        if(i != 0)
          options.push(<option key={i} value={i}>{i}</option>)
          
      }
      componentForm = (<div><label>Select column width</label>
      <select className="form-control" value={this.props.component[0].column_length} onChange={this.updateProperties}>
        {options}
      </select></div>)
    }
  
    return <div class="card">
      <h5 class="card-header">Edit Element Properties</h5>
      <div class="card-body">
        {componentForm}
      </div>
    </div>
  }
}

export default connect()(EditComponent);