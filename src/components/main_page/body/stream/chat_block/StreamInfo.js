import React from 'react'
import {Box, Layer, TextInput} from 'grommet'
import {Down} from 'grommet-icons'

export default function StreamInfo({chatRef, height}) {

    return <Box
        height={height}
        width={'small'}
        direction={'column'}
        flex={true}
        ref={chatRef}
    >
        <Layer
            modal={false}
            position={'top'}
            target={chatRef.current}
            full={'horizontal'}
        >
            <Box
                fill={'horizontal'}
                background={'neutral-2'}
                round={{corner: 'bottom', size: 'xlarge'}}
                align={'center'}
                style={{cursor: 'pointer'}}
            >
                <Down />
            </Box>
        </Layer>

        <Box
            fill={'vertical'}
        >

        </Box>
        <TextInput
            placeholder={'Send a message'}
            width={'large'}
        />
    </Box>
}