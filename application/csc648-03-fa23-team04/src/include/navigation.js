import { Link } from 'react-router-dom'

const NavigationBar = () => {
    return (
      <nav className="navbar">
        <Link to="/"><h1>weLearn</h1></Link>
        <div className="links">
          <Link to="/about">About</Link>
        </div>
      </nav>
    );
}
 
export default NavigationBar;