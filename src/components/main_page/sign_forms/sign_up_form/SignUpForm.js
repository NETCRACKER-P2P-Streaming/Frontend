import React, {useContext, useState} from 'react'
import {
    lengthValidatorCreate,
    passValidate,
    repeatedPassValidate
} from '../../../utils/validators'
import {
    Box,
    Button,
    Form,
    FormField,
    Heading, Layer, ResponsiveContext, Text,
    TextInput
} from 'grommet'
import {FormPreviousLink} from 'grommet-icons'
import {NavLink} from "react-router-dom";

const elementsStyles = {
    formWrapper: {
        width: 'large',
        background: 'light-6',
        pad: 'large',
        elevation: 'large',
        round: 'small'
    },
    headingWrapper: {
        align: 'center',
        pad: {bottom: 'medium'}

    },
    heading: {
        level: 1,
        color: 'dark-3'
    },
    buttonsWrapper: {
        direction: 'row',
        justify: 'between',
        margin: {top: 'large'}
    },
    formInput: {
        width: 'large'
    },
    submitBtn: {},
    clearBtn: {
        color: 'brand'
    },
    backLayer: {
        modal: false,
        position: 'top-left',
        animation: 'fadeIn'
    },
    backBtn: {
        plain: true
    }
}

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


export default function SignUpForm(props) {

    const {onSubmit} = props
    const [value, setValue] = useState(primaryValue)

    //Сообщение об ошибке, пришедшей с сервера
    const [validateMessage, setValidateMessage] = useState(undefined)

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

    return (
        <>
            {
                size !== 'small' &&
                <Layer
                    {...elementsStyles.backLayer}
                >
                    <Button
                        {...elementsStyles.backBtn}
                        icon={<NavLink to={'/'}><FormPreviousLink color={'dark-3'} size={'xlarge'}/></NavLink>}
                    />
                </Layer>
            }
            <Box
                {...elementsStyles.formWrapper}
                margin={{left: 'auto', right: 'auto', top: size !== 'small' ? 'medium' : 'none'}}
                fill={size === 'small' || 'vertical'}
            >
                <Form
                    value={value}
                    onChange={nextValue => setValue(nextValue)}
                    onReset={() => setValue(primaryValue)}
                    onSubmit={onSubmit}
                    validate={'blur'}
                >
                    {
                        size === 'small' &&
                        <Button
                            {...elementsStyles.backBtn}
                            icon={<NavLink to={'/'}><FormPreviousLink color={'dark-3'} size={'large'}/></NavLink>}
                        />
                    }
                    <Box {...elementsStyles.headingWrapper}>
                        <Heading {...elementsStyles.heading}>SIGN UP</Heading>
                    </Box>
                    {
                        formPage === 1
                            ? <>
                                <FormField
                                    label={'First name'}
                                    name={'first_name'}
                                >
                                    <TextInput name={'first_name'} {...elementsStyles.formInput}/>
                                </FormField>
                                <FormField
                                    label={'Last name'}
                                    name={'last_name'}
                                >
                                    <TextInput name={'last_name'} {...elementsStyles.formInput}/>
                                </FormField>
                                <FormField
                                    label={'Email'}
                                    name={'email'}
                                >
                                    <TextInput name={'email'} type={'email'}{...elementsStyles.formInput}/>
                                </FormField>
                                <FormField
                                    label={'Status'}
                                    name={'status'}
                                >
                                    <TextInput name={'status'} {...elementsStyles.formInput}/>
                                </FormField>
                                <FormField
                                    label={'Avatar'}
                                    name={'avatar'}
                                >
                                    <TextInput name={'avatar'} {...elementsStyles.formInput}/>
                                </FormField>
                            </>
                            : <>
                                <FormField
                                    label={'* Login'}
                                    name={'login'}
                                    required={true}
                                    validate={validateField(validators.login)}
                                >
                                    <TextInput name={'login'} {...elementsStyles.formInput}/>
                                </FormField>

                                <FormField
                                    label={'* Password'}
                                    name={'password'}
                                    required={true}
                                    validate={validateField(validators.password)}
                                >
                                    <TextInput name={'password'} type={'password'} {...elementsStyles.formInput}/>
                                </FormField>
                                <FormField
                                    label={'* Repeat password'}
                                    name={'repeatedPass'}
                                    required={true}
                                    validate={validators.repeatedPass}
                                >
                                    <TextInput name={'repeatedPass'} type={'password'} {...elementsStyles.formInput}/>
                                </FormField>
                            </>
                    }

                    <Box {...elementsStyles.buttonsWrapper}>
                        {
                            formPage === 2
                            &&
                            <Button
                                type={'submit'}
                                label={'Sign up'}
                                primary
                            />
                        }

                        <Button
                            label={formPage === 1 ? 'Next' : 'Back'}
                            onClick={() => formPage === 1 ? setFormPage(2) : setFormPage(formPage - 1)}
                            {...elementsStyles.clearBtn}
                        />
                    </Box>
                </Form>
            </Box>
        </>
    )
}