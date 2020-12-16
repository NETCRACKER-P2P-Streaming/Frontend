import React from 'react'
import {Box} from 'grommet'
import {InProgress} from 'grommet-icons'
import StreamListItem from './stream_list_item/StreamListItem'

export default function StreamsList({loading, streamsList}) {
    return <Box
        direction={'row'}
        width={'xlarge'}
        wrap
    >
        {
            loading
                ? <InProgress
                    margin={{top: 'medium', bottom: 'medium'}}
                    size={'large'}
                    color={'brand'}
                />
                : streamsList.map(f => <StreamListItem/>)
        }
    </Box>
}