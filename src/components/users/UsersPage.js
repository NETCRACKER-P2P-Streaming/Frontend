import { Stack, Box, Avatar, Text, Button } from 'grommet'
import React, { useEffect, useState } from 'react'
import { User } from 'grommet-icons'

export default function UsersPage({
    username, userAttributes, enabled, setUsers, setAdmins,
    disableUser, enableUser, getUsers, getAdmins, replace, 
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
                width={'270px'}
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
                >{userAttributes['name']}</Text>
                  
                <Text
                    color={'dark-3'}
                    weight={'bold'}
                >{userAttributes['family_name']}</Text>
                <Box 
                    direction={'row'}
                    margin={{top:'xsmall'}}
                >
                    {!enabled
                        ?<Button 
                            color={'green'}
                            size={'small'}
                            label={'Unblock'} 
                            onClick={()=>{enableUser(username).then(
                                () => {
                                    setUsers(getUsers('USER'))
                                    setAdmins(getAdmins('ADMIN'))
                                }
                            )}}
                        ></Button>
                        :<Button 
                            color={'maroon'}
                            size={'small'}
                            label={'Block'} 
                            onClick={()=>{disableUser(username).then(
                                () => {
                                    setUsers(getUsers('USER'))
                                    setAdmins(getAdmins('ADMIN'))
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