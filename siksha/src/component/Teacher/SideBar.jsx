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
        <NavLink to="/Dashboard">
          <FaBook className="icon" /> <span>Dashboard</span>
        </NavLink>
      </li>
      <li>
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
      <li>
        <NavLink to="/activity">
          <FaCheckCircle className="icon" /> <span>New Activity</span>
        </NavLink>
      </li>
       
    </>
  )}
  {userRole === "teacher" && (
    <>
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
        <li>
          <NavLink to="/verify">
            <FaCheckCircle className="icon" /> <span>Verify Activity</span>
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
