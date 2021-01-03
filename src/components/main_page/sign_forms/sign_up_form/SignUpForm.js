import React from 'react'
import {
    Box,
    Button,
    Form,
    FormField,
    Heading, Layer,
    TextInput
} from 'grommet'
import {FormPreviousLink} from 'grommet-icons'
import {NavLink} from 'react-router-dom'


export default function SignUpForm({
                                       size, onSubmit, value, setValue,
                                       primaryValue, formPage, validateField,
                                       validators, setFormPage
}) {

    return (
        <>
            {
                size !== 'small' &&
                <Layer
                    modal={false}
                    position={'top-left'}
                    animation={'fadeIn'}
                >
                    <Button
                        plain={true}
                        icon={<NavLink to={'/'}><FormPreviousLink color={'dark-3'} size={'xlarge'}/></NavLink>}
                    />
                </Layer>
            }
            <Box
                width={'large'}
                background={'light-6'}
                pad={'large'}
                elevation={'large'}
                round={'small'}
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
                            plain={true}
                            icon={<NavLink to={'/'}><FormPreviousLink color={'dark-3'} size={'large'}/></NavLink>}
                        />
                    }
                    <Box
                        align={'center'}
                        pad={{bottom: 'medium'}}
                    >
                        <Heading
                            level={1}
                            color={'dark-3'}
                        >
                            SIGN UP
                        </Heading>
                    </Box>
                    {
                        formPage === 1
                            ? <>
                                <FormField
                                    label={'First name'}
                                    name={'first_name'}
                                >
                                    <TextInput
                                        name={'first_name'}
                                        width={'large'}
                                    />
                                </FormField>
                                <FormField
                                    label={'Last name'}
                                    name={'last_name'}
                                >
                                    <TextInput
                                        name={'last_name'}
                                        width={'large'}
                                    />
                                </FormField>
                                <FormField
                                    label={'Email'}
                                    name={'email'}
                                >
                                    <TextInput
                                        name={'email'}
                                        type={'email'}
                                        width={'large'}
                                    />
                                </FormField>
                                <FormField
                                    label={'Status'}
                                    name={'status'}
                                >
                                    <TextInput
                                        name={'status'}
                                        width={'large'}
                                    />
                                </FormField>
                                <FormField
                                    label={'Avatar'}
                                    name={'avatar'}
                                >
                                    <TextInput
                                        name={'avatar'}
                                        width={'large'}
                                    />
                                </FormField>
                            </>
                            : <>
                                <FormField
                                    label={'* Login'}
                                    name={'login'}
                                    required={true}
                                    validate={validateField(validators.login)}
                                >
                                    <TextInput
                                        name={'login'}
                                        width={'large'}
                                    />
                                </FormField>

                                <FormField
                                    label={'* Password'}
                                    name={'password'}
                                    required={true}
                                    validate={validateField(validators.password)}
                                >
                                    <TextInput
                                        name={'password'}
                                        type={'password'}
                                        width={'large'}
                                    />
                                </FormField>
                                <FormField
                                    label={'* Repeat password'}
                                    name={'repeatedPass'}
                                    required={true}
                                    validate={validators.repeatedPass}
                                >
                                    <TextInput
                                        name={'repeatedPass'}
                                        type={'password'}
                                        width={'large'}
                                    />
                                </FormField>
                            </>
                    }

                    <Box
                        direction={'row'}
                        justify={'between'}
                        margin={{top: 'large'}}
                    >
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
                            color={'brand'}
                        />
                    </Box>
                </Form>
            </Box>
        </>
    )
}