import React, { useState } from 'react'
import { putUserAttributes } from '../../../API/user_api';
import { Cookies } from 'react-cookie'

export default
    function PersonDataForm(props) {
    const [errorMessage, setErrorMessage] = useState(undefined)

    const [form, setForm] = useState({
        name: ''
    });
    let handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    async function onSubmit() {
        try {
            await putUser(form)
        } catch (err) {
            setErrorMessage(err.message)
        }
    }
    function putUser(userData) {
        return async dispatch => {
            try {
                const validUserData = {
                    username: userData.username,
                    password: userData.password,
                    userAttributes: [
                        {
                            name: "name",
                            value: userData.firstName
                        },
                        {
                            name: "custom:linkImage",
                            value: userData.linkImage
                        },
                        {
                            name: "custom:description",
                            value: userData.description
                        },
                        {
                            name: "family_name",
                            value: userData.lastName
                        },
                        {
                            name: "email",
                            value: userData.email
                        }
                    ]
                }
                const cookies = new Cookies()
                const result = await putUserAttributes(validUserData, cookies.get('accessToken'))
                if (!result) {
                    throw new Error('Save failed. Try again later')
                }
            } catch (err) {
                return Promise.reject(err)
            }
        }
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>
                    Person Name:
                        <input value={form.name} name="name" onChange={handleChange} />
                </label>
                <button type="submit">Add</button>
            </form>
        </div>
    )

}