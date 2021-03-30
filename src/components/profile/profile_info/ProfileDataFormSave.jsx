import React, { useState } from 'react'
import { FormField, Box,Button, Form, TextInput } from 'grommet'
import Loading from "../../util_components/Loading"

export default function ProfileDataFormSave  ({ profile, isOwner, saveProfile, setEditMode})  {

  const [form, setForm] = useState({
    name: ''
  });
  if (!profile) {
    return <Loading />
    }
  let handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (formData) => {
    saveProfile(form).then(
      () => {
        setEditMode(false);
      }
    )
  }



  return (
    <Form onSubmit={handleSubmit}>
      <FormField>
        Person Name:
        <TextInput value={form.name} name="name" onChange={handleChange} />
      </FormField>
      <Button type="submit">Add</Button>
    
    </Form>
  
  )

}