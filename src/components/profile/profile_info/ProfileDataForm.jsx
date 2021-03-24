import {Cookies} from 'react-cookie'

import React, {useState} from 'react'
import { putUserData } from '../../../API/profile_api'
import { saveProfile } from '../../../redux/reducers/profile_reducer';

export default 
    function PersonDataForm(isOwner) {
        let [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    name: ''
  });
  let handleChange = e => {
   setForm({   ...form,
    [e.target.name]: e.target.value });
  };
/*   const onSubmit = (formData) => {
    saveProfile(formData).then(
        () => {
            setEditMode(false);
        }
    );
} */
  let handleSubmit = (event) => {
    event.preventDefault();
    saveProfile(form)


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