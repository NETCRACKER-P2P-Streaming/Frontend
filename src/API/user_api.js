import {userRequest, userRequestWithCookie} from './api'

export function register(userData) {
    return userRequest
        .post('http://localhost:9090/api/v1/registration', userData)
        .catch(err => {
            if(err.response) {
                throw new Error(err.response.data.message)
            } else {
                throw err
            }
        })
}

export function auth(formData) {
    return userRequest
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

export function refreshAccess() {
    return userRequestWithCookie
        .get('/api/v1/auth/refresh-token')
        .then(res => res.data)
        .catch(err => {
            if(err.response) {
                throw new Error(err.response.data.message)
            } else {
                throw err
            }
        })
}

export function getUser(username) {
    return userRequest
        .get(`/api/v1/users/${username}`)
        .then(res => res.data)
        .catch(err => {
            if(err.response) {
                throw new Error(err.response.data.message)
            } else {
                throw err
            }
        })
}

export function logout(accessToken) {
    return userRequest
        .get('/api/v1/auth/logout', {
            headers: {
                'Authorization' : `Bearer ${accessToken}`
            }
        })
        .then(res => res.data)
        .catch(err => {
            if(err.response) {
                throw new Error(err.response.data.message)
            } else {
                throw err
            }
        })
}