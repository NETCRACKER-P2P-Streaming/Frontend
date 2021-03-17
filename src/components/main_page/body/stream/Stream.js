import React from 'react'
import {Box, Heading} from 'grommet'

export default function Stream({streamId}) {
    return <Box>
        <Heading>
            Stream {streamId}
        </Heading>
        <video id={'stream'}>

        </video>
    </Box>
}