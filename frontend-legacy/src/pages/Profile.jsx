import React from "react";
import PageHeader from "../components/PageHeader";
import PageSection from "../components/PageSection";

const Profile = () => {
  return (
    <div>
      <PageHeader
        title="Profile"
        subtitle="Review your account and role details."
      />
      <PageSection title="Profile Summary">
        <div className="card">
          <div className="card-body">
            <p className="card-text">
              Add profile details and permissions here when ready.
            </p>
          </div>
        </div>
      </PageSection>
    </div>
  );
};

export default Profile;
