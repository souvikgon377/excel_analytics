import React from 'react';
import './LoginForm.css';
import { FaLock, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <div className="wrapper">
      <form action="">
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" placeholder='Username' required />
          <FaUser className='icon' />
        </div>
        <div className="input-box">
          <input type="password" placeholder='Password' required />
          <FaLock className='icon' />
        </div>
        <div className="remember-forgot">
          <label> <input type="checkbox" />Remember me</label>
          <a href="#">Forget Password?</a>
        </div>
        <button type='submit'>Login</button>

        <div className="register-link">
          <p>Don't have an account? <Link to="/register">register</Link></p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
