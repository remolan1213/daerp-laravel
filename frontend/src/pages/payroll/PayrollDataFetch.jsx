// PayrollDataFetch.js
import { useEffect, useState } from "react";
import PayrollDisplay from "./PayrollDisplay"; // Import the presentational component

const PayrollDataFetch = () => {
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

  useEffect(() => {
    fetch("/api/payroll")
      .then((response) => response.json())
      .then((data) => {
        setPayrollData(data);
      })
      .catch((error) => console.error("Error fetching payroll data:", error));
  }, []);

  return <PayrollDisplay payrollData={payrollData} />;
};

export default PayrollDataFetch;
