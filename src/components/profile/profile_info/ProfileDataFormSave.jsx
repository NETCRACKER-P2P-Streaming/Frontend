import React, { useState } from 'react'
import { FormField, Box,Button, Form, TextInput } from 'grommet'
import Loading from "../../util_components/Loading"

export default function ProfileDataFormSave  ({ profile, isOwner, saveProfile, setEditMode})  {
  let userAtt = profile.userAttributes.reduce((acc, att) => {
    acc[att.name] = att.value
    return acc
  }, {})
  const [form, setForm] = useState({
    name: userAtt['name'],
    lastname: userAtt['family_name'],
    email: userAtt['email']
  });
  if (!profile) {
    return <Loading />
    }
 
  const handleSubmit = (formData) => {
    saveProfile(form).then(
      () => {
        setEditMode(false);
      }
    )
  }
  let handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }


  return (   

    <Form onSubmit={handleSubmit}  
    value={form}
    onChange={(nextValue) => setForm(nextValue)}>
      <Box
                direction={'row'}
                justify={'between'}
                margin={{ top: 'medium' }}
            ><Button   label={'Save'} primary type="submit" /><Button label='Cancel' color='border' onClick={() => {
              setEditMode(false);
            }} /></Box>

    <FormField   label={'Name'}
                name={'name'} placeholder={userAtt['name']}>
      <TextInput   id={'name'}
                    name={'name'}  />
      </FormField>
      <FormField  label={'Lastname'}
                name={'lastname'}>
      <TextInput  id={'lastname'}
                    name={'lastname'}  />
      </FormField>
      <FormField   label={'Email'}
                name={'email'}>
      <TextInput   id={'email'}
                    name={'email'}  />
      </FormField>

  
    
    
    </Form>
   
  )

}