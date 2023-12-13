import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import {useNavigate} from "react-router";


const TutorApply = () => {
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    //course_numbers: "",
    resume: null,
    picture: null,
    video: null,
  });
  const navigate = useNavigate();

  const [fieldStatus, setFieldStatus] = useState({
    topic: false,
    description: false,
    picture: false,
    //course_numbers: false,
    resume: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    setFieldStatus((prevFieldStatus) => ({
      ...prevFieldStatus,
      [name]: value.trim() !== "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mandatoryFields = ["topic", "description", "resume", "profile_picture"];
    const isFormValid = mandatoryFields.every((field) => formData[field]);

    if (isFormValid) {
      const data = new FormData();

      // Append form data to FormData object
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });

      fetch('http://54.219.143.67:5001/apply-tutor', { // Replace with your server URL
      method: 'POST',
      body: data,
      credentials: 'include'
    })
    .then(response => response.text())
    .then(data => {
      console.log('Success:', data);
      alert("Tutor application was sent, wait 24 hours for a response");
      navigate('/'); // Assuming 'navigate' is defined and set up correctly
      // You can handle UI updates based on response here
    })
    .catch((error) => {
      console.error('Error:', error);
      alert("There was an error submitting the application.");
      // Handle errors here
    });
  } else {
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
              placeholder="Enter a list of classes by course number that you can tutor (i.e. MATH 225, CSC 340, PHYS 220, etc.)."
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="resume">
            <Form.Label style={{ textAlign: "left", display: "block", marginBottom: "0.5rem" }}>
              Resume: <span style={{ color: "red" }}>*</span>
              <span style={{ fontSize: "0.8em", color: "GrayText", display: "block" }}>
                Accepted formats: PDF
              </span>
            </Form.Label>
            <Form.Control
              type="file"
              name="resume"
              accept=".pdf"
              onChange={handleInputChange}
              required
              style={{ borderColor: fieldStatus.resume ? "green" : "red" }}
              placeholder="Resume"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="picture">
            <Form.Label style={{ textAlign: "left", display: "block", marginBottom: "0.5rem" }}>Picture: <span style={{ color: "red" }}>*</span></Form.Label>
              <span style={{ fontSize: "0.8em", color: "GrayText", display: "block", textAlign: "left"}}>
                Accepted formats: PNG, JPG, JPEG
              </span>
            <Form.Control
              type="file"
              name="profile_picture"
              accept=".png,.jpg, .jpeg"
              onChange={handleInputChange}
              style={{ borderColor: fieldStatus.picture ? "green" : "red" }}
              placeholder="Picture"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="video">
            <Form.Label style={{ textAlign: "left", display: "block", marginBottom: "0.5rem" }}>Video: </Form.Label>
            <span style={{ fontSize: "0.8em", color: "GrayText", display: "block", textAlign: "left"}}>
                Accepted formats: MP4, MOV, MKV
              </span>
            <Form.Control
              type="file"
              name="video"
              accept=".mp4, .mov, .mkv"
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
