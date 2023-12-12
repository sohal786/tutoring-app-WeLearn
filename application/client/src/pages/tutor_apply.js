// import React, { useState } from "react";
// import { Form, Button, Col } from "react-bootstrap";

// const TutorApply = () => {
//   const [formData, setFormData] = useState({
//     topic: "",
//     description: "",
//     course_numbers: "",
//     resume: null,
//     picture: null,
//     video: null,
//   });

//   const [fieldStatus, setFieldStatus] = useState({
//     topic: false,
//     description: false,
//     course_numbers: false,
//     resume: false,
//   });

//   const handleInputChange = (e) => {
//     const { name, value, type } = e.target;

//     if (type === "file") {
//       setFormData({ ...formData, [name]: e.target.files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }

//     // Update fieldStatus to indicate whether the field is filled
//     setFieldStatus((prevFieldStatus) => ({
//       ...prevFieldStatus,
//       [name]: value.trim() !== "",
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Check if mandatory fields are filled before submission
//     const mandatoryFields = ["topic", "description", "course_numbers", "resume"];
//     const isFormValid = mandatoryFields.every((field) => formData[field]);

//     if (isFormValid) {
//       console.log(formData);
//     } else {
//       // Alert the user that mandatory fields are not filled
//       alert("Please fill in all mandatory fields.");
//     }
//   };

//   return (
//     <div className="content">
//       <div className="loginContainer">
//         <h1>Tutor Application</h1>
//         <Form onSubmit={handleSubmit} className="loginForm">
//           <p style={{ color: "GrayText" }}>
//             Fields marked with <span style={{ color: "red" }}>*</span> are required
//           </p>
//           <br></br>
//           <Form.Group className="mb-3" controlId="topic">
//             <Form.Label style={{ textAlign: "left", display: "block", marginBottom: "0.5rem" }}>
//               Topic: <span style={{ color: "red" }}>*</span>
//             </Form.Label>
//             <Form.Select
//               name="topic"
//               value={formData.topic}
//               onChange={handleInputChange}
//               required
//               style={{ borderColor: fieldStatus.topic ? "green" : "red" }}
//             >
//               <option value="">Select a Topic</option>
//               <option value="Math">Math</option>
//               <option value="CSC">CSC</option>
//               <option value="Physics">Physics</option>
//             </Form.Select>
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="description">
//             <Form.Label style={{ textAlign: "left", display: "block", marginBottom: "0.5rem" }}>
//               Description: <span style={{ color: "red" }}>*</span>
//             </Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               required
//               style={{ borderColor: fieldStatus.description ? "green" : "red" }}
//               placeholder="Enter a list of classes by course number that you can tutor (i.e. MATH 225, CSC 340, PHYS 220, etc.)."
//             />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="resume">
//             <Form.Label style={{ textAlign: "left", display: "block", marginBottom: "0.5rem" }}>
//               Resume: <span style={{ color: "red" }}>*</span>
//               <span style={{ fontSize: "0.8em", color: "GrayText", display: "block" }}>
//                 Accepted formats: PDF
//               </span>
//             </Form.Label>
//             <Form.Control
//               type="file"
//               name="resume"
//               accept=".pdf"
//               onChange={handleInputChange}
//               required
//               style={{ borderColor: fieldStatus.resume ? "green" : "red" }}
//               placeholder="Resume"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="picture">
//             <Form.Label style={{ textAlign: "left", display: "block", marginBottom: "0.5rem" }}>Picture: </Form.Label>
//               <span style={{ fontSize: "0.8em", color: "GrayText", display: "block", textAlign: "left"}}>
//                 Accepted formats: PDF, JPG
//               </span>
//             <Form.Control
//               type="file"
//               name="picture"
//               accept=".pdf,.jpg"
//               onChange={handleInputChange}
//               style={{ borderColor: fieldStatus.picture ? "green" : "" }}
//               placeholder="Picture"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="video">
//             <Form.Label style={{ textAlign: "left", display: "block", marginBottom: "0.5rem" }}>Video: </Form.Label>
//             <span style={{ fontSize: "0.8em", color: "GrayText", display: "block", textAlign: "left"}}>
//                 Accepted formats: MP4, MOV
//               </span>
//             <Form.Control
//               type="file"
//               name="video"
//               accept=".mp4,.mov"
//               onChange={handleInputChange}
//               style={{ borderColor: fieldStatus.video ? "green" : "" }}
//               placeholder="Video"
//             />
//           </Form.Group>

//           <Button variant="primary" type="submit">
//             Submit
//           </Button>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default TutorApply;



import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const TutorApply = () => {
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    //course_numbers: "",
    resume: null,
    picture: null,
    video: null,
  });

  const [fieldStatus, setFieldStatus] = useState({
    topic: false,
    description: false,
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

    const mandatoryFields = ["topic", "description", "resume"];
    const isFormValid = mandatoryFields.every((field) => formData[field]);

    if (isFormValid) {
      const data = new FormData();

      // Append form data to FormData object
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });

      // Send form data to server
      fetch('http://localhost:5001/apply-tutor', { // Replace with your server URL
        method: 'POST',
        body: data,
      })
      .then(response => response.text())
      .then(data => {
        console.log('Success:', data);
        // You can handle UI updates based on response here
      })
      .catch((error) => {
        console.error('Error:', error);
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
            <Form.Label style={{ textAlign: "left", display: "block", marginBottom: "0.5rem" }}>Picture: </Form.Label>
              <span style={{ fontSize: "0.8em", color: "GrayText", display: "block", textAlign: "left"}}>
                Accepted formats: PDF, JPG
              </span>
            <Form.Control
              type="file"
              name="profile_picture"
              accept=".pdf,.jpg"
              onChange={handleInputChange}
              style={{ borderColor: fieldStatus.picture ? "green" : "" }}
              placeholder="Picture"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="video">
            <Form.Label style={{ textAlign: "left", display: "block", marginBottom: "0.5rem" }}>Video: </Form.Label>
            <span style={{ fontSize: "0.8em", color: "GrayText", display: "block", textAlign: "left"}}>
                Accepted formats: MP4, MOV
              </span>
            <Form.Control
              type="file"
              name="video"
              accept=".mp4,.mov"
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
