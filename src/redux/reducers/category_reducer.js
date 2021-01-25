import {getCategoriesToSearch} from '../../API/category_api'

const SET_CATEGORIES = 'SET_CATEGORIES'
const SET_CATEGORIES_TOTAL_COUNT = 'SET_CATEGORIES_TOTAL_COUNT'

const defaultState = {
    categoriesList: [],
    totalCount: 0,
    pageSize: 10
}

export default function categoryReducer(state = defaultState, action) {
    switch (action.type) {
        case(SET_CATEGORIES): {
            return {
                ...state,
                categoriesList: action.categoriesList
            }
        }
        case(SET_CATEGORIES_TOTAL_COUNT): {
            return {
                ...state,
                totalCount: action.totalCount
            }
        }
        default: {
            return state
        }
    }
}

function setCategoriesAC(newCategoriesList) {
    return {
        type: SET_CATEGORIES,
        categoriesList: newCategoriesList
    }
}
function setCategoriesTotalCountAC(categoriesTotalCount) {
    return {
        type: SET_CATEGORIES_TOTAL_COUNT,
        totalCount: categoriesTotalCount
    }
}


export function getCategoriesToSearchFromServ() {
    return async dispatch => {
        try {
            const response = await getCategoriesToSearch()
            dispatch(setCategoriesAC(response))
            dispatch(setCategoriesTotalCountAC(response.length))
        } catch (err) {
            return Promise.reject(err)
        }
    }
}