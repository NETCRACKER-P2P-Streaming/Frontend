import {auth, register, getUser, logout} from '../../API/user_api'
import {Cookies} from 'react-cookie'
import {setTokensCookies, deleteTokensCookies} from '../../utlils/cookiesUtils'

const SET_USER_DATA = 'SET_USER_DATA'

const defaultState = {

    // Данные авторизированного пользователя
    userData: null
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case(SET_USER_DATA): {
            return {
                ...state,
                userData: action.userData
            }
        }
        default: {
            return state
        }
    }
}

export function setUserDataAC(userData) {
    if(userData) {
        userData.userAttributes = userData.userAttributes.reduce((acc, att) => {
            acc[att.name] = att.value
            return acc
        }, {})
    }
    return {
        type: SET_USER_DATA,
        userData
    }
}

/**
 *
 * @param userData Объект с данными, необходимыми для удачной авторизации
 * @returns {function(*): Promise<undefined>}
 */
export function regUser(userData) {
    return async dispatch => {
        try {
            const validUserData = {
                username: userData.username,
                password: userData.password,
                userAttributes: [
                    {
                        name: "name",
                        value: userData.firstName
                    },
                    {
                        name: "custom:linkImage",
                        value: userData.linkImage?.name
                    },
                    {
                        name: "custom:description",
                        value: userData.description
                    },
                    {
                        name: "family_name",
                        value: userData.lastName
                    },
                    {
                        name: "email",
                        value: userData.email
                    }
                ]
            }
            const result = await register({
                user: validUserData,
                file: userData.linkImage
            })
            if (!result) {
                throw new Error('Registration failed. Try again later')
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

/**
 *
 * @param formData Объект с данными, необходимыми для авторизации пользователя
 */
export function authUser(formData) {
    return async dispatch => {
        try {
            const result = await auth(formData)
            setTokensCookies(
                result.accessToken,
                result.accessTokenTimeout,
                result.refreshTokenTimeout,
                formData.username
            )
            let user = await getUser(formData.username)
            dispatch(setUserDataAC(user))
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

/**
 *
 * @returns {function(*): Promise<undefined>} - Функция, делающая запрос на выход
 * из системы. Если сервер отвечает положительно - удаляет токены из cookies и
 * убирает данные авторизированного пользователя из store. Иначе выбразывает ошибку
 */
export function userLogout() {
    return async dispatch => {
        try {
            const cookies = new Cookies()
            await logout(cookies.get('accessToken'))

            deleteTokensCookies()
            dispatch(setUserDataAC(null))
            return Promise.resolve()
        } catch (err) {
            return Promise.reject(err)
        }
    }
}




