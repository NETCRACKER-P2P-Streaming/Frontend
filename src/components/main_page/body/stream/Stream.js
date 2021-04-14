import React, {useRef} from 'react'
import {Avatar, Box, Button, Heading, Layer, Stack, Text, TextInput, Video} from 'grommet'
import Chat from './chat_block/Chat'
import {User} from "grommet-icons";

export default function Stream({
                                   height, isStreamCommonInfoOpened, closeStreamCommonInfo, openStreamCommonInfo,
                                   avatarImage, countViewers, fullCategories, streamTitle, streamUserAttributes,
                                   userId, streamDesc
}) {
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
            onMouseLeave={closeStreamCommonInfo}
            onMouseOver={openStreamCommonInfo}
        >
            <video src="" id={'my_video'} autoPlay={true}>

            </video>
        </Box>

        {
            isStreamCommonInfoOpened && (
                <Layer
                    modal={false}
                    position={'bottom'}
                    target={streamRef.current}
                    full={'horizontal'}
                    responsive={false}
                >
                    <Box
                        fill={true}
                        background={'white'}
                        height={'medium'}
                    >
                        {/* Box for stream info content */}
                        <Stack
                            anchor={'left'}
                        >
                            <Box
                                direction={'row'}
                                justify={'between'}
                                pad={{horizontal: 'small'}}
                                margin={{top: 'xsmall'}}
                            >
                                <Box
                                    pad={'xsmall'}
                                    align={'center'}
                                >
                                    {
                                        avatarImage
                                            ? <Avatar
                                                src={avatarImage}
                                                size={'medium'}
                                                alt={'Avatar image'}
                                            />
                                            : <Box
                                                round={'full'}
                                                background={'light-5'}
                                                height={'72px'}
                                                width={'72px'}
                                                align={'center'}
                                                justify={'center'}
                                            >
                                                <User
                                                    size={'large'}
                                                />
                                            </Box>
                                    }
                                    <Text
                                        color={'dark-4'}
                                        size={'medium'}
                                    >{userId}</Text>
                                </Box>
                                <Box
                                    fill={'horizontal'}
                                    align={'center'}
                                >
                                    <Heading
                                        color={'dark-3'}
                                        weight={'bold'}
                                        margin={{bottom: 'xsmall'}}
                                    >{streamTitle}</Heading>
                                </Box>
                            </Box>
                        </Stack>
                    </Box>
                </Layer>
            )
        }

        <Chat
            height={height}
            chatRef={chatRef}
            avatarImage={avatarImage}
            countViewers={countViewers}
            fullCategories={fullCategories}
            streamTitle={streamTitle}
            streamUserAttributes={streamUserAttributes}
            userId={userId}
            streamDesc={streamDesc}
        />

    </Box>
}