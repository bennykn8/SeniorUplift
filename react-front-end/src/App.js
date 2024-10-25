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
import NursingHomes from './pages/NursingHomes';
import Healthcare from './pages/Healthcare';
import Entertainment from './pages/Entertainment';
import NursingHomeDetail from './pages/NursingHomeDetail';
import EntertainmentDetail from './pages/EntertainmentDetail'; 

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/nursing-homes" element={<NursingHomes />} />
          <Route path="/nursinghomes/:id" element={<NursingHomeDetail />} />
          <Route path="/healthcare" element={<Healthcare />} />
          <Route path="/entertainment" element={<Entertainment />} />
          <Route path="/entertainments/:id" element={<EntertainmentDetail />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
