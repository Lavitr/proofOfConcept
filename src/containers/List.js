import React from 'react'
import { connect } from 'react-redux'
import { userSelected } from '../actions'
import data from '../Data'

const styleButton = {
  display: 'block',
  marginBottom: '30px',
  height: '40px',
  width: '200px',
  backgroundColor: 'azure'
}

let List = ({ stateObject, userSelected }) => (

  <div >
    {
      data.columns.map((item) => <button style={styleButton} onClick={() => { userSelected(item.name); }} >{item.name}</button>)
    }
  </div>

)

const mapStateToProps = (state) => ({
  stateObject: state
})

const mapDispatchToProps = {
  userSelected
}

List = connect(
  mapStateToProps,
  mapDispatchToProps
)(List)

export default List;
