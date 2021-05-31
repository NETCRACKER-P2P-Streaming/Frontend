import React from 'react'
import {Avatar, Box, Menu} from 'grommet'
import {CaretDownFill, User} from 'grommet-icons'
import {useHistory} from 'react-router-dom'

export default function UserActions({userAvatar, logoutUserAction, userData}) {
    let username = userData.username
    const history = useHistory()
    const openProfile = () => history.push(`/profile/${username}`)
    const openCategories = () => history.push(`/categories`)
    const openUsers = () => history.push(`/users`)
    const openStreams = () => history.push(`/streams`)

    return (
        <Box
            pad={'none'}
        >
            <Menu
                dropProps={{align: {top: 'bottom', left: 'left'}}}

                items={userData.role[0]==="ADMIN"
                    ?[
                        {label: 'Profile', gap: 'large', onClick: () => openProfile()},
                        {label: 'Logout', gap: 'large', onClick: () => logoutUserAction()},
                        {label: 'Users', gap: 'large', onClick: () => openUsers()},
                        {label: 'Streams', gap: 'large', onClick: () => openStreams()},
                        {label: 'Сategories', gap: 'large', onClick: () => openCategories()},
                    ]
                    :[
                        {label: 'Profile', gap: 'large', onClick: () => openProfile()},
                        {label: 'Start stream', gap: 'large', onClick: () => history.push('/start-stream')},
                        {label: 'Logout', gap: 'large', onClick: () => logoutUserAction()},
                    ]}

                label={
                    userAvatar
                        ? <Avatar
                            src={`${userAvatar}?${global.Date.now()}`}
                            size={'medium'}
                        />
                        : <Box
                            round={'full'}
                            background={'light-5'}
                            height={'48px'}
                            width={'48px'}
                            align={'center'}
                            justify={'center'}
                        >
                            <User
                                size={'medium'}
                            />
                        </Box>
                }

                icon={<CaretDownFill
                    size={'medium'}
                />}
            />
        </Box>
    )
}