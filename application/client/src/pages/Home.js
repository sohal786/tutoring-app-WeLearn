// HomePage.js

import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/HomePage.css';

const API_ENDPOINT = 'http://54.219.143.67:5001/recent_tutor';

const HomePage = () => {
  const [recentTutors, setRecentTutors] = useState([]);

  useEffect(() => {
    fetch(API_ENDPOINT)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch recent tutors');
        }
        return response.json();
      })
      .then((data) => setRecentTutors(data))
      .catch((error) => console.error('Fetch error:', error));
  }, []);

  return (
    <div className="homeContent">
      <div className="welcomeSection">
        <div className="featureContent">
          <h1 className="titles">Welcome to San Francisco State's tutoring management platform.</h1>
          <br />
          <h4>Tutoring for SFSU students by SFSU students.</h4>
          <p className="sectionText">
            Elevate your academic journey with our tutoring platform exclusively designed
            for San Francisco State University students. Connect with peer tutors who have excelled
            in your courses, fostering a sense of community and boosting academic success.
          </p>
          <div className="button-row">
            <Link to="/login">
              <Button variant="primary" size="lg">
                Login
              </Button>
            </Link>

            <Link to="/register">
              <Button variant="secondary" size="lg">
                Sign Up
              </Button>
            </Link>

            <Link to="/about">
              <Button variant="secondary" size="lg">
                Learn More
              </Button>
            </Link>
          </div>

          <br />
        </div>
      </div>

      <div className="feature-background why-choose-us">
        <div className="featureContent">
          <h1 className="titles">Why Choose Us?</h1>
          <div className="benefitsContainer">
            <div className="benefitItem">
              <h3>Student-Led Development</h3>
              <p>Experience a tutoring platform developed by SFSU students, ensuring a student-centric design and features that cater specifically to the needs of the SFSU community.</p>
            </div>

            <div className="benefitItem">
              <h3>Peer-to-Peer Excellence</h3>
              <p>Connect with high-achieving SFSU students who have excelled in the same courses, offering peer-to-peer tutoring that goes beyond traditional approaches.</p>
            </div>

            <div className="benefitItem">
              <h3>Opportunities for Growth</h3>
              <p>Become a tutor and share your expertise with fellow students, contributing to the academic success of the SFSU community and gaining valuable teaching experience.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="feature-background meet-our-tutors">
        <div className="featureContent">
          <h1 className="titles">Meet our newest tutors</h1>
          <div className="recentTutorsContainer">
            {recentTutors.map((tutor, index) => (
              <Link to="/tutor" key={index} className="recentTutorLink" target="_blank" rel="noopener noreferrer">
                <div key={index} className="recentTutorCard">
                  <img
                    src={tutor.profilePicture}
                    alt={tutor.tutorName}
                  />
                  <div>
                    <h3>{tutor.tutorName}</h3>
                    <p>Topic: {tutor.topicName}</p>
                    <p>Description:</p>
                    <p>{tutor.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
    </div>
</div>


      <div className="feature-background become-a-tutor">
        <div className="featureContent">
          <h1 className="titles">Want to be a tutor?</h1>
          <p className="sectionText">
            Are you a passionate and knowledgeable student looking to make a
            meaningful impact on your fellow classmates here at SFSU?

            Consider becoming a tutor with us!
          </p>
          <br />
          <Link to="/apply">
            <Button variant="primary" size="lg">
              Become a Tutor
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};


export default HomePage; 