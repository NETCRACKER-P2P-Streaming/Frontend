import {screen, render, fireEvent} from '@testing-library/react'
import FormCore from '../FormCore'
import React from 'react'
import {Grommet} from 'grommet'

describe('Stream search form items render test', () => {

    it('Search rendered', () => {
        render(
            <Grommet>
                <FormCore
                    loading={false}
                    values={{}}
                    setValues={jest.fn}
                    categoriesColl={Array(5).map((k, i) => i)}
                    size={'size'}
                />
            </Grommet>
        )
        const searchField = screen.getByPlaceholderText(/Enter title/i)
        expect(searchField).toBeInTheDocument()
    })

    it('Checkbox loading indicator rendered', () => {
        const component = render(
            <Grommet>
                <FormCore
                    loading={true}
                    values={{}}
                    setValues={jest.fn}
                    categoriesColl={null}
                    size={'size'}
                />
            </Grommet>
        )
        const loadingIndicator = component.container.querySelector('form > svg')
        expect(loadingIndicator).toBeInTheDocument()
    })

    it('Checkboxes rendered', () => {
        const chAr = ['SoMeThiNg', 'StRanGE']
        const component = render(
            <Grommet>
                <FormCore
                    loading={false}
                    values={{}}
                    setValues={jest.fn}
                    categoriesColl={chAr}
                />
            </Grommet>
        )
        for(let i of chAr) {
            const label = component.getByText(i)
            expect(label).toBeInTheDocument()
        }
        expect(chAr.length).toBe(chAr.length)
    })

})

describe('Stream search form actions test', () => {

    it('Search input test', () => {

        let values = {title: ''}
        let setValues = (newVal) => values = newVal

        const component = render(
            <Grommet>
                <FormCore
                    loading={false}
                    values={values}
                    setValues={setValues}
                    categoriesColl={Array(5).map((k, i) => i)}
                    size={'size'}
                />
            </Grommet>
        )
        const inputField = component.getByPlaceholderText(/Enter title/i)

        fireEvent.change(inputField, {
            target: {value: 'test input value'}
        })

        component.rerender(
            <Grommet>
                <FormCore
                    loading={false}
                    values={values}
                    setValues={setValues}
                    categoriesColl={Array(5).map((k, i) => i)}
                    size={'size'}
                />
            </Grommet>
        )
        expect(inputField.value).toBe('test input value')

    })

})

