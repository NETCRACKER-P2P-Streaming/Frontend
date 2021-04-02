import React from "react";
import ProfileInfo from "./profile_info/ProfileInfo";
import ProfileDataForm from "./profile_info/ProfileDataForm";
import ChangePassword from "./profile_info/ChangePassword";

const Profile = (props) => {

  return <div>
    <ProfileInfo profile={props.profile}  isPasswordFormOpen={props.isPasswordFormOpen}
      setPasswordFormOpen={props.setPasswordFormOpen}    saveProfile={props.saveProfile}
      updateStatus={props.updateStatus}      isOwner={props.isOwner}
      />



  </div>
}
export default Profile