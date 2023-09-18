import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Andy = () => {
  return ( 
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <img src={require("../images/andy.jpg") }alt="Andy's Image" className="img-fluid rounded-circle" />
        </div>
        <div className="col-md-8">
          <h1 className="display-4">Andy Byeon</h1>
          <p className="lead">
          Hello my name is Andy. I am currently a Senior at SFSU and my major is computer science.

          </p>
        </div>
      </div>
    </div>
  );
}

export default Andy;
