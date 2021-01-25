import React from 'react'
import {Box, Button, CheckBoxGroup, Form, FormField, Select, Stack, Text, TextInput} from 'grommet'
import {Close, Search} from 'grommet-icons'


export default function FormCore({
                                     values, setValues, categoriesColl,
                                     size, streamsSortingTypes, streamsSortingOrders
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
                    border={{side: 'all', color: 'border'}}
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
                    Order by
                </Text>
                }
                name={'type'}
                margin={
                    size === 'small'
                        ? {vertical: 'large'}
                        : {vertical: 'medium'}
                }
            >
                <Select
                    name={'type'}
                    options={streamsSortingTypes}
                    labelKey={'title'}
                    margin={{top: 'medium'}}
                />
            </FormField>
            <FormField
                name={'desc'}
                margin={
                    size === 'small'
                        ? {vertical: 'large'}
                        : {vertical: 'medium'}
                }
            >
                <Select
                    name={'desc'}
                    options={streamsSortingOrders}
                    labelKey={'title'}
                />
            </FormField>
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
                    labelKey={'label'}
                    valueKey={'key'}
                    options={categoriesColl.map(c => ({
                        label: c.name,
                        key: c.id
                    }))
                    }
                    margin={
                        size === 'small'
                            ? {vertical: 'large'}
                            : {vertical: 'medium'}
                    }
                />
            </FormField>
        </Form>
    )
}