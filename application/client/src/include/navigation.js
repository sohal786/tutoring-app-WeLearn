import { Link } from 'react-router-dom';
import SearchComponent from './searchcomponent'; 
const NavigationBar = () => {

  return (
    <nav className="navbar" style={{ }}>
      <Link to="/"><h1>weLearn</h1></Link>
      <SearchComponent />
      <Link to="/home">Home</Link>
      <Link to="/apply">Apply as Tutor</Link>
      <Link to="/Registration">Registration</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}

export default NavigationBar;
