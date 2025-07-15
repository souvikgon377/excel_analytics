import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import UploadExcel from './pages/UploadExcel';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminFiles from './pages/AdminFiles';
import AdminReports from './pages/AdminReports';
import AdminSettings from './pages/AdminSettings';
import SummaryCards from './components/SummaryCards';
import DashboardCharts from './components/DashboardCharts';
import RecentUsersTable from './components/RecentUsersTable';
import RecentFilesTable from './components/RecentFilesTable';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';
import Contact from './pages/Contact';
import About from './pages/About';

function AdminOverview() {
  return (
    <>
      <SummaryCards />
      <DashboardCharts />
      <div style={{display: 'flex', gap: '2rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
        <RecentUsersTable />
        <RecentFilesTable />
      </div>
    </>
  );
}

function AppRoutes({ isAuthenticated, user, setIsAuthenticated, setUser }) {
  const location = useLocation();
  const navigate = useNavigate();
  // Hide Navbar and Footer on /admin route
  const hideNavbar = location.pathname.startsWith('/admin');
  const hideFooter = location.pathname.startsWith('/admin');

  const handleLogin = (userObj) => {
    setIsAuthenticated(true);
    setUser(userObj);
    if (userObj && userObj.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  return (
    <>
      {!hideNavbar && <Navbar isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/uploadexcel" element={<UploadExcel />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<AdminOverview />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="files" element={<AdminFiles />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <Router>
      <AppRoutes
        isAuthenticated={isAuthenticated}
        user={user}
        setIsAuthenticated={setIsAuthenticated}
        setUser={setUser}
      />
    </Router>
  );
}

export default App;
