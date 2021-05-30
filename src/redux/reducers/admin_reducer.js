import { changeStatus, resetPassword, putUserData, upload } from "../../API/profile_api"
import {Cookies} from 'react-cookie'
import { disable, getUsersInGroup, enable, addUserToGroup, removeUserFromGroup } from "../../API/admin_api"
const SET_USERS = 'SET_USERS'
const ADD_USER = 'ADD_USER'
const ADD_ADMIN = 'ADD_ADMIN'
const SET_ADMINS='SET_ADMINS'
const BLOCK = 'BLOCK'
const UNBLOCK = 'UNBLOCK'
let initialState = {
  users: [],
  admins: []
}

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      {
        return {
          ...state,
          users: action.users
        }
      }
      case SET_ADMINS:
        {
          return {
            ...state,
            admins: action.admins
          }
        }
      case ADD_USER:
        return {...state, user: action.user }
      case ADD_ADMIN:
        return {...state, admin: action.admin }
      case BLOCK:
        return {
          ...state,
          users: state.users.map( u =>  {
            if (u.username === action.username) {
                return {...u, blocked: true}
            }
            return u
          }),
          admins: state.admins.map( u =>  {
            if (u.username === action.username) {
                return {...u, blocked: true}
            }
            return u
          })
        }
      case UNBLOCK:
        return {
          ...state,
          users: state.users.map( u =>  {
              if (u.username === action.username) {
                  return {...u, blocked: false}
              }
              return u
          }),
          admins: state.admins.map( u =>  {
            if (u.username === action.username) {
                return {...u, blocked: false}
            }
            return u
          })
        }
    default:
      return state
  }
}

export const setUsers = (users) => {
  return {
    type: SET_USERS, users
  }
}
export const setAdmins = (admins) => {
  return {
    type: SET_ADMINS, admins
  }
}
export const block = (username) => ({type: BLOCK, username })
export const unblock = (username) => ({type: UNBLOCK, username })
export const getUsers = (group) => async (dispatch) => {
  const cookies = new Cookies()
  const response = await getUsersInGroup(group,cookies.get('accessToken'))
  dispatch(setUsers(response))
}
export const getAdmins = (group) => async (dispatch) => {
  const cookies = new Cookies()
  const response = await getUsersInGroup(group,cookies.get('accessToken'))
  dispatch(setAdmins(response))
}
export const disableUser = (username) => async (dispatch) => {
  const cookies = new Cookies()
  const response = await disable(username,cookies.get('accessToken'))
}
export const enableUser = (username) => async (dispatch) => {
  const cookies = new Cookies()
  const response = await enable(username,cookies.get('accessToken'))
}
export const addUser = (username,group) => async (dispatch) => {
  const cookies = new Cookies()
  const response = await addUserToGroup(username,group,cookies.get('accessToken'))
}
export const removeUser = (username,group) => async (dispatch) => {
  const cookies = new Cookies()
  const response = await removeUserFromGroup(username,group,cookies.get('accessToken'))
}

export default adminReducer