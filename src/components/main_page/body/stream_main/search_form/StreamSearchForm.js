import React from 'react'
import {Box, CheckBoxGroup, Form, FormField, TextInput} from "grommet";
import {InProgress, Search} from "grommet-icons";

export default function StreamSearchForm({setValues, values, loading, categoriesColl}) {
    return (
        <>
            <Box
                direction={'row'}
                margin={{left: 'xsmall', right: 'large'}}
                width={'medium'}
            >
                <Form
                    value={values}
                    onChange={(nextValue) => {
                        setValues(nextValue)
                    }}
                >
                    <FormField
                        name={'title'}
                        margin={{top: 'medium', bottom: 'medium'}}
                    >
                        <Box
                            direction={'row'}
                            align={'center'}
                            pad={{horizontal: 'small', vertical: 'xsmall'}}
                            margin={{bottom: 'medium'}}
                            round={'small'}
                            elevation={'xsmall'}
                            border={{
                                side: 'all',
                                color: 'border',
                            }}
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
                                margin={{top: 'medium', bottom: 'medium'}}
                                size={'large'}
                                color={'brand'}
                            />
                            : <>
                                <FormField
                                    label={'Categories'}
                                    name={'categories'}
                                    margin={{top: 'medium', bottom: 'medium'}}
                                >
                                    <CheckBoxGroup
                                        name={'categories'}
                                        options={categoriesColl}
                                        margin={{bottom: 'medium'}}
                                    />
                                </FormField>
                            </>
                    }
                </Form>
            </Box>
        </>
    )
}