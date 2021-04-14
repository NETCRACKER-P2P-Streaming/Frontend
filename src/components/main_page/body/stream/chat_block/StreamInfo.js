import React from 'react'
import {Avatar, Box, Button, Heading, Layer, Paragraph, Stack, Text} from 'grommet'
import {Close, User} from 'grommet-icons'

export default function StreamInfo({
                                       avatarImage, streamTitle, userId, fullCategories,
                                       setStreamInfoOpened, isStreamInfoOpened, streamDesc,
                                       countViewers
}) {

    return <Stack
        anchor={'top-right'}
        fill={'vertical'}
    >
        <Box
            fill={'vertical'}
            background={'neutral-2'}
            animation={{
                type: 'fadeIn',
                delay: 0,
                duration: 500,
                size: "xsmall"
            }}
            pad={{horizontal: 'medium'}}
        >
            <Heading
                textAlign={'center'}
                margin={{vertical: 'medium'}}
            >
                {streamTitle}
            </Heading>
            <Text

            >
                {countViewers} views now
            </Text>
            <Box
                direction={'row'}
                justify={'between'}
                margin={{vertical: 'medium'}}
            >
                <Box
                    align={'center'}
                    margin={{right: 'large'}}
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
                        color={'light-5'}
                        size={'medium'}
                    >{userId}</Text>
                </Box>
                <Box
                    flex={true}
                >
                    <Paragraph
                        textAlign={'start'}
                    >
                        {
                            streamDesc || 'The creator of the stream was too lazy to add a description :('
                        }
                    </Paragraph>
                </Box>
            </Box>

            <Box
                wrap={true}
                direction={'row'}
                justify={'center'}
            >
                {
                    fullCategories.map((c, index) => {
                        if (index < 5) {
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

            </Box>

        </Box>
        <Button
            label={<Close color={'light-1'}/>}
            margin={'medium'}
            plain={true}
            onClick={() => setStreamInfoOpened(!isStreamInfoOpened)}
        />
    </Stack>
}