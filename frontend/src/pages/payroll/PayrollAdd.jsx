import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import PageSection from "../../components/PageSection";
import Toast from "../../components/Toast";

const PayrollForm = () => {
  // State for storing form inputs
  const [formData, setFormData] = useState({
    payrollPeriod: "",
    payrollDate: "",
    grossAmount: "",
    netAmount: "",
    deductions: "",
    deductionAmount: "",
    totalAmount: "",
    workerId: "", // To associate the payroll with a specific worker
  });

  // State for managing success or error messages
  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission and send data to the backend API
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const payrollsUrl =
        import.meta.env.VITE_PAYROLLS || "/api/payrolls";
      const response = await fetch(payrollsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage({ type: "success", text: "Payroll added successfully!" });
      } else {
        const errorText = await response.text();
        setMessage({
          type: "error",
          text: `Failed to add payroll: ${errorText}`,
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: `Error: Failed to connect to the server. ${error.message}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Add Payroll"
        subtitle="Capture a new payroll entry for a worker."
      />
      <Toast
        open={Boolean(message)}
        type={message?.type}
        message={message?.text}
        onClose={() => setMessage(null)}
      />
      <PageSection title="Payroll Entry" subtitle="Complete the fields below to save a payroll record.">
        <form
          className="card"
          onSubmit={handleSubmit}
          noValidate={true}
          autoComplete="off"
        >
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="workerId">Worker ID</label>
              <input
                type="number"
                name="workerId"
                className="form-control"
                value={formData.workerId}
                onChange={handleChange}
                required
              />
            </div>

          <div className="form-field">
            <label htmlFor="payrollPeriod">Payroll Period</label>
            <input
              type="text"
              name="payrollPeriod"
              className="form-control"
              value={formData.payrollPeriod}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="payrollDate">Payroll Date</label>
            <input
              type="text"
              name="payrollDate"
              className="form-control"
              value={formData.payrollDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="grossAmount">Gross Amount</label>
            <input
              type="number"
              name="grossAmount"
              className="form-control"
              value={formData.grossAmount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="netAmount">Net Amount</label>
            <input
              type="number"
              name="netAmount"
              className="form-control"
              value={formData.netAmount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="deductions">Deductions</label>
            <input
              type="text"
              name="deductions"
              className="form-control"
              value={formData.deductions}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="deductionAmount">Deduction Amount</label>
            <input
              type="number"
              name="deductionAmount"
              className="form-control"
              value={formData.deductionAmount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="totalAmount">Total Amount</label>
            <input
              type="number"
              name="totalAmount"
              className="form-control"
              value={formData.totalAmount}
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
          Complete the form to record a payroll entry.
        </div>
      )}
    </div>
  );
};

export default PayrollForm;
