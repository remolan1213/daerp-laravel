import React, { useState } from "react";

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
  const [message, setMessage] = useState("");

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
      const response = await fetch("http://localhost:4000/api/payrolls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage(
          <div className="alert alert-success" role="alert">
            Payroll added successfully!
          </div>
        );
      } else {
        const errorText = await response.text();
        setMessage(
          <div className="alert alert-danger" role="alert">
            Failed to add payroll: {errorText}
          </div>
        );
      }
    } catch (error) {
      setMessage(
        <div className="alert alert-danger" role="alert">
          Error: Failed to connect to the server. {error.message}
        </div>
      );
    }
  };

  return (
    <form
      className="card"
      onSubmit={handleSubmit}
      noValidate={true}
      autoComplete="off"
    >
      <div className="form-group">
        <label htmlFor="workerId" className="mt-3 ms-2 mb-0">
          Worker ID
        </label>
        <input
          type="number"
          name="workerId"
          className="form-control mt-0 ms-2 me-2 mb-1 w-auto"
          value={formData.workerId}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="payrollPeriod" className="mt-3 ms-2 mb-0">
          Payroll Period
        </label>
        <input
          type="text"
          name="payrollPeriod"
          className="form-control mt-0 ms-2 me-2 mb-1 w-auto"
          value={formData.payrollPeriod}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="payrollDate" className="mt-3 ms-2 mb-0">
          Payroll Date
        </label>
        <input
          type="text"
          name="payrollDate"
          className="form-control mt-0 ms-2 me-2 mb-1 w-auto"
          value={formData.payrollDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="grossAmount" className="mt-3 ms-2 mb-0">
          Gross Amount
        </label>
        <input
          type="number"
          name="grossAmount"
          className="form-control mt-0 ms-2 me-2 mb-1 w-auto"
          value={formData.grossAmount}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="netAmount" className="mt-3 ms-2 mb-0">
          Net Amount
        </label>
        <input
          type="number"
          name="netAmount"
          className="form-control mt-0 ms-2 me-2 mb-1 w-auto"
          value={formData.netAmount}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="deductions" className="mt-3 ms-2 mb-0">
          Deductions
        </label>
        <input
          type="text"
          name="deductions"
          className="form-control mt-0 ms-2 me-2 mb-1 w-auto"
          value={formData.deductions}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="deductionAmount" className="mt-3 ms-2 mb-0">
          Deduction Amount
        </label>
        <input
          type="number"
          name="deductionAmount"
          className="form-control mt-0 ms-2 me-2 mb-1 w-auto"
          value={formData.deductionAmount}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="totalAmount" className="mt-3 ms-2 mb-0">
          Total Amount
        </label>
        <input
          type="number"
          name="totalAmount"
          className="form-control mt-0 ms-2 me-2 mb-1 w-auto"
          value={formData.totalAmount}
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

      {message && <div style={{ marginTop: "20px" }}>{message}</div>}
    </form>
  );
};

export default PayrollForm;
