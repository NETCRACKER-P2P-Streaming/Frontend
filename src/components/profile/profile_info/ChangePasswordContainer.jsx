import React, { useState } from 'react'
import { setPasswordFormOpenAC } from '../../../redux/reducers/app_reducer';
import { changePassword, saveProfile } from '../../../redux/reducers/profile_reducer';
import { connect } from 'react-redux'
import { Box, Button, Form, FormField, Heading, Text, TextInput } from 'grommet'
import {
    lengthValidatorCreate,
    passValidate,
    repeatedPassValidate,
    validateField
} from '../../utils/validators'

function ChangePasswordContainer({ setPasswordFormOpen, changePassword, localLoading, setLocalLoading }) {
    const primaryValue = {
        newPassword: '',
        oldPassword: ''
    }
    const [form, setForm] = useState(primaryValue);
    //Ошибка, приходящая с сервера или возникающая в ходе запроса
    const [errorMessage, setErrorMessage] = useState(undefined)
    const passValidator = [passValidate, lengthValidatorCreate(8, 15)]
    const validators = {
        username: [lengthValidatorCreate(6, 15)],
        password: passValidator,
        repeatedPass: [repeatedPassValidate(form.password), ...passValidator]
    }
    async function handleSubmit() {
        try {
            setLocalLoading(true)
            await changePassword(form)
            setPasswordFormOpen(false)
        } catch (err) {
            setErrorMessage(err.message)
        } finally {
            setLocalLoading(false)
        }
    }
      return (<>
        <Form
            onSubmit={handleSubmit}
            value={form}
            onChange={(nextValue) => setForm(nextValue)}
            onReset={() => setForm(primaryValue)}
            validate={'blur'}
        >
            <Box
                align={'center'}
                pad={{ bottom: 'medium' }}
            >
                <Heading
                    level={2}
                >
                    Reset password
                </Heading>
            </Box>
            <FormField
                label={'Old password'}
                name={'oldPassword'}
                required={true}
            >
                <TextInput
                    id={'oldPassword'}
                    name={'oldPassword'}
                    width={'large'}
                />
            </FormField>
            <FormField
                label={'New password'}
                name={'newPassword'}
                required={true}
                validate={validateField(validators.password)}
            >
                <TextInput
                    id={'newPassword'}
                    name={'newPassword'}
                    width={'large'}
                />
            </FormField>
            <Box>
                <Text
                    color={'status-critical'}
                    size={'medium'}
                >
                    {errorMessage}
                </Text>
            </Box>
            <Box
                direction={'row'}
                justify={'between'}
                margin={{ top: 'medium' }}
            >
                <Button
                    type={'submit'}
                    label={'Reset password'}
                    primary
                    disabled={localLoading}
                />
            </Box>
        </Form>
    </>
    )

}

function mapStateToProps(state) {
    return {}
}
export default connect(mapStateToProps, {
    changePassword,
    setPasswordFormOpen: setPasswordFormOpenAC
})(ChangePasswordContainer)