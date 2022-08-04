import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Register from "./pages/Register"
import Login from "./pages/Login"
import "./App.css"
import ContactList from "./admin_pages/contactList/ContactList";
import User from "./admin_pages/contactUser/User";
import NewContact from "./admin_pages/newContact/NewContact";
import PrivateRoute from "./PrivateRoute/index";


export default function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin">     
                   {/* here privateroute doesn't allow user to access this route without login  */}
            <Route path="/admin/contact" element={<PrivateRoute><ContactList /></PrivateRoute>} exact>
            </Route>
            <Route element={<PrivateRoute><User /></PrivateRoute>} path="/admin/contact/:contactId">

            </Route>
            <Route element={<PrivateRoute><NewContact /></PrivateRoute>} path="/admin/newContact">

            </Route>
          </Route>

          <Route element={<Login />} path="/login" >

          </Route>
          <Route element={<Contact />} path="/contact_us">

          </Route>
          <Route element={<Register />} path="/register">

          </Route>
          <Route element={<Home />} path="/" exact>

          </Route>
        </Routes>
      </Router>
    </>
  );
}
