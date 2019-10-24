import React from 'react'
import { connect } from 'react-redux'
import { userSelected, nextScreen } from '../actions'
import data from '../Data'
import { colors } from './ItemDiagram'

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

let ListColored = ({ stateObject, userSelected, nextScreen }) => (
    <div >
        <h1>Screen1</h1>
        {
            data.columns.map((item, index) => (
                <div key={index}>
                    <div style={{ float: 'left', width: '50px', height: '40px', backgroundColor: colors[index] }}></div>
                    <button style={styleButton} onClick={nextScreen}>
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
    nextScreen
}

ListColored = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListColored)

export default ListColored;
