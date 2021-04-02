import React, { useState } from 'react'
import ProfileDataFormSave from './ProfileDataFormSave'
import { Heading,FormField, Box,Button, Form, TextInput } from 'grommet'
import Loading from "../../util_components/Loading"
import ProfileAvatarContainer from "./ProfileAvatarContainer"
import ProfileStatus from "./ProfileStatus"
const ProfileDataForm = ({ profile, isOwner, saveProfile }) => {
  let [editMode, setEditMode] = useState(false)


  if (!profile) {
    return <Loading />
    }




  return (

      <Box> {editMode
        ? <ProfileDataFormSave setEditMode={setEditMode} profile={profile}       saveProfile={saveProfile}
        />
        : <ProfileData goToEditMode={() => { setEditMode(true) }} profile={profile} isOwner={isOwner} />}
      </Box>
  
  
  )

}

const ProfileData = ({ profile, isOwner, goToEditMode }) => {

  if (!profile) {
    return <Loading />
  }
  let userAtt = profile.userAttributes.reduce((acc, att) => {
    acc[att.name] = att.value
    return acc
  }, {})
  return <Box>
    {isOwner && <Box><Button onClick={goToEditMode}>edit</Button></Box>}
  
 

    <Heading
            level={1}>
            {userAtt['name']}&nbsp;
            {userAtt['family_name']}
          </Heading>
          <ProfileStatus status={userAtt['custom:description']} />
          <ProfileAvatarContainer />
          <Box
            pad="small">
            <FormField
              label={'Nickname'}
              name={'nickname'}
              required={true}
            >
             {profile.username}
              
            </FormField>
            <FormField
              label={'Email'}
              name={'Email'}
              required={true}

            >
           
               {userAtt['email']}

          
            </FormField>
         
          </Box>

  </Box>
}
export default ProfileDataForm