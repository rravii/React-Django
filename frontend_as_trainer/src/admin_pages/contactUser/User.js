import React, { useEffect, useState } from 'react';
import {
  ContactMailOutlined,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@material-ui/icons";
import "./user.css";
import AdminWrapper from '../../layouts/AdminWrapper';
import api from '../../services/api';
import { useParams } from 'react-router-dom';


export default function User() {

  const [contactParticular, setContactParticular] = useState({});
  const [errors, setErrors] = useState({});

  const params = useParams()
  useEffect(() => {

    if (params.contactId) {
      api.get('api/contact-get-particular/' + params.contactId)
        .then(res => {
          if (res.status === 200) {
            console.log('data got', res.data)
            setContactParticular(res.data);
          } else {
            console.log('error')
          }
        })
    }
  }, [params]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateInfo(contactParticular.fullname, contactParticular.email, contactParticular.phone_no, contactParticular.message));
    api.put("api/contact/" + params.contactId, contactParticular)
      .then(res => {
        if (res.status === 201) {
          console.log('updated successfully')
        } else {
          console.log('error')
        }
      })
      .catch(err => {
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
      <div className="contactUser">
        <div className="contactUserTitleContainer">
          <h1 className="contactUserTitle">Edit Contact</h1>
        </div>
        <div className="contactUserContainer">

          <div className="contactUserShow">
            <div className="contactUserShowBottom">
              <span className="contactUserShowTitle">Contact Details</span>
              <div className="contactUserShowInfo">
                <PermIdentity className="contactUserShowIcon" />
                <span className="contactUserShowInfoTitle">{contactParticular.fullname}</span>
              </div>
              {/* <div className="contactUserShowInfo">
                <CalendarToday className="contactUserShowIcon" />
                <span className="contactUserShowInfoTitle">10.12.1999</span>
              </div> */}
              <div className="contactUserShowInfo">
                <PhoneAndroid className="contactUserShowIcon" />
                <span className="contactUserShowInfoTitle">{contactParticular.phone_no}</span>
              </div>
              <div className="contactUserShowInfo">
                <MailOutline className="contactUserShowIcon" />
                <span className="contactUserShowInfoTitle">{contactParticular.email}</span>
              </div>
              <div className="contactUserShowInfo">
                <ContactMailOutlined className="contactUserShowIcon" />
                <span className="contactUserShowInfoTitle">{contactParticular.message}</span>
              </div>
            </div>
          </div>
          <div className="contactUserUpdate" >
            <span className="contactUserUpdateTitle">Edit</span>

            <form className="contactUserUpdateForm" onSubmit={handleSubmit}>
              <div className="contactUserUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  value={contactParticular.fullname}
                  className="contactUserUpdateInput"
                  onChange={(e) => setContactParticular(old=>({...old,fullname: e.target.value}))}
                />
                {errors.name && <p>{errors.name}</p>}
              </div>
              <div className="contactUserUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  value={contactParticular.email}
                  className="contactUserUpdateInput"
                  onChange={(e) => setContactParticular(old=>({...old,email: e.target.value}))}
                />
                {errors.email && <p>{errors.email}</p>}
              </div>
              <div className="contactUserUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  value={contactParticular.phone_no}
                  className="contactUserUpdateInput"
                  onChange={(e) => setContactParticular(old=>({...old,phone_no: e.target.value}))}
                />
                {errors.number && <p>{errors.number}</p>}
              </div>
              <div className="contactUserUpdateItem">
                <label>Message</label>
                <input
                  type="text"
                  value={contactParticular.message}
                  className="contactUserUpdateInput"
                  onChange={(e) => setContactParticular(old=>({...old,message: e.target.value}))}
                />
                {errors.message && <p>{errors.message}</p>}
              </div>
              <div>
                <button type="submit" className="contactUserUpdateButton">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminWrapper>
  );
}