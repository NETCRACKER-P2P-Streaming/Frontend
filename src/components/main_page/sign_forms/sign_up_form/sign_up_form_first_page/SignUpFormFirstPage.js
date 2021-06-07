import React from 'react'
import {FormField, TextInput} from 'grommet'

export default function SignUpFormFirstPage() {
    return (
        <>
            <FormField
                label={'First name'}
                name={'firstName'}
                required={true}
            >
                <TextInput
                    name={'firstName'}
                    width={'large'}
                />
            </FormField>
            <FormField
                label={'Last name'}
                name={'lastName'}
                required={true}
            >
                <TextInput
                    name={'lastName'}
                    width={'large'}
                />
            </FormField>
            <FormField
                label={'Email'}
                name={'email'}
                required={true}
            >
                <TextInput
                    name={'email'}
                    type={'email'}
                    width={'large'}
                />
            </FormField>
            <FormField
                label={'Status'}
                name={'description'}
                required={true}
            >
                <TextInput
                    name={'description'}
                    width={'large'}
                />
            </FormField>
            {/*<FormField*/}
            {/*    label={'Avatar'}*/}
            {/*    name={'linkImage'}*/}
            {/*    required={true}*/}
            {/*>*/}
            {/*    <TextInput*/}
            {/*        name={'linkImage'}*/}
            {/*        width={'large'}*/}
            {/*    />*/}
            {/*</FormField>*/}
        </>
    )
}