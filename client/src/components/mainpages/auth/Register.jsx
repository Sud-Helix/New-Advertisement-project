import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    password: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", { ...user });
      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <>
      <div className="login-page">
        <form onSubmit={registerSubmit}>
          <h2>Register</h2>
          <input
            type="text"
            name="name"
            required
            placeholder="Name"
            value={user.name}
            onChange={onInputChange}
          />

          <input
            type="number"
            name="mobileNumber"
            required
            placeholder="Mobile Number"
            value={user.mobileNumber}
            onChange={onInputChange}
          />

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
            <button type="Submit">Register</button>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
