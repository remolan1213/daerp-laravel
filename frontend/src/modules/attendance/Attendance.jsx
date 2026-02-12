import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../shared/api/client";

export default function Attendance() {
  const queryClient = useQueryClient();
  const [employeeId, setEmployeeId] = useState("");
  const [hours, setHours] = useState(8);
  const [overtimeHours, setOvertimeHours] = useState(0);
  const [nightHours, setNightHours] = useState(0);
  const [isRestDay, setIsRestDay] = useState(false);
  const [holidayType, setHolidayType] = useState("");
  const [status, setStatus] = useState("");

  const { data: employees, isLoading, error } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => (await api.get("/employees")).data
  });

  const mutation = useMutation({
    mutationFn: async () => api.post("/attendance", {
      employeeId,
      date: new Date().toISOString(),
      hoursWorked: hours,
      overtimeHours,
      nightHours,
      isRestDay,
      holidayType: holidayType || null
    }),
    onSuccess: () => {
      setStatus("Attendance record saved.");
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
    },
    onError: () => setStatus("Failed to save attendance.")
  });

  const submit = () => {
    if (!employeeId) {
      setStatus("Select an employee before submitting.");
      return;
    }
    setStatus("");
    mutation.mutate();
  };

  return (
    <div>
      <section className="page-head">
        <div>
          <h1 className="page-title">Attendance</h1>
          <p className="page-description">Log daily attendance and shift adjustments.</p>
        </div>
      </section>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">New Attendance Entry</h2>
          <span className="badge">Daily Record</span>
        </div>

        {isLoading && <div className="status info">Loading employees...</div>}
        {error && <div className="status error">Unable to fetch employee list.</div>}

        <div className="form-grid">
          <div className="field">
            <label htmlFor="employee">Employee</label>
            <select
              id="employee"
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
            <label htmlFor="hours">Hours Worked</label>
            <input
              id="hours"
              className="input"
              type="number"
              min="0"
              step="0.25"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
            />
          </div>

          <div className="field">
            <label htmlFor="overtime-hours">Overtime Hours</label>
            <input
              id="overtime-hours"
              className="input"
              type="number"
              min="0"
              step="0.25"
              value={overtimeHours}
              onChange={(e) => setOvertimeHours(Number(e.target.value))}
            />
          </div>

          <div className="field">
            <label htmlFor="night-hours">Night Hours</label>
            <input
              id="night-hours"
              className="input"
              type="number"
              min="0"
              step="0.25"
              value={nightHours}
              onChange={(e) => setNightHours(Number(e.target.value))}
            />
          </div>

          <div className="field">
            <label htmlFor="holiday-type">Holiday Type</label>
            <input
              id="holiday-type"
              className="input"
              placeholder="Optional: regular/special"
              value={holidayType}
              onChange={(e) => setHolidayType(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="rest-day">Rest Day</label>
            <select
              id="rest-day"
              className="select"
              value={isRestDay ? "yes" : "no"}
              onChange={(e) => setIsRestDay(e.target.value === "yes")}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
        </div>

        <div className="inline-actions" style={{ marginTop: 16 }}>
          <button className="button primary" onClick={submit} disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Save Attendance"}
          </button>
          <button
            className="button ghost"
            onClick={() => {
              setHours(8);
              setOvertimeHours(0);
              setNightHours(0);
              setHolidayType("");
              setIsRestDay(false);
              setStatus("");
            }}
          >
            Reset
          </button>
        </div>

        {status && (
          <div className={`status ${mutation.isError ? "error" : "success"}`}>
            {status}
          </div>
        )}
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 className="card-title">Employee List</h3>
        {!employees?.length ? (
          <div className="empty-state" style={{ marginTop: 14 }}>
            No employee data found.
          </div>
        ) : (
          <div className="table-wrap" style={{ marginTop: 14 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {employees?.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.firstName} {emp.lastName}</td>
                    <td>{emp.employeeCode ?? "-"}</td>
                    <td>{emp.employmentType ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
