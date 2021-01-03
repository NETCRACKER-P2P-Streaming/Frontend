import React from 'react'
import {Close} from 'grommet-icons'
import {
    Box,
    Button, Layer,
} from 'grommet'

export default function withFormModal(closeModal) {
    return (CustomForm) => {
        return (props) => {
            const {onSubmit, ...formProps} = props
            return (
                <Layer
                    onEsc={closeModal}
                    onClickOutside={closeModal}
                    overflow={'auto'}
                >
                    <Box
                        align={'end'}
                        margin={'medium'}
                    >
                        <Button
                            icon={<Close size={'medium'}/>}
                            onClick={closeModal}
                            id={'close_btn'}
                        />
                    </Box>
                    <Box
                        fill={true}
                        justify={'center'}
                        width={'large'}
                        color={'brand'}
                        pad={'large'}
                    >
                        <CustomForm
                            onSubmit={onSubmit}
                            {...formProps}
                        />
                    </Box>
                </Layer>
            )
        }
    }
}
