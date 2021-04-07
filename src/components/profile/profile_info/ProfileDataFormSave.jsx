import React, { useState, useEffect } from 'react'
import { FormField, Box, Button, Form, TextInput } from 'grommet'
import Loading from "../../util_components/Loading"
import { setUserProfile } from '../../../redux/reducers/profile_reducer'

export default function ProfileDataFormSave({ profile, saveProfile, setEditMode }) {
  let userAtt = profile.userAttributes.reduce((acc, att) => {
    acc[att.name] = att.value
    return acc
  }, {})
  const [form, setForm] = useState({
    name: userAtt['name'],
    lastname: userAtt['family_name'],
    email: userAtt['email']
  })
  if (!profile) {
    return <Loading />
  }
  const handleSubmit = () => {
    saveProfile(form).then(
      () => {
        setUserProfile(profile)

        setEditMode(false)
      }
    )
  }

  return (
    <Form 
      onSubmit={handleSubmit}
      value={form}
      onChange={(nextValue) => setForm(nextValue)}
    >
      <Box
        width="large"
        direction={'row'}
        justify={'between'}
        margin={{ top: 'medium' }}
      >
        <Button 
          label={'Save'} 
          primary type="submit" 
        />
        <Button 
          label='Cancel' 
          color='border' 
          onClick={() => {setEditMode(false)}} 
        />
      </Box>
      <br></br>
      <Box
        width="large">
        <FormField 
          label={'Name'}
          name={'name'} 
          placeholder={userAtt['name']}>
          <TextInput 
            id={'name'}
            name={'name'} />
        </FormField>
        <FormField 
          label={'Lastname'}
          name={'lastname'}>
          <TextInput 
            id={'lastname'}
            name={'lastname'} />
        </FormField>
        <FormField 
          label={'Email'}
          name={'email'}>
          <TextInput 
            id={'email'}
            name={'email'} />
        </FormField>
      </Box>
    </Form>
  )
}