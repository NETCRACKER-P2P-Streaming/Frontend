import {authUser, regUser} from '../user_reducer'
import {auth, register, getUser} from '../../../API/user_api'
import {store} from '../../store'
import {Cookies} from 'react-cookie'

jest.mock('../../../API/user_api', () => ({
    __esModule: true,

    auth: jest.fn(),
    register: jest.fn(),
    getUser: jest.fn()
}))

describe('User reducer auth test', () => {
    it('Resolved', async () => {
        const formData = {
            username: 'Test username',
            password: 'Test pass'
        }
        const userData = {
            username: 'test username',
            userAttributes: [
                {
                    name: 'name',
                    value: 'Test name'
                },
                {
                    name: 'surname',
                    value: 'Test surname'
                },
                {
                    name: 'email',
                    value: 'test@mail.ru'
                },
            ]
        }
        const expectedUserData = {
            username: 'test username',
            userAttributes: {
                name: 'Test name',
                surname: 'Test surname',
                email: 'test@mail.ru'
            }
        }
        expect(store.getState().user.userData).toBeFalsy()
        auth.mockImplementationOnce(async formData => ({
            accessToken: 'acc tok',
            accessTokenTimeout: 60000,
            refreshTokenTimeout: 61000
        }))
        getUser.mockImplementationOnce(async userName => userData)
        const authUserInternal = authUser(formData)
        await authUserInternal(store.dispatch)

        const cookies = new Cookies()
        expect(store.getState().user.userData).toStrictEqual(expectedUserData)
        expect(cookies.getAll().accessToken).toBe('acc tok')
        expect(cookies.getAll().refreshTokenTimeout).toBe('61000')
    })

    it('Rejected', async () => {
        const authUserInternal = authUser({})
        auth.mockImplementationOnce(async formData => Promise.reject(new Error('Testing error')))

        try {
            await authUserInternal(store.dispatch)
        } catch (err) {
            expect(err.message).toBe('Testing error')
        }
    })
})

describe('User reducer reg test', () => {
    const formData = {
        username: 'Test username',
        password: 'Test pass',
        repeatedPass: 'Test pass'
    }
    let regUserInternal
    beforeEach(() => regUserInternal = regUser(formData))

    it('Resolved', async () => {
        register.mockImplementationOnce(async formData => true)
        await regUserInternal(store.dispatch)
        expect(true).toBeTruthy()
    })

    it('Rejected with request error', async () => {
        register.mockImplementationOnce(async formData => Promise.reject(new Error('Testing error')))
        try {
            await regUserInternal(store.dispatch)
        } catch (err) {
            expect(err.message).toBe('Testing error')
        }
    })

    it('Rejected with request error', async () => {
        register.mockImplementationOnce(async formData => false)
        try {
            await regUserInternal(store.dispatch)
        } catch (err) {
            expect(err.message).toBe('Registration failed. Try again later')
        }
    })
})