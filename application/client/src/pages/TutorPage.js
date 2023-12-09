// TutorPage.js

import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import defaultProfilePicture from "../img/DefaultProfile.jpeg";
import '../css/TutorPage.css'; // Import your modified CSS file

function TutorPage() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  const tutorInfo = {
    name: "Tutor Name",
    topic: "Math",
    description: "Tutor for various math courses",
    picture: null,
    video: null,
  };

  const profilePicture = tutorInfo.picture || defaultProfilePicture;

  const handleContactButtonClick = () => {
    setShowContactForm(!showContactForm);
  };

  const handleSendMessage = () => {
    // Add logic to send the message to the tutor (e.g., using an API)
    console.log("Message sent:", message);

    // Clear the message input, hide the contact form, and set the success message
    setMessage("");
    setShowContactForm(false);
    setMessageSent(true);

    // Reset the success message after a delay (e.g., 3 seconds)
    setTimeout(() => {
      setMessageSent(false);
    }, 3000);
  };

  const handleCancel = () => {
    // Clear the message input and hide the contact form
    setMessage("");
    setShowContactForm(false);
  };

  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4">
            <img src={profilePicture} alt="Profile" className="img-fluid rounded" />
          </div>
          <div className="col-md-8">
            <h1 className="display-4">{tutorInfo.name}</h1>
            <p className="lead">
              <strong>Topic:</strong> {tutorInfo.topic}<br />
              <strong>Description:</strong> {tutorInfo.description}
            </p>
            {tutorInfo.video && (
              <div className="row justify-content-center mt-4">
                <div className="col-md-12">
                  <h2>Video</h2>
                  <video width="100%" controls>
                    <source src={tutorInfo.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Contact button added here */}
        <div className="contact-section mt-4">
          <button className="btn btn-primary contact-button" onClick={handleContactButtonClick}>
            Contact Tutor
          </button>
        </div>
      </div>

      {/* Separate container for the send message feature */}
      <div className={`container mt-4 ${showContactForm ? 'visible' : 'hidden'}`}>
        {showContactForm && (
          <div className="contact-form mt-3">
            <textarea
              className="form-control"
              rows="4"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button className="btn btn-secondary mt-4 cancel-button" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btn btn-primary mt-4 send-button" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        )}
      </div>

      {/* Display success message */}
      {messageSent && (
        <div className="container mt-4 alert alert-success">
          Message sent successfully! Thank you.
        </div>
      )}
    </div>
  );
}

export default TutorPage;