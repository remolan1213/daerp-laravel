import React, { useEffect, useState } from "react";
import "../style.css"; // Assuming the path to your CSS is correct

const Payroll = () => {
  // Define the state to hold payroll data
  const [payrollData, setPayrollData] = useState({
    name: "Jake Gaviola",
    idNumber: "2020-0105-005",
    bankAccount: "AUB 327-011-000114-7",
    department: "Graphics",
    payrollPeriod: "September 1-30, 2024",
    payrollDate: "October 16, 2024",
    client: "Graphics Design Work",
    client2: "Waterfront Media LCC",
    grossAmount: "13,621.47",
    grossAmount2: "35,466.24",
    netAmount: "681.07",
    netAmount2: "1,773.31",
    deductions: "None",
    deductionAmount: "0.00",
    totalAmount: "2,454.40",
  });

  // Fetch payroll data from the backend
  useEffect(() => {
    fetch("/api/payroll")
      .then((response) => response.json())
      .then((data) => {
        setPayrollData(data); // Update the state with the fetched data
      })
      .catch((error) => console.error("Error fetching payroll data:", error));
  }, []);

  return (
    <div className="card">
      <div className="card-title-bar">Payroll</div>
      <div className="basic-data">
        <div className="name">
          Name:
          <div className="name-value">{payrollData.name}</div>
        </div>
        <div className="id-number">
          ID Number:
          <div className="id-number-value">{payrollData.idNumber}</div>
        </div>
        <div className="bank-account">
          Bank Account:
          <div className="bank-account-value">{payrollData.bankAccount}</div>
        </div>
      </div>
      {/* .basic-data */}
      <div className="basic-data-2">
        <div className="department">
          Department:
          <div className="department-value">{payrollData.department}</div>
        </div>
        <div className="payroll-period">
          Payroll Period:
          <div className="payroll-period-value">{payrollData.payrollPeriod}</div>
        </div>
        <div className="payroll-date">
          Payroll Date:
          <div className="payroll-date-value">{payrollData.payrollDate}</div>
        </div>
      </div>
      {/* .basic-data-2 */}
      <div className="payroll-data">
        <div className="client">
          Client:
          <div className="client-value">{payrollData.client}</div>
          <div className="client-value">{payrollData.client2}</div>
        </div>
        <div className="gross-amount">
          Gross:
          <div className="gross-amount-value">{payrollData.grossAmount}</div>
          <div className="gross-amount-value">{payrollData.grossAmount2}</div>
        </div>
        <div className="net-amount">
          Net:
          <div className="net-amount-value">{payrollData.netAmount}</div>
          <div className="net-amount-value">{payrollData.netAmount2}</div>
        </div>
      </div>
      {/* .payroll-data */}
      <div className="deductions-data">
        <div className="deductions">
          Deductions:
          <div className="description">{payrollData.deductions}</div>
        </div>
        <div className="deduction-amount">
          Amount:
          <div className="deductions-value">{payrollData.deductionAmount}</div>
        </div>
      </div>
      {/* .deductions-data */}
      <div className="total-data">
        <div className="total">
          Total:
          <div className="total-value">{payrollData.totalAmount}</div>
        </div>
      </div>
      {/* .total-data */}
    </div>
  );
};

export default Payroll;
