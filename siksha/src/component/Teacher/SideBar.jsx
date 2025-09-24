import React , { useState }from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaFileAlt, FaBook, FaComments, FaQuestionCircle, FaCog, FaCheckCircle, FaSignOutAlt } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  
  const [expanded, setExpanded] = useState(false);
   const userRole = localStorage.getItem("role") || "student"; 
    console.log("Rendering Sidebar with role:", userRole);

  return (

    <div className={`sidebar ${expanded ? "expanded" : ""}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}>
     {/* <div className="logo"> logo</div> */}
      <ul className="menu">

         {userRole === "student" && (
    <>
      <li>
<<<<<<< HEAD
        <NavLink to="/student">
=======
        <NavLink to="/Dashboard">
>>>>>>> cb75f395594eb5ac4f5e63f2cfd951eb7bb215ef
          <FaBook className="icon" /> <span>Dashboard</span>
        </NavLink>
      </li>
      <li>
<<<<<<< HEAD
        <NavLink to="/newactivity">
          <FaCheckCircle className="icon" /> <span>Upload Activity</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/myactivity">
          <FaCheckCircle className="icon" /> <span> MY Activity</span>
        </NavLink>
      </li>
      <li>
=======
>>>>>>> cb75f395594eb5ac4f5e63f2cfd951eb7bb215ef
              <NavLink to="/result">
                <FaFileAlt className="icon" /> <span>Result</span>
              </NavLink>
            </li>
      <li>
        <NavLink to="/connect">
          <FaComments className="icon" /> <span>Alumni Connect</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/Opportunity">
          <FaQuestionCircle className="icon" /> <span>opportunity</span>
        </NavLink>
      </li>
      <li>
              <NavLink to="/help">
                <FaFileAlt className="icon" /> <span>Help</span>
              </NavLink>
            </li>
      <li>
        <NavLink to="/settings">
          <FaCog className="icon" /> <span>Setting</span>
        </NavLink>
      </li>
<<<<<<< HEAD
      
=======
      <li>
        <NavLink to="/activity">
          <FaCheckCircle className="icon" /> <span>New Activity</span>
        </NavLink>
      </li>
       
>>>>>>> cb75f395594eb5ac4f5e63f2cfd951eb7bb215ef
    </>
  )}
  {userRole === "teacher" && (
    <>
<<<<<<< HEAD
    <li>
        <NavLink to="/teacher">
          <FaBook className="icon" /> <span>Dashboard</span>
        </NavLink>
      </li>
      
        <li>
          <NavLink to="/profileV">
            <FaCheckCircle className="icon" /> <span>profile verification</span>
          </NavLink>
        </li>
      <li>
          <NavLink to="/verify">
            <FaCheckCircle className="icon" /> <span>Verify Activity</span>
          </NavLink>
        </li>
=======
>>>>>>> cb75f395594eb5ac4f5e63f2cfd951eb7bb215ef
        <li>
          <NavLink to="/assignment">
            <FaBook className="icon" /> <span>Assignment</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/chat">
            <FaComments className="icon" /> <span>Alumni Chat</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/help">
            <FaQuestionCircle className="icon" /> <span>Help</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings">
            <FaCog className="icon" /> <span>Setting</span>
          </NavLink>
        </li>
<<<<<<< HEAD
       
        <li>
          <NavLink to="/profileV">
            <FaCheckCircle className="icon" /> <span>profile verification</span>
=======
        <li>
          <NavLink to="/verify">
            <FaCheckCircle className="icon" /> <span>Verify Activity</span>
>>>>>>> cb75f395594eb5ac4f5e63f2cfd951eb7bb215ef
          </NavLink>
        </li>
        
        </>
  )}

        <li className="logout">
          <NavLink to="/logout">
            <FaSignOutAlt className="icon" /> <span>Log out</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
