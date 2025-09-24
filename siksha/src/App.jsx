import React from 'react';
import Login from './component/auth/Login';
import { BrowserRouter as Router, Routes, Route, Navigate, } from "react-router-dom";
import Registration from './component/auth/registration';
import TeacherDashboard from "./component/Teacher/teacherDashboard";
import Layout from './component/Teacher/Layout';
import StudentDashboard from './component/Teacher/StudentDashboard';
import ProfileVerification from "./component/Teacher/ProfileVerification";
// import Home from "./component/pages/home";
// // New pages
// import About from "./component/pages/about";
// import Features from "./component/pages/features";
// import Contact from "./component/pages/contact";
import NewActivity from "./component/Teacher/NewActivity"
import ActivityDetailModel from './component/Teacher/ActivityDetailModel';
import MyActivity from "./component/Teacher/MyActivity"
import VerifyActivity from "./component/Teacher/VerifyActivities";
;const App = () => {
  return (
    <>
    <Router>
       
      <Routes>
       
        {/* <Route path="/" element={<Navigate to="/Home" />} />  */}
 <Route path="/" element={<Login/>} />
 {/* <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} /> */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route element={<Layout />}>
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/student"element={<StudentDashboard/>} />
          <Route path="/profileV" element={<ProfileVerification />} />
          <Route path="/newactivity" element={< NewActivity/>} />
          <Route path="/myactivity" element={< MyActivity/>} />
          
          <Route path="/ActivityDetail" element={< ActivityDetailModel/>} />
             <Route path="/verify" element={<VerifyActivity/>} />
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

export default App;
