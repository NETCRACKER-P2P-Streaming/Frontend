import {
    validateField,
    lengthValidatorCreate,
    repeatedPassValidate,
    ErrorMessage,
    GoodMessage,
    passValidate
} from '../validators'
import {render} from '@testing-library/react'


describe('Messages test', () => {
    it('Good message test', () => {
        const rendered = render(<GoodMessage />)
        const {container} = rendered
        expect(container.querySelector('svg')).toBeInTheDocument()
    })

    it('Error message test', () => {
        const rendered = render(<ErrorMessage
            message={'Some error founded'}
        />)
        const {container} = rendered
        expect(container.querySelector('svg')).toBeInTheDocument()
        expect(rendered.getByText(/Some error founded/i)).toBeInTheDocument()
    })
})


describe('Test validators', () => {

    describe('Length validator test', () => {

        it('Falsy values test', () => {
            const falsyValValidator = lengthValidatorCreate(undefined, undefined)
            expect(falsyValValidator('').status).toBe('info')
            expect(falsyValValidator('test val').status).toBe('info')
        })
        it('Invalid values', () => {
            const invalidValidator = lengthValidatorCreate(1, 0)
            expect(invalidValidator('').status).toBe('info')
            expect(invalidValidator('test val').status).toBe('info')
        })
        it('Normal values test', () => {
            const normalValidator = lengthValidatorCreate(3, 5)
            expect(normalValidator('he').status).toBe('error')
            expect(normalValidator('hel').status).toBe('info')
            expect(normalValidator('hello').status).toBe('info')
            expect(normalValidator('helloo').status).toBe('error')
        })

    })
    it('Pass validator test', () => {
        expect(passValidate('1').status).toBe('error')
        expect(passValidate('1!').status).toBe('error')
        expect(passValidate('1!f').status).toBe('error')
        expect(passValidate('1!fF').status).toBe('info')
    })
    it('Repeated pass test', () => {
        const repeatedPassVal = repeatedPassValidate('1sS')
        expect(repeatedPassVal('1ss').status).toBe('error')
        expect(repeatedPassVal('1sS').status).toBe('info')
    })
})

describe('Validator function test', () => {
    let validatorsCompilation = null

    beforeEach(() => {
        validatorsCompilation = validateField([
            (v) => v.length === 2
                ? {status: 'info', message: 'good'}
                : {status: 'error', message: 'len is not 2'},
            (v) => v.match(/\d+/)
                ? {status: 'info', message: 'good'}
                : {status: 'error', message: 'val is not a number'}
        ])
    })

    it('Validate by first condition', () => {
        const res = validatorsCompilation('as')
        expect(res.status).toBe('error')
        expect(res.message).toBe('val is not a number')
    })

    it('Validate by second condition', () => {
        const res = validatorsCompilation('123')
        expect(res.status).toBe('error')
        expect(res.message).toBe('len is not 2')
    })

    it('Validate by two conditions', () => {
        const res = validatorsCompilation('a')
        expect(res.status).toBe('error')
        expect(res.message).toBe('len is not 2')
    })

    it('Validate by nothing condition', () => {
        const res = validatorsCompilation('12')
        expect(res.status).toBe('info')
        expect(res.message).toBe('good')
    })
})