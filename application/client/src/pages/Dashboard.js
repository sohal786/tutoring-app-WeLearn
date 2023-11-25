import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import placeholderFox from "../img/placeholder.png"

const DashboardHome = () => {
    return (
      <div className="content">
        <h1>Hello, [username]</h1>
        <br></br>
        <div className="profileArea">
          <Card>
            <Card.Body>
              <Card.Title>User</Card.Title>
              <div className="userInformationArea">
                <img class="profileImage" src={placeholderFox}></img>
              </div>
            </Card.Body>
          </Card>
        </div>
        <br></br>
        <div className="contactsArea">
          <Card>
            <Card.Body>
              <Card.Title>Recently Contacted</Card.Title>
              Recently Contacted
            </Card.Body>
          </Card>
        </div>
        <br></br>
        <div className="messagesArea">
          <Card>
            <Card.Body>
              <Card.Title>Messages</Card.Title>
              Message content
            </Card.Body>
          </Card>
        </div>
      </div>
    );
}
 
export default DashboardHome;