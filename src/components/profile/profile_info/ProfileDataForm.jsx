import React, {useState} from 'react'

export default 
    function ProfileDataForm() {

        const [form, setForm] = useState({
          name: '',
          password: ''
        });
      
        const submit = e => {
          e.preventDefault();
          console.log(form.name, form.password);
        };
      
        const update = e => {
          setForm({
            ...form,
            [e.target.name]: e.target.value
          });
        };
      
        return (
          <form onSubmit={submit}>
      
            <label>
               Имя:
              <input
                value={form.name}
                name="name"
                onChange={update}
              />
            </label>
            
          <label>
              Пароль:
              <input
                value={form.password}
                name="password"
                type="password"
                onChange={update}
              />
            </label>
      
            <button>Отправить</button>
          </form>
        );
      }