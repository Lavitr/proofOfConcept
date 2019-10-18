import React, { useState, useEffect } from 'react'
import CanvasJSChart from '../canvasjs.react';
import { connect } from 'react-redux'
import { backToUsers } from '../actions'
import data from '../Data'

const styleButton = {
    display: 'block',
    marginBottom: '30px',
    height: '40px',
    width: '200px',
    backgroundColor: 'orange'
}

class ItemDiagram extends React.Component {


    render() {
        let selectedUserData
        data.forEach(item => {
            if (this.props.selectedItem === item.name) {
                selectedUserData = item.data.a
            }
        })
        const options = {
            title: {
                text: "Basic Column Chart in React"
            },
            data: [{
                type: "column",
                dataPoints: [
                    { label: "Apple", y: 10 },
                    { label: "Orange", y: 15 },
                    { label: "Banana", y: 25 },
                    { label: "Mango", y: 30 },
                    { label: "Grape", y: 28 }
                ]
            }]
        }

        return (
            <div>
                <CanvasJSChart options={options}
                /* onRef = {ref => this.chart = ref} */
                />
                <button style={styleButton} onClick={() => { this.props.backToUsers(); }} >BACK</button>
                <div>{selectedUserData}</div>
            </div>
        );
    }
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