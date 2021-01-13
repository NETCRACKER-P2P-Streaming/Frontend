import React from 'react'
import MainBody from './components/main_page/body/MainBody'
import {Route} from 'react-router-dom'
import SignUpContainer from './components/sign_up/SignUpContainer'
import {connect} from 'react-redux'
import {selectAppLoading} from './redux/selectors/selectors'
import Loading from './components/util_components/Loading'
import HeaderContainer from './components/main_page/header/HeaderContainer'

function App({appLoading}) {
    return (
        <>
            <Route
                path={'/'}
                exact={true}
                render={() => (
                    <>
                        <HeaderContainer/>
                        <MainBody/>
                    </>
                )}/>
            <Route
                path={'/sign_up'}
                exact={true}
                render={() => <SignUpContainer/>}
            />

            {/* Если флаг состояния загрузки всего прилоежния в true -
            отображается модальное окно с индикатором загрузки. */}
            {appLoading && <Loading/>}
        </>

    )
}

const mapStateToProps = (state) => ({
    appLoading: selectAppLoading(state)
})

export default connect(mapStateToProps, {})(App)
