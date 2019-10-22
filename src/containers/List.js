import React from 'react'
import { connect } from 'react-redux'
import { userSelected, backToMain } from '../actions'
import data from '../Data'

const styleButton = {
  display: 'block',
  marginBottom: '30px',
  height: '40px',
  width: '200px',
  backgroundColor: 'azure'
}

let List = ({ stateObject, userSelected, backToMain }) => (

  <div >
    <button
      style={{ ...styleButton, ...{ margin: '0 auto', backgroundColor: 'orange', borderRadius: '10px' } }}
      onClick={() => { backToMain(); }}
    >
      To Main Screen
    </button>
    {
      data.columns.map((item, index) => <button key={index} style={styleButton} onClick={() => { userSelected(item.name); }} >{item.name}</button>)
    }
  </div>

)

const mapStateToProps = (state) => ({
  stateObject: state
})

const mapDispatchToProps = {
  userSelected,
  backToMain
}

List = connect(
  mapStateToProps,
  mapDispatchToProps
)(List)

export default List;
