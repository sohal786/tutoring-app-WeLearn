import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";

const TutorApply = () => {
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    classNumbers: "",
    resume: null,
    profilePicture: null,
    video: null,
  });

  const [fieldStatus, setFieldStatus] = useState({
    topic: false,
    description: false,
    resume: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Update fieldStatus to indicate whether the field is filled
    setFieldStatus((prevFieldStatus) => ({
      ...prevFieldStatus,
      [name]: value.trim() !== "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if mandatory fields are filled before submission
    const mandatoryFields = ["topic", "description", "course_numbers", "resume"];
    const isFormValid = mandatoryFields.every((field) => formData[field]);

    if (isFormValid) {
      console.log(formData);
    } else {
      // Alert the user that mandatory fields are not filled
      alert("Please fill in all mandatory fields.");
    }
  };

  return (
    <div className="content">
      <div className="loginContainer">
        <h1>Tutor Application</h1>
        <Form onSubmit={handleSubmit} className="loginForm">
          <p style={{ color: "GrayText" }}>
            Fields marked with <span style={{ color: "red" }}>*</span> are required
          </p>
          <br></br>
          <Form.Group className="mb-3" controlId="topic">
            <Form.Label style={{ textAlign: "left", display: "block", marginBottom: "0.5rem" }}>
              Topic: <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Select
              name="topic"
              value={formData.topic}
              onChange={handleInputChange}
              required
              style={{ borderColor: fieldStatus.topic ? "green" : "red" }}
            >
              <option value="">Select a Topic</option>
              <option value="Math">Math</option>
              <option value="CSC">CSC</option>
              <option value="Physics">Physics</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label style={{ textAlign: "left", display: "block", marginBottom: "0.5rem" }}>
              Description: <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              style={{ borderColor: fieldStatus.description ? "green" : "red" }}
              placeholder="Enter a brief description about yourself and the classes you tutor..."
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="course_numbers">
            <Form.Label style={{ textAlign: "left", display: "block", marginBottom: "0.5rem" }}>
              Courses: <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="course_numbers"
              value={formData.course_numbers}
              onChange={handleInputChange}
              required
              style={{ borderColor: fieldStatus.course_numbers ? "green" : "red" }}
              placeholder="Enter a list of classes by course number (i.e. MATH 225) that you can tutor..."
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="resume">
            <Form.Label style={{ textAlign: "left", display: "block", marginBottom: "0.5rem" }}>
              Resume: <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleInputChange}
              required
              style={{ borderColor: fieldStatus.resume ? "green" : "red" }}
              placeholder="Resume"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="picture">
            <Form.Label style={{ textAlign: "left", display: "block", marginBottom: "0.5rem" }}>Picture: </Form.Label>
            <Form.Control
              type="file"
              name="picture"
              accept="image/*"
              onChange={handleInputChange}
              style={{ borderColor: fieldStatus.picture ? "green" : "" }}
              placeholder="Picture"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="video">
            <Form.Label style={{ textAlign: "left", display: "block", marginBottom: "0.5rem" }}>Video: </Form.Label>
            <Form.Control
              type="file"
              name="video"
              accept="video/*"
              onChange={handleInputChange}
              style={{ borderColor: fieldStatus.video ? "green" : "" }}
              placeholder="Video"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default TutorApply;