import React from 'react'
import {Box, Grid, grommet, Grommet} from 'grommet'
import Header from './components/main_page/header/Header'
import MainBody from './components/main_page/body/MainBody'
import {BrowserRouter, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import SignUpContainer from './components/sign_up/SignUpContainer'
import {store} from './redux/store'

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

export default function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Grommet theme={theme}>
                    <Route
                        path={'/'}
                        exact={true}
                        render={() => (
                            <>
                                <Header/>
                                <MainBody/>
                            </>
                        )}/>
                    <Route
                        path={'/sign_up'}
                        exact={true}
                        render={() => <SignUpContainer/>}
                    />

                </Grommet>
            </Provider>
        </BrowserRouter>
    )
}
