import {authUser, regUser} from '../user_reducer'
import {auth, register, getUser} from '../../../API/user_api'
import {store} from '../../store'

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
        const expectedData = {
            name: 'Test name',
            surname: 'Test surname',
            email: 'test@mail.ru'
        }
        expect(store.getState().user.userData).toBeFalsy()
        auth.mockImplementationOnce(async formData => {})
        getUser.mockImplementationOnce(async userName => expectedData)
        const authUserInternal = authUser(formData)
        await authUserInternal(store.dispatch)

        expect(store.getState().user.userData).toStrictEqual(expectedData)
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