import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';

const FormStyles = styled.form`
  width: 100%;
  .form-group{
    width: 100%;
    margin-bottom: 2rem;
  }
  label{
    font-size: 1.8rem;
  }
  input,textarea{
    width: 100%;
    font-size: 2rem;
    padding: 1.2rem;
    color: var(--gray-1);
    background-color: var(--deep-dark);
    outline: none;
    border: none;
    border-radius: 8px;
    margin-top: 1rem;
  }
  textarea{
    min_height: 250px;
    resize: vertical;
  }
  button[type="submit"]{
    background-color: var(--gray-1);
    color: var(--black);
    font-size: 2rem;
    display: inline-block;
    outline: none;
    border: none;
    padding: 1rem 4rem;
    border-radius: 8px;
    cursor: pointer;
  }
  p{
    color: red; 
  }
`;

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate("/admin/contact")
    }
  }, [])

  const handleSubmit = e =>{
    e.preventDefault(); // helps to prevent refresh of page once submitted
    console.log('Hello World');
    setErrors(validateInfo(username,password));
    api.post("/api/login/", {
      username,
      password
    })
    .then(res=>{
      if(res.status === 200){
        console.log('created successfully')
        console.log('data got', res.data)
        const {token} = res.data;
        localStorage.setItem('token', token);
  
        navigate("/admin/contact")
        console.log('token stored locally')
      }else{
        console.log('error')
      }
    })
    .catch(err=>{
      console.log(err)
    })

  };

  function validateInfo(username,password){
    let errors = {}

    //username
    if(!username){
      errors.username = "Username required"
    }

    if(!password){
      errors.password = 'Password is required'
    }else if (password.length < 6){
      errors.password = "Password needs to be 6 characters or more"
    }

    return errors;

  }

  return (
    <div>
        <FormStyles onSubmit={handleSubmit}>
            
            <div className="form-group">
                <label htmlFor="username">Username
                  <input type="username" name="username" value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  />
                </label>
                {errors.username && <p>{errors.username}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="password">Password
                  <input type="password" name="password" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                {errors.password && <p>{errors.password}</p>}
            </div>
        
            <button type='submit'>Log in</button>

        </FormStyles>

    </div>
  )
}
