import React from 'react'
import {StatusGood, StatusCritical} from 'grommet-icons'
import {Box, Text} from 'grommet'


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

/**
 * Замыкание, возращающее функцию для проверки соответсвия входных данных
 * валидаторам. Если хоть один валидатор провален - возвращаемая функция
 * возвращает объект с результатами неудачной валидации. Иначе вернет undefined
 *
 * @param validatorsColl Итерируемый объект (коллекция) валидаторов
 * @returns Функция, проверяющая соответствие входных данных валидаторам
 */
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

/**
 * Валидатор пароля по регулярному выражению. Прохождение валидации, если
 * в пароле присутствуют: число, спец. символ, буквы латинского алфавита в
 * верхнем и нижнем регистрах.
 *
 * @param value Валидируемое значение
 * @returns {{message: JSX.Element, status: string}} Объект с результатами валидации
 */
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

/**
 * Замыкание, возвращающее валидатор, проверяющее совпадение primaryPass и repeatedPass
 *
 * @param primaryPass - Изначальный пароль, с которым происходит сравнение
 * @returns {function(*): ({message, status: string})} - Сам валидатор, принимающий
 * валидируемое значение.
 */
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

/**
 * Замыкание, возвращающее валидатор, проверяющий длину входной строки
 *
 * @param minLength - Минимальная длина строки
 * @param maxLength - Максимальная длина строки
 * @returns {function(*): ({message, status: string})} - Валидатор проверяющий, что
 * принимаемое значение лежит в диапазоне [minLength, maxLength]
 */
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

/**
 *
 * @param regexp - Регулярное выражение, которому должно соответствовать значение
 * @param message - Сообщение об ошибке, если значение не соответствует регулярному выражению
 * @returns {function(*): ({message, status: string})} - Замыкание-валидатор
 */
export function commonRegExpValidator(regexp, message) {
    return value => {
        if (!value.match(regexp)) {
            return {
                message: <ErrorMessage message={message}/>,
                status: 'error'
            }
        }
        return {
            message: <GoodMessage/>,
            status: 'info'
        }
    }
}

export function customConditionValidator(condition, message) {
    return value => {
        if (!condition(value)) {
            return {
                message: <ErrorMessage message={message}/>,
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