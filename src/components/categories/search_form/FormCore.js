import React from 'react'
import {Box, Form, FormField, Select, Text, TextInput} from 'grommet'
import {Search} from 'grommet-icons'


export default function FormCore({
                                     values, setValues, size
                                 }) {
    return (
        <Form
            value={values}
            onChange={(nextValue) => setValues(nextValue)}
        >
            <FormField
                name={'name'}
                margin={
                    size === 'small'
                        ? {vertical: 'large'}
                        : {vertical: 'medium'}
                }
            >
                <Box
                    direction={'row'}
                    align={'center'}
                    pad={{horizontal: 'small', vertical: 'xsmall'}}
                    margin={
                        size === 'small'
                            ? {vertical: 'large'}
                            : {vertical: 'medium'}
                    }
                    round={'small'}
                    elevation={'xsmall'}
                    border={{side: 'all', color: 'border'}}
                >
                    <Search color="brand"/>
                    <TextInput
                        name={'name'}
                        type='search'
                        plain
                        placeholder='Enter title of category...'
                    />
                </Box>
            </FormField>
           
           </Form>
    )
}