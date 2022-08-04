import React, { useState } from 'react';
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



export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateInfo(name,email,number,message));
    api.post("/api/contact-post/", {
      fullname: name,
      email,
      phone_no: number,
      message
    })
    .then(res=>{
      if(res.status === 201){
        console.log('created successfully')

        // clear all input values in the form
        setName('');
        setEmail('');
        setNumber('');
        setMessage('');
        alert("You details has been submitted successfully!!!");
      }else{
        console.log('error')
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }

  function validateInfo(name,email,number,message){
    let errors = {}

    if(!name){
      console.log(name);
      console.log(email);
      errors.name = "Name required"
    }

    //Email
    if(!email){
      errors.email = "Email required"
    }else if(!/\S+@\S+\.\S+/.test(email)){
      errors.email = "Email address is invalid"
    }

    if(!number){
      errors.number = 'Number required'
    }else if (number.length !== 10){
      errors.number = "Number invalid"
    }

    if(!message){
      errors.message = 'Message is required'
    }

    return errors;

  }

  return (
    <div>
        <FormStyles onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Full Name
                  <input type="text" id="name" name="name" value={name}
                  onChange={(e) => setName(e.target.value)}
                  // onChange={(e) => console.log(e)}
                  />
                </label>
                {errors.name && <p>{errors.name}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="email">Email
                  <input type="text" id="email" email="email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                {errors.email && <p>{errors.email}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="number">Phone Number
                  <input type="text" id="number" number="number" value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  />
                </label>
                {errors.number && <p>{errors.number}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="message">Your Message
                  <textarea type="text" id="message" message="message" value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  />
                </label>
                {errors.message && <p>{errors.message}</p>}
            </div>
            <button type='submit'>Send</button>
        </FormStyles>
    </div>
  )
}
