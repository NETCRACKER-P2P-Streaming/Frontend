import {render} from '@testing-library/react'
import {Cookies} from 'react-cookie'
import {deleteTokensCookies, setTokensCookies, refreshTokensCookies} from '../cookiesUtils'
import {refreshAccess} from '../../API/user_api'
import React from 'react'

jest.mock('../../API/user_api', () => ({
    __esModule: true,
    refreshAccess: jest.fn()
}))

describe('Cookies utils tests', () => {
    const cookies = new Cookies()

    beforeAll(() => render(<div />))
    afterEach(() => {
        cookies.remove('accessToken')
        cookies.remove('refreshTokenTimeout')
    })

    it('Delete cookies tokens test', () => {
        cookies.set('accessToken', 'acc value')
        cookies.set('refreshTokenTimeout', 'ref value')
        cookies.set('username', 'username value')

        let allCook = cookies.getAll()
        expect(allCook.accessToken).toBe('acc value')
        expect(allCook.refreshTokenTimeout).toBe('ref value')
        expect(allCook.username).toBe('username value')

        deleteTokensCookies()
        allCook = cookies.getAll()

        expect(allCook.accessToken).toBeFalsy()
        expect(allCook.refreshTokenTimeout).toBeFalsy()
        expect(allCook.username).toBeFalsy()
    })

    it('Set all cookies tokens test', () => {
        let allCook = cookies.getAll()

        expect(allCook.accessToken).toBeFalsy()
        expect(allCook.refreshTokenTimeout).toBeFalsy()
        expect(allCook.username).toBeFalsy()

        setTokensCookies('acc token test', 20000, 40000, 'user test')

        allCook = cookies.getAll()
        expect(allCook.accessToken).toBe('acc token test')
        expect(allCook.refreshTokenTimeout).toBe('40000')
        expect(allCook.username).toBe('user test')
    })

    it('Refresh tokens test without refresh-token', async () => {
        cookies.set('accessToken', 'acc value')
        cookies.set('username', 'user value')
        refreshAccess.mockImplementationOnce(async () => true)

        const result = await refreshTokensCookies()
        expect(result).toBeFalsy()
        expect(cookies.get('username')).toBeFalsy()
    })

    it('Refresh tokens test without only access token (without errors)', async () => {
        cookies.set('refreshTokenTimeout', '10000')
        cookies.set('username', 'user value')
        refreshAccess.mockImplementationOnce(async () => ({
            accessToken: 'test acc token',
            accessTokenTimeout: 9000,
            refreshTokenTimeout: 12000
        }))
        const result = await refreshTokensCookies()
        expect(result).toBeTruthy()

        expect(cookies.get('accessToken')).toBe('test acc token')
        expect(cookies.get('refreshTokenTimeout')).toBe('12000')
        expect(cookies.get('username')).toBe('user value')
    })

    it('Refresh tokens test without only access token (with errors)', async () => {
        cookies.set('refreshTokenTimeout', '10000')
        cookies.set('username', 'user value')
        refreshAccess.mockImplementationOnce(async () => Promise.reject(new Error('test error')))
        const result = await refreshTokensCookies()
        expect(result).toBeFalsy()

        expect(cookies.get('accessToken')).toBeFalsy()
        expect(cookies.get('username')).toBeFalsy()
        expect(cookies.get('refreshTokenTimeout')).toBe('10000')
    })

    it('Refresh tokens test with all tokens', async () => {
        cookies.set('refreshTokenTimeout', '10000')
        cookies.set('accessToken', 'acc value')
        cookies.set('username', 'user value')
        refreshAccess.mockImplementationOnce(async () => ({
            accessToken: 'test acc token',
            accessTokenTimeout: 9000,
            refreshTokenTimeout: 12000
        }))
        const result = await refreshTokensCookies()
        expect(result).toBeTruthy()

        expect(cookies.get('accessToken')).toBe('acc value')
        expect(cookies.get('refreshTokenTimeout')).toBe('10000')
        expect(cookies.get('username')).toBe('user value')
    })
})