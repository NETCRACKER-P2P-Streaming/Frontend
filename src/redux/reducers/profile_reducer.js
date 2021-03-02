import { profileAPI } from "../../API/profile_api"
const SET_USER_PROFILE = 'SET_USER_PROFILE'

let initialState = {
  profile: null
};
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      {
        return {
          ...state,
          profile: action.profile
        };
      }
    default:
      return state;
  }
}
export const setUserProfile = (profile) => {
  return {
    type: SET_USER_PROFILE, profile
  }
}
export const getUserProfile = (username) => (dispatch) => {
  profileAPI.getProfile(username).then(response => {
    dispatch(setUserProfile(response.data));
  });
}
export default profileReducer;