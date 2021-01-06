import React from 'react'
import {StatusGood, StatusCritical} from "grommet-icons"
import {Box, Text} from "grommet"


export const ErrorMessage = ({message}) => {
    return (
        <Box direction={'row'} gap={'medium'}>
            <Text color={'status-error'}>
                {message}
            </Text>
            <StatusCritical color={'status-error'}/>
        </Box>
    )
}

export const GoodMessage = () => {
    return (
        <Box justify={'between'}>
            <StatusGood color={'status-ok'}/>
        </Box>
    )
}

export function validateField(validatorsColl) {
    return (validatedValue) => {
        let validateResult
        for(let v of validatorsColl) {
            validateResult = v(validatedValue)
            if(validateResult.status === 'error') {
                return validateResult
            }
        }
        return validateResult
    }
}


export function passValidate(value) {
    const reg = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]/g
    const annotation = 'Password must contain lowercase and uppercase characters, special characters and numbers'

    if (!value.match(reg)) {
        return {
            message: <ErrorMessage message={annotation}/>,
            status: 'error'
        }
    }
    return {
        message: <GoodMessage/>,
        status: 'info'
    }
}

export function repeatedPassValidate(primaryPass) {
    return (repeatedPass) => {
        const annotation = 'Passwords must be equals'
        if (repeatedPass !== primaryPass) {
            return {
                message: <ErrorMessage message={annotation}/>,
                status: 'error'
            }
        }
        return {
            message: <GoodMessage/>,
            status: 'info'
        }
    }
}

export function lengthValidatorCreate(minLength, maxLength) {
    if(minLength > maxLength) {
        minLength = null
        maxLength = null
    }
    return (value) => {
        const annotation = `
            Value must be more than ${minLength} symbols and more than ${minLength} symbols
        `
        if (returnLengthValCondition(value.length, minLength, maxLength)) {
            return {
                message: <ErrorMessage message={annotation}/>,
                status: 'error'
            }
        }
        return {
            message: <GoodMessage/>,
            status: 'info'
        }
    }
}


function returnLengthValCondition(len, minLen, maxLen) {
    return (maxLen && len > maxLen) || (minLen && len < minLen)
}