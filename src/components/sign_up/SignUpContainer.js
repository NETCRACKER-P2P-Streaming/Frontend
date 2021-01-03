import React, {useContext, useState} from 'react'
import SignUpForm from '../main_page/sign_forms/sign_up_form/SignUpForm'
import {connect} from 'react-redux'
import {ResponsiveContext} from "grommet";
import {lengthValidatorCreate, passValidate, repeatedPassValidate} from "../utils/validators";

function SignUpContainer({}) {

    const primaryValue = {
        login: '',
        password: '',
        repeatedPass: '',

        first_name: '',
        last_name: '',
        email: '',
        status: '',
        avatar: ''
    }

    const {onSubmit} = () => {}
    const [value, setValue] = useState(primaryValue)

    const [formPage, setFormPage] = useState(1)
    const size = useContext(ResponsiveContext)

    const passValidator = [passValidate, lengthValidatorCreate(6, 15)]
    const validators = {
        login: [lengthValidatorCreate(6, 15)],
        password: passValidator,
        repeatedPass: [repeatedPassValidate(value.password), ...passValidator]
    }

    function validateField(validatorsColl) {
        return (validatedValue) => {
            let validateResult
            for(let v of validatorsColl) {
                validateResult = v(validatedValue)
                if(validateResult.status === 'error') {
                    return validateResult
                }
            }
            return validateResult
        }
    }

    return <SignUpForm
        onSubmit={onSubmit}
        setValue={setValue}
        primaryValue={primaryValue}
        value={value}
        validators={validators}
        formPage={formPage}
        setFormPage={setFormPage}
        size={size}
        validateField={validateField}
    />
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, {

})(SignUpContainer)