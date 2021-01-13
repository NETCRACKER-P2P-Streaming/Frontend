import {auth, register, getUser} from '../../API/user_api'

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

            // Удаление из данных формы поля повторенного пароля
            const userDataWithoutSecondPass = {...userData}
            delete userDataWithoutSecondPass.repeatedPass

            const result = await register(userDataWithoutSecondPass)
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
 * @returns {function(*): Promise<undefined>}
 */
export function authUser(formData) {
    return async dispatch => {
        try {
            //Если auth не возвращает ошибку - можно получать данные пользователя
            await auth(formData)
            const user = await getUser(formData.username)
            dispatch(setUserDataAC(user))
        } catch (err) {
            return Promise.reject(err)
        }
    }
}