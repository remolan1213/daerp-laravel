import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

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
          <Alert variant="success">Payroll added successfully!</Alert>
        );
      } else {
        const errorText = await response.text();
        setMessage(
          <Alert variant="danger">Failed to add payroll: {errorText}</Alert>
        );
      }
    } catch (error) {
      setMessage(
        <Alert variant="danger">
          Error: Failed to connect to the server. ${error.message}
        </Alert>
      );
    }
  };

  return (
    <Form
      className="card"
      onSubmit={handleSubmit}
      noValidate={true}
      autoComplete="off"
    >
      <Form.Group controlId="workerId">
        <Form.Label className="mt-3 ms-2 mb-0">Worker ID</Form.Label>
        <Form.Control
          className="mt-0 ms-2 me-2 mb-1 w-auto"
          type="number"
          name="workerId"
          value={formData.workerId}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="payrollPeriod">
        <Form.Label className="mt-3 ms-2 mb-0">Payroll Period</Form.Label>
        <Form.Control
          className="mt-0 ms-2 me-2 mb-1 w-auto"
          type="text"
          name="payrollPeriod"
          value={formData.payrollPeriod}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="payrollDate">
        <Form.Label className="mt-3 ms-2 mb-0">Payroll Date</Form.Label>
        <Form.Control
          className="mt-0 ms-2 me-2 mb-1 w-auto"
          type="text"
          name="payrollDate"
          value={formData.payrollDate}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="grossAmount">
        <Form.Label className="mt-3 ms-2 mb-0">Gross Amount</Form.Label>
        <Form.Control
          className="mt-0 ms-2 me-2 mb-1 w-auto"
          type="number"
          name="grossAmount"
          value={formData.grossAmount}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="netAmount">
        <Form.Label className="mt-3 ms-2 mb-0">Net Amount</Form.Label>
        <Form.Control
          className="mt-0 ms-2 me-2 mb-1 w-auto"
          type="number"
          name="netAmount"
          value={formData.netAmount}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="deductions">
        <Form.Label className="mt-3 ms-2 mb-0">Deductions</Form.Label>
        <Form.Control
          className="mt-0 ms-2 me-2 mb-1 w-auto"
          type="text"
          name="deductions"
          value={formData.deductions}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="deductionAmount">
        <Form.Label className="mt-3 ms-2 mb-0">Deduction Amount</Form.Label>
        <Form.Control
          className="mt-0 ms-2 me-2 mb-1 w-auto"
          type="number"
          name="deductionAmount"
          value={formData.deductionAmount}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="totalAmount">
        <Form.Label className="mt-3 ms-2 mb-0">Total Amount</Form.Label>
        <Form.Control
          className="mt-0 ms-2 me-2 mb-1 w-auto"
          type="number"
          name="totalAmount"
          value={formData.totalAmount}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button
        variant="primary"
        size="sm"
        type="submit"
        className="w-25 mx-auto mt-2 mb-3"
      >
        Submit
      </Button>

      {message && <Alert style={{ marginTop: "20px" }}>{message}</Alert>}
    </Form>
  );
};

export default PayrollForm;
