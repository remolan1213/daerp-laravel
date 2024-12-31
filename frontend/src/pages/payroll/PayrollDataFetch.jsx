// PayrollDataFetch.js
import React,{ useEffect, useState } from "react";
import PayrollDisplay from "./PayrollDisplay"; // Import the presentational component

const PayrollDataFetch = () => {
  const [payrollData, setPayrollData] = useState({
    name: "Jake Gaviola",
    idNumber: "2020-0105-004",
    bankAccount: "AUB 327-011-000114-7",
    department: "Graphics A",
    payrollPeriod: "November 1-30, 2024",
    payrollDate: "December 13, 2024",
    client: "Graphics Design Work",
    // client2: "  ",
    grossAmount: 13948.63,
    // grossAmount2: "35,466.24",
    netAmount: 0,
    // netAmount2: "1,773.31",
    deductions: "None",
    deductionAmount: "0.00",
    totalAmount: 0,
  });

  useEffect(() => {
    fetch("/api/payroll")
      .then((response) => response.json())
      .then((data) => {
        setPayrollData(data);
      })
      .catch((error) => console.error("Error fetching payroll data:", error));
  }, []); 
  console.log(payrollData);

  return <PayrollDisplay payrollData={payrollData} />;
};

export default PayrollDataFetch;
