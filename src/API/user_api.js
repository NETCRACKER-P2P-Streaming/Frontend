import { userRequest } from './api'
import axios from 'axios';

export function register(userData) {
    return userRequest
        .post('/api/v1/registration', userData)
        .catch(err => {
            if (err.response) {
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
            if (err.response) {
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
            if (err.response) {
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
            if (err.response) {
                throw new Error(err.response.data.message)
            } else {
                throw err
            }
        })
}
export function putUserAttributes(user, accessToken) {
    return userRequest
        .put(`http://localhost:9090/api/v1/users`, user, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
          })
}

export function logout(accessToken) {
    return userRequest
        .get('/api/v1/auth/logout', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(res => res.data)
        .catch(err => {
            if (err.response) {
                throw new Error(err.response.data.message)
            } else {
                throw err
            }
        })
}