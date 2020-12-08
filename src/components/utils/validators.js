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
        return <ErrorMessage
            message={'Password must contain lowercase and uppercase characters, special characters and numbers'}
        />
    }
    return <GoodMessage/>
}

export function lengthValidatorCreate(minLength, maxLength) {
    return (value) => {
        if (maxLength && value.length > maxLength) {
            return <ErrorMessage message={`Value must be more than ${minLength} symbols`}/>
        }
        if (minLength && value.length < minLength) {
            return <ErrorMessage message={`Value must be more than ${minLength} symbols`}/>
        }
        return <GoodMessage/>
    }
}