import React from 'react'
import {Box, Grommet} from 'grommet'
import Header from './components/main_page/header/Header'

const theme = {
    global: {
        font: {
            family: 'Roboto',
            size: '18px',
            height: '20px',
        }
    }
}

export default function App() {
    return (
        <Grommet theme={theme}>

            <Header/>
        </Grommet>
    )
}
