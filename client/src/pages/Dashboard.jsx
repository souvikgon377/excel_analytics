import React, { useState, useRef } from 'react';
import styles from './Dashboard.module.css';

const mockFiles = [
  { id: 1, name: 'Sales_Q1.xlsx', date: '2024-06-01' },
  { id: 2, name: 'Inventory_May.xlsx', date: '2024-06-10' },
  { id: 3, name: 'HR_Report.xlsx', date: '2024-06-15' },
];

const Dashboard = () => {
  const [files, setFiles] = useState(mockFiles);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef();

  const handleUpload = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFiles([
        { id: files.length + 1, name: file.name, date: new Date().toISOString().slice(0, 10) },
        ...files,
      ]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFiles([
        { id: files.length + 1, name: file.name, date: new Date().toISOString().slice(0, 10) },
        ...files,
      ]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleAnalyze = (file) => {
    alert(`Analyze: ${file.name}`);
  };

  const handleDelete = (id) => {
    setFiles(files.filter(file => file.id !== id));
  };

  return (
    <div className={styles['dashboard-bg']}>
      <div className={styles['dashboard-card']}>
        <div className={styles['dashboard-header']}>
          <h2 className={styles['dashboard-title']}>Dashboard</h2>
        </div>
        <div
          className={dragActive ? `${styles.dropbox} ${styles['dropbox-active']}` : styles.dropbox}
          onClick={handleUpload}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            ref={inputRef}
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept=".xlsx,.xls,.csv"
          />
          {dragActive ? 'Drop your Excel file here...' : 'Click or drag & drop to upload a new Excel file (.xlsx, .xls, .csv)'}
        </div>
        <div className={styles['files-section']}>
          <h3 className={styles['files-title']}>Previous Files</h3>
          <table className={styles['files-table']}>
            <thead>
              <tr>
                <th>Filename</th>
                <th>Upload Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {files.map(file => (
                <tr key={file.id}>
                  <td>{file.name}</td>
                  <td className={styles['files-date']}>{file.date}</td>
                  <td>
                    <button onClick={() => handleAnalyze(file)} className={styles['analyze-btn']}>Analyze</button>
                    <button
                      className={styles['delete-btn']}
                      title="Delete file"
                      onClick={() => handleDelete(file.id)}
                      aria-label="Delete file"
                    >
                      &times;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
