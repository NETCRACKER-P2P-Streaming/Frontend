import React from 'react'
import {Box, FormField, Text, TextInput} from 'grommet'

export default function SignUpFormSecondPage({validateField, validators, errorMessage}) {
    return (
        <>
            <FormField
                label={'* Login'}
                name={'username'}
                required={true}
                validate={validateField(validators.username)}
            >
                <TextInput
                    name={'username'}
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
            <Box
                align={'center'}
                margin={{vertical: 'small'}}
            >
                <Text
                    color={'status-critical'}
                    size={'large'}
                    weight={'bold'}
                >
                    {errorMessage}
                </Text>
            </Box>
        </>
    )
}