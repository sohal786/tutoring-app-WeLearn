import React, { Component } from "react";
import "./css/global.css";
import SearchComponent from './include/searchcomponent'; // Adjust the path as needed
import NavigationBar from './include/navigation.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your other components
 // Adjust the path as needed
 import Login from './pages/Login'; // If you have a login component
 import Registration from './pages/Registration';

// Bootstrap CSS and JS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import TutorApply from "./pages/tutor_apply.js";

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
           
            <Route path="/apply" element={<TutorApply />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Registration" element={<Registration />} />
          </Routes>

          <p className="App-intro">{this.state.home}</p>
        </div>
      
    );
  }
}

export default App;
