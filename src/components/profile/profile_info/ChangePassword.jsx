import React, { useState } from 'react'
import { changePassword, saveProfile } from '../../../redux/reducers/profile_reducer';
import ProfileDataFormSave from './ProfileDataFormSave';
import { FormField, Button, Form, TextInput } from 'grommet';
import Loading from "../../util_components/Loading"

const ChangePassword = ({ profile }) => {


  const [form, setForm] = useState({
    newPassword: '',
    oldPassword: ''
  });
  let handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (formData) => {
    changePassword(form)
      }
  



  return (<div>
    <form onSubmit={handleSubmit}>
      <label>
        Old password:
      <input value={form.oldPassword} name="oldPassword" onChange={handleChange} />
      </label>
      <label>
        New password:
      <input value={form.newPassword} name="newPassword" onChange={handleChange} />
      </label>
      <button type="submit">Add</button>
   
    </form>
  </div>
  )

}


export default
ChangePassword