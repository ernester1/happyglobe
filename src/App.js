import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Footer from './components/Footer';
import Jobsavailable from './components/Jobsavailable';
import Postajob from './components/Postajob';
import Apply from './components/Apply';
import Chatbot from './components/Chatbot';
import Homepage from './components/Homepage';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App container-fluid">
        <header className="App-header">
          <h1>
            <span className='imgspan'>
              <img 
                src='src/components/assets/images/work-from-home.jpg' 
                alt="Happy Globe logo" 
                className='headerimg' 
              />
            </span>
            HAPPY GLOBE 🌍 | Living better days of job satisfaction.
          </h1>
        </header>

        <Navbar />
        
        <main className="main-content">
        
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/Chatbot" element={<Chatbot />} />
              <Route path="/Apply" element={<Apply/>} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/Profile" element={<Profile />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/Jobsavailable" element={<Jobsavailable />} />
                <Route path="/Postajob" element={<Postajob />} />
              </Route>
        </Routes>
      
        </main>
      
        <Footer />
      </div>
    </Router>
  );
}

export default App;
