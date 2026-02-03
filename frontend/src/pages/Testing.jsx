import React from "react";
import PageHeader from "../components/PageHeader";
import PageSection from "../components/PageSection";

function Testing() {
  return (
    <div>
      <PageHeader
        title="Testing"
        subtitle="Preview component styles and layout samples."
      />
      <PageSection title="Card Sample" subtitle="Typography and action placement.">
        <div className="card">
          <div className="card-header">Testing</div>
          <div className="card-body">
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card&apos;s content.
            </p>
            <button type="button" className="btn btn-success">
              Go somewhere
            </button>
          </div>
        </div>
      </PageSection>
    </div>
  );
}

export default Testing;
