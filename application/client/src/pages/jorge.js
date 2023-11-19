import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../css/team_member.css'; // Import css template for each team member

const Jorge = () => {
  return ( 
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <img src={require("../images/jorge.jpg") }alt="Jorge's Image" className="img-fluid rounded-circle" />
        </div>
        <div className="col-md-8">
          <h1 className="display-4">Jorge Pérez</h1>
          <p className="lead">
          Jorge is a passionate individual with a strong interest in computer science. He thrives on challenges and enjoys working collaboratively as part of a team. Jorge's dedication to his field and his commitment to teamwork make him a valuable asset in any technological endeavor.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Jorge;
