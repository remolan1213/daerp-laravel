import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "../../shared/api/client";

const currency = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP"
});

export default function Payroll() {
  const [employeeId, setEmployeeId] = useState("");
  const [periodId, setPeriodId] = useState("");
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState("");

  const { data: employees, isLoading: employeesLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => (await api.get("/employees")).data
  });

  const { data: periods, isLoading: periodsLoading } = useQuery({
    queryKey: ["periods"],
    queryFn: async () => (await api.get("/periods")).data
  });

  const mutation = useMutation({
    mutationFn: async () =>
      (await api.post("/payroll/run", { employeeId, periodId })).data,
    onSuccess: (data) => {
      setResult(data);
      setStatus("Payroll generated successfully.");
    },
    onError: () => {
      setResult(null);
      setStatus("Failed to run payroll. Verify employee and period values.");
    }
  });

  const runPayroll = () => {
    if (!employeeId || !periodId) {
      setStatus("Select both employee and payroll period.");
      return;
    }
    setStatus("");
    mutation.mutate();
  };

  return (
    <div>
      <section className="page-head">
        <div>
          <h1 className="page-title">Payroll</h1>
          <p className="page-description">Execute payroll computation for a selected employee and period.</p>
        </div>
      </section>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Run Payroll</h2>
          <span className="badge">Payroll Engine</span>
        </div>

        <div className="form-grid">
          <div className="field">
            <label htmlFor="employee-id">Employee</label>
            <select
              id="employee-id"
              className="select"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            >
              <option value="">Select Employee</option>
              {employees?.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.firstName} {emp.lastName}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="period-id">Payroll Period</label>
            <select
              id="period-id"
              className="select"
              value={periodId}
              onChange={(e) => setPeriodId(e.target.value)}
            >
              <option value="">Select Period</option>
              {periods?.map((p) => (
                <option key={p.id} value={p.id}>
                  {new Date(p.startDate).toLocaleDateString()} - {new Date(p.endDate).toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="inline-actions" style={{ marginTop: 16 }}>
          <button className="button primary" onClick={runPayroll} disabled={mutation.isPending}>
            {mutation.isPending ? "Running..." : "Run Payroll"}
          </button>
          <button
            className="button ghost"
            onClick={() => {
              setEmployeeId("");
              setPeriodId("");
              setResult(null);
              setStatus("");
            }}
          >
            Clear
          </button>
        </div>

        {(employeesLoading || periodsLoading) && (
          <div className="status info">Loading references...</div>
        )}

        {status && (
          <div className={`status ${mutation.isError ? "error" : "success"}`}>{status}</div>
        )}
      </div>

      {result && (
        <div className="grid grid-3" style={{ marginTop: 16 }}>
          <article className="card">
            <div className="metric-value" style={{ fontSize: 24 }}>
              {currency.format(Number(result.grossPay ?? 0))}
            </div>
            <div className="metric-label">Gross Pay</div>
          </article>
          <article className="card">
            <div className="metric-value" style={{ fontSize: 24 }}>
              {currency.format(Number(result.totalDeductions ?? 0))}
            </div>
            <div className="metric-label">Total Deductions</div>
          </article>
          <article className="card">
            <div className="metric-value" style={{ fontSize: 24 }}>
              {currency.format(Number(result.netPay ?? 0))}
            </div>
            <div className="metric-label">Net Pay</div>
          </article>
        </div>
      )}

      {result && (
        <div className="grid grid-3" style={{ marginTop: 16 }}>
          <article className="card">
            <div className="card-header">
              <h3 className="card-title">SSS</h3>
            </div>
            <div className="metric-label">Employee Share</div>
            <div className="metric-value" style={{ fontSize: 22 }}>
              {currency.format(Number(result.sssEmployee ?? 0))}
            </div>
            <div className="metric-label" style={{ marginTop: 6 }}>Employer Share</div>
            <div className="metric-value" style={{ fontSize: 20 }}>
              {currency.format(Number(result.sssEmployer ?? 0))}
            </div>
          </article>

          <article className="card">
            <div className="card-header">
              <h3 className="card-title">PhilHealth</h3>
            </div>
            <div className="metric-label">Employee Share</div>
            <div className="metric-value" style={{ fontSize: 22 }}>
              {currency.format(Number(result.philhealthEmployee ?? 0))}
            </div>
            <div className="metric-label" style={{ marginTop: 6 }}>Employer Share</div>
            <div className="metric-value" style={{ fontSize: 20 }}>
              {currency.format(Number(result.philhealthEmployer ?? 0))}
            </div>
          </article>

          <article className="card">
            <div className="card-header">
              <h3 className="card-title">Pag-IBIG</h3>
            </div>
            <div className="metric-label">Employee Share</div>
            <div className="metric-value" style={{ fontSize: 22 }}>
              {currency.format(Number(result.pagibigEmployee ?? 0))}
            </div>
            <div className="metric-label" style={{ marginTop: 6 }}>Employer Share</div>
            <div className="metric-value" style={{ fontSize: 20 }}>
              {currency.format(Number(result.pagibigEmployer ?? 0))}
            </div>
          </article>
        </div>
      )}

      {result && (
        <div className="card" style={{ marginTop: 16 }}>
          <div className="card-header">
            <h3 className="card-title">Deduction Verification</h3>
          </div>
          <div className="table-wrap">
            <table className="table">
              <tbody>
                <tr>
                  <th>Withholding Tax</th>
                  <td>{currency.format(Number(result.withholdingTax ?? 0))}</td>
                </tr>
                <tr>
                  <th>SSS Employee</th>
                  <td>{currency.format(Number(result.sssEmployee ?? 0))}</td>
                </tr>
                <tr>
                  <th>PhilHealth Employee</th>
                  <td>{currency.format(Number(result.philhealthEmployee ?? 0))}</td>
                </tr>
                <tr>
                  <th>Pag-IBIG Employee</th>
                  <td>{currency.format(Number(result.pagibigEmployee ?? 0))}</td>
                </tr>
                <tr>
                  <th>Total Deductions</th>
                  <td>{currency.format(Number(result.totalDeductions ?? 0))}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
