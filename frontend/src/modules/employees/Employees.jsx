import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../shared/api/client";

export default function Employees() {
  const [query, setQuery] = useState("");
  const { data, isLoading, error } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => (await api.get("/employees")).data
  });

  const filtered = useMemo(() => {
    const list = data ?? [];
    if (!query.trim()) return list;
    const q = query.toLowerCase();
    return list.filter((emp) =>
      [emp.employeeCode, emp.firstName, emp.lastName, emp.employmentType, emp.salaryType]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [data, query]);

  return (
    <div>
      <section className="page-head">
        <div>
          <h1 className="page-title">Employees</h1>
          <p className="page-description">View current personnel records and profile metadata.</p>
        </div>
      </section>

      <section className="card">
        <div className="card-header">
          <h2 className="card-title">Employee Directory</h2>
          <span className="badge">{filtered.length} records</span>
        </div>

        <div className="field" style={{ marginBottom: 14 }}>
          <label htmlFor="employee-search">Search</label>
          <input
            id="employee-search"
            className="input"
            placeholder="Name, employee code, or employment type"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {isLoading && <div className="status info">Loading employee records...</div>}
        {error && <div className="status error">Unable to fetch employees.</div>}

        {!isLoading && !error && filtered.length === 0 && (
          <div className="empty-state">No matching employee records found.</div>
        )}

        {!isLoading && !error && filtered.length > 0 && (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Code</th>
                  <th>Type</th>
                  <th>Salary Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.firstName} {emp.lastName}</td>
                    <td>{emp.employeeCode ?? "-"}</td>
                    <td>{emp.employmentType ?? "-"}</td>
                    <td>{emp.salaryType ?? "-"}</td>
                    <td>{emp.isActive ? "Active" : "Inactive"}</td>
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
