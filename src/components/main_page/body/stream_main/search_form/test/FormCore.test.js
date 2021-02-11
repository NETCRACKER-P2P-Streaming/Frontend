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
                    streamsSortingOrders={[]}
                    streamsSortingTypes={[]}
                />
            </Grommet>
        )
        const searchField = screen.getByPlaceholderText(/Enter title/i)
        expect(searchField).toBeInTheDocument()
    })

    it('Categories checkboxes rendered', () => {
        const chAr = ['SoMeThiNg', 'StRanGE']
        const component = render(
            <Grommet>
                <FormCore
                    loading={false}
                    values={{}}
                    setValues={jest.fn}
                    categoriesColl={chAr}
                    streamsSortingOrders={[]}
                    streamsSortingTypes={[]}
                />
            </Grommet>
        )
        const categories = component.getAllByRole('checkbox')
        expect(categories.length).toBe(2)
    })

    it('Selects rendered', () => {
        const chAr = ['SoMeThiNg', 'StRanGE']
        const chArOrd = [
            {
                name: 'Order 1',
                id: 'Id 1'
            },
            {
                name: 'Order 2',
                id: 'Id 2'
            }
        ]

        const component = render(
            <Grommet>
                <FormCore
                    loading={false}
                    values={{}}
                    setValues={jest.fn}
                    categoriesColl={chAr}
                    streamsSortingOrders={chArOrd}
                    streamsSortingTypes={[]}
                />
            </Grommet>
        )
        const categories = component.getAllByRole('textbox')
        expect(categories.length).toBe(2)
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
                    streamsSortingOrders={[]}
                    streamsSortingTypes={[]}
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
                    streamsSortingOrders={[]}
                    streamsSortingTypes={[]}
                />
            </Grommet>
        )
        expect(inputField.value).toBe('test input value')

    })

})

