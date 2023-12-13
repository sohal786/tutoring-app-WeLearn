import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardPopover from './DashboardPopover.js';
import SearchComponent from './searchcomponent.js';
import { AuthContext } from '../AuthContext.js'; // Adjust the path as necessary

const NavigationBar = () => {
  const { isLoggedIn, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  // Removed the checkSessionStatus function as the AuthContext now manages the login state

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/logout', { 
        method: 'POST', 
        credentials: 'include' 
      });
      
      if (response.ok) {
        logOut(); // Update the login state using the AuthContext
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  const handleApplyClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault(); // Prevent the default link behavior
      navigate('/login'); // Redirect to login page
    }
  };

  return (
      <nav className="navbar">
        <Link to="/">
          <h1>weLearn</h1>
        </Link>
        <SearchComponent className="navbar-search"/>
        <div className="links">
          {/* Add an onClick event to the apply link */}
          <Link to="/apply" onClick={handleApplyClick}>Apply as Tutor</Link>
          <Link to="/register">Registration</Link>
          {isLoggedIn ? (
            <Link to="/" onClick={handleLogout}>Logout</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
          <Link>
            <DashboardPopover />
          </Link>
        </div>
      </nav>
    );
  };
  
  export default NavigationBar;