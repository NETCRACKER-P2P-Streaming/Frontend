  
import React, {useState} from 'react'
import axios from 'axios';

export default 
    function PersonDataForm() {
 
  const [form, setForm] = useState({
    name: ''
  });
  let handleChange = e => {
   setForm({   ...form,
    [e.target.name]: e.target.value });
  };

  let handleSubmit = event => {
    event.preventDefault();

    const user = {
        "userAttributes": [
            {
                "name": "name",
                "value": form.name
            }]}
       

    axios.put(`http://localhost:9090/api/v1/users`,  user ,{  headers: {
        withCredentials: true,
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+'eyJraWQiOiJaMkk2YXBocHVoOFd6d3EyTFJTQUR4d0ZtY1p2Y0ZEbnNITjIrd3dqVWQ4PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwZjc4ODc0YS1hNzllLTQ1ZWYtOTk2Yy1kNjUzOTcyMmVhMWQiLCJjb2duaXRvOmdyb3VwcyI6WyJVU0VSIl0sImV2ZW50X2lkIjoiZGQwNjliYTEtMTNkNS00NzhjLWE0MmUtNjE2ZjdlNTgyNDUwIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTYxNjU4ODUzOSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTJfaDlyRGpVTjdyIiwiZXhwIjoxNjE2NTkyMTM5LCJpYXQiOjE2MTY1ODg1MzksImp0aSI6IjRiYTkxZTg0LTdhNGQtNDZkMi1hNWRkLTllODg4OTAwNzNhMSIsImNsaWVudF9pZCI6IjY4b2dmMjI0aDIwNjIya21rMHEycW40MnJnIiwidXNlcm5hbWUiOiJyb3phMjEwNCJ9.F0Y8uBu4FV97wxJyMjLJV4xqnyRwEwdHov_7TDQxqs7xQrPHy2DIDv-8pS7jy5YxAvlc04r0zKqxnfK_Trqorn108i811LAT7RHrur07AdT3Fk2SzCM9loyWC8kz5k_4UWK9FEVRRu07myav4Ry-W36okNuV8ab4ER0NhlhjXzmseu81NzpItZ1VbBdbWqTiNVphbDr2pdNwYl-SSNYIcvKSYQIYpdyQCsga_p2MUZciQP-qrOlrqjt0pSBygyNVjO-l9fHrdGyftDwCPFBDFx5avhmk500ebIjCVev4UCI1f7ma67nndQp_MQCBYpr_f_pSnyESU0LUlteQEBky3w'
    }})
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
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