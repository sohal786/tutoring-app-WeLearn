import { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/HomePage.css';

const HomePage = () => {
  const [recentTutors, setRecentTutors] = useState([]);

  useEffect(() => {
    // Make API call to fetch recent tutors
    fetch('http://54.219.143.67:5001/recent_tutor')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setRecentTutors(data))
      .catch((error) => console.error('Fetch error:', error));
  }, []);

  return (
    <div className="homeContent">
      <div className="hero">
        <div className="featureContent">
          <h1 className="titles">Welcome to San Francisco State's tutoring management platform.</h1>
          <br></br>
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

      {/* New Section: Why Choose Our Tutoring Platform? */}
      <div className="feature-background section0">
        <div className="featureContent">
          <h1 className="titles">Why Choose Us?</h1>
          <div className="benefitsContainer">
            {/* Benefit 1 */}
            <div className="benefitItem">
              <h3>Personalized Learning</h3>
              <p>Get personalized tutoring sessions tailored to your specific needs and learning style.</p>
            </div>

            {/* Benefit 2 */}
            <div className="benefitItem">
              <h3>Expert Tutors</h3>
              <p>Connect with experienced tutors who have excelled in their respective subjects.</p>
            </div>

            {/* Benefit 3 */}
            <div className="benefitItem">
              <h3>Convenient and Flexible</h3>
              <p>Access tutoring sessions at your convenience from the comfort of your home.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="feature-background section1">
        <div className="featureContent">
          <h1 className="titles">Meet our newest tutors</h1>
          <div className="recentTutorsContainer">
            {recentTutors.map((tutor, index) => (
              <Card key={index} className="recentTutorCard">
                <Card.Img variant="top" src={tutor.profilePicture} alt={tutor.tutorName} />
                <Card.Body>
                  <Card.Title>{tutor.tutorName}</Card.Title>
                  <Card.Text>Description: {tutor.description}</Card.Text>
                  <Card.Text>Topic: {tutor.topicName}</Card.Text>
                  <Card.Text>Resume: {tutor.resume}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="feature-background section2">
        <div className="featureContent">
          <h1 className="titles">Want to be a tutor?</h1>
          <p className="sectionText">
            Are you a passionate and knowledgeable student looking to make a
            meaningful impact on your fellow classmates here at SFSU?

            Consider becoming a tutor with us!
          </p>
          <br></br>
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
