import React, {useState} from 'react'
import {lengthValidatorCreate, passValidate} from '../../../utils/validators'
import {
    Box,
    Button,
    Form,
    FormField,
    Heading,
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
    const [value, setValue] = useState(primaryValue);

    const validators = {
        login: [lengthValidatorCreate(6, 15)],
        password: [passValidate, lengthValidatorCreate(6, 15)]
    }

    return (
        <Form
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
                validate={validators.login}
                required
            >
                <TextInput name={'login'} {...elementsStyles.formInput}/>
            </FormField>
            <FormField
                label={'Password'}
                name={'password'}
                validate={validators.password}
                required
            >
                <TextInput name={'password'} type={'password'} {...elementsStyles.formInput}/>
            </FormField>
            <Box {...elementsStyles.buttonsWrapper}>
                <Button type={'submit'} label={'Log in'} primary />
                <Button type={'reset'} label={'Clear'}/>
            </Box>
        </Form>
    )
}
