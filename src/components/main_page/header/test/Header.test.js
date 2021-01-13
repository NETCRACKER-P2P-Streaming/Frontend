import {screen, render, fireEvent} from '@testing-library/react'
import Header from '../Header'
import {BrowserRouter} from 'react-router-dom'
import React from 'react'

describe('Header test', () => {
    it('Logo text', () => {
        render(
            <BrowserRouter>
                <Header/>
            </BrowserRouter>
        )
        const searchedLogoContent = screen.getByText(/P2P SERVICE/i)
        expect(searchedLogoContent).toBeInTheDocument()
    })

    it('User actions rendered', () => {
        const rendered = render(
            <BrowserRouter>
                <Header
                    userData={{linkImage: 'asd'}}
                    userAvatar={'asd'}
                />
            </BrowserRouter>
        )
        const searchedAvatarColl = rendered.container.querySelectorAll('svg')
        expect(searchedAvatarColl.length).toBe(1)

        const searchedMenuOpenBtn = screen.getByRole('button', {name: 'Open Menu'})
        expect(searchedMenuOpenBtn).toBeInTheDocument()

        fireEvent.click(searchedMenuOpenBtn)

        rendered.rerender(<BrowserRouter>
            <Header
                userData={{linkImage: 'asd'}}
                userAvatar={'asd'}
            />
        </BrowserRouter>)
        const menuProfileItem = screen.getByRole('button', {name: 'Profile'})
        const menuLogoutItem = screen.getByRole('button', {name: 'Logout'})

        expect(menuProfileItem).toBeInTheDocument()
        expect(menuLogoutItem).toBeInTheDocument()
    })

    it('Sign actions rendered', () => {
        render(
            <BrowserRouter>
                <Header
                    userData={null}
                />
            </BrowserRouter>
        )
        const btns = screen.getAllByRole('button')
        expect(btns.length).toBe(2)
    })
})