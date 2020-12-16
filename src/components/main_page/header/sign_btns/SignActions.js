import React, {useContext, useState} from 'react'
import {Anchor, Box, Button, Layer, Menu, ResponsiveContext} from 'grommet'
import {Menu as MenuIcon, UserAdd, Login} from 'grommet-icons'
import SignInForm from '../../sign_forms/sign_in_form/SignInForm'
import withFormModal from '../../sign_forms/sign_in_form/withFormModal'

import {NavLink, useHistory} from "react-router-dom";

export default function SignActions(props) {

    //Контекст ширины экрана
    const size = useContext(ResponsiveContext)

    const [isSignIn, setIsSignIn] = useState(false)
    const history = useHistory()

    const openLogModal = () => setIsSignIn(true)
    const closeLogModal = () => setIsSignIn(false)

    const openSignUp = () => history.push('/sign_up')

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
            margin: {left: 'small', right: 'small'}
        },
        signUpBtn: {
            primary: true,
            color: 'light-1',
            label: 'Sign up',
            pad: 'small',
            margin: {left: 'small', right: 'small'},
            fill: true
        },
        menu: {
            dropProps: {align: {top: 'bottom', left: 'left'}},
            items: [
                {label: 'Sign in', icon: <Login color={'brand'}/>, gap: 'large', onClick: openLogModal},
                {label: 'Sign up', icon: <UserAdd color={'brand'}/>, gap: 'large', onClick: openSignUp},
            ],
            icon: <MenuIcon/>
        }
    }

    const SignInModalFormWrapped = withFormModal(SignInForm, closeLogModal)

    return (
        <Box {...elementsStyles.signActionsWrapper}>
            {
                size === 'small'
                    ? <Menu {...elementsStyles.menu}/>
                    : <>
                        <Button {...elementsStyles.signInBtn} onClick={openLogModal}/>
                        <NavLink to={'/sign_up'} style={{textDecoration: 'none'}}>
                            <Button {...elementsStyles.signUpBtn}/>
                        </NavLink>
                    </>
            }
            {
                isSignIn && (
                    <SignInModalFormWrapped
                        onSubmit={({value}) => console.log(value)}
                    />
                )
            }
        </Box>
    )
}