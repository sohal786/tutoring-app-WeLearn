import React from "react";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { FloatingLabel } from "react-bootstrap";

const LoginPage = () => {
  return (
    <div className="content">
      <div className="loginContainer">
        <h1>Hello.</h1>
        {/* Login form provided by react-bootstrap */}
        <Form className="loginForm">
          <p>
            Sign in using your San Francisco State University email address to
            get started.
          </p>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel
              className="mb-3"
              controlId="formBasicEmail"
              label="Email Address"
            >
              <Form.Control type="email" placeholder="Email Address" />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <FloatingLabel
              className="mb-3"
              controlId="formBasicPassword"
              label="Password"
            >
              <Form.Control type="password" placeholder="Password" />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Link to="/">
              <a>Forgot password?</a>
            </Link>
            <p>    </p>
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
