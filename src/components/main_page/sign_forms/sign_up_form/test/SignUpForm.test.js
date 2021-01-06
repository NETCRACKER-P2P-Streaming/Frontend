import {screen, render, fireEvent} from '@testing-library/react'
import SignUpForm from '../SignUpForm'
import {BrowserRouter} from 'react-router-dom'
import React from 'react'

const componentInitialValues = {
    primaryValueFirstPage: {
        first_name: '',
        last_name: '',
        email: '',
        status: '',
        avatar: ''
    },
    primaryValueSecondPage: {
        login: '',
        password: '',
        repeatedPass: ''
    },
    validators: {
        login: null,
        password: null,
        repeatedPass: null
    },
    validateFields: jest.fn
}


describe('Sign up first page test', () => {
    let rendered = null
    let firstNameField = null
    let secondNameField = null
    let emailField = null
    let statusField = null
    let avatarField = null
    let value = null
    let setValue = null

    beforeEach(() => {
        value = {...componentInitialValues.primaryValueFirstPage}
        setValue = (nextValue) => value = nextValue
        rendered = render(<BrowserRouter>
            <SignUpForm
                value={value}
                setValue={setValue}
                formPage={1}
            />
        </BrowserRouter>)
        firstNameField = rendered.container.querySelector('input[name=\'first_name\']')
        secondNameField = rendered.container.querySelector('input[name=\'last_name\']')
        emailField = rendered.container.querySelector('input[name=\'email\']')
        statusField = rendered.container.querySelector('input[name=\'status\']')
        avatarField = rendered.container.querySelector('input[name=\'avatar\']')
    })
    afterEach(() => value = {...componentInitialValues.primaryValueFirstPage})

    it('First name field rendered', () => expect(firstNameField).toBeInTheDocument())

    it('Last name field rendered', () => expect(secondNameField).toBeInTheDocument())

    it('Email field rendered', () => expect(emailField).toBeInTheDocument())

    it('Status field rendered', () => expect(statusField).toBeInTheDocument())

    it('Avatar field rendered', () => expect(avatarField).toBeInTheDocument())

    it('Page change btn rendered', () => {
        const changeBtn = rendered.container.querySelector('#page_change_btn')
        expect(changeBtn).toBeInTheDocument()
    })

    it('Submit btn must be not rendered', () => {
        const submitBtn = rendered.container.querySelector('button[type=\'submit\']')
        expect(submitBtn).not.toBeInTheDocument()
    })

    it('Fill values', () => {
        expect({
            first_name: firstNameField.value,
            last_name: secondNameField.value,
            email: emailField.value,
            status: statusField.value,
            avatar: avatarField.value
        }).toStrictEqual({
            first_name: value.first_name,
            last_name: value.last_name,
            email: value.email,
            status: value.status,
            avatar: value.avatar
        })

        fireEvent.change(firstNameField, {
            target: {value: 'new first name'}
        })
        fireEvent.change(secondNameField, {
            target: {value: 'new last name'}
        })
        fireEvent.change(emailField, {
            target: {value: 'new email'}
        })
        fireEvent.change(statusField, {
            target: {value: 'new status'}
        })
        fireEvent.change(avatarField, {
            target: {value: 'new avatar'}
        })
        setValue({
            first_name: 'new first name',
            last_name: 'new last name',
            email: 'new email',
            status: 'new status',
            avatar: 'new avatar'
        })

        rendered.rerender(<BrowserRouter>
            <SignUpForm
                value={value}
                setValue={setValue}
                formPage={1}
            />
        </BrowserRouter>)
        expect({
            first_name: firstNameField.value,
            last_name: secondNameField.value,
            email: emailField.value,
            status: statusField.value,
            avatar: avatarField.value
        }).toStrictEqual({
            first_name: 'new first name',
            last_name: 'new last name',
            email: 'new email',
            status: 'new status',
            avatar: 'new avatar'
        })
    })
})


