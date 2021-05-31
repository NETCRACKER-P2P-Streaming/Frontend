import React from 'react'
import {Box, Button, Layer, Text} from 'grommet'
import {FormClose, StatusGood} from "grommet-icons";


export default function Notification({content, setAreOpen}) {
    return <Layer
        position={'bottom'}
        modal={false}
        margin={{ vertical: 'medium', horizontal: 'small' }}
        onEsc={setAreOpen}
        responsive={false}
        plain
    >
        <Box
            align={'center'}
            direction={'row'}
            gap={'small'}
            justify={'between'}
            round={'medium'}
            elevation={'medium'}
            pad={{ vertical: 'xsmall', horizontal: 'small' }}
            background={'status-warning'}
        >
            <Box align={'center'} direction={'row'} gap={'xsmall'}>
                <StatusGood />
                <Text>
                    {content}
                </Text>
            </Box>
            <Button icon={<FormClose />} onClick={() => setAreOpen(false)} plain />
        </Box>
    </Layer>
}