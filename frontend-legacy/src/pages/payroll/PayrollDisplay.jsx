// PayrollDisplay.js
import React from "react";
import PageHeader from "../../components/PageHeader";
import PageSection from "../../components/PageSection";
const PayrollDisplay = ({ payrollData, isLoading, error }) => {
  const formatAmount = (value) =>
    Number(value || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

  const hasData = Boolean(payrollData && payrollData.name);

  return (
    <div>
      <PageHeader
        title="Payroll Overview"
        subtitle="Review period details and payout totals."
      />
      <PageSection title="Payroll Summary" subtitle="Primary payout and client details.">
        {isLoading && (
          <div className="card">
            <div className="card-body">
              <div className="skeleton skeleton-line w-30"></div>
              <div className="skeleton skeleton-line w-80"></div>
              <div className="skeleton skeleton-line w-60"></div>
            </div>
          </div>
        )}
        {!isLoading && error && (
          <div className="empty-state">
            {error}
          </div>
        )}
        {!isLoading && !error && !hasData && (
          <div className="empty-state">
            No payroll data is available yet.
          </div>
        )}
        {!isLoading && !error && hasData && (
          <div className="card">
            <div className="card-title-bar">Payroll Summary</div>
            <div className="table-wrap">
              <table className="payroll-table">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td data-label="Name">{payrollData.name}</td>
                    <th>Bank Account</th>
                    <td data-label="Bank Account">{payrollData.bankAccount}</td>
                    <th>ID Number</th>
                    <td data-label="ID Number">{payrollData.idNumber}</td>
                  </tr>
                  <tr>
                    <th>Payroll Period</th>
                    <td data-label="Payroll Period">{payrollData.payrollPeriod}</td>
                    <th>Department</th>
                    <td data-label="Department">{payrollData.department}</td>
                    <th>Payroll Date</th>
                    <td data-label="Payroll Date">{payrollData.payrollDate}</td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <th>Client</th>
                    <td data-label="Client">{payrollData.client}</td>
                    <th>Gross</th>
                    <td data-label="Gross" className="spacer">
                      {formatAmount(payrollData.grossAmount)}
                    </td>
                    <th>Net</th>
                    <td data-label="Net" className="spacer">
                      {formatAmount(payrollData.netAmount)}
                    </td>
                  </tr>
                  {payrollData.client2 !== "" && (
                    <tr>
                      <th></th>
                      <td data-label="Client 2">{payrollData.client2}</td>
                      <th></th>
                      <td data-label="Gross 2" className="spacer">
                        {formatAmount(payrollData.grossAmount2)}
                      </td>
                      <th></th>
                      <td data-label="Net 2" className="spacer">
                        {formatAmount(payrollData.netAmount2)}
                      </td>
                      <td className="empty-cell"></td>
                    </tr>
                  )}
                  <tr></tr>
                  <tr>
                    <td className="empty-cell"></td>
                    <td className="empty-cell"></td>
                    <td className="empty-cell"></td>
                    <td className="empty-cell"></td>
                    <th>Deductions</th>
                    <td data-label="Deductions">{payrollData.deductions}</td>
                  </tr>
                  <tr>
                    <th>Rate</th>
                    <td data-label="Rate" className="spacer">{formatAmount(payrollData.rate)}</td>
                    <td className="empty-cell"></td>
                    <td className="empty-cell"></td>
                    <th>Deduction Amount</th>
                    <td data-label="Deduction Amount" className="spacer">{formatAmount(payrollData.deductionAmount)}</td>
                  </tr>
                  <tr>
                    <td className="empty-cell"></td>
                    <td className="empty-cell"></td>
                    <td className="empty-cell"></td>
                    <td className="empty-cell"></td>
                    <th>Total Amount</th>
                    <td data-label="Total Amount" className="spacer">
                      {formatAmount(payrollData.totalAmount)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="payroll-cards">
              <div className="payroll-card">
                <h3>Identity</h3>
                <div className="payroll-row">
                  <span className="payroll-label">Name</span>
                  <span className="payroll-value">{payrollData.name}</span>
                </div>
                <div className="payroll-row">
                  <span className="payroll-label">ID Number</span>
                  <span className="payroll-value">{payrollData.idNumber}</span>
                </div>
                <div className="payroll-row">
                  <span className="payroll-label">Department</span>
                  <span className="payroll-value">{payrollData.department}</span>
                </div>
                <div className="payroll-row">
                  <span className="payroll-label">Bank Account</span>
                  <span className="payroll-value">{payrollData.bankAccount}</span>
                </div>
              </div>

              <div className="payroll-card">
                <h3>Period</h3>
                <div className="payroll-row">
                  <span className="payroll-label">Payroll Period</span>
                  <span className="payroll-value">{payrollData.payrollPeriod}</span>
                </div>
                <div className="payroll-row">
                  <span className="payroll-label">Payroll Date</span>
                  <span className="payroll-value">{payrollData.payrollDate}</span>
                </div>
              </div>

              <div className="payroll-card">
                <h3>Client Earnings</h3>
                <div className="payroll-row">
                  <span className="payroll-label">Client</span>
                  <span className="payroll-value">{payrollData.client}</span>
                </div>
                <div className="payroll-row">
                  <span className="payroll-label">Gross</span>
                  <span className="payroll-value">{formatAmount(payrollData.grossAmount)}</span>
                </div>
                <div className="payroll-row">
                  <span className="payroll-label">Net</span>
                  <span className="payroll-value">{formatAmount(payrollData.netAmount)}</span>
                </div>
                {payrollData.client2 !== "" && (
                  <>
                    <div className="payroll-row">
                      <span className="payroll-label">Client 2</span>
                      <span className="payroll-value">{payrollData.client2}</span>
                    </div>
                    <div className="payroll-row">
                      <span className="payroll-label">Gross 2</span>
                      <span className="payroll-value">{formatAmount(payrollData.grossAmount2)}</span>
                    </div>
                    <div className="payroll-row">
                      <span className="payroll-label">Net 2</span>
                      <span className="payroll-value">{formatAmount(payrollData.netAmount2)}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="payroll-card">
                <h3>Totals</h3>
                <div className="payroll-row">
                  <span className="payroll-label">Rate</span>
                  <span className="payroll-value">{formatAmount(payrollData.rate)}</span>
                </div>
                <div className="payroll-row">
                  <span className="payroll-label">Deductions</span>
                  <span className="payroll-value">{payrollData.deductions}</span>
                </div>
                <div className="payroll-row">
                  <span className="payroll-label">Deduction Amount</span>
                  <span className="payroll-value">{formatAmount(payrollData.deductionAmount)}</span>
                </div>
                <div className="payroll-row">
                  <span className="payroll-label">Total Amount</span>
                  <span className="payroll-value">{formatAmount(payrollData.totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </PageSection>
    </div>
  );
};

export default PayrollDisplay;
