import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Footer = () => {
  const footerStyles = {
    color: '#000', // Color del texto
    width: '100%', // Ancho del footer
    padding: '1rem', // Espaciado interno
  };

  const buttonStyles = {
    backgroundColor: '#e0e0e0', // Color de fondo del botón
    color: '#000', // Color del texto del botón
    border: 'none', // Quita el borde del botón
  };

  return (
    <footer style={footerStyles}>
      <div className="container d-flex justify-content-between align-items-center">
        <p>&copy; 2023 weLearn. All rights reserved.</p>

        {/* Botón "About us" */}
        <Link to="/about">
          <Button style={buttonStyles}>About us</Button>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