describe('Sign up second page test', () => {
    let rendered = null
    let value = null
    let setValue = null
    let loginField = null
    let passField = null
    let repeatedPassField = null

    beforeEach(() => {
        value = {...componentInitialValues.primaryValueSecondPage}
        setValue = (nextValue) => value = nextValue
        rendered = render(<BrowserRouter>
            <SignUpForm
                value={value}
                setValue={setValue}
                formPage={2}
                validators={componentInitialValues.validators}
                validateField={componentInitialValues.validateFields}
            />
        </BrowserRouter>)

        loginField = rendered.container.querySelector('input[name=\'login\']')
        passField = rendered.container.querySelector('input[name=\'password\']')
        repeatedPassField = rendered.container.querySelector('input[name=\'repeatedPass\']')
    })

    afterEach(() => value = {...componentInitialValues.primaryValueSecondPage})

    it('Login field rendered', () => expect(loginField).toBeInTheDocument())

    it('Password field rendered', () => expect(passField).toBeInTheDocument())

    it('Repeated password field rendered', () => expect(repeatedPassField).toBeInTheDocument())

    it('Page change btn rendered', () => {
        const changeBtn = rendered.container.querySelector('#page_change_btn')
        expect(changeBtn).toBeInTheDocument()
    })

    it('Submit btn must be rendered', () => {
        const submitBtn = rendered.container.querySelector('button[type=\'submit\']')
        expect(submitBtn).toBeInTheDocument()
    })

    it('Fill second page test', () => {

        expect({
            login: loginField.value,
            password: passField.value,
            repeatedPass: repeatedPassField.value
        }).toStrictEqual(
            componentInitialValues.primaryValueSecondPage
        )

        fireEvent.change(loginField, {
            target: {value: 'new login'}
        })

        rendered.rerender(<BrowserRouter>
            <SignUpForm
                value={value}
                setValue={setValue}
                formPage={2}
                validators={componentInitialValues.validators}
                validateField={componentInitialValues.validateFields}
            />
        </BrowserRouter>)

        fireEvent.change(passField, {
            target: {value: 'new pass'}
        })

        rendered.rerender(<BrowserRouter>
            <SignUpForm
                value={value}
                setValue={setValue}
                formPage={2}
                validators={componentInitialValues.validators}
                validateField={componentInitialValues.validateFields}
            />
        </BrowserRouter>)

        fireEvent.change(repeatedPassField, {
            target: {value: 'new repeated pass'}
        })

        rendered.rerender(<BrowserRouter>
            <SignUpForm
                value={value}
                setValue={setValue}
                formPage={2}
                validators={componentInitialValues.validators}
                validateField={componentInitialValues.validateFields}
            />
        </BrowserRouter>)
        expect({
            login: loginField.value,
            password: passField.value,
            repeatedPass: repeatedPassField.value
        }).toStrictEqual({
            login: 'new login',
            password: 'new pass',
            repeatedPass: 'new repeated pass'
        })
    })
})

test('Transition from first to second page', () => {

    let page = 1
    let setPage = (newPage) => page = newPage

    const rendered = render(<BrowserRouter>
        <SignUpForm
            value={{}}
            setValue={{}}
            formPage={page}
            setFormPage={setPage}
            validators={componentInitialValues.validators}
            validateField={componentInitialValues.validateFields}
        />
    </BrowserRouter>)
    const pageChangeBtn = rendered.container.querySelector('#page_change_btn')

    expect(page).toBe(1)

    fireEvent.click(pageChangeBtn)

    rendered.rerender(<BrowserRouter>
        <SignUpForm
            value={{}}
            setValue={{}}
            formPage={page}
            setFormPage={setPage}
            validators={componentInitialValues.validators}
            validateField={componentInitialValues.validateFields}
        />
    </BrowserRouter>)

    expect(page).toBe(2)

    fireEvent.click(pageChangeBtn)

    rendered.rerender(<BrowserRouter>
        <SignUpForm
            value={{}}
            setValue={{}}
            formPage={page}
            setFormPage={setPage}
            validators={componentInitialValues.validators}
            validateField={componentInitialValues.validateFields}
        />
    </BrowserRouter>)

    expect(page).toBe(1)
})

test('Small size test', () => {
    const rendered = render(<BrowserRouter>
        <SignUpForm
            value={{}}
            setValue={{}}
            size={'small'}
            validators={componentInitialValues.validators}
            validateField={componentInitialValues.validateFields}
        />
    </BrowserRouter>)
    const backArrowInsideForm = rendered.container.querySelector('form > button[type=\'button\'] > a')
    expect(backArrowInsideForm).toBeInTheDocument()
})

test('Not small size test', () => {
    const rendered = render(<BrowserRouter>
        <SignUpForm
            value={{}}
            setValue={{}}
            size={'medium'}
            validators={componentInitialValues.validators}
            validateField={componentInitialValues.validateFields}
        />
    </BrowserRouter>)
    const backArrowInsideForm = rendered.container.querySelector('form > button[type=\'button\'] > a')
    expect(backArrowInsideForm).not.toBeInTheDocument()
})

