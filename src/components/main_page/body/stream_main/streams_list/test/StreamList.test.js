import {render} from '@testing-library/react'
import StreamsList from '../StreamsList'
import React from 'react'
import {fireEvent} from "@testing-library/dom";


describe('Streams list render test', () => {

    it('Streams list onMore trigger test', async () => {
        function generateStreamData(skip) {
            return Array(10).fill(0).map((_, i) => {
                return {
                    userId: '' + (i + skip),
                    streamDesc: {
                        title: 'Stream ' + (i + skip),
                        fullCategories: [],
                        linkImage: 'image'
                    },
                    information: {
                        countViewers: 0
                    },
                    user: {
                        linkImage: 'test link image'
                    }
                }
            })
        }
        let skip = 0
        let streamsData = generateStreamData(0)
        skip += 10

        const component = render(<StreamsList
            streamsList={streamsData}
            hasMore={true}
            height={'200px'}
            onMore={() => {
                streamsData = [...streamsData, ...generateStreamData(skip)]
                skip += 10
            }}
        />)

        const streamContainer = component.container.querySelector('#stream_container')
        expect(streamContainer).toBeInTheDocument()
        streamContainer.addEventListener('scroll', () => {})


        let streamsItems = component.container.querySelectorAll('svg')
        expect(streamsData.length).toBe(10)
        expect(streamsItems.length).toBe(10 * 2)

        fireEvent.scroll(streamContainer, { target: { scrollY: streamContainer.scrollHeight } })

        component.rerender(<StreamsList
            streamsList={streamsData}
            hasMore={true}
            height={'200px'}
            onMore={() => {
                streamsData = [...streamsData, ...generateStreamData(skip)]
                skip += 10
            }}
        />)

        streamsItems = component.container.querySelectorAll('svg')
        expect(streamsData.length).toBe(20)
        expect(streamsItems.length).toBe(20 * 2)
    })

})