import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addContainer } from '../actions'
import update from 'immutability-helper'
import NewComponent from './NewComponent'

import Containers from './presentational/Containers'

const mapStateToProps = state => {
  return state
}

const ContainersList = connect(
  mapStateToProps
)(Containers)
 
export default ContainersList