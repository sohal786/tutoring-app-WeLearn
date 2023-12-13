import React, { Component } from "react";
import "./css/global.css";

import NavigationBar from './include/navigation.js';
import Footer from "./include/footer.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext.js'; 

import HomePage from "./pages/Home.js";
import SearchResults from './pages/SearchResults.js';
import TutorApply from "./pages/tutor_apply.js";
import TutorPage from "./pages/TutorPage.js";
import Login from './pages/Login.js'; // If you have a login component
import Registration from './pages/Registration.js';
import AboutPage from './pages/About.js';
import Akshat from "./pages/akshat.js";
import Aakanksha from "./pages/aakanksha.js";
import Andy from "./pages/andy.js";
import Azi from "./pages/azi.js";
import Charter from "./pages/charter.js";
import Jorge from "./pages/jorge.js";

 // Bootstrap CSS and JS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  render() {
    return (
      <AuthProvider> {/* Wrap your app with AuthProvider */}
      <div className="app-container">
        <header className="App-header">
          <NavigationBar />
        </header>

        <main className="app-main">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/apply" element={<TutorApply />} />
            <Route path="/tutor" element={<TutorPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/akshat" element={<Akshat />} />
            <Route path="/aakanksha" element={<Aakanksha />} />
            <Route path="/andy" element={<Andy />} />
            <Route path="/azi" element={<Azi />} />
            <Route path="/charter" element={<Charter />} />
            <Route path="/jorge" element={<Jorge />} />
            <Route path="/search-results" element={<SearchResults />} />
          </Routes>
          {/*<p className="App-intro">{this.state.home}</p>*/}
        </main>
        
        <footer className="app-footer">
          <Footer />
        </footer>
      </div>
      </AuthProvider>
    );
  }
}

export default App;
