import * as axios from 'axios'

export const profileAPI = {
  getProfile(username) {
    return axios.get(`http://localhost:9090/api/v1/users/${username}`)
  },
}
export function getStreams(username) {
    return axios.get(`http://localhost:8080/api/stream/get/${username}`)
}
export function resetPassword(data, accessToken) {
  return axios.put(`http://localhost:9090/api/v1/users/reset-password`, data, { headers: {
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
  return axios.put(`http://localhost:9090/api/v1/users`,  user, { headers: {
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
  return axios.put(`http://localhost:9090/api/v1/users`,  user, { headers: {
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
  return axios.post(`http://localhost:9090/api/v1/s3/upload`,  formData, { headers: {
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
  return axios.put(`http://localhost:9090/api/v1/s3/change`,  formData, { headers: {
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
  
  return axios.delete(`http://localhost:9090/api/v1/s3/delete`,  { headers: {
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


