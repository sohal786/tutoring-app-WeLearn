// TutorPage.js
import React from "react";

function TutorPage() {
  // Assume you have the tutor's information from database
  const tutorInfo = {
    name: "Tutor Name",
    topic: "Math",
    description: "Tutor for various math courses",
    picture: null, // Replace with the actual picture URL or data (if available)
    video: null,   // Replace with the actual video URL or data (if available)
  };

  return (
    <div className="tutor-profile-container">
      <h1 className="profile-heading">{tutorInfo.name}'s Profile</h1>

      <div className="profile-section">
        <h2>Topic: {tutorInfo.topic}</h2>
        <p>Description: {tutorInfo.description}</p>
      </div>

      <div className="profile-section">
        <h2>Profile Picture</h2>
        {tutorInfo.picture ? (
          <img src={tutorInfo.picture} alt="Profile" className="profile-picture" />
        ) : (
          <p>No profile picture available</p>
        )}
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
  