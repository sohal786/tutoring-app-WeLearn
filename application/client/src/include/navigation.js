import { Link } from 'react-router-dom'
import DashboardPopover from './DashboardPopover.js';
import SearchComponent from './searchcomponent.js';

const NavigationBar = () => {
    return (
      <nav className="navbar">
        <Link to="/">
          <h1>weLearn</h1>
        </Link>
        <SearchComponent  className="navbar-search"/>
        <div className="links">
          <Link to="/apply">Apply as Tutor</Link>
          <Link to="/register">Registration</Link>
          <Link to="/login">Login</Link>
          <Link>
            <DashboardPopover />
          </Link>
        </div>
      </nav>
    );
}

export default NavigationBar;
