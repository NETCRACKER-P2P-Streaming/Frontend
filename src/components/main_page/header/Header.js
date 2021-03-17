import React from 'react'
import {Box, Heading, Text} from 'grommet'
import SignActions from './sign_btns/SignActions'
import UserActions from './user_actions/UserActions'
import {NavLink} from 'react-router-dom'


export default function Header({isAuthFormOpen, setAuthFormOpen, userAvatar, userData, logoutUserAction, history}) {
    return (
        <Box
            tag={'header'}
            direction={'row'}
            justify={'between'}
            pad={{vertical: 'small', horizontal: 'medium'}}
            background={'brand'}
            elevation={'medium'}
        >

            <Text alignSelf={'center'}>
                <NavLink
                    to={'/'}
                    style={{textDecoration: 'none'}}
                >
                    <Heading
                        level={2}
                        color={'light-1'}
                    >
                        P2P&nbsp;SERVICE
                    </Heading>
                </NavLink>

            </Text>


            {
                userData
                    ? <UserActions
                        userAvatar={userAvatar}
                        logoutUserAction={logoutUserAction}
                        history={history}
                    />
                    : <SignActions
                        isAuthFormOpen={isAuthFormOpen}
                        setAuthFormOpen={setAuthFormOpen}
                    />
            }
        </Box>
    )
}
