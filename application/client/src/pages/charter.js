import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../css/team_member.css'; // Import css template for each team member

const Charter = () => {
  return ( 
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <img src={require("../images/charter.JPG") }alt="Charter's Image" className="img-fluid rounded-circle" />
        </div>
        <div className="col-md-8">
          <h1 className="display-4">Charter</h1>
          <p className="lead">
          I am currently a student from San Francisco State University working on a bachelor degree in Computer
                    Science.
                    Throughout my academic journey, I developed a strong passion for software development through school
                    projects and problem-solving.
                </p>
          
        </div>
      </div>
    </div>
  );
}

export default Charter;
