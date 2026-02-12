import { Routes, Route, Navigate, NavLink, useNavigate } from "react-router-dom";
import Login from "./modules/auth/Login";
import Dashboard from "./modules/dashboard/Dashboard";
import Employees from "./modules/employees/Employees";
import Payroll from "./modules/payroll/Payroll";
import Attendance from "./modules/attendance/Attendance";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", badge: "DB" },
  { to: "/employees", label: "Employees", badge: "EM" },
  { to: "/attendance", label: "Attendance", badge: "AT" },
  { to: "/payroll", label: "Payroll", badge: "PR" }
];

function Layout({ children }) {
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <div className="sidebar-title">DAERP</div>
          <div className="sidebar-subtitle">Payroll Operations</div>
        </div>
        <nav className="nav-list">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <span className="nav-kicker">{item.badge}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <div>
            <div className="topbar-title">Enterprise Payroll Console</div>
            <div className="topbar-sub">Monitoring, Attendance, and Payroll Runs</div>
          </div>
          <button
            className="button secondary"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </header>

        <main className="content-area">{children}</main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
      <Route path="/employees" element={<PrivateRoute><Layout><Employees /></Layout></PrivateRoute>} />
      <Route path="/attendance" element={<PrivateRoute><Layout><Attendance /></Layout></PrivateRoute>} />
      <Route path="/payroll" element={<PrivateRoute><Layout><Payroll /></Layout></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
