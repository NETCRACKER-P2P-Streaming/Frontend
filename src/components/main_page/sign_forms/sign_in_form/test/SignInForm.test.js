import {fireEvent, render, screen} from '@testing-library/react'
import SignInForm from '../SignInForm'
import React from 'react'

describe('Sign in form rendering', () => {
    let rendered = null

    beforeEach(() => rendered = render(<SignInForm/>))

    it('Login input founded', () => {
        const loginInput = rendered.container.querySelector('#username')
        expect(loginInput).toBeInTheDocument()
    })

    it('Password input founded', () => {
        const passInput = rendered.container.querySelector('#password')
        expect(passInput).toBeInTheDocument()
    })

    it('Submit btn founded', () => {
        const submitBtn = rendered.container.querySelector('button[type=\'submit\']')
        expect(submitBtn).toBeInTheDocument()
    })

    it('Clear btn founded', () => {
        const submitBtn = rendered.container.querySelector('button[type=\'reset\']')
        expect(submitBtn).toBeInTheDocument()
    })

    it('Header text founded', () => {
        const signInText = screen.getByText(/sign in/i)
        expect(signInText).toBeInTheDocument()
    })
})

describe('Sign in form actions', () => {
    const primaryValue = {
        username: '',
        password: ''
    }
    let rendered = null
    let value = null
    let setValue = null

    let loginInput = null
    let passInput = null

    beforeEach(() => {
        value = {...primaryValue}
        setValue = (newVal) => value = newVal

        rendered = render(<SignInForm
            value={value}
            primaryValue={primaryValue}
            setValue={setValue}
            onSubmit={jest.fn()}
        />)
        loginInput = rendered.container.querySelector('#username')
        passInput = rendered.container.querySelector('#password')
    })
    afterEach(() => value = {...primaryValue})

    it('Fill form values', () => {

        expect({
            username: loginInput.value,
            password: passInput.value
        }).toStrictEqual(
            primaryValue
        )

        fireEvent.change(loginInput, {
            target: {value: 'Test input text'}
        })

        rendered.rerender(<SignInForm
            value={value}
            primaryValue={primaryValue}
            setValue={setValue}
            onSubmit={jest.fn()}
        />)

        fireEvent.change(passInput, {
            target: {value: 'Test password text'}
        })

        rendered.rerender(<SignInForm
            value={value}
            primaryValue={primaryValue}
            setValue={setValue}
            onSubmit={jest.fn()}
        />)

        expect({
            username: loginInput.value,
            password: passInput.value
        }).toStrictEqual({
            username: 'Test input text',
            password: 'Test password text'
        })
    })

    it('Clear values', () => {
        const clearBtn = rendered.container.querySelector('button[type=\'reset\']')
        setValue({
            password: '123',
            username: '123'
        })
        rendered.rerender(<SignInForm
            value={value}
            primaryValue={primaryValue}
            setValue={setValue}
            onSubmit={jest.fn()}
        />)

        fireEvent.click(clearBtn)

        rendered.rerender(<SignInForm
            value={value}
            primaryValue={primaryValue}
            setValue={setValue}
            onSubmit={jest.fn()}
        />)

        expect({
            username: loginInput.value,
            password: passInput.value
        }).toStrictEqual({
            username: '',
            password: ''
        })
    })
})

test('Error tendered', () => {
    render(<SignInForm
        authErrorMessage={'Testing error'}
    />)
    const errorText = screen.getByText(/Testing error/i)
    expect(errorText).toBeInTheDocument()
})