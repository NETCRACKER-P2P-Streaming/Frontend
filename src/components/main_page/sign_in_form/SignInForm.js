import React, {useState} from 'react'
import {Close} from 'grommet-icons'
import {lengthValidatorCreate, passValidate} from '../../utils/validators'
import {
    Box,
    Button,
    Form,
    FormField,
    Heading,
    TextInput
} from 'grommet'


const primaryValue = {
    login: '',
    password: ''
}

const elementsStyles = {
    closeBtnBox: {
        align: 'end',
        margin: 'medium'
    },
    closeBtn: {
        icon: <Close size={'medium'}/>
    },
    wrapper: {
        fill: true,
        justify: 'center',
        width: 'large',
        color: 'brand',
        pad: 'large'
    },
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


const validators = {
    login: [lengthValidatorCreate(6, 15)],
    password: [passValidate, lengthValidatorCreate(6, 15)]
}

export default function SignInForm({closeModal}) {

    const [value, setValue] = useState(primaryValue);

    return (
        <>
            <Box {...elementsStyles.closeBtnBox} >
                <Button {...elementsStyles.closeBtn} onClick={closeModal}/>
            </Box>
            <Box {...elementsStyles.wrapper}>
                <Form
                    value={value}
                    onChange={(nextValue) => setValue(nextValue)}
                    onReset={() => setValue(primaryValue)}
                    onSubmit={event => console.log(event.value)}
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
                        <Button type={'submit'} label={'Log in'} primary/>
                        <Button type={'reset'} label={'Clear'}/>
                    </Box>
                </Form>
            </Box>
        </>
    )
}
