// PayrollDisplay.js
const PayrollDisplay = ({ payrollData }) => {
  return (
    <div className="card text-center">
      <div className="card-title-bar">Payroll</div>
      <table className="payroll-table">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{payrollData.name}</td>
            <th>Bank Account</th>
            <td>{payrollData.bankAccount}</td>
            <th>ID Number</th>
            <td>{payrollData.idNumber}</td>
          </tr>
          <tr>
            <th>Payroll Period</th>
            <td>{payrollData.payrollPeriod}</td>
            <th>Department</th>
            <td>{payrollData.department}</td>
            <th>Payroll Date</th>
            <td>{payrollData.payrollDate}</td>
          </tr>
          <tr></tr>
          <tr>
            <th>Client</th>
            <td>{payrollData.client}</td>
            <th>Gross</th>
            <td className="spacer">{payrollData.grossAmount}</td>
            <th>Net</th>
            <td className="spacer">{payrollData.netAmount}</td>
          </tr>
          <tr>
            <th></th>
            <td>{payrollData.client2}</td>
            <th></th>
            <td className="spacer">{payrollData.grossAmount2}</td>
            <th></th>
            <td className="spacer">{payrollData.netAmount2}</td>
            <td></td>
          </tr>
          <tr></tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <th>Deductions</th>
            <td>{payrollData.deductions}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <th>Amount</th>
            <td className="spacer">{payrollData.deductionAmount}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <th>Total Amount</th>
            <td className="spacer">{payrollData.totalAmount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PayrollDisplay;
