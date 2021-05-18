import React from 'react'
import {Box, Button} from 'grommet'
import StreamActions from './stream_actions/StreamActions'

export default function StartStreamPage({
                                            onStartSharing,
                                            selectOptions,
                                            initialStartStreamFormValues,
                                            setSelectOptions,
                                            headerHei,
                                            height,
                                            setStartStreamFormValues,
                                            startStreamFormValues,
                                            onSubmit,
                                            Notification,
                                            areNotificationOpen,
                                            actualStream,
                                            onDeleteStream,
                                            isEditable,
                                            setIsEditable,
                                            getPrettyStreamCategories,
                                            actualUser,
                                            onEditStream,
                                            isStreamInitialized,
                                            onClose,
                                            appLoading
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
            direction={'column'}
            align={'center'}
        >
            <video
                style={{width: '90%', display: isStreamInitialized ? 'block' : 'none'}}
                id={'share_video_container'}
                autoPlay={true}
            />
            {
                isStreamInitialized || <Button
                    secondary={true}
                    size={'large'}
                    label={'Select screen'}
                    margin={{horizontal: 'auto', vertical: 'auto'}}
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
                selectOptions={selectOptions}
                setSelectOptions={setSelectOptions}
                startStreamFormValues={startStreamFormValues}
                initialStartStreamFormValues={initialStartStreamFormValues}
                setStartStreamFormValues={setStartStreamFormValues}
                onAddStreamSubmit={onSubmit}
                actualStream={actualStream}
                onDeleteStream={onDeleteStream}
                setIsEditable={setIsEditable}
                isEditable={isEditable}
                getPrettyStreamCategories={getPrettyStreamCategories}
                actualUser={actualUser}
                onEditStream={onEditStream}
                isStreamInitialized={isStreamInitialized}
                onClose={onClose}
                onStartSharing={onStartSharing}
                appLoading={appLoading}
            />
        </Box>

    </Box>
}

