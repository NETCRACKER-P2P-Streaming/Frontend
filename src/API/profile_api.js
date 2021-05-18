import { userRequest } from './api'

export function resetPassword(data, accessToken) {
  return userRequest.put(`/api/v1/users/reset-password`, data, { headers: {
    withCredentials: true,
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  }})
      .then(res => res.data) 
      .catch(err => {
        if (err.response) {
            throw new Error(err.response.data.message)
        } else {
            throw err
        }
      })
}

export function putUserData(user, accessToken) {
  return userRequest.put(`/api/v1/users`,  user, { headers: {
    withCredentials: true,
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  }})
      .then(res => res.data) 
      .catch(err => {
        if (err.response) {
            throw new Error(err.response.data.message)
        } else {
            throw err
        }
      })
}
export function changeStatus(user,accessToken) {
  return userRequest.put(`/api/v1/users`,  user, { headers: {
    withCredentials: true,
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  }})
      .then(res => res.data) 
      .catch(err => {
        if (err.response) {
            throw new Error(err.response.data.message)
        } else {
            throw err
        }
      })
}
export function upload(photoFile, accessToken) {
  const formData = new FormData()
  formData.append("file", photoFile)
  return userRequest.put(`/api/v1/users/file`,  formData, { headers: {
    withCredentials: true,
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${accessToken}`
  }})
    .then(res => res.data)
    .catch(err => {
      if (err.response) {
          throw new Error(err.response.data.message)
      } else {
          throw err
      }
    })
}
export function change(photoFile, accessToken) {
  const formData = new FormData()
  formData.append("file", photoFile)
  return userRequest.put(`/api/v1/users/file`,  formData, { headers: {
    withCredentials: true,
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${accessToken}`
  }})
    .then(res => res.data) 
    .catch(err => {
      if (err.response) {
          throw new Error(err.response.data.message)
      } else {
          throw err
      }
    })
}
export function deleteUserPhoto( accessToken) {
  
  return userRequest.delete(`/api/v1/users/file`,  { headers: {
    withCredentials: true,
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${accessToken}`
  }})
    .then(res => res.data) 
    .catch(err => {
      if (err.response) {
          throw new Error(err.response.data.message)
      } else {
          throw err
      }
    })
}


