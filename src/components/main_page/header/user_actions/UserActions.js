import React from 'react'
import {Avatar, Box, Menu} from 'grommet'
import {CaretDownFill, User} from 'grommet-icons'
import {useHistory} from 'react-router-dom'

export default function UserActions({userAvatar, logoutUserAction, userData}) {
    let username = userData.username
    const history = useHistory()
    const openProfile = () => history.push(`/profile/${username}`)

    return (
        <Box>
            <Menu
                dropProps={{align: {top: 'bottom', left: 'left'}}}
                items={[
                    {label: 'Profile', gap: 'large', onClick: () => openProfile()},

                    {label: 'Logout', gap: 'large', onClick: () => logoutUserAction()},
                ]}
                label={
                    userAvatar
                        ? <Avatar
                            src={userAvatar}
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