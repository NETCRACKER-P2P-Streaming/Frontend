import * as axios from "axios"

export const profileAPI = {
  getProfile(username) {
    return  axios.get(`http://localhost:9090/api/v1/users/`+username);
  }
}