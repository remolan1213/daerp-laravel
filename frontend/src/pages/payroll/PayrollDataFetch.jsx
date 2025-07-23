// PayrollDataFetch.js
import React, { useEffect, useState } from "react";
import PayrollDisplay from "./PayrollDisplay"; // Import the presentational component

const PayrollDataFetch = () => {
  const [payrollData, setPayrollData] = useState({
    name: "Jake Gaviola ",
    bankAccount: "AUB 327-011-000114-7",
    department: "Graphics A",
    payrollPeriod: "June 1-30, 2025",
    payrollDate: "July 17, 2025",
    client: "Graphics Works (July 8, 2025)",
    client2: "",
    grossAmount: 13641.72,
    grossAmount2: 0, 
    netAmount: 0,
    netAmount2: 0,
    deductions: "None",
    deductionAmount: "0.00",
    totalAmount: 0.0,
    rate: 0.05
  });

  useEffect(() => {
    if (payrollData.name.trim() === "Jake Gaviola") {
       payrollData.idNumber = "2020-0105-004",
       payrollData.bankAccount = "AUB 327-011-000114-7",
       payrollData.department = "Graphics A"
       payrollData.rate = 0.05
    } else {
       payrollData.idNumber = "2021-0126-001",
       payrollData.bankAccount = "AUB 916-10-55635-1",
       payrollData.department = "Graphics A"
       payrollData.rate = 0.70  
    
    }
    const netAmount = parseFloat(payrollData.grossAmount * payrollData.rate);
    const netAmount2 = parseFloat(payrollData.grossAmount2 * payrollData.rate);
    const totalAmount =
      netAmount + netAmount2 - parseFloat(payrollData.deductionAmount);
    setPayrollData((prevState) => ({
      ...prevState,
      netAmount: netAmount,
      netAmount2: netAmount2,
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
