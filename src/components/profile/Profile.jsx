import React from "react";
import ProfileInfo from "./profile_info/ProfileInfo";
import ProfileDataForm from "./profile_info/ProfileDataForm";

const Profile = (props) => {

  return <div>
    <ProfileInfo profile={props.profile}/>
    <ProfileDataForm 
                         isOwner={props.isOwner}
                         profile={props.profile}
                         status={props.status}
                         saveProfile={props.saveProfile}
                         updateStatus={props.updateStatus}/>
                         
  </div>
}
export default Profile