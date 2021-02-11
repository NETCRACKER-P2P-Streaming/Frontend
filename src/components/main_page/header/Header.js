import React from 'react'
import {Box, Heading} from 'grommet'
import SignActions from './sign_btns/SignActions'
import UserActions from './user_actions/UserActions'


export default function Header({isAuthFormOpen, setAuthFormOpen, userAvatar, userData, logoutUserAction}) {
    return (
        <Box
            tag={'header'}
            direction={'row'}
            justify={'between'}
            pad={'medium'}
            background={'brand'}
            elevation={'medium'}
        >
            <Heading
                level={1}
                alignSelf={'center'}
            >
                P2P&nbsp;SERVICE
            </Heading>
            {
                userData
                    ? <UserActions
                        userAvatar={userAvatar}
                        logoutUserAction={logoutUserAction}
                    />
                    : <SignActions
                        isAuthFormOpen={isAuthFormOpen}
                        setAuthFormOpen={setAuthFormOpen}
                    />
            }
        </Box>
    )
}
