import React from 'react'
import {Box} from 'grommet'
import {InProgress} from 'grommet-icons'
import StreamListItem from './stream_list_item/StreamListItem'

export default function StreamsList({loading, streamsList, height}) {

    return <Box
        direction={'row'}
        justify={'start'}
        margin={{vertical: '0', horizontal: 'auto'}}
        width={'xlarge'}
        wrap
        height={height}
        overflow={'auto'}
    >
        {
            loading
                ? <InProgress
                    margin={{top: 'medium', bottom: 'medium'}}
                    size={'large'}
                    color={'brand'}
                />
                : streamsList.map((f, i) => <StreamListItem
                    key={i}
                />)
        }
    </Box>
}