import {fireEvent, render, screen} from '@testing-library/react'
import StreamSearchFormMobile from '../StreamSearchFormMobile'
import React from 'react'
import {Grommet} from 'grommet'

describe('Stream search form mobile render test', () => {

    it('Hide form test', () => {
        let collapse = true
        const component = render(<Grommet>
            <StreamSearchFormMobile
                categoriesColl={[]}
                setValues={jest.fn}
                values={{}}
                collapse={collapse}
                setCollapse={() => collapse = false}
            />
        </Grommet>)

        expect(screen.getByPlaceholderText(/Enter title/i)).toBeInTheDocument()

        const closeButton = component.container.querySelector('body > div > div > div > button')

        fireEvent.click(closeButton)

        component.rerender(<Grommet>
            <StreamSearchFormMobile
                categoriesColl={[]}
                setValues={jest.fn}
                values={{}}
                collapse={collapse}
                setCollapse={() => collapse = false}
            />
        </Grommet>)
        const input = screen.queryByPlaceholderText(/Enter title/i)
        expect(input).toBeFalsy()
    })

    it('Open form test', () => {
        let collapse = false
        const component = render(<Grommet>
            <StreamSearchFormMobile
                categoriesColl={[]}
                setValues={jest.fn}
                values={{}}
                collapse={collapse}
                setCollapse={() => collapse = true}
            />
        </Grommet>)

        const input = screen.queryByPlaceholderText(/Enter title/i)
        expect(input).toBeFalsy()

        const openButton = component.container.querySelector('body > div > div > div > button')

        fireEvent.click(openButton)

        component.rerender(<Grommet>
            <StreamSearchFormMobile
                categoriesColl={[]}
                setValues={jest.fn}
                values={{}}
                collapse={collapse}
                setCollapse={() => collapse = true}
            />
        </Grommet>)

        expect(screen.getByPlaceholderText(/Enter title/i)).toBeInTheDocument()
    })
})
