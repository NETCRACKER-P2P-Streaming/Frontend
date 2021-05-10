import {userRequest} from './api'

export function register(userData) {
    const formData = new FormData()
    formData.append('user', JSON.stringify(userData.user))
    formData.append('file', userData.file)
    debugger
    return userRequest
        .post('/api/v1/registration', formData)
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
    return userRequest
        .get('/api/v1/auth/refresh-token', {
            withCredentials: true
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