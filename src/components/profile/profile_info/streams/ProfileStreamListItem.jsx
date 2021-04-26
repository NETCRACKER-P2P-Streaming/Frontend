import React from 'react'
import { Box, Image, Stack, Text} from 'grommet'
import {Image as ImageIcon } from 'grommet-icons'

export default function ProfileStreamListItem   ({
                                                    streamImage, countViewers, streamTitle, 
                                                }) {
    return (
        <Box
            width={'350px'}
            elevation={'medium'}
            margin={'small'}
        >
            <Stack
                anchor={'top-left'}
            >
                <Box
                    height={'small'}
                    width={'medium'}
                    align={'center'}
                    justify={'center'}
                    background={'light-1'}

                >
                    {
                        streamImage
                            ? <Image
                                fit={'contain'}
                                src={streamImage}
                                alt={'Stream image'}
                            />
                            : <ImageIcon
                                size={'large'}
                                color={'brand'}
                            />
                    }
                </Box>
                <Box
                    background={'light-6'}
                    round={'small'}
                    margin={'small'}
                    pad={'xsmall'}
                >
                    <Text
                        color={'dark-2'}
                    >
                        {`${countViewers} viewers now`}
                    </Text>
                </Box>
            </Stack>
            <Box
            width={'350px'}
            align={'center'}
            >
                <Text
                    color={'dark-3'}
                    weight={'bold'}
                    size={'large'}
                    height={'small'}

                >{streamTitle}</Text>
            </Box>
        </Box>
)}