import React from "react";
import { connect } from "react-redux";
import Profile from './Profile';
import { getUserProfile } from "../../redux/reducers/profile_reducer";
import { withRouter } from "react-router-dom";
import { profileAPI } from "../../API/profile_api";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let username = this.props.match.params.username;
    this.props.getUserProfile(username);
    profileAPI.getProfile(username);
  }
  render() {
    return <Profile {...this.props} profile={this.props.profile} isOwner={this.props.match.params.username} 
    />
  }
}
let mapStateToProps = (state) => ({
  profile: state.profilePage.profile
});
let withUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, { getUserProfile })(withUrlDataContainerComponent); 