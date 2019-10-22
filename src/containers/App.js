import React from 'react'
import List from './List'
import ItemDiagram from './ItemDiagram'
import { connect } from 'react-redux'

let App = ({ isShownItem }) => (
    <div >
        {
            isShownItem ?
                <ItemDiagram /> :
                <List />
        }
    </div>
)

const mapStateToProps = (state) => ({
    isShownItem: state.isShownItem
})

App = connect(
    mapStateToProps,
    null
)(App)

export default App;

