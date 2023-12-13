import React, { useState } from "react";
import { useLocation } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import defaultProfilePicture from "../img/DefaultProfile.jpeg";
import '../css/TutorPage.css'; // Import your modified CSS file

function TutorPage() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const tutor = location.state?.tutor || {

    name: "No Tutor Selected",
    topic: "N/A",
    description: "No description available",
    profilePicture: defaultProfilePicture,
    video: null,
  };

  const isDefaultData = tutor.name === "No Tutor Selected";

  //console.log("Received tutor data:", result); 

  const profilePicture = tutor.profilePicture 
    ? tutor.profilePicture.split('/').pop()
    : defaultProfilePicture;
  const handleContactButtonClick = () => {
    setShowContactForm(!showContactForm);
  };

  const handleSendMessage = () => {
    // Check if the message is not empty
    if (!message.trim()) {
      // If the message is empty, set an error message
      setErrorMessage("Please enter a message before sending.");
      return;
    }

    // Add logic to send the message to the tutor (e.g., using an API)
    console.log("Message sent:", message);

    // Clear the message input, hide the contact form, and set the success message
    setMessage("");
    setShowContactForm(false);
    setMessageSent(true);
    setErrorMessage(""); // Clear the error message

    // Reset the success message after a delay (e.g., 3 seconds)
    setTimeout(() => {
      setMessageSent(false);
    }, 3000);
  };

  const handleCancel = () => {
    // Clear the message input, hide the contact form, and clear the error message
    setMessage("");
    setShowContactForm(false);
    setErrorMessage("");
  };
  const imageName = tutor.profilePicture.split('/').pop();

  return (
    <div className="tutor-content">
      {isDefaultData ? (
        <div className="container mt-4">
          <div className="alert alert-warning">
            <h2>Oops, something went wrong.</h2>
            <p>Please try opening the website again.</p>
          </div>
        </div>
      ) : (
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-4">
              <img src={`http://localhost:5001/images/${imageName}`} alt="Profile" className="img-fluid rounded" />
            </div>
            <div className="col-md-8">
              <h1 className="display-4">{tutor.tutorName}</h1>
              <p className="lead">
                <strong>Topic:</strong> <br />{tutor.topicName}<br /><br />
                <strong>Description:</strong> <br />{tutor.description}
              </p>
              {tutor.video ? (
                <div>
                  <h2>Video</h2>
                  <video width="100%" controls>
                    <source src={tutor.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <p className="text-muted">No video provided</p>
              )}
              <div className="contact-section mt-4">
                <button className="btn btn-primary contact-button" onClick={handleContactButtonClick}>
                  Contact Tutor
                </button>
              </div>
            </div>
          </div>
          {showContactForm && (
            <div className="container mt-4">
              <div className="contact-form mt-3">
                <p className="text-muted">
                  Please provide your contact information in the message so the tutor can reach out to you.
                </p>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                {errorMessage && <div className="alert alert-danger mt-2">{errorMessage}</div>}
                <div className="button-row mt-3">
                  <button className="btn btn-secondary cancel-button" onClick={handleCancel}>Cancel</button>
                  <button className="btn btn-primary send-button" onClick={handleSendMessage}>Send</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {messageSent && (
        <div className="container mt-4 alert alert-success">
          Message sent successfully! Thank you.
        </div>
      )}
    </div>
  );
};

export default TutorPage;