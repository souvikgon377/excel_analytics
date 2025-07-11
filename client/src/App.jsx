import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import UploadExcel from './pages/UploadExcel';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const user = { name: 'Alex' };

  // Custom wrapper to use navigate outside Router
  function LogoutWrapper({ children }) {
    const navigate = useNavigate();
    const handleLogout = () => {
      setIsAuthenticated(false);
      navigate('/');
    };
    return React.cloneElement(children, { isAuthenticated, user, onLogout: handleLogout });
  }

  return (
    <Router>
      <LogoutWrapper>
        <Navbar />
      </LogoutWrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadExcel />} />
      </Routes>
    </Router>
  );
}

export default App;
