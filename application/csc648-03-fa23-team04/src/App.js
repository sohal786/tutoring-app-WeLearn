import "./css/global.css";

import NavigationBar from "./include/navigation";

import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import NotFound from "./include/NotFound";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

//React Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Akshat from "./pages/akshat";
import Aakanksha from "./pages/aakanksha";
import Andy from "./pages/andy";
import Jorge from "./pages/jorge";
import Azi from "./pages/azi";
import Charter from "./pages/charter";


function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="akshat" element={<Akshat />} />
            <Route path="aakanksha" element={<Aakanksha/>} />
            <Route path="andy" element={<Andy />} />
            <Route path="jorge" element={<Jorge />} />
            <Route path="azi" element={<Azi />} />
            <Route path="charter" element={<Charter />} />
          </Routes>
        </div>
      </div>
    </Router>

  );
}

export default App;