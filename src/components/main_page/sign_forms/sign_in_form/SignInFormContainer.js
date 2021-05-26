import React, {useState} from 'react'
import SignInForm from './SignInForm'
import {connect} from 'react-redux'
import {authUser} from '../../../../redux/reducers/user_reducer'
import {setAuthFormOpenAC} from '../../../../redux/reducers/app_reducer'

function SignInFormContainer({
                                 authUser, setAuthFormOpen,
                                 localLoading, setLocalLoading
}) {

    const primaryValue = {
        username: '',
        password: ''
    }
    const [value, setValue] = useState(primaryValue)

    //Ошибка, приходящая с сервера или возникающая в ходе запроса
    const [authErrorMessage, setAuthErrorMessage] = useState(undefined)

    async function authSubmit() {
        try {
            setLocalLoading(true)
            await authUser(value)
            setAuthFormOpen(false)
        } catch(err) {
            setAuthErrorMessage(err.message)
        } finally {
            setLocalLoading(false)
        }
    }

    return <SignInForm
        value={value}
        setValue={setValue}
        primaryValue={primaryValue}
        onSubmit={authSubmit}
        authErrorMessage={authErrorMessage}
        localLoading={localLoading}
    />
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, {
    authUser,
    setAuthFormOpen: setAuthFormOpenAC
})(SignInFormContainer)
