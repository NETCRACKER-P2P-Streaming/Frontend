import {loadApp} from '../app_reducer'
import {Cookies} from 'react-cookie'
import {refreshAccess, getUser} from '../../../API/user_api'
import {render} from '@testing-library/react'
import React from 'react'
import {store} from '../../store'

jest.mock('../../../API/user_api', () => ({
    __esModule: true,
    refreshAccess: jest.fn(),
    getUser: jest.fn()
}))

describe('Load app tests', () => {

    const cookies = new Cookies()

    beforeAll(() => render(<div />))
    afterEach(() => {
        cookies.remove('accessToken')
        cookies.remove('username')
        cookies.remove('refreshTokenTimeout')
    })

    it('Refresh failed with cookies test', async () => {
        cookies.set('accessToken', 'acc token value')
        cookies.set('username', 'test username value')
        refreshAccess.mockImplementationOnce(async () => ({
            accessToken: 'test acc token',
            accessTokenTimeout: 9000,
            refreshTokenTimeout: 12000
        }))
        getUser.mockImplementationOnce(async () => ({
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
        }))
        const loadAppFunc = loadApp()
        await loadAppFunc(store.dispatch)

        expect(cookies.get('accessToken')).toBeFalsy()
        expect(cookies.get('username')).toBeFalsy()
    })

    it('Refresh failed with getting user test', async () => {
        cookies.set('refreshTokenTimeout', 9000)
        cookies.set('username', 'test username value')
        refreshAccess.mockImplementationOnce(async () => ({
            accessToken: 'test acc token',
            accessTokenTimeout: 9000,
            refreshTokenTimeout: 12000
        }))
        getUser.mockImplementationOnce(async () => Promise.reject(new Error('Custom test error')))
        const loadAppFunc = loadApp()
        try {
            await loadAppFunc(store.dispatch)
            expect(true).toBeFalsy()
        } catch (err) {
            expect(err.message).toBe('Custom test error')
        }

        expect(cookies.get('accessToken')).toBeFalsy()
        expect(cookies.get('username')).toBeFalsy()
    })

    it('Refresh done test', async () => {
        cookies.set('accessToken', 'acc token value')
        cookies.set('refreshTokenTimeout', 9000)
        cookies.set('username', 'test username value')
        refreshAccess.mockImplementationOnce(async () => ({
            accessToken: 'test acc token',
            accessTokenTimeout: 9000,
            refreshTokenTimeout: 12000
        }))
        getUser.mockImplementationOnce(async () => ({
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
        }))
        const loadAppFunc = loadApp()
        await loadAppFunc(store.dispatch)

        expect(cookies.get('accessToken')).toBe('acc token value')
        expect(cookies.get('username')).toBe('test username value')
    })
})