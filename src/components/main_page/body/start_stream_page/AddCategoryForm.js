import React, {useEffect} from 'react'
import {Box, Button, Form, FormField, Heading, Stack, TextArea, TextInput} from 'grommet'
import {validateField} from '../../../utils/validators'
import {Close} from 'grommet-icons'


export default function AddCategoryForm({
                                            formValues, setFormValues, validators, initialValues,
                                            setIsAddCategoryFormShown
                                        }) {

    useEffect(() => {
        document.getElementById('add_category_form')?.scrollIntoView({
            block: 'end',
            behavior: 'smooth'
        })
    }, [])

    return (
        <Form
            value={formValues}
            onChange={nextValue => setFormValues(nextValue)}
            onSubmit={() => {
            }}
            onReset={() => setFormValues(initialValues)}
            validate={'submit'}
            id={'add_category_form'}
        >
            <Stack
                anchor={'top-right'}
            >
                <Box
                    fill={'horizontal'}
                    background={'light-3'}
                    margin={{vertical: 'small'}}
                    pad={'small'}
                    elevation={'medium'}
                    round={'small'}
                >

                    <Heading
                        level={'3'}
                        color={'brand'}
                        margin={{top: 'medium'}}
                        textAlign={'center'}
                    >
                        Add new category
                    </Heading>
                    <FormField
                        margin={{vertical: 'medium'}}
                        label={'Title'}
                        name={'title'}
                        validate={validateField(validators.title)}
                    >
                        <TextInput
                            name={'title'}
                            width={'large'}
                        />
                    </FormField>
                    <FormField
                        margin={{vertical: 'medium'}}
                        label={'Description'}
                        name={'description'}
                        validate={validateField(validators.description)}
                    >
                        <TextArea
                            name={'description'}
                            width={'large'}
                            resize={'vertical'}
                        />
                    </FormField>
                    <Box
                        direction={'row'}
                        justify={'between'}
                        pad={{vertical: 'medium'}}
                    >
                        <Button type={'submit'} primary={true} label={'Add category'}/>
                        <Button type={'reset'} secondary={true} label={'Clear'}/>
                    </Box>
                </Box>
                <Button
                    plain={true}
                    margin={'small'}
                    onClick={() => setIsAddCategoryFormShown(false)}
                    label={
                        <Close
                            size={'medium'}
                            color={'dark-2'}
                        />}
                />
            </Stack>
        </Form>

    )
}