import React from 'react'
import {Box, CheckBoxGroup, Form, FormField, Text, TextInput} from 'grommet'
import {InProgress, Search} from 'grommet-icons'


export default function FormCore({
                                     values, setValues, categoriesColl,
                                     size, loading
}) {
    return (
        <Form
            value={values}
            onChange={(nextValue) => setValues(nextValue)}
        >
            <FormField
                name={'title'}
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
                    border={{side: 'all',color: 'border'}}
                >
                    <Search color="brand"/>
                    <TextInput
                        name={'title'}
                        type='search'
                        plain
                        placeholder='Enter title of stream...'
                    />
                </Box>
            </FormField>
            {
                loading
                    ? <InProgress
                        margin={
                            size === 'small'
                                ? {vertical: 'large'}
                                : {vertical: 'medium'}
                        }
                        size={'large'}
                        color={'brand'}
                    />
                    : <>
                        <FormField
                            label={<Text
                                color={'brand'}
                                weight={'bold'}
                                size={
                                    size === 'small'
                                        ? 'medium'
                                        : 'large'
                                }
                            >
                                Categories
                            </Text>
                            }
                            name={'categories'}
                            margin={
                                size === 'small'
                                    ? {vertical: 'large'}
                                    : {vertical: 'medium'}
                            }
                        >
                            <CheckBoxGroup
                                name={'categories'}
                                options={categoriesColl}
                                margin={
                                    size === 'small'
                                        ? {vertical: 'large'}
                                        : {vertical: 'medium'}
                                }
                            />
                        </FormField>
                    </>
            }
        </Form>
    )
}