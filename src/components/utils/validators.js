import React from 'react'
import {StatusGood} from "grommet-icons"
import {Box, Paragraph} from "grommet"


const ErrorMessage = ({message}) => {
    return (
        <Box width={'small'} align={'center'}>
            <Paragraph color={'status-error'}>{message}</Paragraph>
        </Box>
    )
}

const GoodMessage = () => {
    return (
        <Box align={'end'}>
            <StatusGood color={'status-ok'}/>
        </Box>
    )
}


export function passValidate(value) {
    const reg = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]/g
    if (!value.match(reg)) {
        return {
            message: <ErrorMessage
                message={'Password must contain lowercase and uppercase characters, special characters and numbers'}
            />,
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
        if(repeatedPass !== primaryPass) {
            return {
                message: <ErrorMessage message={'Passwords must be equals'}/>,
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
    return (value) => {
        if (maxLength && value.length > maxLength) {
            return {
                message: <ErrorMessage message={`Value must be more than ${minLength} symbols`}/>,
                status: 'error'
            }
        }
        if (minLength && value.length < minLength) {
            return {
                message: <ErrorMessage message={`Value must be more than ${minLength} symbols`}/>,
                status: 'error'
            }
        }
        return {
            message: <GoodMessage/>,
            status: 'info'
        }
    }
}