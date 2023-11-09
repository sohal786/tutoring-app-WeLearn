import React from "react";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const LoginPage = () => {
  return (
    <div className="content">
      <div className="loginContainer">
        <h1>Hello.</h1>
        <p>
          Sign in using your San Francisco State University email address to get
          started.
        </p>
        {/* Login form provided by react-bootstrap */}
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Email Address" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Link to="/">
              <a>Forgot password?</a>
            </Link>

            <br></br>
            <br></br>
            
            <Button variant="primary" type="submit">
              Log in
            </Button>

            <Link to="/register">
              <Button variant="secondary">Sign up</Button>
            </Link>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
