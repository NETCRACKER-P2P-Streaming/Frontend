import React from 'react'
import {Box, Button, Form, FormField, Heading, Text, TextInput} from 'grommet'

export default function SignInForm({
                                       primaryValue, value, setValue,
                                       onSubmit, authErrorMessage, localLoading
}) {
    return (
        <>
            <Form
                value={value}
                onChange={(nextValue) => setValue(nextValue)}
                onReset={() => setValue(primaryValue)}
                onSubmit={onSubmit}
                validate={'blur'}
            >
                <Box
                    align={'center'}
                    pad={{bottom: 'medium'}}
                >
                    <Heading
                        level={2}
                    >
                        SIGN IN
                    </Heading>
                </Box>
                <FormField
                    label={'Login'}
                    name={'username'}
                    required={true}
                >
                    <TextInput
                        id={'username'}
                        name={'username'}
                        width={'large'}
                    />
                </FormField>
                <FormField
                    label={'Password'}
                    name={'password'}
                    required={true}
                >
                    <TextInput
                        type={'password'}
                        id={'password'}
                        name={'password'}
                        width={'large'}
                    />
                </FormField>
                <Box
                >
                    <Text
                        color={'status-critical'}
                        size={'medium'}
                    >
                        {authErrorMessage}
                    </Text>
                </Box>

                <Box
                    direction={'row'}
                    justify={'between'}
                    margin={{top: 'medium'}}
                >
                    <Button
                        type={'submit'}
                        label={'Log in'}
                        primary
                        disabled={localLoading}
                    />
                    <Button
                        type={'reset'}
                        label={'Clear'}
                        disabled={localLoading}
                    />
                </Box>
            </Form>
        </>
    )
}