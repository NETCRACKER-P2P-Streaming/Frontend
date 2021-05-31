import {commonRegExpValidator, customConditionValidator} from './validators'

export const startStreamFormValidators = {
    title: [
        commonRegExpValidator(
            /^[\w ]{5,50}$/,
            'Title must be 5-50 alphanumeric symbols'
        )
    ],
    description: [
        commonRegExpValidator(
            /^[\w ]{0,512}$/,
            'Description must be maximum 512 alphanumeric symbols'
        )
    ],
    categories: [
        customConditionValidator(
            val => val.length > 0,
            'At least one category must be selected'
        )
    ]
}