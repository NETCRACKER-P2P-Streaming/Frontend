import React from 'react'
import {Box, Button} from 'grommet'
import StartStreamPageForm from './StartStreamPageForm'
import AddCategoryForm from './AddCategoryForm'

export default function StartStreamPage({
                                            onStartSharing, isStreamInitialized, selectOptions,
                                            initialStartStreamFormValues, setSelectOptions, startStreamFormValidators, headerHei,
                                            height, setStartStreamFormValues, startStreamFormValues, addCategoryFormValidators,
                                            addCategoryFormValues, setAddCategoryFormValues, addCategoryFormInitialValues,
                                            isAddCategoryFormShown, setIsAddCategoryFormShown
                                        }) {
    return <Box
        direction={'row'}
        width={'100%'}
        height={height - headerHei + 'px'}
        flex={"shrink"}
    >

        <Box
            height={'100%'}
            width={'xlarge'}
            pad={'medium'}
            direction={isStreamInitialized ? 'column' : 'row'}
            align={'center'}
        >
            <video
                style={{width: '90%', display: isStreamInitialized ? 'block' : 'none'}}
                id={'share_video_container'}
                autoPlay={true}
            />
            {
                isStreamInitialized
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
            margin={{right: 'small'}}
        >
            <StartStreamPageForm
                selectOptions={selectOptions}
                setSelectOptions={setSelectOptions}
                formValues={startStreamFormValues}
                initialFormValues={initialStartStreamFormValues}
                setFormValues={setStartStreamFormValues}
                validators={startStreamFormValidators}
                setIsAddCategoryFormShown={setIsAddCategoryFormShown}
                isAddCategoryFormShown={isAddCategoryFormShown}
            />
            {
                isAddCategoryFormShown
                &&
                <AddCategoryForm
                    validators={addCategoryFormValidators}
                    formValues={addCategoryFormValues}
                    setFormValues={setAddCategoryFormValues}
                    initialValues={addCategoryFormInitialValues}
                    setIsAddCategoryFormShown={setIsAddCategoryFormShown}
                />
            }
        </Box>
    </Box>
}

