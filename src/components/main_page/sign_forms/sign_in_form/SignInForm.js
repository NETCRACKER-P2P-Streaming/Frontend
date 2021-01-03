import React from 'react'
import {Box, Button, Form, FormField, Heading, TextInput} from 'grommet'

export default function SignInForm({primaryValue, value, setValue, onSubmit}) {
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
                    name={'login'}
                    required
                >
                    <TextInput
                        id={'login'}
                        width={'large'}
                    />
                </FormField>
                <FormField
                    label={'Password'}
                    name={'password'}
                    required
                >
                    <TextInput
                        type={'password'}
                        id={'password'}
                        width={'large'}
                    />
                </FormField>
                <Box
                    direction={'row'}
                    justify={'between'}
                    margin={{top: 'medium'}}
                >
                    <Button type={'submit'} label={'Log in'} primary/>
                    <Button type={'reset'} label={'Clear'}/>
                </Box>
            </Form>
        </>
    )
}