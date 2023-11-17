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

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
  };

  return (
    <div className="content">
      <div className="loginContainer">
        <h1>Tutor Application</h1>
        <Form onSubmit={handleSubmit} className="loginForm">
          <p style={{ color: "red" }}>Fields marked with * are required.</p>

          <Form.Group className="mb-3" controlId="topic">
            <Form.Label>
              Topic <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Select
              name="topic"
              value={formData.topic}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a Topic</option>
              <option value="Math">Math</option>
              <option value="CSC">CSC</option>
              <option value="Physics">Physics</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>
              Description <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          {/* ... other form fields ... */}

          <Form.Group className="mb-3" controlId="resume">
            <Form.Label>
              Resume <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="profilePicture">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              name="profilePicture"
              accept="image/*"
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="video">
            <Form.Label>Video</Form.Label>
            <Form.Control
              type="file"
              name="video"
              accept="video/*"
              onChange={handleInputChange}
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