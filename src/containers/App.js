import React from 'react'
import List from './List'
import ListColored from './ListColored'
import ItemDiagram from './ItemDiagram'
import { connect } from 'react-redux'

let App = ({ screen }) => {

    let content
    switch (screen) {
        case 'LIST':
            content = <List />
            break;
        case 'DIAGRAM':
            content = <ItemDiagram />
            break;

        default:
            content = <ListColored />
    }

    return (
        <div >
            {content}
        </div>
    )
}

const mapStateToProps = (state) => ({
    screen: state.screen
})

App = connect(
    mapStateToProps,
    null
)(App)

export default App;

