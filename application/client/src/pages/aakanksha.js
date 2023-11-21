import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../css/team_member.css'; // Import css template for each team member

const Aakanksha = () => {
  return ( 
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <img src={require("../images/aakanksha.jpg") }alt="Aakanksha's Image" className="img-fluid rounded-circle" />
        </div>
        <div className="col-md-8">
          <h1 className="display-4">Aakanksha Devarapally</h1>
          <p className="lead">
          Hi! I’m Aakanksha Devarapally! I’m a computer science major at SFSU in my last year. This is a project I worked on in one of my classes
          </p>
        </div>
      </div>
    </div>
  );
}

export default Aakanksha;
