import {screen, render} from '@testing-library/react'
import StreamListItem from '../StreamListItem'
import React from 'react'

describe('Stream list item rendering test', () => {
    it('Stream without image test', () => {
        const component = render(<StreamListItem
            countViewers={0}
            fullCategories={[]}
            streamTitle={'-'}
            userId={0}
            avatarImage={'-'}
            streamImage={null}
        />)

        const image = screen.queryByAltText(/Stream image/i)
        expect(image).toBeFalsy()
        const svgDummy = component.container.querySelectorAll('svg')
        expect(svgDummy.length).toBe(1)
    })

    it('Stream with image test', () => {
        const component = render(<StreamListItem
            countViewers={0}
            fullCategories={[]}
            streamTitle={'-'}
            userId={0}
            avatarImage={'-'}
            streamImage={'testing src'}
        />)

        const image = screen.getByAltText(/Stream image/i)
        expect((/testing%20src/i).test(image.src)).toBeTruthy()
        const svgDummy = component.container.querySelectorAll('svg')
        expect(svgDummy.length).toBe(0)
    })

    it('Stream without user avatar test', () => {
        const component = render(<StreamListItem
            countViewers={0}
            fullCategories={[]}
            streamTitle={'-'}
            userId={0}
            avatarImage={null}
            streamImage={'-'}
        />)

        const avatar = component.container.querySelectorAll('[alt="Avatar image"]')
        expect(avatar.length).toBe(0)
        const svgDummy = component.container.querySelectorAll('svg')
        expect(svgDummy.length).toBe(1)
    })

    it('Stream with user avatar test', () => {
        const component = render(<StreamListItem
            countViewers={0}
            fullCategories={[]}
            streamTitle={'-'}
            userId={0}
            avatarImage={'-'}
            streamImage={'-'}
        />)

        const avatar = component.container.querySelectorAll('[alt="Avatar image"]')
        expect(avatar.length).toBe(1)
        const svgDummy = component.container.querySelectorAll('svg')
        expect(svgDummy.length).toBe(0)
    })

    it('Stream viewers count test', () => {
        render(<StreamListItem
            countViewers={195}
            fullCategories={[]}
            streamTitle={'-'}
            userId={0}
            avatarImage={'-'}
            streamImage={'-'}
        />)
        const viewersCount = screen.getByText(/195/i)
        expect(viewersCount).toBeInTheDocument()
    })

    it('Stream title test', () => {
        render(<StreamListItem
            countViewers={195}
            fullCategories={[]}
            streamTitle={'Testing stream title'}
            userId={0}
            avatarImage={'-'}
            streamImage={'-'}
        />)

        const streamTitle = screen.getByText(/Testing stream title/i)
        expect(streamTitle).toBeInTheDocument()
    })

    it('Stream username test', () => {
        render(<StreamListItem
            countViewers={195}
            fullCategories={[]}
            streamTitle={'-'}
            userId={'Testing username text'}
            avatarImage={'-'}
            streamImage={'-'}
        />)
        const streamTitle = screen.getByText(/Testing username text/i)
        expect(streamTitle).toBeInTheDocument()
    })

    it('Stream categories test (5)', () => {
        render(<StreamListItem
            countViewers={0}
            fullCategories={[
                {name: 'category 1'},
                {name: 'category 2'},
                {name: 'category 3'},
                {name: 'category 4'},
                {name: 'category 5'}
            ]}
            streamTitle={'-'}
            userId={'-'}
            avatarImage={'-'}
            streamImage={'-'}
        />)
        const categories = screen.getAllByText(/category\s\d/i)
        const moreText = screen.queryByText(/more/i)

        expect(categories.length).toBe(5)
        expect(moreText).toBeFalsy()
    })

    it('Stream categories test (more than 5)', () => {
        render(<StreamListItem
            countViewers={0}
            fullCategories={[
                {name: 'category 1'},
                {name: 'category 2'},
                {name: 'category 3'},
                {name: 'category 4'},
                {name: 'category 5'},
                {name: 'category 6'},
                {name: 'category 7'}
            ]}
            streamTitle={'-'}
            userId={'-'}
            avatarImage={'-'}
            streamImage={'-'}
        />)
        const categories = screen.getAllByText(/category\s\d/i)
        const moreText = screen.getByText(/2[\d\w\s]*more/i)

        expect(categories.length).toBe(5)
        expect(moreText).toBeInTheDocument()
    })
})