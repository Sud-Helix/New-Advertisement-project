import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./login.css";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const LoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/login", { ...user });
      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <>
      <div className="login-page">
        <form onSubmit={LoginSubmit}>
          <h2>Login</h2>
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            value={user.email}
            onChange={onInputChange}
          />

          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            value={user.password}
            onChange={onInputChange}
          />

          <div className="row">
            <button type="Submit">Login</button>
            <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
