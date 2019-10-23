import React from 'react'
import { connect } from 'react-redux'
import ListColored from './ListColored'
import ItemDiagram from './ItemDiagram'
import List from './List'

let App = ({ screen }) => {
    let content;
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

