import React from "react";

const Logout = () => {
  return (
    <div className="card">
      <div className="card-header">Logout</div>
      <div className="card-body">
        <p className="card-text">Are you sure you want to logout?</p>
        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-dark btn-sm me-2">
            Ok
          </button>
          <button type="button" className="btn btn-danger btn-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
