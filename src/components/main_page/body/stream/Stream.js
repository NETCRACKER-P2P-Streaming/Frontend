import React, {useRef} from 'react'
import {Avatar, Box, Heading, Layer, Stack, Text, Spinner} from 'grommet'
import Chat from './chat_block/Chat'
import {User} from 'grommet-icons'

export default function Stream({
                                   height, isStreamCommonInfoOpened, closeStreamCommonInfo, openStreamCommonInfo,
                                   avatarImage, countViewers, fullCategories, streamTitle, streamUserAttributes,
                                   userId, streamDesc, MyPlayer, isStreamInit, streamStates
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
            alignContent={'center'}
            direction={'column'}
        >
            {
                isStreamInit === streamStates.OPENED
                    ? <MyPlayer/>
                    : <Layer
                            target={streamRef.current}
                            full={false}
                            position={'center'}
                            modal={false}
                        >
                        {
                            isStreamInit === streamStates.SUSPENDED
                                ? <Text>This translation has been closed</Text>
                                : <Spinner size={'medium'}/>
                        }
                        </Layer>
            }
        </Box>

        {
            isStreamCommonInfoOpened && (
                <Layer
                    modal={false}
                    animation={'fadeIn'}
                    position={'top'}
                    target={streamRef.current}
                    full={'horizontal'}
                    responsive={false}
                    onMouseOver={openStreamCommonInfo}
                >
                    <Box
                        fill={true}
                        background={'neutral-2'}
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
                                    style={{opacity: 0.9}}
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
                                        color={'brand'}
                                        size={'medium'}
                                        style={{opacity: 0.9}}
                                    >{userId}</Text>
                                </Box>
                                <Box
                                    fill={'horizontal'}
                                    align={'center'}
                                >
                                    <Heading
                                        color={'brand'}
                                        weight={'bold'}
                                        margin={{bottom: 'xsmall'}}
                                        style={{opacity: 0.9}}
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