import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { POST, GET } from "../../API";
import { serverUrl } from "../../Constant";
import Input from "../Input.jsx/Input";
import Button from "../Button/Button";
import { updateUser } from "../../feature/userFeature";
import "./register.css";
// import { useAuth } from "../../AuthProvider";

function Register() {

  // const { updateUser } = useAuth();
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({});
  // const [warning, setWarning] = useState(false);
  // const [warningText, setWarningText] = useState("");
  const [initialWarning, setInitialWarning] = useState(false);
  const [warning, setWarning] = useState({isWarning: false, warningText:""});
  const navigate = useNavigate();

  const handleNameChange = useCallback((event) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      name: event.target.value,
    }))
  }, []);

  const handleEmailChange = useCallback((event) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      email: event.target.value,
    }))
  }, []);

  const handlePasswordChange = useCallback((event) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      password: event.target.value,
    }))
  }, []);

  const handleRegister = useCallback(async () => {
    try {
      const {name, email, password} = credentials;
      if (!email || !password) {
        // setWarning(true);
        // setWarningText("Any of the email or password cannot be left empty");
        setInitialWarning(true);
        setWarning({isWarning: false, warningText:""});
        return;
      }

      // Check if user already exists
      const response = await GET(serverUrl + `?email=${email}&password=${password}`);
      const user = response?.data?.[0];
      if(user){
        // setWarning(true);
        // setWarningText("User already exists, Go to Login");
        setWarning({isWarning: true, warningText:"User already exists!"})
        return; 
      }

      // Register the new user
      const formData = {
        id: email.split("@")[0].toString(),
        name: name,
        email: email,
        password: password,
        university: [],
      };

      await POST(serverUrl, formData);
      // localStorage.setItem("user", JSON.stringify(formData));
      // updateUser(formData)
      dispatch(updateUser(formData));
      navigate("/");
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  }, [credentials]);

  const goToLogin = useCallback(() => navigate("/login"), []);

  return (
    <>
      <div className="registerForm">
        <Input
          label="Name"
          type="text"
          placeholder="Enter your Name"
          required={false}
          warning={false}
          onChange={handleNameChange}
        />

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
          label="Register"
          onClick={handleRegister}
          arrow={false}
          warning={warning}
        />

        <Button label="Login" onClick={goToLogin} arrow={true} />
      </div>
    </>
  );
}

export default Register;