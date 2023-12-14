import React, { useState, useContext } from 'react';
import { useLocation } from "react-router-dom"
import { useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import defaultProfilePicture from "../img/DefaultProfile.jpeg";
import '../css/TutorPage.css'; // Import your modified CSS file
import { AuthContext } from '../AuthContext.js';

function TutorPage() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
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
  const senderId = user?.id;
  const receiverId = tutor.tutorId;
  const profilePicture = tutor.profilePicture 
    ? tutor.profilePicture.split('/').pop()
    : defaultProfilePicture;
    //const profilePicture = tutor.picture || defaultProfilePicture;

  const handleContactButtonClick = () => {
    if (!isLoggedIn) {
      navigate('/login'); // Redirect to login if not logged in
    } else {
      setShowContactForm(!showContactForm); // Show contact form if logged in
    }
  };
  const handleSendMessage = async () => {
    if (!message.trim()) {
      setErrorMessage("Please enter a message before sending.");
      return;
    }

    try {
      const response = await fetch('http://54.219.143.67:5001/send-message', { // Replace with your actual API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify({
          sender_id: senderId,
          receiver_id: receiverId,
          content: message,
        }),
      });

      if (response.ok) {
        // Handle successful message sending
        setMessage("");
        setShowContactForm(false);
        setMessageSent(true);
        setErrorMessage("");
        setTimeout(() => {
          setMessageSent(false);
        }, 3000);
      } else {
        // Handle errors
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      setErrorMessage("Failed to send the message.");
      console.error('There was a problem with your fetch operation:', error);
    }
  };


  const handleCancel = () => {
    // Clear the message input, hide the contact form, and clear the error message
    setMessage("");
    setShowContactForm(false);
    setErrorMessage("");
  };
  const imageName = profilePicture.split('/').pop();

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
              <img src={`http://54.219.143.67:5001/images/${imageName}`} alt="Profile" className="img-fluid rounded" />
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