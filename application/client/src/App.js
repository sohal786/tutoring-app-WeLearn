import React, { Component } from "react";
import "./css/global.css";
import SearchComponent from './include/searchcomponent'; // Adjust the path as needed
import NavigationBar from './include/navigation.js';
import Footer from "./include/footer.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login'; // If you have a login component
import Registration from './pages/Registration';
import AboutPage from './pages/About';
import Akshat from "./pages/akshat.js";
import Aakanksha from "./pages/aakanksha.js";
import Andy from "./pages/andy.js";
import Azi from "./pages/azi.js";
import Charter from "./pages/charter.js";
import Jorge from "./pages/jorge.js";

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
            <Route path="/register" element={<Registration />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/akshat" element={<Akshat />} />
            <Route path="/aakanksha" element={<Aakanksha />} />
            <Route path="/andy" element={<Andy />} />
            <Route path="/azi" element={<Azi />} />
            <Route path="/charter" element={<Charter />} />
            <Route path="/jorge" element={<Jorge />} />
          </Routes>

        <p className="App-intro">{this.state.home}</p>
        <Footer />
      </div>
    );
  }
}

export default App;
