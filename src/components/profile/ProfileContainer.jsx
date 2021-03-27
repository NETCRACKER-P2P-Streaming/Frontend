import React from "react";
import { connect } from "react-redux";
import Profile from './Profile';
import { getUserProfile, saveProfile } from "../../redux/reducers/profile_reducer";
import { withRouter } from "react-router-dom";
import { profileAPI } from "../../API/profile_api";
import { setPasswordFormOpenAC } from "../../redux/reducers/app_reducer";
import {selectIsPasswordFormOpen} from '../../redux/selectors/selectors'

class ProfileContainer extends React.Component {
  componentDidMount() {
    debugger;
    let username = this.props.match.params.username;
    this.props.getUserProfile(username);
    profileAPI.getProfile(username);
  }
  render() {
    return <Profile 
      {...this.props} 
      profile={this.props.profile} 
      isOwner={this.props.match.params.username} 
      isPasswordFormOpen={this.props.isPasswordFormOpen}
      setPasswordFormOpen={this.props.setPasswordFormOpen}
    />
  }
}
let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  isPasswordFormOpen: selectIsPasswordFormOpen(state)

});
let withUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, { getUserProfile, saveProfile, setPasswordFormOpen: setPasswordFormOpenAC })(withUrlDataContainerComponent)
