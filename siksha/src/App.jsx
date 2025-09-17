import React from 'react';
import Login from './component/auth/login';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Registration from './component/auth/registration';
import StudentDashboard from "./component/student/StudentDashboard";

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        {/* Default route → Login page */}
        <Route path="/" element={<Navigate to="/login" />} /> 

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/student" element={<StudentDashboard />} />
        {/* <Route path="/teacher" element={<TeacherDashboard />} /> */}
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
      </Routes>
    </Router>
    {/* <Login/> */}
    {/* <Registration/> */}
  </>
  )
}

export default App
