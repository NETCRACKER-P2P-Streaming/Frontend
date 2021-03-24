import {Cookies} from 'react-cookie'

import React, {useState} from 'react'
import { putUserData } from '../../../API/profile_api'

export default 
    function PersonDataForm() {
 
  const [form, setForm] = useState({
    name: ''
  });
  let handleChange = e => {
   setForm({   ...form,
    [e.target.name]: e.target.value });
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    

try{
    const user = {
        "userAttributes": [
            {
                "name": "name",
                "value": form.name
            }]}
       
            const cookies = new Cookies()
            putUserData(user, cookies.get('accessToken'))
           
        } catch (err) {
            return Promise.reject(err)
        }
  }

  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Person Name:
            <input   value={form.name} name="name" onChange={handleChange} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  
}