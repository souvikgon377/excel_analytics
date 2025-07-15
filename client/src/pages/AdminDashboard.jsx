import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminTopbar from '../components/AdminTopbar';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  // Dummy user for avatar
  const user = { name: 'Alex' };
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className={styles.adminLayout}>
      <AdminSidebar />
      <div className={styles.adminMain}>
        <AdminTopbar user={user} onLogout={handleLogout} />
        <main className={styles.adminContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard; 