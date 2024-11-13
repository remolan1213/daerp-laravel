import React from "react";
import { Form, Button } from "react-bootstrap";

const PersonFormDisplay = ({
  formData,
  handleChange,
  handleSubmit,
  message,
}) => {
  return (
    <div>
      <Form className="card" onSubmit={handleSubmit}>
        <Form.Group controlId="firstname">
          <Form.Label className="mt-3 ms-2 mb-0">First Name</Form.Label>
          <Form.Control className="mt-0 ms-2 me-2 mb-1 w-auto"
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="middlename">
          <Form.Label className="mt-3 ms-2 mb-0">Middle Name</Form.Label>
          <Form.Control className="mt-0 ms-2 me-2 mb-1 w-auto"
            type="text"
            name="middlename"
            value={formData.middlename}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="lastname">
          <Form.Label className="mt-3 ms-2 mb-0">Last Name</Form.Label>
          <Form.Control className="mt-0 ms-2 me-2 mb-1 w-auto"
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="idNumber">
          <Form.Label className="mt-3 ms-2 mb-0">ID Number</Form.Label>
          <Form.Control className="mt-0 ms-2 me-2 mb-1 w-auto"
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="department">
          <Form.Label className="mt-3 ms-2 mb-0">Department</Form.Label>
          <Form.Control className="mt-0 ms-2 me-2 mb-1 w-auto"
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="bankAccount">
          <Form.Label className="mt-3 ms-2 mb-0">Bank Account</Form.Label>
          <Form.Control className="mt-0 ms-2 me-2 mb-1 w-auto"
            type="text"
            name="bankAccount"
            value={formData.bankAccount}
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
      </Form>

      {message && (
        <div
          style={{
            marginTop: "20px",
            color: message.includes("successfully") ? "green" : "red",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default PersonFormDisplay;
