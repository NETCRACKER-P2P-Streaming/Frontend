import {Cookies} from 'react-cookie'
import {getUser} from '../../API/user_api'
import {setUserDataAC} from './user_reducer'
import {deleteTokensCookies, refreshTokensCookies} from '../../utlils/cookiesUtils'

const SET_LOADING = 'SET_LOADING'
const SET_AUTH_FORM_OPEN = 'SET_AUTH_FORM_OPEN'

let loadingClientsCount = 0

const defaultState = {

    // Флаг загрузки приложения в общем и целом
    loading: false,

    // Флаг открытия \ закрытия формы авторизации
    isAuthFormOpen: false
}

export default function appReducer(state = defaultState, action) {
    switch (action.type) {
        case(SET_LOADING): {
            if(changeLoadingStateNeeded(action.loading, loadingClientsCount)) {
                action.loading ? loadingClientsCount++ : loadingClientsCount--
                return {
                    ...state,
                    loading: action.loading
                }
            } else {
                action.loading ? loadingClientsCount++ : loadingClientsCount--
                return state
            }
        }
        case(SET_AUTH_FORM_OPEN): {
            return {
                ...state,
                isAuthFormOpen: action.isAuthFormOpen
            }
        }
        default: {
            return state
        }
    }
}

export function setLoadingAC(loadingState) {
    return {
        type: SET_LOADING,
        loading: loadingState
    }
}

export function setAuthFormOpenAC(newAuthFormOpenState) {
    return {
        type: SET_AUTH_FORM_OPEN,
        isAuthFormOpen: newAuthFormOpenState
    }
}

export function loadApp() {
    return async dispatch => {
        try {
            const isCookiesRefreshed = await refreshTokensCookies()
            if(isCookiesRefreshed) {
                let userCash = (new Cookies()).get('username')
                if (userCash) {
                    dispatch(setLoadingAC(true))
                    const userData = await getUser(userCash)
                    dispatch(setUserDataAC(userData))
                }
            }
        } catch (err) {
            deleteTokensCookies()
            return Promise.reject(err)
        } finally {
            dispatch(setLoadingAC(false))
        }
    }
}

// Helpers

function changeLoadingStateNeeded(newLoading, loadingClientsCount) {
    return (loadingClientsCount === 1 && !newLoading) ||
           (newLoading && loadingClientsCount === 0)
}