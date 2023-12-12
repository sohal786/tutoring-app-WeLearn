import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../css/team_member.css'; // Import css template for each team member
import aziImage from "../images/azi.jpg";

const Azi = () => {
  return ( 
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <img src={aziImage} alt="Azi's Image" className="img-fluid rounded-circle" />
        </div>
        <div className="col-md-8">
          <h1 className="display-4">Zuriel Respicio</h1>
          <p className="lead">
            Hello! My name is Zuriel Respicio. I am the front-end lead for team 4 for this class. I am a computer science major!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Azi;
