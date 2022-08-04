import React, { useState } from 'react';
import AdminWrapper from '../../layouts/AdminWrapper';
import api from '../../services/api';
import "./newContact.css";

export default function NewContact() {
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
    <AdminWrapper>
      <div className="newContact">
        <h1 className="newContactTitle">New Contact</h1>
        <form className="newContactForm" onSubmit={handleSubmit}>
          <div className="newContactItem">
            <label>Full Name</label>
            <input type="text" placeholder="John Smith"  value={name}
            onChange={(e) => setName(e.target.value)}/>
            {errors.name && <p>{errors.name}</p>}
          </div>
          <div className="newContactItem">
            <label>Email</label>
            <input type="email" placeholder="john@gmail.com" value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div className="newContactItem">
            <label>Phone</label>
            <input type="text" placeholder="9800000000" value={number}
            onChange={(e) => setNumber(e.target.value)}/>
            {errors.number && <p>{errors.number}</p>}
          </div>
          <div className="newContactItem">
            <label>Message</label>
            <input type="text" placeholder="Place your message here." value={message}
            onChange={(e) => setMessage(e.target.value)}/>
            {errors.message && <p>{errors.message}</p>}
          </div>
          <button type="submit" className="newContactButton">Create</button>
        </form>
      </div>
    </AdminWrapper>
  );
}
