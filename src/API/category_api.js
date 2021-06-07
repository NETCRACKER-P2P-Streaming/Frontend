import {streamsAndCategoriesRequest} from './api'

export function getCategoriesToSearch() {
    return streamsAndCategoriesRequest.post('/api/v1/categories-page', {
        count: 100,
        page: 0
    })
        .then(response => response.data)
        .catch(err => {
            if(err.response) {
                throw new Error(err.response.data.message)
            } else {
                throw err
            }
        })
}
export function getCategories(getCategoriesData) {
    return streamsAndCategoriesRequest.post('/api/v1/categories-page', getCategoriesData)
        .then(response => response.data)
        .catch(err => {
            if(err.response) {
                throw new Error(err.response.data.message)
            } else {
                throw err
            }
        })
}
export function addCategory(categoryData, accessToken) {
    return streamsAndCategoriesRequest.post('/api/v1/admin/category', categoryData, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
        .then(response => response.data)
        .catch(err => {
            if(err.response) {
                throw new Error(err.response.data.message)
            } else {
                throw err
            }
        })
}
export function updateCategory(categoryData, accessToken) {
    return streamsAndCategoriesRequest.put('/api/v1/admin/category', categoryData, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
        .then(response => response.data)
        .catch(err => {
            if(err.response) {
                throw new Error(err.response.data.message)
            } else {
                throw err
            }
        })
}
export function deleteCategory(categoryId, accessToken) {
    return streamsAndCategoriesRequest.delete('/api/v1/admin/category', {
        method: 'DELETE',
        data: {id: categoryId},
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
        .then(response => response.data)
        .catch(err => {
            if(err.response) {
                throw new Error(err.response.data.message)
            } else {
                throw err
            }
        })
}