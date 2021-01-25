import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from './redux/store'
import {grommet, Grommet} from 'grommet'

import axios from 'axios'
window.axios = axios


const theme = {
    global: {
        ...grommet.global,
        colors: {
            control: {'dark': 'neutral-3', 'light': 'brand'}
        },
        focus: {
            outline: {
                color: 'transparent'
            },
            border: {
                color: {light: 'brand', dark: 'light-1'}
            }
        }
    },
    button: {
        ...grommet.button,
        color: {dark: 'light-1', light: 'brand'}
    }
}

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <Grommet theme={theme}>
                    <App/>
                </Grommet>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
