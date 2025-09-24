import React from 'react';
<<<<<<< HEAD
import Login from './component/auth/Login';
=======
import Login from './component/auth/login';
>>>>>>> cb75f395594eb5ac4f5e63f2cfd951eb7bb215ef
import { BrowserRouter as Router, Routes, Route, Navigate, } from "react-router-dom";
import Registration from './component/auth/registration';
import TeacherDashboard from "./component/Teacher/teacherDashboard";
import Layout from './component/Teacher/Layout';
import StudentDashboard from './component/Teacher/StudentDashboard';
<<<<<<< HEAD
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
=======

const App = () => {
>>>>>>> cb75f395594eb5ac4f5e63f2cfd951eb7bb215ef
  return (
    <>
    <Router>
       
      <Routes>
<<<<<<< HEAD
       
        {/* <Route path="/" element={<Navigate to="/Home" />} />  */}
 <Route path="/" element={<Login/>} />
 {/* <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} /> */}

=======
        {/* Default route → Login page */}
        <Route path="/" element={<Navigate to="/login" />} /> 
>>>>>>> cb75f395594eb5ac4f5e63f2cfd951eb7bb215ef
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route element={<Layout />}>
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/student"element={<StudentDashboard/>} />
<<<<<<< HEAD
          <Route path="/profileV" element={<ProfileVerification />} />
          <Route path="/newactivity" element={< NewActivity/>} />
          <Route path="/myactivity" element={< MyActivity/>} />
          
          <Route path="/ActivityDetail" element={< ActivityDetailModel/>} />
             <Route path="/verify" element={<VerifyActivity/>} />
=======
>>>>>>> cb75f395594eb5ac4f5e63f2cfd951eb7bb215ef
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

<<<<<<< HEAD
export default App;
=======
export default App
>>>>>>> cb75f395594eb5ac4f5e63f2cfd951eb7bb215ef
