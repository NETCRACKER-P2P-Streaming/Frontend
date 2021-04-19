import { changeStatus, profileAPI, resetPassword, putUserData, change, upload, deleteUserPhoto, getStreams } from "../../API/profile_api"
import {Cookies} from 'react-cookie'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STREAMS = 'SET_STREAMS'

let initialState = {
  profile: null,
  streams: null
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
    case SET_STREAMS:
    {
      return {
        ...state,
        streams: action.streams
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
export const setStreams = (streams) => {
  return {
    type: SET_STREAMS, streams
  }
}
export const getUserProfile = (username) => (dispatch) => {
  profileAPI.getProfile(username).then(response => {
    dispatch(setUserProfile(response.data))
  })
}
export const getUserStreams = (username) => (dispatch) => {
  getStreams(username).then(response => {
    dispatch(setStreams(response.data))
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
export const changePhoto = (file) =>  {
  return async dispatch => {
    try {
      const cookies = new Cookies()
      const result = await change(file, cookies.get('accessToken'))
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
    } catch (err) {
        return Promise.reject(err)
    }
  }
}
export const uploadPhoto = (file) =>  {
  return async dispatch => {
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
    } catch (err) {
        return Promise.reject(err)
    }
  }
}
export const deletePhoto = () =>  {
  return async dispatch => {
    try {
      const cookies = new Cookies()
      const result = await delete(cookies.get('accessToken'))
      const user = {
        "userAttributes": [
          {
            "name": "custom:linkImage",
            "value": result
          }
        ]
      }
      const result2 = await putUserData(user, cookies.get('accessToken'))
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