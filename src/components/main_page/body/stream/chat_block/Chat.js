import React, {useState} from 'react'
import {Box, Button, Layer, TextInput} from 'grommet'
import {Down, Close} from 'grommet-icons'

export default function Chat({chatRef, height}) {

    const [isStreamInfoOpened, setStreamInfoOpened] = useState(false)
    // Сделать стак
    return <Box
        height={height}
        width={'small'}
        direction={'column'}
        flex={true}
        ref={chatRef}
    >

        <Box
            fill={'horizontal'}
            background={'neutral-2'}
            round={{corner: 'bottom', size: 'xlarge'}}
            align={'center'}
            style={{cursor: 'pointer'}}
            onClick={() => setStreamInfoOpened(!isStreamInfoOpened)}
        >
            <Down />
        </Box>

        {
            isStreamInfoOpened
                ? <Box
                    fill={'vertical'}
                    background={'brand'}
                >

                </Box>
                : <>
                    <Box
                        fill={'vertical'}
                    >

                    </Box>
                    <TextInput
                        placeholder={'Send a message'}
                        width={'large'}
                    />
                </>
        }

    </Box>
}