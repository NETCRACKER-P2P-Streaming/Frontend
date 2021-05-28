import { userRequest } from './api'

export function getUsersInGroup(group) {
    return userRequest
        .post('/api/v1/admin/', userData)
        .catch(err => {
            if (err.response) {
                throw new Error(err.response.data.message)
            } else {
                throw err
            }
        })
}