import React, { useState } from "react";
import "./Login.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../utils/LocalStorageManager";
import { TOAST_FAILURE, TOAST_SUCCESS } from "../../App";
import { showToast } from "../../redux/slices/appConfigStore";
import { useDispatch } from "react-redux";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Change "Password" to "password" for consistency
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosClient.post("/auth/login", {
        email,
        password,
      });

      const accessToken = response?.result?.accessToken;
      if (accessToken) {
        setItem(KEY_ACCESS_TOKEN, accessToken);
        dispatch(
          showToast({
            type: TOAST_SUCCESS,
            message: "Login Successfull",
          })
        );
        navigate("/");
      } else  {
        dispatch(
          showToast({
            type: TOAST_FAILURE,
            message: "Access Token is not found",
          })
        );
      }
    } catch (error) {
      dispatch(
        showToast({
          type: TOAST_FAILURE,
          message: "Check Email And Password",
        })
      );
    }
  };

  return (
    <div className="login">
      <div className="login-box">
        <h2 className="heading">Login</h2>
        <form onSubmit={handleSubmit}>
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
              type={passwordVisible ? "text" : "Password"}
              className="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="password-toggle"
              onClick={togglePasswordVisibility}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <input type="submit" className="submit" value="Submit" />{" "}
          {/* Change type to "submit" */}
        </form>
        <p className="subheading">
          Don't have an Account?{" "}
          <Link to={"/signup"} className="link">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
