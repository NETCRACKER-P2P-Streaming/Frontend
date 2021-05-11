import React, { useState } from 'react'
import ProfileDataFormSave from './ProfileDataFormSave'
import { Heading, Text, Box, Button } from 'grommet'
import Loading from "../../util_components/Loading"
import ProfileAvatarContainer from "./ProfileAvatarContainer"
import ProfileStatus from "./ProfileStatus"

const ProfileDataForm = ({ profile, isOwner, saveProfile, updateStatus,
                           changePhoto, deletePhoto, uploadPhoto }) => {
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

const ProfileData = ({ profile, isOwner, goToEditMode, updateStatus,
                       changePhoto, deletePhoto, uploadPhoto }) => {
  if (!profile) {
    return <Loading />
  }
  let userAtt = profile.userAttributes.reduce((acc, att) => {
    acc[att.name] = att.value
    return acc
  }, {})
  return (
    <Box>
      <Box direction={'row'}>
        <ProfileAvatarContainer
          isOwner={isOwner}
          changePhoto={changePhoto}
          deletePhoto={deletePhoto}
          uploadPhoto={uploadPhoto}
          profile={profile}
        />
        <Box margin={{"left": "medium"}}>
          <Box>
            <Heading level={1}>
            {userAtt['name']}&nbsp;{userAtt['family_name']}
            </Heading>
          <ProfileStatus
            status={userAtt['custom:description']}
            updateStatus={updateStatus}
          /> <br></br>
          </Box>
          <Box direction={'row'}>
            <Box direction={'column'}>
              <Text 
                margin={{  
                  'bottom': 'xsmall',
                  'right': 'small'
                }}
              >
                Nickname:
              </Text>
              <Text 
                margin={{ 
                  'bottom': 'xsmall',
                  'right': 'small'
                }}
              >
                Email:
              </Text>
            </Box>
            <Box
              direction={'column'}
            >
              <Text 
                weight={500}   
                margin={{  
                  'bottom': 'xsmall',
                  'right': 'small'
                }}
              >
                &nbsp;&nbsp;&nbsp;
                {profile.username}
              </Text>
              <Text 
                weight={500}   
                margin={{ 
                  'bottom': 'xsmall',
                  'right': 'small'
                }}
              >
                &nbsp;&nbsp;&nbsp;
                {userAtt['email']}
              </Text>
            </Box>
          </Box>
          <Box>
            <br></br>
            {isOwner &&
              <Button 
                size={'small'} 
                alignSelf={'start'}
                label={'Edit profile'}
                onClick={goToEditMode} 
              />
            }
          </Box>
        </Box>
      </Box>
    </Box>)
}
export default ProfileDataForm