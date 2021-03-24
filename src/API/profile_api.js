import * as axios from "axios"

export const profileAPI = {
  getProfile(username) {
    return  axios.get(`http://localhost:9090/api/v1/users/`+username);
  },
/*   updateStatus(status) {
    return axios.put(`http://localhost:9090/api/v1/users/`, { : status });
}, */
resetPassword(newPassword, oldPassword,username ) {
  return axios.put(`http://localhost:9090/api/v1/users/reset-password`, {newPassword, oldPassword,username });
}  

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