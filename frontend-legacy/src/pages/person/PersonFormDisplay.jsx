import React from "react";
import PageHeader from "../../components/PageHeader";
import PageSection from "../../components/PageSection";
import Toast from "../../components/Toast";

const PersonFormDisplay = ({
  formData,
  handleChange,
  handleSubmit,
  message,
  isSubmitting,
}) => {
  return (
    <div>
      <PageHeader
        title="Add Person"
        subtitle="Create a new worker profile for payroll."
      />
      <Toast
        open={Boolean(message)}
        type={message?.type}
        message={message?.text}
        onClose={() => message?.clear && message.clear()}
      />
      <PageSection title="Person Details" subtitle="Basic identity and bank information.">
        <form onSubmit={handleSubmit} className="card">
          <div className="form-grid">
            <div className="form-field">
              <label className="form-label" htmlFor="firstname">
                First Name
              </label>
              <input
                className="form-control"
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </div>

          <div className="form-field">
            <label className="form-label" htmlFor="middlename">
              Middle Name
            </label>
            <input
              className="form-control"
              type="text"
              id="middlename"
              name="middlename"
              value={formData.middlename}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="lastname">
              Last Name
            </label>
            <input
              className="form-control"
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="idNumber">
              ID Number
            </label>
            <input
              className="form-control"
              type="text"
              id="idNumber"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="department">
              Department
            </label>
            <input
              className="form-control"
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="bankAccount">
              Bank Account
            </label>
            <input
              className="form-control"
              type="text"
              id="bankAccount"
              name="bankAccount"
              value={formData.bankAccount}
              onChange={handleChange}
              required
            />
          </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </PageSection>

      {!message && (
        <div className="empty-state">
          Fill out the form to add a new person.
        </div>
      )}
    </div>
  );
};

export default PersonFormDisplay;
