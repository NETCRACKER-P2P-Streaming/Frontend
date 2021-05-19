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