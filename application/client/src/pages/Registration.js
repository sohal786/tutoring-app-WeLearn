/*
  Registration.js
  Author: Azistara
*/

import { useState } from "react";
import { Link } from "react-router-dom";
import {Form, Button, OverlayTrigger, Tooltip, FloatingLabel, Col, Row, InputGroup} from "react-bootstrap";

const RegPage = () => {
  const [validated, setValidated] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [sid, setSid] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [interactionStarted, setInteractionStarted] = useState(false);

  const validateEmail = () => {
    // Check if this is a valid sfsu email
    const emailRegex = /@sfsu\.edu$/;
    return email && emailRegex.test(email);
  };

  const validateID = () => {
    //Check id the id is valid.
    const sidRegex = /^\d+$/;
    return sid && sidRegex.test(sid) && sid.length === 9;
  }

  const validatePassword = () => {
    //Checks is the length of the password entered is at least 8 or more characters long and
    //meets strict criteria: one uppercase letter, one special character, and one number
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    return password && passwordRegex.test(password) && password.length >= 8;
    
  };

  const validateConfPassword = () => {
    //Check against password.
    return confPassword.trim() !== "" && confPassword === password;
  }

  const isFormValid = () => {
    // Check if both email and password are not empty
    return (
      email.trim() !== "" &&
      sid.trim() !== "" &&
      password.trim() !== "" &&
      confPassword.trim() !== "" &&
      firstName.trim() !== "" &&
      lastName.trim() !== ""
    );
  };

  const handleValidation = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      // event.stopPropagation();

      if (isFormValid() && validateEmail() && validatePassword() && validateID()) {
        //Check if all passes
        if(password.trim !== "")
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
        <h1>Registration</h1>
        <Form
          className="loginForm"
          noValidate
          validated={validated}
          onSubmit={handleValidation}>
          <p>You must be a currently enrolled undergraduate, graduate, or faculty at San Francisco State University 
            to use this service.</p>
          {/* First Name/Last Name */}
          <Form.Group className="mb-3" controlId="formBasicName">
            <Row>
              <Col>
                <FloatingLabel
                  required
                  className="mb-3"
                  controlId="formBasicFirstName"
                  label="First Name">
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    onChange={(event) => setFirstName(event.target.value)}
                    isInvalid={firstName !== null && firstName !== ""}
                  />
                </FloatingLabel>

                <Form.Control.Feedback> </Form.Control.Feedback>
              </Col>

              <Col>
                <FloatingLabel
                  required
                  className="mb-3"
                  controlId="formBasicLastName"
                  label="Last Name">
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    onChange={(event) => setLastName(event.target.value)}
                    isInvalid={lastName !== null && lastName !== ""}
                  />
                </FloatingLabel>

                <Form.Control.Feedback> </Form.Control.Feedback>
              </Col>
            </Row>
          </Form.Group>

          {/* Email Address form */}
          <Form.Group className="mb-3" controlId="formBasicInfo">
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

          {/* SFSU ID */}
          <Form.Group className="mb-3" id="formBasicID">
            <FloatingLabel
              required
              className="mb-3"
              controlId="formBasicID"
              label="SFSU ID">
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-disabled">
                    Your SFSU ID is found on your student or faculty card.
                  </Tooltip>
                }>
                <Form.Control
                  required
                  type="text"
                  placeholder="SFSU ID"
                  value={sid || ""}
                  onChange={(event) => setSid(event.target.value)}
                  isInvalid={sid !== null && sid !== "" && !validateID()}
                />
              </OverlayTrigger>

              <Form.Control.Feedback type="invalid">
                {sid === null
                  ? "Your ID should be exactly 9 digits long"
                  : sid.trim() === ""
                  ? "Your ID should be exactly 9 digits long"
                  : "Your ID should be exactly 9 digits long and contains only numerical characters"}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          {/* Password */}
          <InputGroup className="mb-3">
            <FloatingLabel
              required
              className="mb-3"
              controlId="formBasicID"
              label="Password">
              <Form.Control
                required
                type="password"
                placeholder="Password"
                value={password || ""}
                onChange={(event) => setPassword(event.target.value)}
                onBlur={() => setInteractionStarted(true)}
                isInvalid={(interactionStarted && password.trim() !== "" && !validatePassword())}
              />

              <Form.Control.Feedback type="invalid">
                {password === null
                  ? "Enter a password"
                  : password.trim() === ""
                  ? "Enter a password"
                  : "Your password must meet the following criteria described below."}
              </Form.Control.Feedback>
            </FloatingLabel>

            {/* Confirm password */}
            <FloatingLabel
              required
              className="mb-3"
              controlId="formBasicConfirmPassword"
              label="Confirm Password">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confPassword || ""}
                onChange={(event) => setConfPassword(event.target.value)}
                isInvalid={confPassword !== password || (confPassword.trim() !== "" && !validateConfPassword())}
              />
              <Form.Control.Feedback type="invalid">
                {confPassword === null
                  ? "Confirm your password"
                  : confPassword.trim() === ""
                  ? "Confirm your password"
                  : "Passwords do not match"}
              </Form.Control.Feedback>
            </FloatingLabel>

            <Form.Text id="passwordHelpBlock" muted>
              Passwords must be 8-20 characters long and contains the following:
              One uppercase letter, One special character (!@#$%^&*), and one
              number.
            </Form.Text>
          </InputGroup>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
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

export default RegPage;
