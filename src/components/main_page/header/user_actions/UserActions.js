import React from 'react'
import {Avatar, Box, Menu} from 'grommet'
import {CaretDownFill} from 'grommet-icons'

export default function UserActions({userAvatar, logoutUserAction}) {
    return (
        <Box>
            <Menu
                dropProps={{align: {top: 'bottom', left: 'left'}}}
                items={[
                    {label: 'Profile', gap: 'large', onClick: () => {}},

                    {label: 'Logout', gap: 'large', onClick: () => logoutUserAction()},
                ]}
                label={<Avatar
                    src={userAvatar}
                    size={'medium'}
                />}
                icon={<CaretDownFill
                    size={'medium'}
                />}
            />
        </Box>
    )
}