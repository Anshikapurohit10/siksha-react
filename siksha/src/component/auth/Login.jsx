
import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import API from "./api";
const Login = () => {
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState("");
   const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // 👈 role ka state

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/register", { email, password,name,role });

      if (res.data?.token) {
        localStorage.setItem("tresetu_token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

         alert(res.data.message || "Signup successful. Please complete your profile");
        navigate("/register"); 
        
            } 


            
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  
const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });

      if (res.data?.token) {
        localStorage.setItem("tresetu_token", res.data.token);
        localStorage.setItem("role", res.data.user.role); // ✅ Sidebar role

        alert("Login Successful!");
        if (res.data.user.role === "student") navigate("/student");
        else if (res.data.user.role === "teacher") navigate("/teacher");
        else navigate("/admin");
      } else if (res.data?.under_verification) {
        alert("Profile under verification. Wait for approval.");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
     
    <div className="login-wrapper">
    <div className={isActive ? "container active" : "container"} id="container">
             {/* Sign Up Form */}

<div className="form-container sign-up">
        <form onSubmit={handleSignup}>
          <h1>Create Account</h1>
          <input
            type="text"
            value={name }
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <div className="role-container">
              {["student", "teacher"].map((r) => (
                <label key={r} className={`role-option ${role === r ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="role"
                    value={r}
                    checked={role === r}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <span>{r.charAt(0).toUpperCase() + r.slice(1)}</span>
                </label>
              ))}
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Sign Up"}
            </button>
          {/* <button type="submit">Next → Registration</button> */}
               
            <div className="divider">OR</div>
            <button type="button" className="google-btn">
              Sign Up with Google
            </button>
          </form>
        </div>


          {/* <button type="submit">Next → Registration</button> */}
           {/* <div className="divider">OR</div> */}

    {/* Google Sign-In Button
     <button type="button" className="google-btn"> 
      Sign Up with Google
    </button>
        </form>
      </div> */}

      {/* Sign In Form */}
      <div className="form-container sign-in">
        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
<div className="role-container">
      {["student", "teacher", "admin"].map((r) => (
        <label key={r} className={`role-option ${role === r ? "selected" : ""}`}>
          <input
            type="radio"
            name="role"
            value={r}
            checked={role === r}
            onChange={(e) => setRole(e.target.value)}
          />
          <span>{r.charAt(0).toUpperCase() + r.slice(1)}</span>
        </label>
      ))}
    </div>
          
     
          <p class="forgot-password">
    <a href="/forgot-password">Forgot your password?</a>
  </p>
<button type="submit" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
          {/* <button type="submit">Sign In</button>
        </form>
        
      </div> */}

      {/* Toggle Section */}
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Provide your details to unlock all features of our site.</p>
            <button className="hidden" onClick={() => setIsActive(false)}>
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Students!</h1>
            <p>Let’s get you started!</p>
            <button className="hidden" onClick={() => setIsActive(true)}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default Login;
