import React from 'react'
import {FormPreviousLink} from 'grommet-icons'
import {NavLink} from 'react-router-dom'
import SignUpFormFirstPage from './sign_up_form_first_page/SignUpFormFirstPage'
import SignUpFormSecondPage from './sign_up_form_second_page/SignUpFormSecondPage'
import {
    Box,
    Button,
    Form,
    Heading,
    Layer
} from 'grommet'



export default function SignUpForm({
                                       size, onSubmit, value, setValue,
                                       formPage, validateField,
                                       validators, setFormPage, errorMessage,
                                       loading, setErrorMessage
                                   }) {

    return (
        <>
            {
                // Стрелка возвращения к главному экрану из формы регистрации.
                // Показывается если нет общей загрузки приложения, а также если размер
                // окна не соответствует мобильному. В ином случае происходит отрисовка внутри формы
                size !== 'small' && !loading &&
                <Layer
                    modal={false}
                    position={'top-left'}
                    animation={'fadeIn'}
                >
                    <Button
                        plain={true}
                        icon={<NavLink to={'/'}><FormPreviousLink color={'dark-3'} size={'xlarge'}/></NavLink>}
                    />
                </Layer>
            }
            <Box
                width={'large'}
                background={'light-6'}
                pad={'large'}
                elevation={'large'}
                round={'small'}
                margin={{left: 'auto', right: 'auto', top: size !== 'small' ? 'medium' : 'none'}}
                fill={size === 'small' || 'vertical'}
            >
                <Form
                    value={value}
                    onChange={nextValue => {
                        setValue(nextValue)
                        setErrorMessage(undefined)
                    }}
                    onSubmit={onSubmit}
                    validate={'blur'}
                >
                    {
                        // Если размер соответствует мобильному - кнопка возвращения
                        // на главную страницу отображается внутри формы
                        size === 'small' &&
                        <Button
                            plain={true}
                            icon={
                                <NavLink to={'/'}>
                                    <FormPreviousLink color={'dark-3'} size={'large'}/>
                                </NavLink>
                            }
                        />
                    }
                    <Box
                        align={'center'}
                        pad={{bottom: 'medium'}}
                    >
                        <Heading
                            level={1}
                            color={'dark-3'}
                        >
                            SIGN UP
                        </Heading>
                    </Box>
                    {
                        formPage === 1
                            ? <SignUpFormFirstPage />
                            : <SignUpFormSecondPage
                                validateField={validateField}
                                validators={validators}
                                errorMessage={errorMessage}
                            />
                    }

                    <Box
                        direction={'row'}
                        justify={'between'}
                        margin={{top: 'large'}}
                    >
                        {
                            // Только на последней странице отрисывавется кнопка
                            // отправки данных на сервер
                            formPage === 2 &&
                            <Button
                                type={'submit'}
                                label={'Sign up'}
                                primary
                            />
                        }
                        <Button
                            label={formPage === 1 ? 'Next' : 'Back'}
                            onClick={() => formPage === 1 ? setFormPage(2) : setFormPage(formPage - 1)}
                            id={'page_change_btn'}
                            color={'brand'}
                        />
                    </Box>
                </Form>
            </Box>
        </>
    )
}