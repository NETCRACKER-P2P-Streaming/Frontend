import { changeStatus, resetPassword, putUserData, upload } from "../../API/profile_api"
import {Cookies} from 'react-cookie'
import { getUser } from "../../API/user_api"
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

let initialState = {
  profile: null,
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
      case SAVE_PHOTO_SUCCESS:
        return {...state, profile: {...state.profile, photos: action.photos }}
    default:
      return state
  }
}
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})

export const setUserProfile = (profile) => {
  return {
    type: SET_USER_PROFILE, profile
  }
}

export const getUserProfile = (username) => async (dispatch) => {
  const response = await getUser(username);
  dispatch(setUserProfile(response));
}

export const saveProfile = (userData) =>  {
  return async (dispatch,getState) => {
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
      const userId = getState().profilePage.profile.username

      const result = await putUserData(user, cookies.get('accessToken'))
      if (result) {
        dispatch(getUserProfile(userId))
      }
      if (!result) {
        throw new Error('Save failed. Try again later')
      }
    } catch (err) {
        return Promise.reject(err)
      }
  }
}


export const uploadPhoto = (file) =>  {
  return async (dispatch,getState) => {
    try {
      const cookies = new Cookies()
      const result = await upload(file, cookies.get('accessToken'))
      console.log(result)
      const user = {
        "userAttributes": [
          {
            "name": "custom:linkImage",
            "value": result
          }
        ]
      }
      const result2 = await putUserData(user, cookies.get('accessToken'))
      const userId = getState().profilePage.profile.username

      if (result) {
        dispatch(getUserProfile(userId))
      }
    } catch (err) {
        return Promise.reject(err)
    }
  }
}
export const deletePhoto = () =>  {
  return async (dispatch,getState) => {
    try {
      const cookies = new Cookies()
      const result = await delete(cookies.get('accessToken'))
      const user = {
        "userAttributes": [
          {
            "name": "custom:linkImage",
            "value": ''
          }
        ]
      }
      const result2 = await putUserData(user, cookies.get('accessToken'))
      const userId = getState().profilePage.profile.username

      if (result2) {
        dispatch(getUserProfile(userId))
      }
    } catch (err) {
        return Promise.reject(err)
    }
  }
}
export const changePassword = (userData) =>  {
  return async (dispatch,getState) => {
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
  return async (dispatch,getState) => {
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
      const userId = getState().profilePage.profile.username

      if (result) {
        dispatch(getUserProfile(userId))
      }
      if (!result) {
        throw new Error('error')
      }
    } catch (err) {
        return Promise.reject(err)
      }
  }
}
export default profileReducer