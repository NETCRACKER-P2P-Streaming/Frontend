import {createStore, compose, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import streamReducer from './reducers/stream_reducer'
import appReducer from './reducers/app_reducer'
import userReducer from './reducers/user_reducer'
import categoryReducer from './reducers/category_reducer'
import profileReducer from './reducers/profile_reducer'
import adminReducer from './reducers/admin_reducer'

const reducers = combineReducers({
    streams: streamReducer,
    categories: categoryReducer,
    app: appReducer,
    user: userReducer,
    profilePage: profileReducer,
    admin: adminReducer
})

// Выбирается функция compose в зависимости от наличия плагина Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

export {store}