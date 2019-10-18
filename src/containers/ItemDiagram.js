import React from 'react'
import { connect } from 'react-redux'
import { backToUsers } from '../actions'
import data from '../data'

const styleButton = {
    display: 'block',
    marginBottom: '30px',
    height: '40px',
    width: '200px',
    backgroundColor: 'orange'
}


let ItemDiagram = ({ backToUsers, selectedItem }) => {
    let selectedUserData
    data.forEach(item => {
        if (selectedItem === item.name) {
            selectedUserData = item.data.a
        }
    })
    return (
        <div >
            <button style={styleButton} onClick={() => { backToUsers(); }} >BACK</button>
            <div>{selectedUserData}</div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    selectedItem: state.name
})

const mapDispatchToProps = {
    backToUsers
}

ItemDiagram = connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemDiagram)

export default ItemDiagram;
