import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap'; // Import Link if you need it, or use a different import if it's from another library
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../css/HomePage.css';
import { AuthContext } from '../AuthContext.js';

const API_ENDPOINT = 'http://localhost:5001';

const HomePage = () => {
  const [recentTutors, setRecentTutors] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_ENDPOINT}/recent_tutor`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch recent tutors');
        }
        return response.json();
      })
      .then((data) => setRecentTutors(data))
      .catch((error) => console.error('Fetch error:', error));
  }, []);

  const navigateToTutor = (tutor) => {
    navigate('/tutor', { state: { tutor } });
  };

  const handleVideoClick = (event, videoPath) => {
    event.preventDefault(); // Prevent the default anchor tag behavior
  
    // Construct the full video URL using videoPath
    const fullVideoUrl = videoPath ? `${API_ENDPOINT}/images/${videoPath.split('/').pop()}` : null;
  
    if (!fullVideoUrl || fullVideoUrl.includes('null')) {
      alert('Video does not exist');
    } else {
      window.open(fullVideoUrl, '_blank', 'noopener,noreferrer');
    }
  };
  
  const handleApplyAsTutor = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate('/apply');
    }
  };
  const cardStyle = {
    border: '1px solid #ddd',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
    marginLeft:'15%',
    marginRight:'15%',
    marginBottom: '15px',
};

const imageStyle = {
    maxWidth: '150px',
    height: 'auto',
    borderRadius: '4px',
    marginRight: '10px',
};

              

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
            {recentTutors.map((tutor, index) => {
                 console.log("Tutor data being passed:", tutor);
                // Extracting only the image name from the path
                const imageName =  tutor.profilePicture ? tutor.profilePicture.split('/').pop() : null;
                const resume = tutor.resume ? tutor.resume.split('/').pop() : null;
                const video = tutor.video ? `http://localhost:5001/images/${tutor.video.split('/').pop()}` : null;


                return (
                    <div key={index} style={cardStyle} onClick={() => navigateToTutor(tutor)}>
                    <img
                       src={`${API_ENDPOINT}/images/${imageName}`}
                        alt="Profile"
                        style={imageStyle}
                    />
                            <div>
                                <h3 style={{ color: '#333' }}>Tutor Name: {tutor.tutorName}</h3>
                                <p style={{ margin: '8px 0', color: '#666' }}>Description: {tutor.description}</p>
                                <p style={{ margin: '8px 0', color: '#666' }}>Topic Name: {tutor.topicName}</p>
                                <p style={{ margin: '8px 0', color: '#666' }}>Resume:
                                 <a href= { `${API_ENDPOINT}/images/${resume}`} target="_blank" rel="noopener noreferrer">
                                    Click here to view the resume</a></p>
                                    <p style={{ margin: '8px 0', color: '#666' }}>
                                  Video: 
                                  <a href="#" onClick={(e) => handleVideoClick(e, tutor.video)}>
                                  Click here to download the video
                                 </a>
                                  </p>





                            </div>
                        </div>
                   
              );
            })}
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
       
        <Button variant="primary" size="lg" onClick={handleApplyAsTutor}>
          Become a Tutor
        </Button>
       
      </div>
    </div>
  </div>
);
};


export default HomePage; 