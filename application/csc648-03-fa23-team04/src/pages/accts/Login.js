/*
  Login.js
  Author: Azistara
*/

import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FloatingLabel } from "react-bootstrap";

const LoginPage = () => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const validateEmail = () => {
    // Check if this is a valid sfsu email
    const emailRegex = /@sfsu\.edu$/;
    return email && emailRegex.test(email);
  };

  const validatePassword = () => {
    //Checks is the length of the password entered is at least 8 or more characters long
    return password && password.length >=8;
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
        {/* Login form provided by react-bootstrap */}
        <Form
          className="loginForm"
          noValidate
          validated={validated}
          onSubmit={handleValidation}
        >
          <p>
            Sign in using your San Francisco State University email address to
            get started.
          </p>

          {/* Email Address form */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel
              required
              className="mb-3"
              controlId="formBasicEmail"
              label="Email Address"
            >
              <Form.Control
                required
                type="email"
                placeholder="Email Address"
                value={email || ""}
                onChange={(event) => setEmail(event.target.value)}
                isInvalid={email !== null && email !== "" && !validateEmail()}
              />

              <Form.Control.Feedback type="invalid">
                {email === null
                  ? "Enter an email address"
                  : "Enter a valid @sfsu.edu email address"}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          {/* Password form */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <FloatingLabel
              required
              className="mb-3"
              controlId="formBasicPassword"
              label="Password"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={
                  password !== null && password !== "" && !validatePassword()
                }
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Link to="/">
              <a>Forgot password?</a>
            </Link>
            <p> </p>
            <Link to="/register">
              <a>Sign Up </a>
            </Link>

            <br></br>
            <br></br>

            <Button variant="primary" type="submit">
              Log in
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
