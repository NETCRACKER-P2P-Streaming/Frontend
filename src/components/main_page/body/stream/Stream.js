import React, {useRef} from 'react'
import {Box, Button, Heading, Layer, Text, TextInput, Video} from 'grommet'
import {Down} from 'grommet-icons'
import Chat from "./chat_block/Chat";

export default function Stream({streamId, height, isStreamCommonInfoOpened, setStreamCommonInfoOpened}) {

    const streamRef = useRef()
    const chatRef = useRef()

    return <Box
        direction={'row'}
        height={height}
    >
        <Box
            background={'black'}
            height={height}
            width={'xlarge'}
            color={'black'}
            ref={streamRef}
            onMouseLeave={() => setStreamCommonInfoOpened(false)}
            onMouseOver={() => setStreamCommonInfoOpened(true)}
        >
        </Box>

        {
            isStreamCommonInfoOpened && (
                <Layer
                    modal={false}
                    position={'bottom'}
                    target={streamRef.current}
                    full={'horizontal'}

                >
                    <Box
                        fill={true}
                        background={'white'}
                        height={'medium'}
                    >
                        <Text>Some text</Text>
                    </Box>
                </Layer>
            )
        }

        <Chat
            height={height}
            chatRef={chatRef}
        />

    </Box>
}