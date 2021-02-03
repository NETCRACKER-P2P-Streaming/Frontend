import {Cookies} from 'react-cookie'
import {refreshAccess} from '../API/user_api'

const cookies = new Cookies()

/**
 * Фукнция, проверяющая и обновляющая токены при необходимости
 *
 * @returns {Promise<boolean>} - Возвращает false в случае, если
 * refresh токен истек или при обновлении access токена произошла ошибка. В этом
 * случае пользователь должен авторизоваться снова. Если обновление не требуется, либо
 * access токен успешно обновлен - возвращает true
 */
export async function refreshTokensCookies() {
    if (!cookies.get('refreshTokenTimeout')) {
        cookies.remove('username')
        return false
    } else if (!cookies.get('accessToken')) {
        try {
            const res = await refreshAccess()

            setTokensCookies(
                res.accessToken,
                res.accessTokenTimeout,
                res.refreshTokenTimeout
            )
        } catch (err) {
            cookies.remove('username')
            console.log(err)
            return false
        }
    }
    return true
}

export function setTokensCookies(access, accessTimeout, refreshTimeout, username) {
    if (access && refreshTimeout && accessTimeout) {
        cookies.set(
            'accessToken',
            access,
            {
                expires: new Date(Date.now() + accessTimeout * 1000)
            }
        )
        cookies.set(
            'refreshTokenTimeout',
            refreshTimeout,
            {
                expires: new Date(Date.now() + refreshTimeout * 1000)
            }
        )
        if(username) {
            cookies.set(
                'username',
                username
            )
        }
    } else {
        throw new Error('Authorization error. Please try it again later')
    }
}

export function deleteTokensCookies() {
    cookies.remove('accessToken')
    cookies.remove('refreshTokenTimeout')
    cookies.remove('username')
}