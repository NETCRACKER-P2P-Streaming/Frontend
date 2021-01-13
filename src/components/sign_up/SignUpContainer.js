import React, {useContext, useState} from 'react'
import SignUpForm from '../main_page/sign_forms/sign_up_form/SignUpForm'
import {connect} from 'react-redux'
import {ResponsiveContext} from 'grommet'
import {
    lengthValidatorCreate,
    passValidate,
    repeatedPassValidate,
    validateField
} from '../utils/validators'
import {regUser} from '../../redux/reducers/user_reducer'
import {setLoadingAC,setAuthFormOpenAC} from '../../redux/reducers/app_reducer'
import {selectAppLoading} from '../../redux/selectors/selectors'
import {useHistory} from 'react-router-dom'

function SignUpContainer({regUser, setAppLoading, appLoading, setAuthFormOpen}) {

    const primaryValue = {
        username: '',
        password: '',
        repeatedPass: '',

        firstName: '',
        lastName: '',
        email: '',
        description: '',
        linkImage: ''
    }

    const [value, setValue] = useState(primaryValue)

    // Ошибка, приходящая с сервера или возникающая в ходе
    // запроса на сервер
    const [errorMessage, setErrorMessage] = useState(undefined)
    const [formPage, setFormPage] = useState(1)
    const size = useContext(ResponsiveContext)

    const passValidator = [passValidate, lengthValidatorCreate(8, 15)]
    const validators = {
        username: [lengthValidatorCreate(6, 15)],
        password: passValidator,
        repeatedPass: [repeatedPassValidate(value.password), ...passValidator]
    }
    const history = useHistory()

    async function registerSubmit() {
        try {
            setAppLoading(true)
            await regUser(value)
            history.push('/')
            setAuthFormOpen(true)
        } catch (err) {
            setErrorMessage(err.message)
        } finally {
            setAppLoading(false)
        }
    }

    return <SignUpForm
        onSubmit={registerSubmit}
        setValue={setValue}
        value={value}
        validators={validators}
        formPage={formPage}
        setFormPage={setFormPage}
        size={size}
        validateField={validateField}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        loading={appLoading}
    />
}

const mapStateToProps = (state) => ({
    appLoading: selectAppLoading(state)
})

export default connect(mapStateToProps, {
    regUser,
    setAppLoading: setLoadingAC,
    setAuthFormOpen: setAuthFormOpenAC
})(SignUpContainer)