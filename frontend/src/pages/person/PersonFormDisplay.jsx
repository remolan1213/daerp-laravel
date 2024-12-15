import React from "react";

const PersonFormDisplay = ({
  formData,
  handleChange,
  handleSubmit,
  message,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit} className="card">
        <div className="card-body">
          <div className="mb-3">
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

          <div className="mb-3">
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

          <div className="mb-3">
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

          <div className="mb-3">
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

          <div className="mb-3">
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

          <div className="mb-3">
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

          <button
            type="submit"
            className="btn btn-primary w-25 mx-auto mt-2 mb-3"
          >
            Submit
          </button>
        </div>
      </form>

      {message && (
        <div className="mt-3" style={{ color: message.includes("successfully") ? "green" : "red" }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default PersonFormDisplay;
