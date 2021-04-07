import { changeStatus, profileAPI, resetPassword } from "../../API/profile_api"
import { putUserData} from "../../API/profile_api"
import {Cookies} from 'react-cookie'
const SET_USER_PROFILE = 'SET_USER_PROFILE'

let initialState = {
  profile: null
}
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      {
        return {
          ...state,
          profile: action.profile
        }
      }
    default:
      return state
  }
}
export const setUserProfile = (profile) => {
  return {
    type: SET_USER_PROFILE, profile
  }
}
export const getUserProfile = (username) => (dispatch) => {
  profileAPI.getProfile(username).then(response => {
    dispatch(setUserProfile(response.data))
  })
}

export const saveProfile = (userData) =>  {
  return async dispatch => {
    try {
      const user = {
        "userAttributes": [
          {
            "name": "name",
            "value": userData.name
          },
          {
            "name": "family_name",
            "value": userData.lastname
          }, 
          {
            "name": "email",
            "value": userData.email
          }
        ]
      }
      const cookies = new Cookies()
      const result = await putUserData(user, cookies.get('accessToken'))
      if (!result) {
        throw new Error('Save failed. Try again later')
      }
    } catch (err) {
        return Promise.reject(err)
      }
  }
}
  export const changePassword = (userData) =>  {
    return async dispatch => {
      try {
        const user = {
          "newPassword": userData.newPassword,
          "oldPassword": userData.oldPassword,
        }
        const cookies = new Cookies()
        const result = await resetPassword(user, cookies.get('accessToken'))
      } catch (err) {
          return Promise.reject(err)
        }
    }
  }
  export const updateStatus = (userData) =>  {
    return async dispatch => {
      try {
        const user = {
          "userAttributes": [
            {
              "name": "custom:description",
              "value": userData.status
            }
          ]
        }
        const cookies = new Cookies()
        const result = await changeStatus(user, cookies.get('accessToken'))
        if (!result) {
          throw new Error('error')
        }
      } catch (err) {
          return Promise.reject(err)
        }
    }
  }
export default profileReducer