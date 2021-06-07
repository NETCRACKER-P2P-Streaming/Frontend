import {deleteTokensCookies} from "./cookiesUtils";

export function authorizedErrorHandle(err, history) {
    if(err.name === 'AuthorizationError') {
        deleteTokensCookies()
        history.push('/')
        console.log(err.message)
    }
}

export class AuthorizationError extends Error {
    constructor(message) {
        super(message)
        this.name = 'AuthorizationError'
    }
}