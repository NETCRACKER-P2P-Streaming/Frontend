import React, { useState, useEffect } from 'react'
import ProfileDataFormSave from './ProfileDataFormSave'
import { Heading, FormField, Box, Button } from 'grommet'
import Loading from "../../util_components/Loading"
import ProfileAvatarContainer from "./ProfileAvatarContainer"
import ProfileStatus from "./ProfileStatus"

const ProfileDataForm = ({ profile, isOwner, saveProfile, updateStatus, changePhoto,
  deletePhoto,uploadPhoto  }) => {
   let [editMode, setEditMode] = useState(false)
  if (!profile) {
    return <Loading />
  }
  
  return (
    <Box> {editMode
      ? <ProfileDataFormSave 
          setEditMode={setEditMode} 
          profile={profile} 
          saveProfile={saveProfile}
      />
      : <ProfileData 
          goToEditMode={() => { setEditMode(true) }} 
          profile={profile} 
          isOwner={isOwner} 
          updateStatus={updateStatus}
          changePhoto={changePhoto}
          deletePhoto={deletePhoto}
          uploadPhoto={uploadPhoto}
      />}
    </Box>
  )
}

const ProfileData = ({ profile, isOwner, goToEditMode, updateStatus,changePhoto,
  deletePhoto,uploadPhoto  }) => {
  if (!profile) {
    return <Loading />
  }
  let userAtt = profile.userAttributes.reduce((acc, att) => {
    acc[att.name] = att.value
    return acc
  }, {})
  return (
    <Box>
      {isOwner && 
      <Box
        direction={'row'}
        justify={'between'}
        margin={{ top: 'medium' }}
      >
        <Button
        label={'Edit'}
        onClick={goToEditMode} />
      </Box>}
      <Heading level={1}>
        {userAtt['name']}&nbsp;{userAtt['family_name']}
      </Heading>
      <ProfileStatus 
        status={userAtt['custom:description']} 
        updateStatus={updateStatus} 
      />
      <ProfileAvatarContainer 
        isOwner={isOwner} 
        changePhoto={changePhoto}
        deletePhoto={deletePhoto}
        uploadPhoto={uploadPhoto}
      />
      <Box
        width="large"
      >
        <b>Nickname</b>          
          {profile.username}
       <b>Email</b>
          {userAtt['email']}
      </Box>
    </Box>)
}
export default ProfileDataForm