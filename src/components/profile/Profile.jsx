import React from "react"
import ProfileInfo from "./profile_info/ProfileInfo"
import { Box } from 'grommet'

const Profile = (props) => {
  return <Box>
    <ProfileInfo 
      profile={props.profile}  
      saveProfile={props.saveProfile}
      updateStatus={props.updateStatus}      
      isOwner={props.isOwner}
      streams={props.streams} 
    />
  </Box>
}
export default Profile