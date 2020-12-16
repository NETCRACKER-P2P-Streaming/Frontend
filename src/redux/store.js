import {createStore, compose, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import streamReducer from './reducers/stream_reducer'

const reducers = combineReducers({
    streams: streamReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

export {store}