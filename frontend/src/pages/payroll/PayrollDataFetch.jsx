// PayrollDataFetch.js
import React, { useEffect, useState } from "react";
import PayrollDisplay from "./PayrollDisplay"; // Import the presentational component

const PayrollDataFetch = () => {
  const [payrollData, setPayrollData] = useState({
    name: "Jake Gaviola",
    bankAccount: "AUB 327-011-000114-7",
    department: "Graphics A",
    payrollPeriod: "October 1-31, 2025",
    payrollDate: "November 19, 2025",
    client: "Graphics Works",
    client2: "",
    grossAmount: 11630.0,
    grossAmount2: 0,
    netAmount: 0,
    netAmount2: 0,
    deductions: "None",
    deductionAmount: "0.00",
    totalAmount: 0.0,
    rate: 0.05,
   });
  const [status, setStatus] = useState({
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (payrollData.name.trim() === "Jake Gaviola") {
      ((payrollData.idNumber = "2020-0105-004"),
        (payrollData.bankAccount = "AUB 327-011-000114-7"),
        (payrollData.department = "Graphics A"));
      payrollData.rate = 0.05;
    } else {
      ((payrollData.idNumber = "2021-0126-001"),
        (payrollData.bankAccount = "AUB 916-10-55635-1"),
        (payrollData.department = "Graphics A"));
      payrollData.rate = 0.7;
    }
    const netAmount = parseFloat(payrollData.grossAmount * payrollData.rate);
    const netAmount2 = parseFloat(payrollData.grossAmount2 * payrollData.rate);
    const totalAmount =
      netAmount + netAmount2 - parseFloat(payrollData.deductionAmount);
    setPayrollData((prevState) => ({
      ...prevState,
      netAmount: netAmount,
      netAmount2: netAmount2,
      totalAmount: totalAmount,
    }));
  }, []);

  useEffect(() => {
    setStatus({ loading: true, error: null });
    const payrollsUrl =
      import.meta.env.VITE_PAYROLL_SUMMARY || "/api/payroll";
    fetch(payrollsUrl)
      .then((response) => response.json())
      .then((data) => {
        setPayrollData(data);
        setStatus({ loading: false, error: null });
      })
      .catch((error) => {
        console.error("Error fetching payroll data:", error);
        setStatus({ loading: false, error: "Unable to load payroll data." });
      });
  }, []);
  console.log(payrollData);

  return (
    <PayrollDisplay
      payrollData={payrollData}
      isLoading={status.loading}
      error={status.error}
    />
  );
};

export default PayrollDataFetch;
