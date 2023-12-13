import React, { useState, useEffect } from 'react';
import '../css/Dashboard.css'; // Adjust the path based on your project structure

const Dashboard = () => {
  const [user, setUser] = useState({
    username: 'Username', // Replace with your actual username
  });
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/messages', {
      credentials: 'include' // To send the session cookie
    })
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
            {messages.map((item, index) => (
  <li key={index} className="message-item">
    <strong>{item.senderUsername}:</strong> {item.content}
  </li>
))}

            </ul>
        </div>
    </div>
  );
};

export default Dashboard;
