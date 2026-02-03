import React from "react";
import PageHeader from "../components/PageHeader";
import PageSection from "../components/PageSection";

const Logout = () => {
  return (
    <div>
      <PageHeader
        title="Logout"
        subtitle="Confirm before ending your session."
      />
      <PageSection title="Confirm Logout">
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
      </PageSection>
    </div>
  );
};

export default Logout;
