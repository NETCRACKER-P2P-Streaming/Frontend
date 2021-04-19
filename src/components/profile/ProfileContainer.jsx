import React, {useEffect} from "react"
import { connect } from "react-redux"
import Profile from './Profile'
import { getUserProfile, saveProfile,updateStatus, getUserStreams } from "../../redux/reducers/profile_reducer"
import { withRouter } from "react-router-dom"

function ProfileContainer(props) {
  let username = props.match.params.username
  useEffect(() => {
    props.getUserProfile(username)
    props.getUserStreams(username)
  },[username])
 
  return <Profile 
    {...props} 
    profile={props.profile} 
    isOwner={props.match.params.username} 
    updateStatus={props.updateStatus}
    streams={props.streams} 
  />
}
let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  streams: state.profilePage.streams

})
let withUrlDataContainerComponent = withRouter(ProfileContainer)
export default connect(mapStateToProps, { 
  getUserProfile, 
  saveProfile, 
  updateStatus,
  getUserStreams
  
})(withUrlDataContainerComponent)