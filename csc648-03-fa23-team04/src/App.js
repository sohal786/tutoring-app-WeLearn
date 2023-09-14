import NavigationBar from './include/navigation';
import './css/landing.main.css';
import AboutPage from './pages/About';

function App() {
  return (
    <div className="App">
      <NavigationBar/>
      <AboutPage/>
    </div>
  );
}

export default App;
