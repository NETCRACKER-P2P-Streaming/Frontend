import React, {useEffect, useState} from 'react'
import Header from './Header'
import {connect} from 'react-redux'
import {selectIsAuthFormOpen, selectUserData} from '../../../redux/selectors/selectors'
import {setAuthFormOpenAC} from '../../../redux/reducers/app_reducer'
import {setUserDataAC} from '../../../redux/reducers/user_reducer'

function HeaderContainer({isAuthFormOpen, setAuthFormOpen, userData, setUserData}) {

    const [avatarImage, setAvatarImage] = useState('img/avatar_img.png')
    const logoutUserAction = () => setUserData(null)

    useEffect(() => {

        // Если пользователь существует и у него существует поле аватарки -
        // идет проверка на валидность используемого изображения. Если изображение
        // не может быть загружено, тогда оно берется из папки public
        if(userData && userData.linkImage) {
            const img = new Image()
            img.onload = () => {setAvatarImage(userData.linkImage)}
            img.onerror = () => {setAvatarImage('img/avatar_img.png')}
            img.src = userData.linkImage
        }
    }, [userData])

    return <Header
        isAuthFormOpen={isAuthFormOpen}
        setAuthFormOpen={setAuthFormOpen}
        userAvatar={avatarImage}
        userData={userData}
        logoutUserAction={logoutUserAction}
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
    setUserData: setUserDataAC
})(HeaderContainer)
