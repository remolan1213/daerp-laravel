// Card.jsx
import React from 'react';
import './Card.css'; // Optional: add styles for your card

const Card = ({ title, children }) => {
  return (
    <div className="card">
      {title && <h3 className="card-title">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;
