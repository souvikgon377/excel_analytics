import React, { useState, useRef, useEffect } from 'react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styles from '../pages/AdminDashboard.module.css';

const AdminTopbar = ({ user = { name: 'Admin' }, onLogout }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileOpen]);

  return (
    <header className={styles.topbar}>
      <div className={styles.topbarLeft}>
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: 8}}>
          <rect x="2" y="8" width="8" height="16" rx="2" fill="#2563eb"/>
          <rect x="12" y="4" width="8" height="24" rx="2" fill="#38bdf8"/>
          <rect x="22" y="12" width="8" height="8" rx="2" fill="#6366f1"/>
        </svg>
        <span className={styles.topbarAppName}>ExcelAnalytics Admin</span>
      </div>
      <div className={styles.topbarCenter}>
        <div className={styles.topbarSearch}>
          <SearchIcon />
          <input type="text" placeholder="Search users, files..." />
        </div>
      </div>
      <div className={styles.topbarRight}>
        <button className={styles.topbarIconBtn} aria-label="Notifications">
          <NotificationsNoneIcon />
        </button>
        <div className={styles.topbarProfile} ref={profileRef}>
          <button className={styles.topbarAvatar} onClick={() => setProfileOpen(v => !v)} aria-haspopup="true" aria-expanded={profileOpen}>
            {user.name ? user.name[0].toUpperCase() : 'A'}
            <ArrowDropDownIcon />
          </button>
          {profileOpen && (
            <div className={styles.topbarDropdown} role="menu">
              <button className={styles.topbarDropdownItem}>Profile</button>
              <button className={styles.topbarDropdownItem} onClick={onLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar; 