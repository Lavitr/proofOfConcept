import React from 'react'
import { connect } from 'react-redux'
import { userSelected, toScreenTwo, newData } from '../actions'
// import data from '../../data'
import { colors } from './ItemDiagram'
import data from 'config'

const styleButton = {
    display: 'block',
    marginBottom: '30px',
    height: '40px',
    width: '200px',
    backgroundColor: 'azure'
}

const styleScreenButton = {
    margin: '0 auto',
    backgroundColor: 'orange',
    borderRadius: '10px'
}

let ListColored = ({ stateObject, userSelected, toScreenTwo }) => (
    <div >
        <h1>Screen 1</h1>
        {
            window.config.columns.map((item, index) => (
                <div key={index}>
                    <div style={{ float: 'left', width: '50px', height: '40px', backgroundColor: colors[index] }}></div>
                    <button style={styleButton} onClick={toScreenTwo}>
                        {item.name}
                    </button>
                </div>
            ))
        }
    </div>
)

const mapStateToProps = (state) => ({
    stateObject: state
})

const mapDispatchToProps = {
    userSelected,
    toScreenTwo
}

ListColored = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListColored)

export default ListColored;
