import React, {useState} from 'react'
import StreamEditForm from './StreamEditForm'
import {connect} from 'react-redux'
import {selectActualStream, selectCategoriesList} from '../../../../../../redux/selectors/selectors'


function StreamEditFormContainer({
                                     actualStream, onEdit, onBack,
                                     categories
                                 }) {
    const initialValues = {
        title: actualStream.streamDesc.title,
        description: actualStream.streamDesc.description,
        linkImage: actualStream.streamDesc.linkImage,
        categories: [...actualStream.streamDesc.categories]
    }

    const onReset = () => setEditFormValues(initialValues)

    const [editFormValues, setEditFormValues] = useState(initialValues)
    const [selectOptions, setSelectOptions] = useState(categories)

    return <StreamEditForm
        onSubmit={onEdit}
        setSelectOptions={setSelectOptions}
        selectOptions={selectOptions}
        formValues={editFormValues}
        setFormValues={setEditFormValues}
        onBack={onBack}
        onReset={onReset}
    />
}

function mapStateToProps(state) {
    return {
        categories: selectCategoriesList(state),
        actualStream: selectActualStream(state)
    }
}

export default connect(mapStateToProps, {})(StreamEditFormContainer)