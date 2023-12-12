import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import placeholderFox from "../img/placeholder.png"

const DashboardHome = () => {
    return (
      <div>
        <br></br>
        <div className="profileArea">
          <Card>
            <Card.Body>
              <div className="userInformationArea">
                <img class="profileImage" src={placeholderFox}></img>
                <div className="textfield">
                  <h1>Username</h1>
                  <i>San Francisco State University, Student</i>
                  <br></br>
                  <br></br>
                  <ul>
                    <li>Computer Science</li>
                    <li>Math</li>
                    <li>Business</li>
                  </ul>
                </div>
              </div>
            </Card.Body>
            <Card.Footer class="cardFooter">
              <Button variant="primary">Edit</Button>
            </Card.Footer>
          </Card>
        </div>
        <br></br>
        <div className="contactsArea">
          <Card>
            <Card.Body>
              <Card.Title>Recently Contacted</Card.Title>
              <br></br>
              <br></br>
              {/* Cards for people recently interacted with */}
              <div className="contactContainer">
                {/* TODO: Map function here */}
                <Card class="contactCard">
                  <Card.Body>
                    <img class="profileImage" src={placeholderFox}></img>
                    <br></br>
                    <br></br>
                    <Card.Title>John Smith</Card.Title>
                  </Card.Body>
                </Card>

                <Card class="contactCard">
                  <Card.Body>
                    <img class="profileImage" src={placeholderFox}></img>
                    <br></br>
                    <br></br>
                    <Card.Title>John Smith</Card.Title>
                  </Card.Body>
                </Card>

                <Card class="contactCard">
                  <Card.Body>
                    <img class="profileImage" src={placeholderFox}></img>
                    <br></br>
                    <br></br>
                    <Card.Title>John Smith</Card.Title>
                  </Card.Body>
                </Card>

                <Card class="contactCard">
                  <Card.Body>
                    <img class="profileImage" src={placeholderFox}></img>
                    <br></br>
                    <br></br>
                    <Card.Title>John Smith</Card.Title>
                  </Card.Body>
                </Card>

                <Card class="contactCard">
                  <Card.Body>
                    <img class="profileImage" src={placeholderFox}></img>
                    <br></br>
                    <br></br>
                    <Card.Title>John Smith</Card.Title>
                  </Card.Body>
                </Card>
              </div>
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