// src/App.js
import React, { useState } from "react";
// import React from 'react';
import { BrowserRouter as Router, Route,Routes, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import Signup from './components/Signup';
import ClubPage from './components/ClubPage';
import AddEventPage from "./components/AddEventPage";
import AdminLogin from "./components/AdminLogin";
import AdminPage from "./components/AdminPage";
import EventListPage from "./components/EventList";
import ViewMembers from "./components/ViewMembers";
import ForgotPassword from "./components/ForgotPassword";
// import { Router ,Route } from 'react-router-dom';
const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  return (
    <Router>
      <Routes>
       
        <Route
          path="/login"
          element={<LoginPage setIsUserLoggedIn={setIsUserLoggedIn} />}
        />
        
        <Route 
          path='/Signup' 
          element={<Signup setIsUserLoggedIn={setIsUserLoggedIn} />}
          />

        <Route path='/clubpage' element={<ClubPage/>}/>

        <Route path="/" element={<HomePage isUserLoggedIn={isUserLoggedIn} setIsAdminLoggedIn={setIsAdminLoggedIn}  />} />
        <Route path='/addevent' element={<AddEventPage/>}/>
        <Route path='/getevent' element={<EventListPage/>}/>
        <Route path='/viewmembers' element={<ViewMembers/>}/>
        <Route path='/admin' element={<AdminPage/>}/>
        <Route path='/forgot' element={<ForgotPassword/>}/>
        <Route path='/adminlogin' element={<AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn}/>}/>
        
          
      </Routes>
    </Router>
  );
};

export default App;
