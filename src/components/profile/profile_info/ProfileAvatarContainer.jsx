import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { setUserDataAC } from '../../../redux/reducers/user_reducer'
import { selectUserData } from '../../../redux/selectors/selectors'
import ProfileAvatar from './ProfileAvatar'

function ProfileAvatarContainer({ userData, isOwner, changePhoto, setUserData,
                                  deletePhoto, uploadPhoto, profile }) {

    const [avatarImage, setAvatarImage] = useState(null)

    useEffect(() => {
        // Если пользователь существует и у него существует поле аватарки -
        // идет проверка на валидность используемого изображения. Если изображение
        // не может быть загружено, тогда оно берется из папки public
        if (userData && userData.userAttributes['custom:linkImage']) {
            const img = new Image()
            img.onload = () => { setAvatarImage(userData.userAttributes['custom:linkImage']) }
            img.onerror = () => { setAvatarImage(null) }
            img.src = userData.userAttributes['custom:linkImage']
        }

    }, [userData])

    return <>
        <ProfileAvatar
            setUserData={setUserData}
            profile={profile}
            userAvatar={avatarImage}
            userData={userData}
            isOwner={isOwner}
            changePhoto={changePhoto}
            deletePhoto={deletePhoto}
            uploadPhoto={uploadPhoto}    
            setAvatarImage={setAvatarImage}    />
    </>
}

function mapStateToProps(state) {
    return {
        userData: selectUserData(state)
    }
}

export default connect(mapStateToProps, {
    setUserData: setUserDataAC,
})(ProfileAvatarContainer)