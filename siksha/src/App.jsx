import React from 'react';
import Login from './component/auth/login';
import { BrowserRouter as Router, Routes, Route, Navigate, } from "react-router-dom";
import Registration from './component/auth/registration';
import TeacherDashboard from "./component/Teacher/teacherDashboard";
import Layout from './component/Teacher/Layout';
import StudentDashboard from './component/Teacher/StudentDashboard';

const App = () => {
  return (
    <>
    <Router>
       
      <Routes>
        {/* Default route → Login page */}
        <Route path="/" element={<Navigate to="/login" />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route element={<Layout />}>
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/student"element={<StudentDashboard/>} />
          <Route path="/search" element={<h1>Search Results Page</h1>} />
          <Route path="/notifications" element={<h1>Notifications Page</h1>} />
          <Route path="/profile" element={<h1>Profile Page</h1>} />
        
        </Route>
      </Routes>
      
    </Router>
    {/* <Login/> */}
    
    {/* <Registration/> */}
  </>
  )
}

export default App
