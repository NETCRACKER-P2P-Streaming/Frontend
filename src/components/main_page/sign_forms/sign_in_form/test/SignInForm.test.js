import {fireEvent, render, screen} from '@testing-library/react'
import {queryByAttribute} from '@testing-library/dom'
import SignInForm from '../SignInForm'
import React from 'react'

describe('Sign in form rendering', () => {
    let getById = null
    let rendered = null

    beforeEach(() => {
        rendered = render(<SignInForm/>)
        getById = queryByAttribute.bind(null, 'id')
    })

    it('Login input founded', () => {
        const loginInput = getById(rendered.container, 'login')
        expect(loginInput).toBeInTheDocument()
    })

    it('Password input founded', () => {
        const passInput = getById(rendered.container, 'password')
        expect(passInput).toBeInTheDocument()
    })

    it('Submit btn founded', () => {
        const submitBtn = screen.getByText(/Log in/i)
        expect(submitBtn).toBeInTheDocument()
    })

    it('Clear btn founded', () => {
        const submitBtn = screen.getByText(/Clear/i)
        expect(submitBtn).toBeInTheDocument()
    })
})

describe('Sign in form actions', () => {
    let getById = null
    let rendered = null
    const primaryValue = {
        login: '',
        password: ''
    }
    let value = {}
    let setValue = jest.fn()

    beforeEach(() => {
        getById = queryByAttribute.bind(null, 'id')
        value = primaryValue
        setValue = (newVal) => value = newVal
        rendered = render(<SignInForm
            value={value}
            primaryValue={primaryValue}
            setValue={setValue}
            onSubmit={jest.fn()}
        />)
    })

    it('Fill form values', () => {
        const loginInput = getById(rendered.container, 'login')
        const passInput = getById(rendered.container, 'password')

        expect(loginInput.value).toBe(primaryValue.login)
        expect(passInput.value).toBe(primaryValue.password)

        const testingValueLogin = 'Test input text'
        const testingValuePassword = 'Test password text'

        fireEvent.change(loginInput, {
            target: {value: testingValueLogin}
        })
        fireEvent.change(passInput, {
            target: {value: testingValuePassword}
        })
        rendered.rerender(<SignInForm
            value={{
                password: testingValuePassword,
                login: testingValueLogin
            }}
            primaryValue={primaryValue}
            setValue={setValue}
            onSubmit={jest.fn()}
        />)
        expect(loginInput.value).toBe(testingValueLogin)
        expect(passInput.value).toBe(testingValuePassword)
    })

    it('Clear values', () => {
        const loginInput = getById(rendered.container, 'login')
        const passInput = getById(rendered.container, 'password')
        const clearBtn = screen.getByText('Clear')

        fireEvent.change(loginInput, {
            target: {value: '123'}
        })
        fireEvent.change(passInput, {
            target: {value: '123'}
        })

        rendered.rerender(<SignInForm
            value={{
                password: '123',
                login: '123'
            }}
            primaryValue={primaryValue}
            setValue={setValue}
            onSubmit={jest.fn()}
        />)

        fireEvent.click(clearBtn)

        rendered.rerender(<SignInForm
            value={primaryValue}
            primaryValue={primaryValue}
            setValue={setValue}
            onSubmit={jest.fn()}
        />)
        expect(loginInput.value).toBe(primaryValue.login)
        expect(passInput.value).toBe(primaryValue.password)
    })
})