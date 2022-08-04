import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  span{
    float: right;
  }
  .here{
    color: aqua;
    
  }
`;

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault(); // helps to prevent refresh of page once submitted
    console.log('Hello World');
    const errors = validateInfo(name, email, password, password2);
    setErrors(errors.errors)
    console.log(errors)
    if (!errors.haserror) {
      console.log("here")
      api.post("/api/register/", {
        username: name,
        email,
        password
      })
        .then(res => {
          if (res.status === 200) {
            console.log('created successfully')
            alert("You have been registered successfully!! Please login...")
            navigate("/login");
          } else {
            console.log('error')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  };

  function validateInfo(name, email, password, password2) {
    let errors = {}
    let haserror = false;

    if (!name) {
      console.log(name);
      console.log(email);
      errors.name = "Username required"
      haserror = true;
    }

    //Email
    if (!email) {
      errors.email = "Email required"
      haserror = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid"
      haserror = true;
    }

    if (!password) {
      errors.password = 'Password is required'
      haserror = true;
    } else if (password.length < 6) {
      errors.password = "Password needs to be 6 characters or more"
      haserror = true;
    }

    if (!password2) {
      errors.password2 = 'Password is required'
      haserror = true;
    } else if (password2 !== password) {
      errors.password2 = "Passwords do not match"
      haserror = true;
    }

    return {errors, haserror};

  }

  return (
    <div>
      <FormStyles onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name
            <input type="text" name="name" value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email
            <input type="email" name="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password
            <input type="password" name="password" value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password
            <input type="password" name="password2" value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </label>
          {errors.password2 && <p>{errors.password2}</p>}
        </div>
        <button type='submit'>Sign up</button>

        <br /><br />
        <span className='form-input-login'>
          Already have an account? Login
          <Link className='here' to='/login'> here</Link>
        </span>

      </FormStyles>

    </div>
  )
}
