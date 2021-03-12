import React, {useEffect, useState} from 'react'
import Header from './Header'
import {connect} from 'react-redux'
import {selectIsAuthFormOpen, selectUserData} from '../../../redux/selectors/selectors'
import {setAuthFormOpenAC} from '../../../redux/reducers/app_reducer'
import {userLogout} from '../../../redux/reducers/user_reducer'
import {useHistory} from 'react-router-dom'

function HeaderContainer({isAuthFormOpen, setAuthFormOpen, userData, userLogout}) {

    const [avatarImage, setAvatarImage] = useState(null)
    const history = useHistory()

    useEffect(() => {
        // Если пользователь существует и у него существует поле аватарки -
        // идет проверка на валидность используемого изображения. Если изображение
        // не может быть загружено, тогда оно берется из папки public
        if(userData && userData.userAttributes['custom:linkImage']) {

            const img = new Image()
            img.onload = () => {setAvatarImage(userData.userAttributes['custom:linkImage'])}
            img.onerror = () => {setAvatarImage(null)}
            img.src = userData.userAttributes['custom:linkImage']
        }
    }, [userData])

    return <Header
        isAuthFormOpen={isAuthFormOpen}
        setAuthFormOpen={setAuthFormOpen}
        userAvatar={avatarImage}
        userData={userData}
        logoutUserAction={userLogout}
        history={history}
    />
}

function mapStateToProps(state) {
    return {
        isAuthFormOpen: selectIsAuthFormOpen(state),
        userData: selectUserData(state)
    }
}

export default connect(mapStateToProps, {
    setAuthFormOpen: setAuthFormOpenAC,
    userLogout
})(HeaderContainer)
