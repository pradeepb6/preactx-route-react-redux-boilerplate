import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import applyDevtoolExtension from './applyDevtoolExtension'

const enhancer = compose(
    applyMiddleware(thunk),
    applyDevtoolExtension(),
)

const store = createStore(rootReducer, undefined, enhancer)
export default store
