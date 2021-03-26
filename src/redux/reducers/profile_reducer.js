import { profileAPI, resetPassword } from "../../API/profile_api"
import { putUserData} from "../../API/profile_api"
import {Cookies} from 'react-cookie'

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

export const saveProfile = (userData) =>  {
  try{
    const user = {
        "userAttributes": [
            {
                "name": "name",
                "value": userData.name
            }]}
       
            const cookies = new Cookies()
            putUserData(user, cookies.get('accessToken'))
           
        } catch (err) {
            return Promise.reject(err)
        }
  }
  export const changePassword = (userData) =>  {
    try{
      const user = {
         
              "newPassword": userData.newPassword,
              "oldPassword": userData.oldPassword,
       
            }
         
              const cookies = new Cookies()
              resetPassword(user, cookies.get('accessToken'))
             
          } catch (err) {
              return Promise.reject(err)
          }
    }
/* export const setPassword = (password) => ({type: SET_PASSWORD, password})
export const resetPassword = (password) => (dispatch) => {
profileAPI.resetPassword(password).then(response => {
  dispatch(setPassword(response.data));
});
} */
export default profileReducer;