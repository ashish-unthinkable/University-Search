import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { GET } from "../../API";
import { serverUrl } from "../../Constant";
import { updateUser } from "../../feature/userFeature.js";
import Input from "../Input.jsx/Input";
import Button from "../Button/Button";
import "./login.css";
// import { useAuth } from "../../AuthProvider";

function Login() {
  // const { updateUser } = useAuth();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({});

  // initial warning -> warning on input when the page mounts
  const [initialWarning, setInitialWarning] = useState(false);
  const [warning, setWarning] = useState({isWarning: false, warningText:""});
  const navigate = useNavigate();

  const handleEmailChange = useCallback((event) => {
    const emailValue = event.target.value;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      email: emailValue,
    }))
  }, []);

  const handlePasswordChange = useCallback((event) => {
    const passwordValue = event.target.value;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      password: passwordValue,
    }))
  }, []);

  const handleLogin = useCallback(async() => {
    try {
      const {email, password} = credentials;
      if (!email || !password) {
        setInitialWarning(true);
        setWarning({...warning, isWarning:false});
        return;
      } 
      const response = await GET(serverUrl + `?email=${email}&password=${password}`);
      const userData = response?.data?.[0];
      if (!userData) {
        setWarning({isWarning: true, warningText:"Wrong Password or User not registered!"})
        return;
      }
      dispatch(updateUser(userData))
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  }, [updateUser, credentials]);

  const goToRegister = useCallback(() => navigate("/register"), []);

  return (
    <div className="loginForm">
      <Input
        label="Email ID"
        type="email"
        placeholder="Enter your Email"
        required={true}
        warning={initialWarning && !credentials.email ? true : false}
        onChange={handleEmailChange}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Enter your Password"
        required={true}
        warning={initialWarning && !credentials.password ? true : false}  
        onChange={handlePasswordChange}
      />

      <Button
        label="Login"
        onClick={handleLogin}
        arrow={true}
        warning={warning}
      />
      <Button
        label="Register New User"
        onClick={goToRegister}
        arrow={false}
      />
    </div>
  );
}

export default Login;
