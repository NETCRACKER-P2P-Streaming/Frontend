import React, {useState} from 'react'
import SignInForm from './SignInForm'

export default function SignInFormContainer({onSubmit}) {

    const primaryValue = {
        login: '',
        password: ''
    }
    const [value, setValue] = useState(primaryValue)

    return <SignInForm
        value={value}
        setValue={setValue}
        primaryValue={primaryValue}
        onSubmit={onSubmit}
    />
}
