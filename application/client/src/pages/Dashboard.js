<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from 'react';
import '../css/Dashboard.css'; // Adjust the path based on your project structure

const Dashboard = () => {
  const [user, setUser] = useState({
    username: 'Username', // Replace with your actual username
  });
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    /* need to fetch current userID and name from sessions. Name is for the 
    heaeding at the top of the page */
    const userId = 1;

    fetch('http://54.219.143.67:5001/messages?userId=$userId=${userId}')
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(error => console.error('Error fetching messages:', error));
  }, []); 

  return (
    <div className="dashboard-container">
        <div className="user-info">
            <h1>{user.username}'s Dashboard</h1>
        </div>
        <div className="message-container">
            <h2 className="message-header">Your Messages:</h2>
            <ul className="message-list">
                {messages.map((item) => (
                <li key={item.id} className="message-item">
                    <strong>{item.sender}:</strong> {item.content}
                </li>
                ))}
            </ul>
        </div>
    </div>
  );
};

export default Dashboard;
>>>>>>> 85d8a6f0eaa7ba6932d57c71b43739dafdd5caaa
