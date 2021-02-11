import {screen, render} from '@testing-library/react'
import SignActions from '../SignActions'
import {BrowserRouter} from 'react-router-dom'

describe('Sign actions rendering (header buttons)', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <SignActions/>
            </BrowserRouter>
        )
    })

    it('Sign in btn founded', () => {
        const signUpBtn = screen.getByText(/Sign in/i)
        expect(signUpBtn).toBeInTheDocument()
    })

    it('Sign up btn founded', () => {
        const signUpBtn = screen.getByText(/Sign up/i)
        expect(signUpBtn).toBeInTheDocument()
    })
})