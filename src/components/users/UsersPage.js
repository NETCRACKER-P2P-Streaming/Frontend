import { Stack, Box, Avatar, Text, Button } from 'grommet'
import React, { useEffect, useState } from 'react'
import { User } from 'grommet-icons'

export default function UsersPage({
    username, role, userAttributes, 
    disableUser, enableUser, block, unblock, blocked, replace, 
}) {
    const [avatarImage, setAvatarImage] = useState(null)

    useEffect(() => {
        // Если у пользователя существует поле аватарки -
        // идет проверка на валидность используемого изображения. Если изображение
        // не может быть загружено, тогда идет установка изображения в null
        // -> будет отображена заглушка
        if(userAttributes['custom:linkImage']) {
            const img = new Image()
            img.onload = () => {setAvatarImage(userAttributes['custom:linkImage'])}
            img.onerror = () => {setAvatarImage(null)}
            img.src = userAttributes['custom:linkImage']
        }
    }, [userAttributes])
    return <Box
        elevation={'medium'}
        margin={'xsmall'}
    >
        <Stack
            anchor={'top-left'}
        >
            <Box
                height={'small'}
                align={'center'}
                justify={'center'}
                background={'light-1'}
                pad={'small'}

            >
                {
                    avatarImage
                        ? <Avatar
                            src={userAttributes['custom:linkImage']}
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
                <Text
                    color={'dark-3'}
                    weight={'bold'}
                    size={'large'}
                    margin={{ bottom: 'xsmall' }}
                >{role}</Text>
                <Text
                    color={'dark-3'}
                    weight={'bold'}
                    size={'large'}
                    margin={{ bottom: 'xsmall' }}
                >{username}</Text>
                <Box direction={'row'}>
                    {blocked
                        ?<Button 
                            color={'green'}
                            size={'small'}
                            label={'Unblock'} 
                            onClick={()=>{enableUser(username).then(
                                () => {
                                    unblock(username)
                                }
                            )}}
                        ></Button>
                        :<Button 
                            color={'maroon'}
                            size={'small'}
                            label={'Block'} 
                            onClick={()=>{disableUser(username).then(
                                () => {
                                    block(username)
                                }
                            )}}
                        ></Button>
                    }&nbsp;&nbsp;
                    <Button 
                        color={'silver'}
                        size={'small'}
                        label={'Сhange role'}
                        onClick={()=>{replace()}}
                    ></Button>
                </Box>
            </Box>
        </Stack>
    </Box>

}