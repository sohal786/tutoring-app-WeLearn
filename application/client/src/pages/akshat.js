import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../css/team_member.css'; // Import css template for each team member

const Akshat = () => {
  return ( 
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <img src={require("../images/akshat.jpg") }alt="Akshat's Image" className="img-fluid rounded-circle" />
        </div>
        <div className="col-md-8">
          <h1 className="display-4">Akshat Sohal</h1>
          <p className="lead">
            Hello! My name is Akshat Sohal. I am Team Lead for team 4 for this class. I am a computer science major and biology minor. My hobbies are hiking and going to the gym!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Akshat;
