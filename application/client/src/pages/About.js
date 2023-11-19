import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const [hoveredCards, setHoveredCards] = useState([]);

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
      <h2 style={{ textAlign: 'center' }}>About Us</h2>
      <br />
      <p style={{ textAlign: 'center'}}>
        Welcome to our app! This is a brief description of what the app is about.
        Feel free to explore and get to know our team members.
      </p>
      <br />
      <h2 style={{ textAlign: 'center' }}>Meet the Team</h2>
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

