import React from "react";
import ProfileInfo from "./profile_info/ProfileInfo";

const Profile = (props) => {

  return <div><ProfileInfo profile={props.profile}/>
  </div>
}
export default Profile;