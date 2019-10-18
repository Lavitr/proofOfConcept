import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import './css/styles.css'
import App from "./containers/App"
import { logger } from 'redux-logger'

const store = createStore(
  reducer,
  applyMiddleware(logger)
)


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

