import React from "react";
import PageHeader from "../components/PageHeader";
import PageSection from "../components/PageSection";

const Settings = () => {
  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Manage preferences, security, and system options."
      />
      <PageSection title="Preferences">
        <div className="card">
          <div className="card-body">
            <p className="card-text">
              Configure notifications, access roles, and display settings.
            </p>
          </div>
        </div>
      </PageSection>
    </div>
  );
};

export default Settings;
