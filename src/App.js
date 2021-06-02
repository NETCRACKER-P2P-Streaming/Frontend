import React, {useEffect} from 'react'
import MainBody from './components/main_page/body/MainBody'
import {Route} from 'react-router-dom'
import SignUpContainer from './components/sign_up/SignUpContainer'
import {connect} from 'react-redux'
import {selectAppLoading, selectIsAuthFormOpen} from './redux/selectors/selectors'
import Loading from './components/util_components/Loading'
import HeaderContainer from './components/main_page/header/HeaderContainer'
import {loadApp} from './redux/reducers/app_reducer'
import ProfileContainer from './components/profile/ProfileContainer'
import CategoryPageContainer from './components/categories/CategoryPageContainer'
import StreamPageContainer from './components/streams/StreamPageContainer'
import UsersPageContainer from './components/users/UsersPageContainer'

function App({appLoading, isAuthFormOpen, loadApp}) {

    useEffect(() => {
        loadApp()
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
    }, [])

    return (
        <>
            <Route
                path={'/'}
                render={() => (
                    <>
                        <HeaderContainer/>
                        <MainBody/>
                    </>
                )}
            />
            <Route
                path={'/sign_up'}
                exact={true}
                render={() => <SignUpContainer/>}
            />
            <Route
                path={'/categories'}
                exact={true}
                render={() => (
                    <>
                        <HeaderContainer/>
                        <CategoryPageContainer/>
                    </>
                )}
            />
            <Route
                path={'/users'}
                exact={true}
                render={() => (
                    <>
                        <HeaderContainer/>
                        <UsersPageContainer/>
                    </>
                )}
            />
            <Route 
                path="/profile/:username?"
                render={() => (
                    <>
                        <HeaderContainer/>
                        <ProfileContainer/>                   
                    </>
                )} 
            />
            <Route 
                path="/streams"
                render={() => (
                    <>
                        <HeaderContainer/>
                        <StreamPageContainer/>                   
                    </>
                )} 
            />
            {/* Если флаг состояния загрузки всего прилоежния в true -
            отображается модальное окно с индикатором загрузки. */}
            {appLoading && !isAuthFormOpen && <Loading/>}
        </>

    )
}

const mapStateToProps = (state) => ({
    appLoading: selectAppLoading(state),
    isAuthFormOpen: selectIsAuthFormOpen(state)
})

export default connect(mapStateToProps, {
    loadApp
})(App)
