import {screen, render} from '@testing-library/react'
import Header from '../Header'
import {BrowserRouter} from 'react-router-dom'

describe('Header test', () => {
    it('Logo text', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        )
        const searchedLogoContent = screen.getByText(/P2P SERVICE/i)
        expect(searchedLogoContent).toBeInTheDocument()
    })
})