// LabelValue.jsx
// import React from 'react';
import '../LabelValue.css'; // Optional: add styles for the label-value pair

const LabelValue = ({ label, value }) => {
  return (
    <div className="label-value">
      <h4 className="label-value-label">{label}</h4>
      <p className="label-value-text">{value}</p>
    </div>
  );
};

export default LabelValue;
