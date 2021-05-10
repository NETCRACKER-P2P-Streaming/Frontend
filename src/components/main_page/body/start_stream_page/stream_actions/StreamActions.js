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
                                          streamState,
                                          actualStream,
                                          streamStates,
                                          onStopSharing,
                                          onStartSharing,
                                          onResumeStream,
                                          onSuspendStream,
                                          onDeleteStream,
                                          setIsEditable,
                                          isEditable,
                                          getPrettyStreamCategories,
                                          actualUser
                                      }) {
    if (isEditable) {
        return <StreamEditFormContainer
            onBack={() => setIsEditable(false)}
            onEdit={() => {}}
        />
    }
    const prettyCategories = getPrettyStreamCategories(actualStream.streamDesc.categories)
    switch (streamState) {
        case (streamStates.OPENED): {
            return <StreamInformation
                fullCategories={prettyCategories}
                avatarImage={actualUser.userAttributes['custom:linkImage']}
                countViewers={actualStream.information.countViewers}
                streamDesc={actualStream.streamDesc.description}
                userId={actualStream.userId}
                streamTitle={actualStream.streamDesc.title}
                shareAction={onSuspendStream}
                btnActionLabel={'Suspend'}
                onDeleteStream={onDeleteStream}
                setIsEditable={setIsEditable}
            />
        }
        case (streamStates.SUSPENDED): {
            return <StreamInformation
                fullCategories={prettyCategories}
                avatarImage={actualUser.userAttributes['custom:linkImage']}
                countViewers={actualStream.information.countViewers}
                streamDesc={actualStream.streamDesc.description}
                userId={actualStream.userId}
                streamTitle={actualStream.streamDesc.title}
                shareAction={onResumeStream}
                btnActionLabel={'Resume'}
                onDeleteStream={onDeleteStream}
                setIsEditable={setIsEditable}
            />
        }
        case(streamStates.SUSPENDED_PREPARED): {
            return <StreamInformation
                fullCategories={prettyCategories}
                avatarImage={actualUser.userAttributes['custom:linkImage']}
                countViewers={actualStream.information.countViewers}
                streamDesc={actualStream.streamDesc.description}
                userId={actualStream.userId}
                streamTitle={actualStream.streamDesc.title}
                shareAction={onResumeStream}
                btnActionLabel={'Resume'}
                setIsEditable={setIsEditable}
            />
        }
        case (streamStates.NON_INITIALIZED): {
            return <StartStreamPageForm
                selectOptions={selectOptions}
                setSelectOptions={setSelectOptions}
                formValues={startStreamFormValues}
                initialFormValues={initialStartStreamFormValues}
                setFormValues={setStartStreamFormValues}
                onSubmit={onAddStreamSubmit}
            />
        }
        case (streamStates.PREPARED): {
            return <StartStreamPageForm
                selectOptions={selectOptions}
                setSelectOptions={setSelectOptions}
                formValues={startStreamFormValues}
                initialFormValues={initialStartStreamFormValues}
                setFormValues={setStartStreamFormValues}
                onSubmit={onAddStreamSubmit}
            />
        }
        default:
            return null
    }
}