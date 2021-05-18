import {
    getCategoriesToSearch, 
    getCategories, 
    addCategory, 
    deleteCategory,
    updateCategory
} from '../../API/category_api'
import {selectCategoriesPageSize, selectCategoriesList} from '../selectors/selectors'

const ADD_CATEGORIES = 'ADD_CATEGORIES'
const ADD_CATEGORY = 'ADD_CATEGORY'
const SET_CATEGORIES = 'SET_CATEGORIES'
const SET_CATEGORIES_TOTAL_COUNT = 'SET_CATEGORIES_TOTAL_COUNT'

const defaultState = {
    categoriesList: [],
    totalCount: 0,
    pageSize: 10,
    orders: [
        {
            title: 'Ascending',
            value: true
        },
        {
            title: 'Descending',
            value: false
        }
    ]
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
        case(ADD_CATEGORIES): {
            return {
                ...state,
                categoriesList: [
                    ...state.categoriesList,
                    ...action.categoriesColl
                ]
            }
        }
        case(ADD_CATEGORY): {
            return {
                ...state,
                category: action.category
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

function addCategoriesAC(categoriesColl) {
    return {
        type: ADD_CATEGORIES,
        categoriesColl
    }
}

function addCategoryAC(category) {
    return {
        type: ADD_CATEGORY,
        category
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
export function getCategoriesFromServ(
    withReplace,
    name,
    desc
) {
    return async (dispatch, getState) => {
        try {
            const appendCategories = withReplace ? setCategoriesAC : addCategoriesAC
            const pageSize = selectCategoriesPageSize(getState())
            const categoriesTotalCount = selectCategoriesList(getState()).length
            const response = await getCategories({
                name: name,
                description: desc,
                page: withReplace ? 0 : Math.ceil(categoriesTotalCount / pageSize),
                count: pageSize
            })
            dispatch(appendCategories(response))
        } catch(err) {
            return Promise.reject(err)
        }
    }
}
export function addOneCategory(category) {
    return async (dispatch, getState) => {
        try {
            const data={
                "description": category.description,
                "name": category.name
            }
            const response = await addCategory(data)
            dispatch(addCategoryAC(response))
            dispatch(getCategoriesToSearchFromServ())
        } catch(err) {
            return Promise.reject(err)
        }
    }
}
export function updateOneCategory(category, id) {
    return async (dispatch, getState) => {
        try {
            const data={
                "id": String(id),
                "description": category.description,
                "name": category.name
            }
            const response = await updateCategory(data)
            dispatch(addCategoriesAC(response))
        } catch(err) {
            return Promise.reject(err)
        }
    }
}
export function deleteOneCategory(id) {
    return async (dispatch, getState) => {
        try {
            await deleteCategory(id)
            dispatch(getCategoriesToSearchFromServ())
        } catch(err) {
            return Promise.reject(err)
        }
    }
}