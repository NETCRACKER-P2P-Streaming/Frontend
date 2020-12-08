import React, {useState} from 'react'
import {lengthValidatorCreate, passValidate, repeatedPassValidate} from '../../../utils/validators'
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
    password: '',
    repeatedPass: ''
}


export default function SignUpForm(props) {

    const {onSubmit} = props
    const [value, setValue] = useState(primaryValue);

    const passValidator = [passValidate, lengthValidatorCreate(6, 15)]
    const validators = {
        login: [lengthValidatorCreate(6, 15)],
        password: passValidator,
        repeatedPass: [repeatedPassValidate(value.password), ...passValidator]
    }

    function validateFieldDecorator(validators) {
        return (value) => {
            let report
            for(let val of validators) {
                report = val(value)
                if(report.status === 'error') {
                    return report
                }
            }
            return report
        }
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
                <Heading {...elementsStyles.heading}>SIGN UP</Heading>
            </Box>
            <FormField
                label={'Login'}
                name={'login'}
                validate={validateFieldDecorator(validators.login)}
                required
            >
                <TextInput name={'login'} {...elementsStyles.formInput}/>
            </FormField>
            <FormField
                label={'Password'}
                name={'password'}
                validate={validateFieldDecorator(validators.password)}
                required
            >
                <TextInput name={'password'} type={'password'} {...elementsStyles.formInput}/>
            </FormField>
            <FormField
                label={'Repeat password'}
                name={'repeatedPass'}
                validate={validateFieldDecorator(validators.repeatedPass)}
                required
            >
                <TextInput name={'repeatedPass'} type={'password'} {...elementsStyles.formInput}/>
            </FormField>
            <Box {...elementsStyles.buttonsWrapper}>
                <Button type={'submit'} label={'Sign up'} primary />
                <Button type={'reset'} label={'Clear'}/>
            </Box>
        </Form>
    )
}