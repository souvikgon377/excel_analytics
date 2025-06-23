import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import './Dashboard.css';

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Add class to body on mount
    document.body.classList.add('dashboard-page');
    // Remove class on unmount
    return () => {
      document.body.classList.remove('dashboard-page');
    };
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Read and process the Excel file
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setData(json);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleClearSelection = () => {
    setSelectedFile(null);
    setData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleLogout = () => {
    // Clear any authentication state
    localStorage.removeItem('token');
    navigate('/login');
  };

  const [selectedAnalysis, setSelectedAnalysis] = React.useState('barChart');
  const [selectedDataParam, setSelectedDataParam] = React.useState([]);

  const handleGenerate = () => {
    // Placeholder for generate analysis logic
    alert(`Generating ${selectedAnalysis} analysis on ${selectedDataParam.length > 0 ? selectedDataParam.join(', ') : 'no parameter selected'}...`);
  };

  const [summarise, setSummarise] = React.useState('');
  const [and1, setAnd1] = React.useState('');
  const [and2, setAnd2] = React.useState('');
  const [by, setBy] = React.useState('');
  const [and3, setAnd3] = React.useState('');
  const [and4, setAnd4] = React.useState('');
  const [over, setOver] = React.useState('');
  const [using, setUsing] = React.useState('Sum');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted with Summarise: ${summarise}, By: ${by}, Over: ${over}, Using: ${using}, And: [${and1}, ${and2}, ${and3}, ${and4}]`);
  };

  return (
    <>
      <div className="navbar">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Excel Analytics</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Contact</a>
                </li>
                {/* <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                </li> */}
              </ul>
              <button onClick={handleLogout} className="btn btn-primary ms-auto">Logout</button>
            </div>
          </div>
        </nav>
      </div>
      <div className="dashboard-container">
        <nav className="dashboard-nav">
          <h1>Visualize Your Data</h1>
        </nav>

        <main className="dashboard-main">
          <section className="upload-section">
            <h2>Upload Excel File</h2>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              className="file-input"
              ref={fileInputRef}
            />
            <button type="button" className="btn btn-secondary ms-2" onClick={handleClearSelection}>Clear Selection</button>
          </section>

          {data && (
            <section className="visualization-section">
              <h2>Data Preview</h2>
              <div className="analysis-parameters-form p-3 rounded">
                <h5>Frame your own question</h5>
                <form onSubmit={handleSubmit}>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">Summarise</label>
                    <div className="col-sm-3">
                      <select
                        className="form-select"
                        value={summarise}
                        onChange={(e) => setSummarise(e.target.value)}
                      >
                        <option value="">--- SELECT ---</option>
                        {Object.keys(data[0]).map((col) => (
                          <option key={col} value={col}>{col}</option>
                        ))}
                      </select>
                    </div>
                    <label className="col-sm-1 col-form-label">And*</label>
                    <div className="col-sm-2">
                      <select
                        className="form-select"
                        value={and1}
                        onChange={(e) => setAnd1(e.target.value)}
                      >
                        <option value="">--- SELECT ---</option>
                        {Object.keys(data[0]).map((col) => (
                          <option key={col} value={col}>{col}</option>
                        ))}
                      </select>
                    </div>
            
                </div>
                <div className="row mb-2">
                  <label className="col-sm-3 col-form-label">By</label>
                  <div className="col-sm-3">
                    <select
                      className="form-select"
                      value={by}
                      onChange={(e) => setBy(e.target.value)}
                    >
                      <option value="">--- SELECT ---</option>
                      {Object.keys(data[0]).map((col) => (
                        <option key={col} value={col}>{col}</option>
                      ))}
                    </select>
                  </div>
                  <label className="col-sm-1 col-form-label">And*</label>
                  <div className="col-sm-2">
                    <select
                      className="form-select"
                      value={and3}
                      onChange={(e) => setAnd3(e.target.value)}
                    >
                      <option value="">--- SELECT ---</option>
                      {Object.keys(data[0]).map((col) => (
                        <option key={col} value={col}>{col}</option>
                      ))}
                    </select>
                  </div>
                </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">Over*</label>
                    <div className="col-sm-3">
                      <select
                        className="form-select"
                        value={over}
                        onChange={(e) => setOver(e.target.value)}
                      >
                        <option value="">--- SELECT ---</option>
                        {Object.keys(data[0]).map((col) => (
                          <option key={col} value={col}>{col}</option>
                        ))}
                      </select>
                    </div>
                    <label className="col-sm-1 col-form-label">Using</label>
                    <div className="col-sm-2">
                      <select
                        className="form-select"
                        value={using}
                        onChange={(e) => setUsing(e.target.value)}
                      >
                        <option value="Sum">Sum</option>
                        <option value="Average">Average</option>
                        <option value="Count">Count</option>
                        <option value="Max">Max</option>
                        <option value="Min">Min</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 text-center">
                      <button type="submit" className="btn btn-gradient">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="data-table">
                <table>
                  <thead>
                    <tr>
                      {Object.keys(data[0]).map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, index) => (
                      <tr key={index}>
                        {Object.values(row).map((value) => (
                          <td key={value}>{value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </main>
      </div>
    </>
  );
};

export default Dashboard;
