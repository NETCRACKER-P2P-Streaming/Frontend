import React from 'react'
import {Avatar, Box, Image, Stack, Text} from 'grommet'
import {Image as ImageIcon, User} from 'grommet-icons'

export default function ProfileStreamListItem({
                                           streamImage, avatarImage, countViewers,
                                           streamTitle, userId, fullCategories,profile
}) {
    return (
        <Box
            width={'350px'}
            elevation={'medium'}
            margin={'xsmall'}
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
                direction={'row'}
                justify={'around'}
                pad={{horizontal: 'small'}}
                margin={{top: 'xsmall'}}
            >
                <Box
                    width={'small'}
                    align={'center'}
                >
                    <Text
                        color={'dark-3'}
                        weight={'bold'}
                        size={'large'}
                        margin={{bottom: 'xsmall'}}
                    >{streamTitle}</Text>
               
                </Box>
            </Box>
            <Box
                wrap={true}
                direction={'row'}
                justify={'center'}
            >
                {
                    fullCategories.map((c, index) => {
                        if(index < 5) {
                            return <Box
                                key={c.name}
                                background={'light-6'}
                                round={'small'}
                                pad={'xsmall'}
                                margin={'small'}
                                align={'center'}
                                width={'156px'}
                            >
                                <Text
                                    color={'dark-1'}
                                    size={'small'}
                                    truncate={true}
                                >{c.name}</Text>
                            </Box>
                        } else {
                            return null
                        }
                    })
                }


                {
                    fullCategories.length > 5 &&
                    <Box
                        round={'small'}
                        pad={'small'}
                        align={'center'}
                    >
                        <Text
                            color={'dark-1'}
                            alignText={'center'}
                            size={'small'}
                        >...{fullCategories.length - 5} more</Text>
                    </Box>
                }

            </Box>
        </Box>
    )
    
}