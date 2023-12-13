import React, { useState } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const Registration = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: ''
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
      isValid = false;
    } else {
      newErrors.fullName = '';
    }

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

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    } else {
      newErrors.confirmPassword = '';
    }

    if (!agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
      isValid = false;
    } else {
      newErrors.agreeTerms = '';
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegistration = (event) => {
    event.preventDefault();

    if (validateForm()) {
      console.log("[OK] Form validation success");
      // Add your registration logic here
      sendRegisterInfo()
    } else {
      console.log("[ERROR] Form validation failure");
    }
  };

  
  

  async function sendRegisterInfo(){
    // e.preventDefault()
    if (fullName=='' || email == '' || password == '') {return}
    try {
      const res = await fetch('http://localhost:5001/sendRegister',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {fullName, email, password}
        })
      })
      if(res.ok){
        console.log('register was successful')
        //switch page
        navigate('/login')
      }else{
        console.log('register has failed')
        alert("Register failed")
      }
    }catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="loginContainer">
      <h1 className="mb-4">Registration</h1>

      <Form noValidate onSubmit={handleRegistration} className="loginForm">
        <p>
          You must be a currently enrolled undergraduate,
          graduate, or faculty at San Francisco State
          University to use this service.
         </p>
        <FloatingLabel
          controlId="fullName"
          label="Full Name"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            isInvalid={errors.fullName !== ''}
          />
          <Form.Control.Feedback type="invalid">
            {errors.fullName}
          </Form.Control.Feedback>
        </FloatingLabel>

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

        <FloatingLabel
          controlId="confirmPassword"
          label="Confirm Password"
          className="mb-3"
        >
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            isInvalid={errors.confirmPassword !== ''}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </FloatingLabel>

        <div className="form-check mb-3 d-flex">
          <input
            type="checkbox"
            className={`form-check-input ${errors.agreeTerms ? 'is-invalid' : ''}`}
            id="agreeTerms"
            checked={agreeTerms}
            onChange={() => setAgreeTerms(!agreeTerms)}
          />
          <div className="me-2">
            <label className="form-check-label" htmlFor="agreeTerms">
              &nbsp;&nbsp;I agree to the{' '}
              <a className="text-decoration-underline" href="#">
                terms and conditions
              </a>
            </label>
            {errors.agreeTerms && (
              <div className="text-danger text-center">{errors.agreeTerms}</div>
            )}
          </div>
        </div>

        <div className="text-muted mb-3">
          Passwords must be 8-20 characters long and contain one uppercase letter, one special character (!@#$%^&*), and one number.
        </div>

        <Button type="submit" className="btn btn-primary">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Registration;


/*
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
  FloatingLabel,
  Col,
  Row,
  InputGroup,
} from "react-bootstrap";

const Registration = () => {
  const [validated, setValidated] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [interactionStarted, setInteractionStarted] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const validateEmail = () => {
    const emailRegex = /@sfsu\.edu$/;
    return email && emailRegex.test(email);
  };

  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    return (
      password &&
      passwordRegex.test(password) &&
      password.length >= 8
    );
  };

  const validateConfPassword = () => {
    return confPassword.trim() !== "" && confPassword === password && confPassword !== null;
  };

  const handleCheckboxChange = () => {
    setAgreedToTerms(!agreedToTerms);
  };

  const isFormValid = () => {
    return (
      email.trim() !== "" &&
      password.trim() !== "" &&
      confPassword.trim() !== "" &&
      fullName.trim() !== "" &&
      agreedToTerms
    );
  };

  const handleValidation = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false || !agreedToTerms) {
      event.preventDefault();

      if (
        isFormValid() &&
        validateEmail() &&
        validatePassword()
      ) {
        if (password.trim !== "")
          console.log("[OK] Form validation success");
      } else {
        console.log("[ERROR] Form validation failure");
      }
    }

    setValidated(true);
  };

  const isCheckboxValid = agreedToTerms && validated;

  return (
    <div className="content">
      <div className="loginContainer">
        <h1>Registration</h1>
        <Form
          className="loginForm"
          noValidate
          validated={validated}
          onSubmit={handleValidation}
        >
          <p>
            You must be a currently enrolled undergraduate,
            graduate, or faculty at San Francisco State
            University to use this service.
          </p>
          {/* Full Name */ /*
          <Form.Group className="mb-3" controlId="formBasicName">
            <FloatingLabel
              required
              className="mb-3"
              controlId="formBasicFullName"
              label="Full Name"
            >
              <Form.Control
                type="text"
                placeholder="Full Name"
                onChange={(event) => setFullName(event.target.value)}
                isInvalid={
                  fullName !== "" &&
                  (
                    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/.test(fullName) ||
                    !/^[a-zA-Z\s]*$/.test(fullName)
                  )
                }
                className={validated && fullName !== "" && !/^[a-zA-Z\s]*$/.test(fullName) ? "is-invalid" : ""}
                style={{ width: "100%" }}
              />
            </FloatingLabel>

            <Form.Control.Feedback>
              {fullName !== "" &&
                (
                  /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/.test(fullName) ||
                  !/^[a-zA-Z\s]*$/.test(fullName)
                )
                ? "Full Name cannot contain special characters or numbers"
                : ""}
            </Form.Control.Feedback>
          </Form.Group>


          {/* Email Address form */ /*
          <Form.Group className="mb-3" controlId="formBasicInfo">
            <FloatingLabel
              required
              className="mb-3"
              controlId="formBasicEmail"
              label="SFSU Email Address"
            >
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-disabled">
                    Use only @sfsu.edu, not @mail.sfsu.edu
                  </Tooltip>
                }
              >
                <Form.Control
                  required
                  type="email"
                  placeholder="SFSU Email Address"
                  value={email || ""}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  isInvalid={
                    email !== null &&
                    email !== "" &&
                    !validateEmail()
                  }
                  style={{ width: "100%" }}
                />
              </OverlayTrigger>

              <Form.Control.Feedback type="invalid">
                {email === null
                  ? "Enter an email address"
                  : "Enter a valid @sfsu.edu email address"}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          {/* Password */ /*
          <InputGroup className="mb-2" controlId="formBasicPassword">
              <FloatingLabel
                required
                className="mb-2"
                controlId="formBasicPassword"
                label="Password"
              >
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  value={password || ""}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  onBlur={() =>
                    setInteractionStarted(true)
                  }
                  isInvalid={
                    interactionStarted &&
                    password.trim() !== "" &&
                    !validatePassword()
                  }
                  style={{ width: "100%" }}
                />

                <Form.Control.Feedback type="invalid">
                  {password === null
                    ? "Enter a password"
                    : password.trim() === ""
                    ? "Enter a password"
                    : "Your password must meet the following criteria described below."}
                </Form.Control.Feedback>
              </FloatingLabel>
            
          </InputGroup>

          {/* Confirm Password */ /*
          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <FloatingLabel
              required
              className="mb-2"
              controlId="formBasicConfirmPassword"
              label="Confirm Password"
            >
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confPassword || ""}
                onChange={(event) => setConfPassword(event.target.value)}
                isInvalid={
                  confPassword !== password ||
                  (confPassword.trim() !== "" && !validateConfPassword())
                }
                style={{ width: "100%" }}
              />
              <Form.Control.Feedback type="invalid">
                {confPassword === null
                  ? "Confirm your password"
                  : confPassword.trim() === ""
                  ? "Confirm your password"
                  : "Passwords do not match"}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label={
                <span className={isCheckboxValid ? "custom-checkbox-label" : ""}>
                  I agree to the{" "}
                  <Link to="#" className="dummy-link">
                    terms and conditions
                  </Link>
                </span>
              }
              onChange={handleCheckboxChange}
              checked={agreedToTerms}
              isInvalid={!isCheckboxValid && validated}
            />
            <Form.Control.Feedback type="invalid">
              You must agree to the terms and conditions.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicInfo">
            <Form.Text
              id="passwordHelpBlock"
              muted
            >
              Passwords must be 8-20 characters long and
              contains the following: One uppercase letter,
              One special character (!@#$%^&*), and one
              number.
            </Form.Text>
            <br></br>
            <br></br>
            <Link to="/login">
              <a>Already have an account? Log in</a>
            </Link>
            
            <br></br>
            <br></br>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Registration; */
