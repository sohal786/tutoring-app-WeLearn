import React, { useState, useContext } from 'react'; 
import { Link } from 'react-router-dom';
import { Form, Button, FloatingLabel, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { AuthContext } from '../AuthContext.js';

const backend_api = "http://localhost:5001";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { logIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  // Initialize show and handleClose
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  // Define handleOpen
  const handleOpen = () => setShow(true);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!email.trim() || !/^[^\s@]+@sfsu\.edu|mail\.sfsu\.edu$/.test(email)) {
      newErrors.email = 'Enter a valid SFSU email address';
      isValid = false;
    } else {
      newErrors.email = '';
    }

    if (!password || !/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,20}$/.test(password)) {
      newErrors.password = 'Password must meet the requirements';
      isValid = false;
    } else {
      newErrors.password = '';
    }

    setErrors(newErrors);
    return isValid;
  };
  

  const handleLogin = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const res = await sendLoginInfo();
        if (res.success) {
          console.log("[Success] Login successful");
          logIn(); // Update global auth state
          navigate('/'); // Navigate to homepage
        } else {
          console.log("[ERROR] Login failed");
          // Handle login failure
        }
      } catch (error) {
        console.error("Error occurred during login:", error);
        // Handle errors
      }
    } else {
      console.log("[ERROR] Form validation failure");
      // Handle form validation failure
    }
  };


  async function sendLoginInfo(e){
    // e.preventDefault()
    if (email === '' || password == '') {return}
    try {
      const res = await fetch(backend_api + '/sendLogin?email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password), {
        credentials: 'include' 
      });
      if(!res.ok){
        throw new Error('Network response was not ok.')
      } return await res.json();
    }catch (error) {
      throw new Error('Error sending login info: ' + error.message);
    }
  }


  return (
    <div className="loginContainer">
      <h1 className="mb-4">Hello.</h1>
      <Form noValidate onSubmit={handleLogin} className="loginForm">
        <p className="mb-4">
          Log in to your account using your San Francisco State University 
          email address.
        </p>
        <FloatingLabel
          controlId="email"
          label="SFSU Email Address"
          className="mb-3"
        >
          <Form.Control
            type="email"
            placeholder="SFSU Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={errors.email !== ''}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel
          controlId="password"
          label="Password"
          className="mb-3"
        >
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={errors.password !== ''}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </FloatingLabel>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <a href="#" onClick={handleOpen}>
            Forgot password?
          </a>
          <p> </p>
          <Link to="/register">
            <a>Don't have an account? Sign Up </a>
          </Link>

          <br></br>
          <br></br>

          <Button variant="primary" type="submit">
            Log in
          </Button>
        </Form.Group>
      </Form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Form>
            The password reset service will not be implemented.
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoginPage;

/*
import { useState } from "react";
import { Link } from "react-router-dom";
import {Form, Button, OverlayTrigger, Tooltip, FloatingLabel, Modal} from "react-bootstrap";

const LoginPage = () => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  const validateEmail = () => {
    // Check if this is a valid sfsu email
    const emailRegex = /@sfsu\.edu$/;
    return email && emailRegex.test(email);
  };

  const validatePassword = () => {
    //Checks is the length of the password entered is at least 8 or more characters long
    return password && password.length >= 8;
  };

  const isFormValid = () => {
    // Check if both email and password are not empty
    return email && password;
  };

  const handleValidation = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      // event.stopPropagation();

      if (isFormValid() && validateEmail() && validatePassword()) {
        //Check if all passes
        console.log("[OK] Form validation success");
      } else {
        console.log("[ERROR] Form validation failure");
      }
    }

    setValidated(true);
  };

  return (
    <div className="content">
      <div className="loginContainer">
        <h1>Hello.</h1>
        {/* Login form provided by react-bootstrap */ /*
        <Form
          className="loginForm"
          noValidate
          validated={validated}
          onSubmit={handleValidation}>
          {/* <p>
            Sign in using your San Francisco State University email address to
            get started.
          </p>
 */ /*
          {/* Email Address form */ /*
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel
              required
              className="mb-3"
              controlId="formBasicEmail"
              label="SFSU Email Address">
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-disabled">
                    Use only @sfsu.edu, not @mail.sfsu.edu
                  </Tooltip>
                }>
                <Form.Control
                  required
                  type="email"
                  placeholder="SFSU Email Address"
                  value={email || ""}
                  onChange={(event) => setEmail(event.target.value)}
                  isInvalid={email !== null && email !== "" && !validateEmail()}
                />
              </OverlayTrigger>

              <Form.Control.Feedback type="invalid">
                {email === null
                  ? "Enter an email address"
                  : "Enter a valid @sfsu.edu email address"}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          {/* Password form */ /*
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <FloatingLabel
              required
              className="mb-3"
              controlId="formBasicPassword"
              label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password || ""}
                onChange={(event) => setPassword(event.target.value)}
                isInvalid={
                  password !== null && password !== "" && !validatePassword()
                }
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <a href="#" onClick={handleOpen}>
              Forgot password?
            </a>
            <p> </p>
            <Link to="/register">
              <a>Don't have an account? Sign Up </a>
            </Link>

            <br></br>
            <br></br>

            <Button variant="primary" type="submit">
              Log in
            </Button>
          </Form.Group>
        </Form>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Form>
            The password reset service will not be implemented.
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoginPage; */