import { Link } from 'react-router-dom'
import DashboardPopover from './DashboardPopover';

const NavigationBar = () => {
    return (
      <nav className="navbar">
        <Link to="/">
          <h1>weLearn</h1>
        </Link>
        <div className="links">
          <Link to="/apply">Apply as Tutor</Link>
          <Link to="/Registration">Registration</Link>
          <Link to="/login">Login</Link>
          <DashboardPopover/>
        </div>
      </nav>
    );
}
 
export default NavigationBar;