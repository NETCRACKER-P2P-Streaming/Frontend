import React from 'react'
import {Avatar, Box, Image, Stack, Text, Button} from 'grommet'
import {Image as ImageIcon, User} from 'grommet-icons'

export default function StreamListItem ({
                                           streamImage, avatarImage, countViewers,
                                           closeOneStreamOnServ, deleteOneStreamOnServ,
                                           streamTitle, userId, fullCategories, streamId,
                                           status
                                        }) {
    const statusColor = status === 'RUNNING'
        ? 'status-ok'
        : status === 'PAUSED'
            ? 'status-warning'
            : 'status-error'

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
                    pad={'xsmall'}
                    align={'center'}
                >
                    {
                        avatarImage
                            ? <Avatar
                                src={avatarImage}
                                size={'large'}
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
                </Box>
                <Box
                    width={'small'}
                    align={'center'}
                >
                    <Text
                        color={'dark-3'}
                        weight={'bold'}
                        size={'large'}
                        margin={{bottom: 'xsmall'}}
                        color={statusColor}
                    >{streamTitle}</Text>
                    <Text
                        color={'dark-4'}
                        size={'medium'}
                    >{userId}</Text>
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
                                margin={'xsmall'}
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
                <Box
                    border={{ side: 'top', color: 'silver', size: 'xsmall' }}
                    pad={'small'}
                    direction={'row'}
                    justify={'center'}
                >
                    <Button
                        label={'Close stream'}
                        size={'small'} 
                        color={'Silver'}
                        onClick={()=>{closeOneStreamOnServ(streamId)}}

                    />&nbsp;&nbsp;&nbsp;
                    <Button 
                        color={'Maroon'}
                        size={'small'} 
                        label={'Delete stream'}
                        onClick={()=>{deleteOneStreamOnServ(streamId)}}

                    />
                </Box>
            </Box>
        </Box>
    )
}