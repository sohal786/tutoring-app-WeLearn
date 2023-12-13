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