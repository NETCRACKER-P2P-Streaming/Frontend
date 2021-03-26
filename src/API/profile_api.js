import * as axios from "axios"

export const profileAPI = {
  getProfile(username) {
    return  axios.get(`http://localhost:9090/api/v1/users/`+username);
  },
/*   updateStatus(status) {
    return axios.put(`http://localhost:9090/api/v1/users/`, { : status });
}, */
 

}
export function resetPassword(data, accessToken) {
  return  axios.put(`http://localhost:9090/api/v1/users/reset-password`,  data ,{  headers: {
          withCredentials: true,
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
      }})
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
}

export function putUserData(user, accessToken) {
  return  axios.put(`http://localhost:9090/api/v1/users`,  user ,{  headers: {
          withCredentials: true,
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
      }})
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
}