// PayrollDisplay.js
const PayrollDisplay = ({ payrollData }) => {
    return (
      <div className="card text-center">
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
        <div className="total-data">
          <div className="total">
            Total:
            <div className="total-value">{payrollData.totalAmount}</div>
          </div>
        </div>
      </div>
    );
  };
  
  export default PayrollDisplay;
  