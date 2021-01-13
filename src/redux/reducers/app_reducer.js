const SET_LOADING = 'SET_LOADING'
const SET_AUTH_FORM_OPEN = 'SET_AUTH_FORM_OPEN'

const defaultState = {

    // Флаг загрузки приложения в общем и целом
    loading: false,

    // Флаг открытия \ закрытия формы авторизации
    isAuthFormOpen: false
}

export default function appReducer(state = defaultState, action) {
    switch (action.type) {
        case(SET_LOADING): {
            return {
                ...state,
                loading: action.loading
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