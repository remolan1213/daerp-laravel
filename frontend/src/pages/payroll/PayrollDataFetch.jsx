// PayrollDataFetch.js
import React, { useEffect, useState } from "react";
import PayrollDisplay from "./PayrollDisplay"; // Import the presentational component

const PayrollDataFetch = () => {
  const [payrollData, setPayrollData] = useState({
    name: "Jake Gaviola",
    idNumber: "2020-0105-004",
    bankAccount: "AUB 327-011-000114-7",
    department: "Graphics A",
    payrollPeriod: "January 1-31, 2025",
    payrollDate: "February 14, 2025",
    client: "Graphics Design Work",
    // client2: "Aaron",
    grossAmount: 24703.22,
    // grossAmount2: 4687.0,
    netAmount: 0,
    // netAmount2: 0,
    deductions: "None",
    deductionAmount: "0.00",
    totalAmount: 0.0
  });

  useEffect(() => {
    const netAmount = parseFloat(payrollData.grossAmount * 0.05);
    // const netAmount2 = parseFloat(payrollData.grossAmount2 * 0.7);
    const totalAmount =
      netAmount - parseFloat(payrollData.deductionAmount);
    setPayrollData((prevState) => ({
      ...prevState,
      netAmount: netAmount,
      // netAmount2: netAmount2,
      totalAmount: totalAmount
    }));
  }, []);

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
