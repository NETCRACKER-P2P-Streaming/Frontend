import React, {useContext, useState} from 'react'
import {Box, Button, Layer, Menu, ResponsiveContext} from 'grommet'
import {Menu as MenuIcon, UserAdd, Login} from 'grommet-icons'
import SignInForm from "../../sign_in_form/SignInForm";

export default function SignActions(props) {

    //Контекст ширины экрана
    const size = useContext(ResponsiveContext)
    const [isSignIn, setIsSignIn] = useState(false)

    const openLogModal = () => setIsSignIn(true)
    const closeLogModal = () => setIsSignIn(false)

    const elementsStyles = {
        signActionsWrapper: {
            direction: 'row',
            justify: 'end',
            width: 'large'
        },
        signInBtn: {
            default: true,
            color: 'light-1',
            label: 'Sign in',
            pad: 'small',
            margin: { left: 'small', right: 'small' }
        },
        signUpBtn: {
            primary: true,
            color: 'light-1',
            label: 'Sign up',
            pad: 'small',
            margin: { left: 'small', right: 'small' }
        },
        menu: {
            dropProps: { align: { top: 'bottom', left: 'left' }},
            items: [
                { label: 'Sign in', icon: <Login color={'brand'} /> , gap: 'large', onClick: openLogModal},
                { label: 'Sign up', icon: <UserAdd color={'brand'}/>, gap: 'large'},
            ],
            icon: <MenuIcon />
        }
    }

    return (
        <Box {...elementsStyles.signActionsWrapper}>
            {
                size === 'small'
                ? <Menu {...elementsStyles.menu}/>
                : <>
                    <Button {...elementsStyles.signInBtn} onClick={openLogModal}/>
                    <Button {...elementsStyles.signUpBtn} />
                </>
            }
            {
                isSignIn && (
                    <Layer onEsc={closeLogModal} onClickOutside={closeLogModal}>
                        <SignInForm closeModal={closeLogModal} />
                    </Layer>
                )
            }
        </Box>
    )
}