import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap', // Allow content to wrap to the next row
    justifyContent: 'space-around', // Evenly space columns horizontally
  };

  const columnStyle = {
    flex: '0 0 calc(33.33% - 20px)', // Three columns with spacing
    padding: '10px', // Add padding for spacing between columns
    textAlign: 'center', // Center-align content
  };

  const imageStyle = {
    maxWidth: '100%', // Ensure images don't exceed the column width
    height: 'auto', // Maintain aspect ratio
    borderRadius: '50%', // Round the image corners
  };

  return (
    <div>
      <div style={containerStyle}>
        <div style={columnStyle}>
          <img
            src={require("../images/akshat.jpg")}
            alt="Akshat's Image"
            style={imageStyle}
          />
          <h4><Link to="/akshat">Akshat</Link></h4>
        </div>

        <div style={columnStyle}>
          <img
            src={require("../images/aakanksha.jpg")}
            alt="Aakanksha's Image"
            style={imageStyle}
          />
          <h4><Link to="/aakanksha">Aakanksha</Link></h4>
        </div>

        <div style={columnStyle}>
          <img
            src={require("../images/jorge.jpg")}
            alt="Jorge's Image"
            style={imageStyle}
          />
          <h4><Link to="/jorge">Jorge</Link></h4>
        </div>

        <div style={columnStyle}>
          <img
            src={require("../images/charter.JPG")}
            alt="Charter's Image"
            style={imageStyle}
          />
          <h4><Link to="/charter">Charter</Link></h4>
        </div>

        <div style={columnStyle}>
          <img
            src={require("../images/andy.jpg")}
            alt="Andy's Image"
            style={imageStyle}
          />
          <h4><Link to="/andy">Andy</Link></h4>
        </div>

        <div style={columnStyle}>
          <img
            src={require("../images/azi.jpg")}
            alt="Azi's Image"
            style={imageStyle}
          />
          <h4><Link to="/azi">Azi</Link></h4>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
