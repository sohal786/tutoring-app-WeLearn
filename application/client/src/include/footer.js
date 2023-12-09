import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerStyles = {
    backgroundColor: '#f8f9fa',
    color: '#495057',
    padding: '2rem 0',
    margin: '0',
    borderTop: '1px solid #dee2e6',
    width: '100%',
  };

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const linkStyles = {
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: 'bold',
    marginRight: '10px', // Add margin to separate from the text
  };

  return (
    <footer style={footerStyles}>
      <div style={containerStyles}>
        <p>&copy; 2023 weLearn. All rights reserved.</p>
        <Link to="/about" style={linkStyles}>
          About us
        </Link>
      </div>
    </footer>
  );
};

export default Footer;