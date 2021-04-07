import React, {useEffect} from "react"
import { connect } from "react-redux"
import Profile from './Profile'
import { getUserProfile, saveProfile,updateStatus } from "../../redux/reducers/profile_reducer"
import { withRouter } from "react-router-dom"
import { setPasswordFormOpenAC } from "../../redux/reducers/app_reducer"
import {selectIsPasswordFormOpen} from '../../redux/selectors/selectors'

function ProfileContainer(props) {
  let username = props.match.params.username
  useEffect(() => {
      props.getUserProfile(username)
  },[])
  return <Profile 
    {...props} 
    profile={props.profile} 
    isOwner={props.match.params.username} 
    updateStatus={props.updateStatus}
    isPasswordFormOpen={props.isPasswordFormOpen}
    setPasswordFormOpen={props.setPasswordFormOpen}
  />
}
let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  isPasswordFormOpen: selectIsPasswordFormOpen(state)
})
let withUrlDataContainerComponent = withRouter(ProfileContainer)
export default connect(mapStateToProps, { 
  getUserProfile, 
  saveProfile, 
  updateStatus,
  setPasswordFormOpen: setPasswordFormOpenAC 
})(withUrlDataContainerComponent)
