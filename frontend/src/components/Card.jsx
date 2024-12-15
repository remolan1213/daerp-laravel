// Card.jsx
import React from 'react';
import '../Card.css'; // Optional: add styles for your card

const Card = ({ title, children }) => {
  return (
    <div className='card-component'>
      {title && <h5 className="card-title-component">{title}</h5>}
      {children}
    </div>
  );
};

export default Card;
