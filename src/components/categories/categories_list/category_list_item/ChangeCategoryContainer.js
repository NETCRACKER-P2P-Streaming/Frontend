import React, { useState } from 'react'
import { changeCategory } from '../../../../redux/reducers/category_reducer'
import { connect } from 'react-redux'
import { Box, Button, Form, FormField, TextInput } from 'grommet'
import { selectCategoriesList } from '../../../../redux/selectors/selectors'

function ChangeCategoryContainer({ categoryId, categoryDesc, setEditMode,
                                   changeCategory, categoryTitle }) {

    const primaryValue = {
        name: categoryTitle,
        description: categoryDesc
    }
    const [form, setForm] = useState(primaryValue)

     function handleSubmit() {
        changeCategory(form,categoryId).then(
            () => {
              setEditMode(false)
            }
        )
    }
    
      return (
        <Box   
            elevation={'medium'}
            pad={'small'}
            justify={'between'}
            margin={'small'}

        >
            <Form
                onSubmit={handleSubmit}
                value={form}
                onChange={(nextValue) => setForm(nextValue)}
                onReset={() => setForm(primaryValue)}
            >
                <Box
                    justify={'between'}
                >
                    <Box direction="row">
                        <FormField
                            label={'Name'}
                            name={'name'}
                            required={true}
                        >
                            <TextInput
                                plain
                                id={'name'}
                                name={'name'}
                                width={'large'}
                            />
                        </FormField>
                    </Box>
                    <Box direction="row">
                        <FormField
                            label={'Description'}
                            name={'description'}
                            required={true}
                        >
                            <TextInput
                                id={'description'}
                                name={'description'}
                                width={'large'}
                            />
                        </FormField>
                    </Box>
                    <Button
                        label={'Save changes'}
                        size={'small'}
                        alignSelf= {'center'}
                        color={'Silver'}
                        type={'submit'}
                    />
                </Box>
            </Form>
        </Box>
    )
}

function mapStateToProps(state) {
    return {
        categoriesList: selectCategoriesList(state),
    }
}
export default connect(mapStateToProps, {
    changeCategory
})(ChangeCategoryContainer)