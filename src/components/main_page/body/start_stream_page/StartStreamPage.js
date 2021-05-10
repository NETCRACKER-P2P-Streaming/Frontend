import React from 'react'
import {Box, Button} from 'grommet'
import StreamActions from './stream_actions/StreamActions'

export default function StartStreamPage({
                                            onStartSharing, streamState, selectOptions,
                                            initialStartStreamFormValues, setSelectOptions,
                                            headerHei, height, setStartStreamFormValues, startStreamFormValues,
                                            onSubmit, Notification, areNotificationOpen, actualStream, streamStates,
                                            onStopSharing, onResumeStream, checkStreamState, onSuspendStream, onDeleteStream,
                                            isEditable, setIsEditable, getPrettyStreamCategories, actualUser
                                        }) {


    return <Box
        direction={'row'}
        width={'100%'}
        height={height - headerHei + 'px'}
        flex={"shrink"}
    >
        {
            areNotificationOpen && <Notification/>
        }
        <Box
            height={'100%'}
            width={'xlarge'}
            pad={'medium'}
            direction={checkStreamState() ? 'column' : 'row'}
            align={'center'}
        >
            <video
                style={{width: '90%', display: checkStreamState() ? 'block' : 'none'}}
                id={'share_video_container'}
                autoPlay={true}
            />
            {
                checkStreamState()
                ||
                <Button
                    secondary={true}
                    size={'large'}
                    label={'Select screen'}
                    margin={{horizontal: 'auto'}}
                    onClick={onStartSharing}
                />
            }
        </Box>
        <Box
            direction={'column'}
            height={'100%'}
            overflow={'scroll'}
        >
            <StreamActions
                initialStartStreamFormValues={initialStartStreamFormValues}
                startStreamFormValues={startStreamFormValues}
                setStartStreamFormValues={setStartStreamFormValues}
                onAddStreamSubmit={onSubmit}
                selectOptions={selectOptions}
                setSelectOptions={setSelectOptions}
                streamState={streamState}
                actualStream={actualStream}
                streamStates={streamStates}
                onStopSharing={onStopSharing}
                onStartSharing={onStartSharing}
                onResumeStream={onResumeStream}
                onSuspendStream={onSuspendStream}
                onDeleteStream={onDeleteStream}
                isEditable={isEditable}
                setIsEditable={setIsEditable}
                getPrettyStreamCategories={getPrettyStreamCategories}
                actualUser={actualUser}
            />
        </Box>

    </Box>
}

