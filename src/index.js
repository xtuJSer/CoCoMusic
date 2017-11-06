import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './Routes'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import 'spectre.css'
import './assets/app.styl'

import registerServiceWorker from './registerServiceWorker'

window.history.scrollRestoration = 'auto'

let store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
)

ReactDOM.render(<Provider store={store}>
  <Routes />
</Provider>, document.getElementById('root'))
registerServiceWorker()
