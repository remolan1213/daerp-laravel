// frontend/components/Payroll.jsx
import React from "react";

const Payroll = () => {
  return (
    <div className="card">
      <div className="card-title-bar">Payroll</div>
      <div className="basic-data">
        <div className="name">
          Name:
          <div className="name-value">Armando Lanugon</div>
        </div>
        <div className="id-number">
          ID Number:
          <div className="id-number-value">12345678</div>
        </div>
        <div className="bank-account">
          Bank Account:
          <div className="bank-account-value">AUB 916-10-522679-5</div>
        </div>
      </div>
      {/* .basic-data */}
      <div className="basic-data-2">
        <div className="department">
          Department:
          <div className="department-value">Graphics A</div>
        </div>
        <div className="payroll-period">
          Payroll Period:
          <div className="payroll-period-value">September 1-30, 2024</div>
        </div>
        <div className="payroll-date">
          Payroll Date:
          <div className="payroll-date-value">October 9, 2024</div>
        </div>
      </div>
      {/* .basic-data -2*/}
      <div className="payroll-data">
        <div className="client">
          Client:
          <div className="client-value">Waterfront Media LCC</div>
          <div className="client-value">Health Care</div>
        </div>
        <div className="gross-amount">
          Gross:
          <div className="gross-amount-value">P35,466.24</div>
        </div>
        <div className="net-amount">
          Net:
          <div className="net-amount-value">P17,733.12</div>
          <div className="net-amount-value">P1,939.56</div>
        </div>
      </div>
      {/* .payroll-data */}
      <div className="deductions-data">
        <div className="deductions">
          Deductions:
          <div className="description">None</div>
        </div>
        <div className="deduction-amount">
          Amount:
          <div className="deductions-value">P00.00</div>
        </div>
      </div>
      {/* .deductions-data */}
      <div className="total-data">
        <div className="total">
          Total:
          <div className="total-value">P19,672.68</div>
        </div>
      </div>
      {/* .total-data */}
    </div>
  );
};

export default Payroll;
