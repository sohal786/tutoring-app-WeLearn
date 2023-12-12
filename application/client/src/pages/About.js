import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const [hoveredCards, setHoveredCards] = useState([]);

  const headingStyle = {
    textAlign: 'center',
    width: '30%',
    margin: '0 auto',
    borderBottom: '0.5px solid #ccc',
    paddingBottom: '10px',
  };

  const descriptionContainerStyle = {
    width: '80%',
    margin: '0 auto',
  };
  
  const containerStyle = {
    width: '80%',
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  };

  const handleMouseEnter = (index) => {
    setHoveredCards((prevHoveredCards) => {
      const newHoveredCards = [...prevHoveredCards];
      newHoveredCards[index] = true;
      return newHoveredCards;
    });
  };

  const handleMouseLeave = (index) => {
    setHoveredCards((prevHoveredCards) => {
      const newHoveredCards = [...prevHoveredCards];
      newHoveredCards[index] = false;
      return newHoveredCards;
    });
  };

  const getCardStyle = (index) => ({
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
    marginBottom: '20px',
    border: '1px solid #ddd',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transform: hoveredCards[index] ? 'scale(1.05)' : 'scale(1)',
    transition: 'transform 0.3s ease-in-out',
  });

  const imageStyle = {
    width: '100%',
    height: '100%',
  };

  const textContainerStyle = {
    padding: '10px',
  };

  return (
    <div>
      <br></br>
      <h2 style={headingStyle}>About Us</h2>
      <br />
      <div style={descriptionContainerStyle}>
        <p>
          Welcome to our tutoring application – a product born out of a shared commitment to addressing
          the academic challenges faced by students during their educational journeys, especially in the
          rigorous environments of schools and colleges. As students ourselves, we understand that the
          path to graduation often involves overcoming hurdles, particularly in challenging courses.
        </p>
        <p>
          Our innovative tutoring web application is crafted to provide essential support to students
          navigating their courses. What sets us apart is our unique focus on the San Francisco State
          University (SFSU) community. Unlike generic tutoring platforms, our application exclusively
          connects SFSU students seeking academic assistance with their peers who have excelled in the
          same courses. This tailored approach not only improves academic outcomes but also cultivates a
          sense of camaraderie within the SFSU student body.
        </p>
      </div>
      <br />
      <h2 style={headingStyle}>Meet the Team</h2>
      <br />
      <div style={containerStyle}>
        {teamMembers.map((member, index) => (
          <div
            key={index}
            style={{
              flex: '0 0 calc(33.33% - 100px)',
              padding: '10px',
              textAlign: 'center',
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <Link to={member.path} style={getCardStyle(index)}>
              <img
                src={require(`../images/${member.image}`)}
                alt={`${member.name}'s Image`}
                style={imageStyle}
              />
              <div style={textContainerStyle}>
                <h4>{member.name}</h4>
                <p style={{ color: 'GrayText' }}>{member.role}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const teamMembers = [
  { name: 'Akshat', role: 'Team Lead', path: '/akshat', image: 'akshat.jpg' },
  { name: 'Aakanksha', role: 'GitHub Manager', path: '/aakanksha', image: 'aakanksha.jpg' },
  { name: 'Jorge', role: 'Front End Team', path: '/jorge', image: 'jorge.jpg' },
  { name: 'Charter', role: 'Back End Lead', path: '/charter', image: 'charter.JPG' },
  { name: 'Andy', role: 'Back End Team', path: '/andy', image: 'andy.jpg' },
  { name: 'Azi', role: 'Front End Lead', path: '/azi', image: 'azi.jpg' },
];


export default AboutPage;