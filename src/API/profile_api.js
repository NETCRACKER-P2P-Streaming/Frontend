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
export function saveProfile(userData) {
return axios
    .put(`http://localhost:9090/api/v1/users`, userData)
    .catch(err => {
        if(err.response) {
            throw new Error(err.response.data.message)
        } else {
            throw err
        }
    })
}