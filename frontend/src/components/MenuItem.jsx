import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon

const MenuItem = ({ to, icon, label }) => {
  return (
    <li className="menu-item">
      <Link to={to}>
        <FontAwesomeIcon icon={icon} /> {label} {/* Use FontAwesomeIcon here */}
      </Link>
    </li>
  );
};

export default MenuItem;
