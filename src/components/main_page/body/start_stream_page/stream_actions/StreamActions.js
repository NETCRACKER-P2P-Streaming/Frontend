import React from 'react'
import StartStreamPageForm from '../StartStreamPageForm'
import StreamInformation from './StreamInformation'
import StreamEditFormContainer from "./stream_edit_form/StreamEditFormContainer";

export default function StreamActions({
                                          selectOptions,
                                          setSelectOptions,
                                          startStreamFormValues,
                                          initialStartStreamFormValues,
                                          setStartStreamFormValues,
                                          onAddStreamSubmit,
                                          actualStream,
                                          onDeleteStream,
                                          setIsEditable,
                                          isEditable,
                                          getPrettyStreamCategories,
                                          actualUser,
                                          onEditStream,
                                          isStreamInitialized,
                                          onClose,
                                          onStartSharing
                                      }) {
    if (isEditable) {
        return <StreamEditFormContainer
            onBack={() => setIsEditable(false)}
            onEdit={onEditStream}
        />
    }
    const prettyCategories = actualStream?.streamDesc?.categories
        ? getPrettyStreamCategories(actualStream.streamDesc.categories)
        : []

    if (actualStream) {
        return <StreamInformation
            fullCategories={prettyCategories}
            avatarImage={actualUser.userAttributes['custom:linkImage']}
            countViewers={actualStream.information.countViewers}
            streamDesc={actualStream.streamDesc.description}
            userId={actualStream.userId}
            streamTitle={actualStream?.streamDesc.title}
            onClose={onClose}
            btnActionLabel={'Suspend'}
            onDeleteStream={onDeleteStream}
            setIsEditable={setIsEditable}
            onStartSharing={onStartSharing}
        />
    } else {
        return <StartStreamPageForm
            selectOptions={selectOptions}
            setSelectOptions={setSelectOptions}
            formValues={startStreamFormValues}
            initialFormValues={initialStartStreamFormValues}
            setFormValues={setStartStreamFormValues}
            onSubmit={onAddStreamSubmit}
        />
    }
}