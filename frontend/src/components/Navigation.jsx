import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Footer from './Footer';
import logo from './images/da-logo4.svg'; // Import the logo image

const Navigation = () => {
  return (
    <div className="menu-sidebar">
      <img className="logo" src={logo} alt="logo" />
      <ul className="menu">
        <li className="menu-item">
          <Link to="/"><i className="fas fa-home"></i> Home</Link>
        </li>
        <li className="menu-item">
          <Link to="/profile"><i className="fas fa-chart-bar"></i> Profile</Link>
        </li>
        <li className="menu-item">
          <Link to="/payroll"><i className="fas fa-users"></i> Payroll</Link>
        </li>
        <li className="menu-item">
          <Link to="/settings"><i className="fas fa-cog"></i> Settings</Link>
        </li>
        <li className="menu-item">
          <Link to="/logout"><i className="fas fa-sign-out-alt"></i> Logout</Link>
        </li>
      </ul>
      <div className='menu-footer'>
      <Footer />
      </div>
    </div>
  );
};

export default Navigation;
