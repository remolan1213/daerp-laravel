import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { api } from "../../shared/api/client";

const currency = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 2
});

export default function Dashboard() {
  const { data: summary, isLoading, error } = useQuery({
    queryKey: ["analytics-summary"],
    queryFn: async () => (await api.get("/analytics/summary")).data
  });

  const totals = summary?.totals ?? {};
  const statutory = summary?.statutory ?? {};
  const recentPayroll = summary?.recentPayroll ?? [];

  return (
    <div>
      <section className="page-head">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-description">
            Operational summary across staffing, attendance, and payroll execution.
          </p>
        </div>
      </section>

      <section className="grid grid-3">
        <article className="card">
          <div className="card-header">
            <div className="card-title">Employees</div>
            <span className="badge">Headcount</span>
          </div>
          {isLoading ? (
            <div className="skeleton" />
          ) : (
            <>
              <div className="metric-value">{summary?.employeesCount ?? 0}</div>
              <div className="metric-label">active employee records</div>
            </>
          )}
        </article>

        <article className="card">
          <div className="card-header">
            <div className="card-title">Open Payroll Periods</div>
            <span className="badge">Timeline</span>
          </div>
          {isLoading ? (
            <div className="skeleton" />
          ) : (
            <>
              <div className="metric-value">{summary?.periodsCount ?? 0}</div>
              <div className="metric-label">periods not finalized</div>
            </>
          )}
        </article>

        <article className="card">
          <div className="card-header">
            <div className="card-title">Net Payroll Released</div>
            <span className="badge">PHP</span>
          </div>
          {isLoading ? (
            <div className="skeleton" />
          ) : (
            <>
              <div className="metric-value" style={{ fontSize: 26 }}>
                {currency.format(Number(totals.netPay ?? 0))}
              </div>
              <div className="metric-label">total net payroll posted</div>
            </>
          )}
        </article>
      </section>

      <section className="grid grid-3" style={{ marginTop: 16 }}>
        <article className="card">
          <div className="card-header">
            <h3 className="card-title">SSS Verification</h3>
            <span className="badge">Statutory</span>
          </div>
          <p className="metric-label">Employee Share</p>
          <div className="metric-value" style={{ fontSize: 24 }}>
            {currency.format(Number(statutory.sssEmployee ?? 0))}
          </div>
          <p className="metric-label" style={{ marginTop: 8 }}>Employer Share</p>
          <div className="metric-value" style={{ fontSize: 22 }}>
            {currency.format(Number(statutory.sssEmployer ?? 0))}
          </div>
        </article>

        <article className="card">
          <div className="card-header">
            <h3 className="card-title">PhilHealth Verification</h3>
            <span className="badge">Statutory</span>
          </div>
          <p className="metric-label">Employee Share</p>
          <div className="metric-value" style={{ fontSize: 24 }}>
            {currency.format(Number(statutory.philhealthEmployee ?? 0))}
          </div>
          <p className="metric-label" style={{ marginTop: 8 }}>Employer Share</p>
          <div className="metric-value" style={{ fontSize: 22 }}>
            {currency.format(Number(statutory.philhealthEmployer ?? 0))}
          </div>
        </article>

        <article className="card">
          <div className="card-header">
            <h3 className="card-title">Pag-IBIG Verification</h3>
            <span className="badge">Statutory</span>
          </div>
          <p className="metric-label">Employee Share</p>
          <div className="metric-value" style={{ fontSize: 24 }}>
            {currency.format(Number(statutory.pagibigEmployee ?? 0))}
          </div>
          <p className="metric-label" style={{ marginTop: 8 }}>Employer Share</p>
          <div className="metric-value" style={{ fontSize: 22 }}>
            {currency.format(Number(statutory.pagibigEmployer ?? 0))}
          </div>
        </article>
      </section>

      <section className="grid grid-2" style={{ marginTop: 16 }}>
        <article className="card">
          <div className="card-header">
            <h3 className="card-title">Tax and Deductions</h3>
          </div>
          <div className="metric-label">Withholding Tax</div>
          <div className="metric-value" style={{ fontSize: 24 }}>
            {currency.format(Number(totals.withholdingTax ?? 0))}
          </div>
          <div className="metric-label" style={{ marginTop: 8 }}>Total Deductions</div>
          <div className="metric-value" style={{ fontSize: 22 }}>
            {currency.format(Number(totals.totalDeductions ?? 0))}
          </div>
        </article>

        <article className="card">
          <div className="card-header">
            <h3 className="card-title">Gross Payroll</h3>
          </div>
          <div className="metric-value">{currency.format(Number(totals.grossPay ?? 0))}</div>
          <div className="metric-label">total gross compensation</div>
        </article>
      </section>

      <section className="card" style={{ marginTop: 16 }}>
        <div className="card-header">
          <h2 className="card-title">Quick Actions</h2>
        </div>
        <div className="inline-actions">
          <Link className="button primary" to="/employees">Manage Employees</Link>
          <Link className="button secondary" to="/attendance">Record Attendance</Link>
          <Link className="button secondary" to="/payroll">Run Payroll</Link>
        </div>
        {error && <div className="status error">Analytics endpoint unavailable. Verify backend `/analytics/summary`.</div>}
      </section>

      <section className="card" style={{ marginTop: 16 }}>
        <div className="card-header">
          <h2 className="card-title">Recent Payroll Runs</h2>
          <span className="badge">{recentPayroll.length}</span>
        </div>
        {recentPayroll.length === 0 ? (
          <div className="empty-state">No payroll entries available.</div>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Period</th>
                  <th>Gross</th>
                  <th>Deductions</th>
                  <th>Net</th>
                </tr>
              </thead>
              <tbody>
                {recentPayroll.map((row) => (
                  <tr key={row.id}>
                    <td>{row.employee?.employeeCode} - {row.employee?.firstName} {row.employee?.lastName}</td>
                    <td>{new Date(row.period?.startDate).toLocaleDateString()} - {new Date(row.period?.endDate).toLocaleDateString()}</td>
                    <td>{currency.format(Number(row.grossPay ?? 0))}</td>
                    <td>{currency.format(Number(row.totalDeductions ?? 0))}</td>
                    <td>{currency.format(Number(row.netPay ?? 0))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
