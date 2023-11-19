import React, { Component } from "react";
import "./css/global.css";
import SearchComponent from './include/searchcomponent'; // Adjust the path as needed
import NavigationBar from './include/navigation.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your other components
 // Adjust the path as needed
 import Login from './pages/Login'; // If you have a login component
 import Registration from './pages/Registration';
 import AboutPage from './pages/About';

// Bootstrap CSS and JS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callHome() {
    fetch("http://54.219.143.67")
      .then(res => res.text())
      .then(res => this.setState({ home: res }))
      .catch(err => err);
  }

  componentWillMount() {
    this.callHome();
  }

  render() {
    return (
      
        <div className="App">
          <header className="App-header">
            <NavigationBar />
          </header>
          <br />

          <Routes>
            <Route exact path="/" element={<SearchComponent />} />
           
           
            { <Route path="/login" element={<Login />} /> }
            {/* Define other routes here */}
            <Route path="/Registration" element={<Registration />} />
            {/* Remove this line after testing */}
            <Route path="/about" element={<AboutPage />} />
          </Routes>

          <p className="App-intro">{this.state.home}</p>
        </div>
      
    );
  }
}

export default App;
