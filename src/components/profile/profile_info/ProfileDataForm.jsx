import React, { useState } from 'react'
import ProfileDataFormSave from './ProfileDataFormSave'
import { FormField, Box,Button, Form, TextInput } from 'grommet'
import Loading from "../../util_components/Loading"

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
  return <div>
    {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
    <div>
      <b>Nickname</b>: {profile.username}
    </div>
    <div>
      <b>Email</b>: {userAtt['email']}
    </div>



  </div>
}
export default ProfileDataForm