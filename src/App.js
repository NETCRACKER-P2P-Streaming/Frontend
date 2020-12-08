import React from 'react'
import {grommet, Grommet} from 'grommet'
import Header from './components/main_page/header/Header'
import MainBody from "./components/main_page/body/MainBody";

/*
    1. Форма регистрации
    2. Остальные компоненты
    3. Мемо
    4. Тесты
 */
export default function App() {
    return (
        <Grommet theme={grommet}>
            <Header/>
            <MainBody/>
        </Grommet>
    )
}
