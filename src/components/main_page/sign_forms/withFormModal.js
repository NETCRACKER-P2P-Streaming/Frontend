import React from 'react'
import {Close} from 'grommet-icons'
import {
    Box,
    Button, Layer,
} from 'grommet'


const elementsStyles = {
    closeBtnBox: {
        align: 'end',
        margin: 'medium'
    },
    closeBtn: {
        icon: <Close size={'medium'}/>
    },
    wrapper: {
        fill: true,
        justify: 'center',
        width: 'large',
        color: 'brand',
        pad: 'large'
    }
}

export default function withFormModal(CustomForm, closeModal) {

    return (props) => {
        const {onSubmit, ...formProps} = props
        return (
            <Layer onEsc={closeModal} onClickOutside={closeModal}>
                <Box {...elementsStyles.closeBtnBox} >
                    <Button {...elementsStyles.closeBtn} onClick={closeModal}/>
                </Box>
                <Box {...elementsStyles.wrapper}>
                    <CustomForm
                        onSubmit={onSubmit}
                        {...formProps}
                    />
                </Box>
            </Layer>
        )
    }
}
