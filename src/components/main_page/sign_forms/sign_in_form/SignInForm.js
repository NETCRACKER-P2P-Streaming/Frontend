import React, {useState} from 'react'

import {
    Box,
    Button,
    Form,
    FormField,
    Heading, Text,
    TextInput
} from 'grommet'

const elementsStyles = {
    headingWrapper: {
        align: 'center',
        pad: {bottom: 'medium'}
    },
    heading: {
        level: 2
    },
    buttonsWrapper: {
        direction: 'row',
        justify: 'between',
        margin: {top: 'medium'}
    },
    formInput: {
        width: 'large'
    }
}

const primaryValue = {
    login: '',
    password: ''
}


export default function SignInForm(props) {

    const {onSubmit} = props
    const [value, setValue] = useState(primaryValue)

    // Сообщение для ошибок, пришедших с сервера
    const [errorMessage, setErrorMessage] = useState(undefined)

    return (
        <><Form
            value={value}
            onChange={(nextValue) => setValue(nextValue)}
            onReset={() => setValue(primaryValue)}
            onSubmit={onSubmit}
            validate={'blur'}
        >
            <Box {...elementsStyles.headingWrapper}>
                <Heading {...elementsStyles.heading}>SIGN IN</Heading>
            </Box>
            <FormField
                label={'Login'}
                name={'login'}
                required
            >
                <TextInput name={'login'} {...elementsStyles.formInput}/>
            </FormField>
            <FormField
                label={'Password'}
                name={'password'}
                required
            >
                <TextInput name={'password'} type={'password'} {...elementsStyles.formInput}/>
            </FormField>
            <Text>
                {errorMessage}
            </Text>
            <Box {...elementsStyles.buttonsWrapper}>
                <Button type={'submit'} label={'Log in'} primary/>
                <Button type={'reset'} label={'Clear'}/>
            </Box>
        </Form></>
    )
}
