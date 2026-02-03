import React from "react";

const PageSection = ({ title, subtitle, children }) => {
  return (
    <section className="page-section">
      {(title || subtitle) && (
        <div className="page-section-header">
          {title && <h2 className="section-title">{title}</h2>}
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
};

export default PageSection;
