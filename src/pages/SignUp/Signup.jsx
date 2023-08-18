import React, { useState } from "react";
import "./Signup.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import {axiosClient} from "../../utils/axiosClient";
import { useDispatch } from "react-redux";
import { TOAST_FAILURE, TOAST_SUCCESS } from "../../App";
import { showToast } from "../../redux/slices/appConfigStore";


function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
   const dispatch = useDispatch();


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await axiosClient.post("/auth/signup", {
        name,
        email,
        password,
      });
      dispatch(
        showToast({
          type: TOAST_SUCCESS,
          message: "Account Created Successfully",
        })
      );
      setName("");
      setEmail("");
      setPassword(""); //manually reset the form after create account
    } catch (error) {
      dispatch(
        showToast({
          type: TOAST_FAILURE,
          message: "Check your Name Email and Password"
        })
      );
    }
  }

 
  return (
    <div className="signup">
      <div className="signup-box">
        <h2 className="heading">Sign up</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text" // Change the type to "text" for the name input
            className="name"
            id="name"
            value={name} // Add value attribute to the input field
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="email"
            id="email"
            value={email} // Add value attribute to the input field
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="password-input">
            <label htmlFor="password">Password</label>
            <input
              type={passwordVisible ? "text" : "password"} // Change "Password" to "password"
              className="password"
              id="password"
              value={password} // Add value attribute to the input field
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button" // Change the type to "button"
              className="password-toggle"
              onClick={togglePasswordVisibility}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <input type="submit" className="submit" />
        </form>
        <p className="subheading">
          Have an Account?{" "}
          <Link to={"/login"} className="link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
