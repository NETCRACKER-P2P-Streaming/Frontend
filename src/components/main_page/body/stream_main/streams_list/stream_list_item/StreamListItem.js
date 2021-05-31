import React from 'react'
import {Avatar, Box, Image, Stack, Text} from 'grommet'
import {Image as ImageIcon, User} from 'grommet-icons'
import {NavLink} from 'react-router-dom'

export default function StreamListItem({
                                           streamImage, avatarImage, countViewers,
                                           streamTitle, userId, fullCategories,
                                           streamId, status
                                       }) {
    const statusColor = status === 'RUNNING'
        ? 'status-ok'
        : status === 'PAUSED'
            ? 'status-warning'
            : 'status-error'

    return (
        <Box
            height={'medium'}
            width={'350px'}
            elevation={'medium'}
            margin={'xsmall'}
        >
            <NavLink
                to={`/stream/${streamId}`}
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
            </NavLink>

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
                        color={statusColor}
                        weight={'bold'}
                        size={'large'}
                        margin={{bottom: 'xsmall'}}
                    >{streamTitle.length > 10 ? `${streamTitle.slice(0, 10)}...` : streamTitle}</Text>
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
                        if (index < 3) {
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
                    fullCategories.length > 3 &&
                    <Box
                        background={'light-2'}
                        round={'small'}
                        pad={'xsmall'}
                        margin={'xsmall'}
                        align={'center'}
                        width={'156px'}
                    >
                        <Text
                            color={'dark-1'}
                            alignText={'center'}
                            size={'small'}
                        >...{fullCategories.length - 3} more</Text>
                    </Box>
                }

            </Box>
        </Box>
    )
}