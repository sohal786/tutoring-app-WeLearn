import { Link } from 'react-router-dom'

const NavigationBar = () => {
    return (
      <nav className="navbar">
        <Link to="/"><h1>weLearn</h1></Link>
        <div className="links">
          <Link to="/home">Home</Link>
          <Link to="/apply">Apply as Tutor</Link>
          <Link to="/Registration">Registration</Link>
          <Link to="/login">Login</Link>
          {/*remove this about line after testing*/}
          <Link to="/about">About</Link> 
        </div>
      </nav>
    );
}
 
export default NavigationBar;