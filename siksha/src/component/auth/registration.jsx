import React, { useState , useEffect }  from "react";
import "./Registration.css";
import { useNavigate } from "react-router-dom";



  const Registration = () => {
  const [formData, setFormData] = useState({
    role: "student",
    name: "",
    collegeID: "",
    course: "",
    semester: "",
    email: "",
    phone: "",
     password: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    const tempData = JSON.parse(localStorage.getItem("tempSignIn"));
    if (tempData) {
      setFormData((prev) => ({
        ...prev,
        email: tempData.email,
        password: tempData.password,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save user in localStorage
    localStorage.setItem("registeredUser", JSON.stringify(formData));
    // localStorage.setItem("teacherName", "Prof. Sharma"); // replace with real name from backend

    alert(`Registered successfully as ${formData.role.toUpperCase()}`);

    if (formData.role === "student") navigate("/student");
    else if (formData.role === "teacher") navigate("/teacher");
    else navigate("/admin");

    // Reset form
    setFormData({
      role: "student",
      name: "",
      collegeID: "",
      course: "",
      semester: "",
      email: "",
      phone: "",
      password: "",
    });
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
      <h1>On Board</h1>

      <select name="role" value={formData.role} onChange={handleChange} required>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
        <option value="admin">Admin</option>
      </select>

      <input 
        type="text" 
        name="name" 
        placeholder="Enter your Name" 
        value={formData.name} 
        onChange={handleChange} 
        required 
      />

      <input 
        type="text" 
        name="collegeID" 
        placeholder="Enter your College ID" 
        value={formData.collegeID} 
        onChange={handleChange} 
        required 
      />

      <input 
        type="text" 
        name="semester" 
        placeholder="Enter your Semester" 
        value={formData.semester} 
        onChange={handleChange} 
        required 
      />

      <input 
        type="text" 
        name="course" 
        placeholder="Enter Course" 
        value={formData.course} 
        onChange={handleChange} 
        required 
      />

      <input 
        type="email" 
        name="email" 
        placeholder="Enter your Email" 
        value={formData.email} 
        onChange={handleChange} 
        required 
      />

      <input 
        type="text" 
        name="phone" 
        placeholder="10-digit number" 
        value={formData.phone} 
        onChange={handleChange} 
        required 
      />

      <input 
        type="password" 
        name="password" 
        placeholder="Password" 
        value={formData.password} 
        onChange={handleChange} 
        required 
      />

      <button type="submit">Register</button>
    </form>
     
    </div>
  );
};

export default Registration;

