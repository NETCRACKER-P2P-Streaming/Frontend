import React from 'react'
import {Box, Layer} from 'grommet'
import {InProgress} from 'grommet-icons'

// Компонент модального окна загрузки приложения
export default function Loading(props) {
    return (
        <Layer
            animation={props.animation}
            responsive={false}
        >
            <Box
                pad={'medium'}
                round={'true'}
                animation={{ type: 'pulse', duration: 1000 }}
                background={'brand'}
            >
                <InProgress
                    color={'white'}
                    size={'xlarge'}
                />
            </Box>
        </Layer>
    )
}