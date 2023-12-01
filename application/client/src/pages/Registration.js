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

  const isFormValid = () => {
    return (
      email.trim() !== "" &&
      password.trim() !== "" &&
      confPassword.trim() !== "" &&
      fullName.trim() !== ""
    );
  };

  const handleValidation = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
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
          {/* Full Name */}
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
                onChange={(event) =>
                  setFullName(event.target.value)
                }
                isInvalid={
                  fullName !== null &&
                  fullName !== "" &&
                  /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/.test(fullName)
                }
                style={{ width: "100%" }}
              />
            </FloatingLabel>

            <Form.Control.Feedback>
              {fullName !== null &&
              fullName !== "" &&
              /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/.test(fullName)
                ? "Full Name cannot contain special characters or numbers"
                : ""}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Email Address form */}
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

          {/* Password */}
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

          {/* Confirm Password */}
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
                onChange={(event) =>
                  setConfPassword(event.target.value)
                }
                isInvalid={
                  confPassword !== password ||
                  (confPassword.trim() !== "" &&
                    !validateConfPassword())
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

          {/* Rest */}
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
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

export default Registration;
