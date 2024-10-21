import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Routing
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

// import Components
import Navbar from './components/Navbar/Navbar';

// Import Pages
import FrontPage from './pages/FrontPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/about" element={<AboutPage />} />
          
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
