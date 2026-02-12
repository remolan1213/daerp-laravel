import React, { useEffect, useState } from "react";

const Payroll = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedWorkerId, setSelectedWorkerId] = useState(null);
  const [payrollData, setPayrollData] = useState({
    payrollPeriod: "",
    payrollDate: "",
    grossAmount: "",
    netAmount: "",
    deductions: "",
    deductionAmount: "",
    totalAmount: "",
  });
  const [message, setMessage] = useState("");

  const handleSearch = () => {
    fetch(`http://localhost:4000/api/workers/search?name=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => setSearchResults(data))
      .catch((error) => console.error("Error searching workers:", error));
  };

  const handleWorkerSelect = (workerId) => {
    setSelectedWorkerId(workerId);
    setSearchTerm("");
    setSearchResults([]);
  };

  const handlePayrollSubmit = () => {
    if (!selectedWorkerId) {
      setMessage("Please select a worker.");
      return;
    }

    fetch("/api/submit-payroll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payrollData, workerId: selectedWorkerId }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message || "Payroll data submitted successfully.");
        setPayrollData({
          payrollPeriod: "",
          payrollDate: "",
          grossAmount: "",
          netAmount: "",
          deductions: "",
          deductionAmount: "",
          totalAmount: "",
        });
        setSelectedWorkerId(null);
      })
      .catch((error) => {
        console.error("Error submitting payroll data:", error);
        setMessage("Error submitting payroll data.");
      });
  };

  return (
    <div className="payroll-container">
      <div>
        <input
          type="text"
          placeholder="Search worker by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="search-results">
        {searchResults.map((worker) => (
          <div
            key={worker.id}
            onClick={() => handleWorkerSelect(worker.id)}
            className="worker-name"
          >
            {worker.firstname} {worker.middlename ? worker.middlename : ""}{" "}
            {worker.lastname}
          </div>
        ))}
      </div>

      {selectedWorkerId && (
        <div className="payroll-inputs">
          <h3>Enter Payroll Data for Worker ID: {selectedWorkerId}</h3>
          <input
            type="text"
            placeholder="Payroll Period"
            value={payrollData.payrollPeriod}
            onChange={(e) => setPayrollData({ ...payrollData, payrollPeriod: e.target.value })}
          />
          <input
            type="text"
            placeholder="Payroll Date"
            value={payrollData.payrollDate}
            onChange={(e) => setPayrollData({ ...payrollData, payrollDate: e.target.value })}
          />
          <input
            type="number"
            placeholder="Gross Amount"
            value={payrollData.grossAmount}
            onChange={(e) => setPayrollData({ ...payrollData, grossAmount: e.target.value })}
          />
          <input
            type="number"
            placeholder="Net Amount"
            value={payrollData.netAmount}
            onChange={(e) => setPayrollData({ ...payrollData, netAmount: e.target.value })}
          />
          <input
            type="text"
            placeholder="Deductions"
            value={payrollData.deductions}
            onChange={(e) => setPayrollData({ ...payrollData, deductions: e.target.value })}
          />
          <input
            type="number"
            placeholder="Deduction Amount"
            value={payrollData.deductionAmount}
            onChange={(e) => setPayrollData({ ...payrollData, deductionAmount: e.target.value })}
          />
          <input
            type="number"
            placeholder="Total Amount"
            value={payrollData.totalAmount}
            onChange={(e) => setPayrollData({ ...payrollData, totalAmount: e.target.value })}
          />
          <button onClick={handlePayrollSubmit}>Submit Payroll</button>
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

export default Payroll;
