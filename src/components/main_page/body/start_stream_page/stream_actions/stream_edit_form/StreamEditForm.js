import React from 'react'
import {Box, Button, CheckBox, FileInput, Form, FormField, Heading, Select, Text, TextArea, TextInput} from 'grommet'
import {validateField} from '../../../../../utils/validators'
import {Close, FormPreviousLink} from 'grommet-icons'
import {startStreamFormValidators as validators} from '../../../../../utils/componentValidation'

export default function StreamEditForm({
                                                onReset, onBack, formValues, onSubmit,
                                                selectOptions, setSelectOptions, setFormValues
                                            }) {

    function sortOptions() {
        setSelectOptions(
            selectOptions.sort((p1, p2) => {
                const p1Exists = formValues.categories.includes(p1.id)
                const p2Exists = formValues.categories.includes(p2.id)

                if (!p1Exists && p2Exists) {
                    return 1
                }
                if (p1Exists && !p2Exists) {
                    return -1
                }
                return p1.name.localeCompare(p2.name, undefined, {
                    numeric: true,
                    sensitivity: 'base'
                })
            })
        )
    }

    function onChange(nextValue) {

        let processedCategoriesNextValue

        if(nextValue.categories[0]) {
            processedCategoriesNextValue = formValues.categories.indexOf(nextValue.categories[0].id) !== -1
                ? formValues.categories.filter(c => c !== nextValue.categories[0].id)
                : [...formValues.categories, nextValue.categories[0].id]
        } else {
            processedCategoriesNextValue = formValues.categories
        }

        setFormValues({
            ...nextValue,
            categories: processedCategoriesNextValue
        })
    }

    return <Form
        value={formValues}
        onChange={onChange}
        onSubmit={({value}) => onSubmit(value)}
        onReset={onReset}
        validate={'submit'}
    >
        <Button
            margin={{top: 'medium'}}
            onClick={onBack}
            label={<FormPreviousLink
                size={'large'}
                color={'brand'}
            />}
            plain={true}
        />
        <Heading
            color={'brand'}
            margin={{vertical: 'medium'}}
            alignSelf={'center'}
        >
            Edit stream
        </Heading>
        <FormField
            margin={{vertical: 'medium'}}
            label={'Title'}
            name={'title'}
            required={true}
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
            />
        </FormField>
        <FileInput
            accept={'image/*'}
            onChange={event => setFormValues({
                ...formValues,
                linkImage: event.target.files[0]
            })}
        />
        <FormField
            margin={{vertical: 'medium'}}
            label={'Stream categories'}
            name={'categories'}
            validate={validateField(validators.categories)}
        >
            <Select
                multiple={true}
                name={'categories'}
                closeOnChange={false}
                placeholder={'Select categories'}
                options={selectOptions}
                dropHeight={'medium'}
                onOpen={sortOptions}
                dropAlign={{top: 'top', bottom: 'top'}}
            >
                {
                    option => (
                        <Box
                            direction={'row'}
                            gap={'small'}
                            align={'center'}
                            pad={'xsmall'}
                            key={option.id}
                        >
                            <CheckBox
                                tabIndex={'-1'}
                                checked={formValues.categories.indexOf(option.id) !== -1}
                            />
                            {option.name}
                        </Box>
                    )
                }
            </Select>
        </FormField>
        <Box
            wrap={true}
            flex={true}
            direction={'row'}
            margin={{vertical: 'small'}}
        >
            {
                selectOptions.filter(so => formValues.categories.indexOf(so.id) !== -1).map(c => <SelectedCategoryItem
                    category={c}
                    formValue={formValues}
                    setFormValue={setFormValues}
                />)
            }
        </Box>
        <Box
            direction={'row'}
            justify={'between'}
            pad={{vertical: 'medium'}}
        >
            <Button type={'submit'} primary={true} label={'Edit stream'}/>
            <Button type={'reset'} secondary={true} label={'Reset'}/>
        </Box>
    </Form>
}


function SelectedCategoryItem({category, formValue, setFormValue}) {
    function deleteItem() {
        setFormValue({
            ...formValue,
            categories: formValue.categories.filter(c => c !== category.id)
        })
    }

    return (
        <Box
            direction={'row'}
            justify={'around'}
            round={'small'}
            width={'45%'}
            pad={'small'}
            background={'light-2'}
            margin={{right: 'small', top: 'small'}}
        >
            <Text>{category.name}</Text>
            <Button
                plain={true}
                onClick={deleteItem}
                label={<Close
                    color={'brand'}
                    size={'small'}
                />}
            />
        </Box>
    )
}