import {render, fireEvent, screen} from '@testing-library/react'
import SignUpForm from '../SignUpForm'
import {BrowserRouter} from 'react-router-dom'
import axios from 'axios'
import React from 'react'

const componentInitialValues = {
    primaryValueFirstPage: {
        firstName: '',
        lastName: '',
        email: '',
        description: '',
        linkImage: ''
    },
    primaryValueSecondPage: {
        username: '',
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
                setErrorMessage={jest.fn}
            />
        </BrowserRouter>)
        firstNameField = rendered.container.querySelector('input[name=\'firstName\']')
        secondNameField = rendered.container.querySelector('input[name=\'lastName\']')
        emailField = rendered.container.querySelector('input[name=\'email\']')
        statusField = rendered.container.querySelector('input[name=\'description\']')
        avatarField = rendered.container.querySelector('input[name=\'linkImage\']')
    })
    afterEach(() => value = {...componentInitialValues.primaryValueFirstPage})

    it('First name field rendered', () => expect(firstNameField).toBeInTheDocument())

    it('Last name field rendered', () => expect(secondNameField).toBeInTheDocument())

    it('Email field rendered', () => expect(emailField).toBeInTheDocument())

    it('Description field rendered', () => expect(statusField).toBeInTheDocument())

    it('Link image field rendered', () => expect(avatarField).toBeInTheDocument())

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
            firstName: firstNameField.value,
            lastName: secondNameField.value,
            email: emailField.value,
            description: statusField.value,
            linkImage: avatarField.value
        }).toStrictEqual({
            firstName: value.firstName,
            lastName: value.lastName,
            email: value.email,
            description: value.description,
            linkImage: value.linkImage
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
            firstName: 'new first name',
            lastName: 'new last name',
            email: 'new email',
            description: 'new status',
            linkImage: 'new avatar'
        })

        rendered.rerender(<BrowserRouter>
            <SignUpForm
                value={value}
                setValue={setValue}
                formPage={1}
                setErrorMessage={jest.fn}
            />
        </BrowserRouter>)
        expect({
            firstName: firstNameField.value,
            lastName: secondNameField.value,
            email: emailField.value,
            description: statusField.value,
            linkImage: avatarField.value
        }).toStrictEqual({
            firstName: 'new first name',
            lastName: 'new last name',
            email: 'new email',
            description: 'new status',
            linkImage: 'new avatar'
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
    let errorMessage = null
    let setErrorMessage = null

    beforeEach(() => {
        value = {...componentInitialValues.primaryValueSecondPage}
        setValue = (nextValue) => value = nextValue
        errorMessage = 'Custom EM'
        setErrorMessage = (newErrorMessage) => errorMessage = newErrorMessage
        rendered = render(<BrowserRouter>
            <SignUpForm
                value={value}
                setValue={setValue}
                formPage={2}
                validators={componentInitialValues.validators}
                validateField={componentInitialValues.validateFields}
                setErrorMessage={setErrorMessage}
                errorMessage={errorMessage}
            />
        </BrowserRouter>)

        loginField = rendered.container.querySelector('input[name=\'username\']')
        passField = rendered.container.querySelector('input[name=\'password\']')
        repeatedPassField = rendered.container.querySelector('input[name=\'repeatedPass\']')
    })

    afterEach(() => {
        value = {...componentInitialValues.primaryValueSecondPage}
        errorMessage = 'Custom EM'
    })

    it('Login field rendered', () => expect(loginField).toBeInTheDocument())

    it('Password field rendered', () => expect(passField).toBeInTheDocument())

    it('Error message rendered', () => expect(rendered.getByText(/Custom EM/i)).toBeInTheDocument())

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
            username: loginField.value,
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
                setErrorMessage={jest.fn}
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
                setErrorMessage={jest.fn}
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
                setErrorMessage={jest.fn}
            />
        </BrowserRouter>)
        expect({
            username: loginField.value,
            password: passField.value,
            repeatedPass: repeatedPassField.value
        }).toStrictEqual({
            username: 'new login',
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

test('Sign up form error message rendered', async () => {
    let errorMessage = 'Custom EM'
    const setErrorMessage = (newErrorMessage) => errorMessage = newErrorMessage
    const {container, findByText, rerender} = render(<BrowserRouter>
        <SignUpForm
            value={{
                firstName: '123',
                lastName: '123',
                email: '123',
                description: '123',
                linkImage: '123',
                username: '123',
                password: '123',
                repeatedPass: '123'
            }}
            setValue={{}}
            formPage={2}
            validators={componentInitialValues.validators}
            validateField={componentInitialValues.validateFields}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
            onSubmit={() => setErrorMessage('New error message')}
        />
    </BrowserRouter>)
    const submitBtn = container.querySelector('button[type=\'submit\']')

    fireEvent.click(submitBtn)

    rerender(<BrowserRouter>
        <SignUpForm
            value={{
                firstName: '123',
                lastName: '123',
                email: '123',
                description: '123',
                linkImage: '123',
                username: '123',
                password: '123',
                repeatedPass: '123'
            }}
            setValue={{}}
            formPage={2}
            validators={componentInitialValues.validators}
            validateField={componentInitialValues.validateFields}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
            onSubmit={() => setErrorMessage('New error message')}
        />
    </BrowserRouter>)
    const errorBlock = await findByText(/New error message/i)
    expect(errorBlock).toBeInTheDocument()
})

