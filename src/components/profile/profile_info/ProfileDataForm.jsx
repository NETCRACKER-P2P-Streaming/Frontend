import React, { useState } from 'react'
import { saveProfile } from '../../../redux/reducers/profile_reducer';
import ProfileDataFormSave from './ProfileDataFormSave';
import { FormField, Button, Form, TextInput } from 'grommet';
import Loading from "../../util_components/Loading"

const ProfileDataForm = ({ profile, isOwner }) => {
  let [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    name: ''
  });
  let handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (formData) => {
    saveProfile(form).then(
      () => {
        setEditMode(false);
      }
    );
  }



  return (<div>
    <form onSubmit={handleSubmit}>
      <label>
        Person Name:
      <input value={form.name} name="name" onChange={handleChange} />
      </label>
      <button type="submit">Add</button>
      <div> {editMode
        ? <ProfileDataFormSave />
        : <ProfileData goToEditMode={() => { setEditMode(true) }} profile={profile} isOwner={isOwner} />}
      </div>
    </form>
  </div>
  )

}

const ProfileData = ({ profile, isOwner, goToEditMode }) => {

  if (!profile) {
    return <Loading />
  }
  let userAtt = profile.userAttributes.reduce((acc, att) => {
    acc[att.name] = att.value
    return acc
  }, {})
  return <div>
    {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
    <div>
      <b>Nickname</b>: {profile.username}
    </div>
    <div>
      <b>Email</b>: {userAtt['email']}
    </div>



  </div>
}
export default
  ProfileDataForm