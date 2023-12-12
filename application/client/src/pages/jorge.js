import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import jorgeImage from "../images/jorge.jpg";

const Jorge = () => {
  return ( 
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <img src={jorgeImage} alt="Jorge's Image" className="img-fluid rounded-circle" />
        </div>
        <div className="col-md-8">
          <h1 className="display-4">Jorge Pérez</h1>
          <p className="front end">
            Hello! My name is Jorge Pérez. I am in Front End for team 4 for this class. I am a computer science major. My hobbies are soccer and going to the gym!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Jorge;
