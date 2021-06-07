import React, {useState} from 'react'
import { Box, Button, Form, FormField, TextInput } from 'grommet'
import FormCore from './FormCore'

export default function CategorySearchForm({
    setValues, values, size,
    componentHeight, addOneCategory
}) {
    const initialValues = {
        name: '',
        description: ''
    }
    const [form, setForm] = useState(initialValues)
    const handleSubmit = () => {
        addOneCategory(form).then(
            () => {
              setForm(initialValues)
            }
        )
    }
    return (
        <>
            <Box
                margin={{ left: 'xsmall', right: 'small' }}
                basis={'medium'}
                height={componentHeight}
                overflow={'auto'}
            >
                <Box
                    flex={true}
                    direction={'column'}
                    pad={'small'}
                    width={'320px'}
                >
                    <FormCore
                        size={size}
                        setValues={setValues}
                        values={values}
                    />
                <Form
                    onSubmit={handleSubmit}
                    value={form}
                    onChange={(nextValue) => setForm(nextValue)}
                >
                    <Box
                        width="large"
                        direction={'row'}
                        margin={{ top: 'medium' }}
                        justify={'between'}
                    >
                        <Button
                            label={'Add category'}
                            primary type="submit"
                        />
                    </Box>
                    <br></br>
                    <Box
                        width="large">
                        <FormField
                            label={'Name *'}
                            name={'name'}
                        >
                            <TextInput
                                id={'name'}
                                name={'name'} />
                        </FormField>
                        <FormField
                            label={'Description'}
                            name={'description'}>
                            <TextInput
                                id={'description'}
                                name={'description'} />
                        </FormField>
                    </Box>
                </Form>   
                </Box>
      
            </Box>
        </>
    )
}