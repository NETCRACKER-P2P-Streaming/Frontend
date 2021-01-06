import {render, screen} from '@testing-library/react'
import StreamsList from '../StreamsList'
import React from 'react'


describe('Streams list render test', () => {

    it('Loading render test', () => {
        const {container} = render(<StreamsList
            loading={true}
            streamsList={[]}
        />)
        const loadingIndicator = container.querySelector('body > div > div > svg')
        expect(loadingIndicator).toBeInTheDocument()
    })

    it('Component after loading test', () => {
        const size = 10
        const {container} = render(<StreamsList
            loading={false}
            streamsList={Array(size).fill(1)}
        />)
        const loadingIndicator = container.querySelector('body > div > div > svg')
        const streams = container.querySelectorAll('body > div > div > div')

        expect(loadingIndicator).not.toBeInTheDocument()
        expect(streams.length).toBe(size)
    })

})