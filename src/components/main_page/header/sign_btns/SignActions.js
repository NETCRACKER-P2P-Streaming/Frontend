import React, {useContext, useState} from 'react'
import {Box, Button, Layer, Menu, ResponsiveContext} from 'grommet'
import {Menu as MenuIcon, UserAdd, Login} from 'grommet-icons'
import SignInForm from '../../sign_forms/sign_in_form/SignInForm'
import withFormModal from '../../sign_forms/withFormModal'
import SignUpForm from "../../sign_forms/sign_up_form/SignUpForm";

export default function SignActions(props) {

    //Контекст ширины экрана
    const size = useContext(ResponsiveContext)

    const [isSignIn, setIsSignIn] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)

    const openLogModal = () => setIsSignIn(true)
    const closeLogModal = () => setIsSignIn(false)

    const openRegModal = () => setIsSignUp(true)
    const closeRegModal = () => setIsSignUp(false)

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
            margin: {left: 'small', right: 'small'}
        },
        menu: {
            dropProps: {align: {top: 'bottom', left: 'left'}},
            items: [
                {label: 'Sign in', icon: <Login color={'brand'}/>, gap: 'large', onClick: openLogModal},
                {label: 'Sign up', icon: <UserAdd color={'brand'}/>, gap: 'large', onClick: openRegModal},
            ],
            icon: <MenuIcon/>
        }
    }

    const SignInModalFormWrapped = withFormModal(SignInForm, closeLogModal)
    const SignUpModalFormWrapped = withFormModal(SignUpForm, closeRegModal)

    return (
        <Box {...elementsStyles.signActionsWrapper}>
            {
                size === 'small'
                    ? <Menu {...elementsStyles.menu}/>
                    : <>
                        <Button {...elementsStyles.signInBtn} onClick={openLogModal}/>
                        <Button {...elementsStyles.signUpBtn} onClick={openRegModal}/>
                    </>
            }
            {
                isSignIn && (
                    <SignInModalFormWrapped
                        onSubmit={({value}) => console.log(value)}
                    />
                )
            }
            {
                isSignUp && (
                    <SignUpModalFormWrapped
                        onSubmit={({value}) => console.log(value)}
                    />
                )
            }
        </Box>
    )
}