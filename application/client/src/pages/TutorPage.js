// TutorPage.js
import React from "react";
import '../css/TutorPage.css';
import defaultProfilePicture from "../img/DefaultProfile.jpeg";

function TutorPage() {
  // Assume you have the tutor's information from the database
  const tutorInfo = {
    name: "Tutor Name",
    topic: "Math",
    description: "Tutor for various math courses",
    picture: null, // Replace with the actual picture URL or data (if available)
    video: null,   // Replace with the actual video URL or data (if available)
  };

  // Use the default profile picture if tutorInfo.picture is null
  const profilePicture = tutorInfo.picture || defaultProfilePicture;

  return (
    <div className="tutor-profile-container">
      <h1 className="profile-heading">{tutorInfo.name}'s Profile</h1>

      <div className="profile-section">
        <h2>Topic: {tutorInfo.topic}</h2>
        <p>Description: {tutorInfo.description}</p>
      </div>

      <div className="profile-section">
        <h2>Profile Picture</h2>
        <img src={profilePicture} alt="Profile" className="profile-picture" />
      </div>

      {tutorInfo.video && (
        <div className="profile-section video-container">
          <h2>Video</h2>
          <video width="400" controls>
            <source src={tutorInfo.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}

export default TutorPage;
  