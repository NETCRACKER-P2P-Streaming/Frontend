import React, {useContext} from 'react'
import {Box, Button, Menu, ResponsiveContext} from 'grommet'
import {Menu as MenuIcon, UserAdd, Login} from 'grommet-icons'
import SignInFormContainer from '../../sign_forms/sign_in_form/SignInFormContainer'
import withFormModal from '../../sign_forms/sign_in_form/withFormModal'
import {NavLink, useHistory} from 'react-router-dom'

export default function SignActions({isAuthFormOpen, setAuthFormOpen}) {

    const size = useContext(ResponsiveContext)
    const history = useHistory()

    const openLogModal = () => setAuthFormOpen(true)
    const closeLogModal = () => setAuthFormOpen(false)

    const openSignUp = () => history.push('/sign_up')

    // Оборачивание  формы авторизации в модальное окно
    const SignInModalFormWrapped = withFormModal(closeLogModal)(SignInFormContainer)

    return (
        <Box
            direction={'row'}
            justify={'end'}
            width={'large'}
        >
            {
                size === 'small'
                    ? <Menu
                        dropProps={{align: {top: 'bottom', left: 'left'}}}
                        items={[
                            {label: 'Sign in', icon: <Login color={'brand'}/>, gap: 'large', onClick: openLogModal},
                            {label: 'Sign up', icon: <UserAdd color={'brand'}/>, gap: 'large', onClick: openSignUp},
                        ]}
                        icon={<MenuIcon/>}
                    />
                    : <>
                        <Button
                            default={true}
                            color={'light-1'}
                            label={'Sign in'}
                            pad={'small'}
                            margin={{left: 'small', right: 'small'}}
                            onClick={openLogModal}
                        />
                        <NavLink to={'/sign_up'} style={{textDecoration: 'none'}}>
                            <Button
                                primary={true}
                                color={'light-1'}
                                label={'Sign up'}
                                pad={'small'}
                                margin={{left: 'small', right: 'small'}}
                                fill={true}
                            />
                        </NavLink>
                    </>
            }

            {/* Если флаг модального окна авторизации установлен в true -
            показывается форма авторизации, обернутая в модал */}
            {isAuthFormOpen && <SignInModalFormWrapped />}
        </Box>
    )
}