import {request} from './api'

//test
export function register(formData) {
    return request
        .post('/api/v1/user/registration', formData)
        .catch(err => {
            if(err.response) {
                throw new Error(err.response.data.message)
            } else {
                throw err
            }
        })
}

//test
export function auth(formData) {
    return request
        .post('/api/v1/auth/login', formData)
        .then(res => res.data)
        .catch(err => {
            if(err.response) {
                throw new Error(err.response.data.message)
            } else {
                throw err
            }
        })
}

//test
export function getUser(username) {
    return request
        .get(`/api/v1/user/${username}`)
        .then(res => res.data)
        .catch(err => {
            if(err.response) {
                throw new Error(err.response.data.message)
            } else {
                throw err
            }
        })
}