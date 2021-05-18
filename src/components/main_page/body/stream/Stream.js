import React from 'react'
import {Box, Heading, TextInput, Video} from 'grommet'

export default function Stream({streamId, height}) {
    return <Box
        direction={'row'}
        height={height}
    >
        <Box
            background={'black'}
            fill={'vertical'}
            width={'xlarge'}
            color={'black'}
        >

        </Box>

        <Box
            fill={'vertical'}
            width={'small'}
            direction={'column'}
            flex={true}
        >
            <Box
                fill={'vertical'}
            >

            </Box>
            <TextInput
                placeholder={'Send a message'}
                width={'large'}
            />
        </Box>

    </Box>
}