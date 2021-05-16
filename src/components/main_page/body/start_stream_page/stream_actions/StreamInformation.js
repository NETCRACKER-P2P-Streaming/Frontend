import React from 'react'
import {Avatar, Box, Button, Heading, Paragraph, Text} from 'grommet'
import {User} from 'grommet-icons'

export default function StreamInformation({
                                              streamTitle,
                                              countViewers,
                                              avatarImage,
                                              userId,
                                              streamDesc,
                                              fullCategories,
                                              onDeleteStream,
                                              setIsEditable,
                                              onClose,
                                              onStartSharing
                                          }) {

    return (
        <Box
            width={'medium'}
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
            <Button
                primary={true}
                label={'Reselect screen'}
                onClick={() => onStartSharing(true)}
            />
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
                                key={c}
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
                                >{c}</Text>
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

            <Box
                direction={'column'}
                margin={'medium'}
            >
                <Button
                    label={'Close stream'}
                    onClick={onClose}
                    primary={true}
                    margin={'small'}
                />
                <Button
                    label={'Edit'}
                    secondary={true}
                    margin={'small'}
                    onClick={() => setIsEditable(true)}
                />
                <Button
                    label={'Delete stream'}
                    onClick={onDeleteStream}
                    secondary={true}
                    margin={'medium'}
                />
            </Box>
        </Box>
    )
}