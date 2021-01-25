import {auth, register, getUser} from '../../API/user_api'

const SET_USER_DATA = 'SET_USER_DATA'
const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN'

const defaultState = {

    // Данные авторизированного пользователя
    userData: null,
    accessToken: null
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case(SET_USER_DATA): {
            return {
                ...state,
                userData: action.userData
            }
        }
        case(SET_ACCESS_TOKEN): {
            return {
                ...state,
                accessToken: action.accessToken
            }
        }
        default: {
            return state
        }
    }
}

export function setUserDataAC(userData) {
    return {
        type: SET_USER_DATA,
        userData
    }
}

function setAccessTokenAC(newAccessToken) {
    return {
        type: SET_ACCESS_TOKEN,
        accessToken: newAccessToken
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
                        value: userData.linkImage
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
            const result = await register(validUserData)
            if(!result) {
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
    return async (dispatch, getState) => {
        try {
            //Если auth не возвращает ошибку - можно получать данные пользователя
            const result = await auth(formData)
            dispatch(setAccessTokenAC(result.accessToken))
            const user = await getUser(getState().user.accessToken, formData.username)
            dispatch(setUserDataAC(user))
        } catch (err) {
            return Promise.reject(err)
        }
    }
}
