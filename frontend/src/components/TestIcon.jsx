// TestIcon.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const TestIcon = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faHome} />
      <p>Test Home Icon</p>
    </div>
  );
};

export default TestIcon;
