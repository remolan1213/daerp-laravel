import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon

const MenuItem = ({ to, icon, label, onClick }) => {
  return (
    <li className="menu-item">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `menu-link${isActive ? " active" : ""}`
        }
        onClick={onClick}
      >
        <FontAwesomeIcon icon={icon} /> {label} {/* Use FontAwesomeIcon here */}
      </NavLink>
    </li>
  );
};

export default MenuItem;
