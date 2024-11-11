// LabelValue.jsx
import '../LabelValue.css'; // Optional: add styles for the label-value pair

const LabelValue = ({ label, value }) => {
  return (
    <div className="label-value">
      <h6 className="label-value-label">{label}</h6>
      <p className="label-value-text">{value}</p>
    </div>
  );
};

export default LabelValue;
