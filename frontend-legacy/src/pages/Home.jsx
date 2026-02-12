import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase, faMoneyCheck, faUser } from "@fortawesome/free-solid-svg-icons";
import PageHeader from "../components/PageHeader";
import PageSection from "../components/PageSection";
import CardGrid from "../components/CardGrid";

const Home = () => {
  const [statsState, setStatsState] = useState({
    loading: true,
    error: null,
    data: [],
  });

  useEffect(() => {
    let isMounted = true;

    const normalizeList = (payload) => {
      if (!payload) return [];
      if (Array.isArray(payload)) return payload;
      if (Array.isArray(payload.data)) return payload.data;
      if (Array.isArray(payload.items)) return payload.items;
      return payload ? [payload] : [];
    };

    const fetchJson = async (url) => {
      if (!url) return null;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }
      return response.json();
    };

    const loadStats = async () => {
      try {
        const workersUrl = import.meta.env.VITE_WORKERS;
        const payrollsUrl = import.meta.env.VITE_PAYROLLS || "/api/payrolls";

        const [workersRes, payrollsRes] = await Promise.all([
          fetchJson(workersUrl),
          fetchJson(payrollsUrl),
        ]);

        const workers = normalizeList(workersRes);
        const payrolls = normalizeList(payrollsRes);

        const workerCount = workers.length;
        const payrollRuns = payrolls.length;
        const totalPayout = payrolls.reduce((sum, item) => {
          const value = Number(item.totalAmount ?? item.netAmount ?? 0);
          return sum + (Number.isFinite(value) ? value : 0);
        }, 0);

        const formattedPayout = totalPayout
          ? totalPayout.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            })
          : "—";

        const data = [
          {
            label: "Active Workers",
            value: workerCount ? String(workerCount) : "—",
            trend: workerCount ? "All currently active" : "No worker data",
          },
          {
            label: "Payroll Runs",
            value: payrollRuns ? String(payrollRuns) : "—",
            trend: payrollRuns ? "Latest run available" : "No payroll data",
          },
          {
            label: "Total Payout",
            value: formattedPayout,
            trend: totalPayout ? "Across recorded runs" : "Awaiting totals",
          },
        ];

        if (isMounted) {
          setStatsState({ loading: false, error: null, data });
        }
      } catch (error) {
        if (isMounted) {
          setStatsState({
            loading: false,
            error: "Unable to load dashboard stats.",
            data: [
              { label: "Active Workers", value: "—", trend: "Unavailable" },
              { label: "Payroll Runs", value: "—", trend: "Unavailable" },
              { label: "Total Payout", value: "—", trend: "Unavailable" },
            ],
          });
        }
      }
    };

    loadStats();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <PageHeader
        title="Welcome Back"
        subtitle="Quick access to your payroll tools and recent activity."
      />
      <PageSection title="Dashboard" subtitle="Highlights from your latest activity.">
        <div className="stat-grid">
          {statsState.loading &&
            Array.from({ length: 3 }).map((_, index) => (
              <div key={`stat-skel-${index}`} className="card stat-card">
                <div className="card-body">
                  <div className="skeleton skeleton-line w-40"></div>
                  <div className="skeleton skeleton-line w-60"></div>
                  <div className="skeleton skeleton-line w-50"></div>
                </div>
              </div>
            ))}
          {!statsState.loading &&
            statsState.data.map((item) => (
              <div key={item.label} className="card stat-card">
                <div className="card-body">
                  <div className="stat-label">{item.label}</div>
                  <div className="stat-value">{item.value}</div>
                  <div className="stat-trend">{item.trend}</div>
                </div>
              </div>
            ))}
        </div>
        {statsState.error && (
          <div className="empty-state">
            {statsState.error}
          </div>
        )}
      </PageSection>
      <PageSection title="Getting Started" subtitle="Choose a task to continue.">
        <CardGrid>
          <div className="card action-card">
            <div className="card-body">
              <div className="action-icon">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <h3 className="action-title">Add Person</h3>
              <p className="action-text">
                Create a new worker profile with ID and bank details.
              </p>
              <Link to="/personadd" className="btn btn-primary btn-sm">
                Start
              </Link>
            </div>
          </div>
          <div className="card action-card">
            <div className="card-body">
              <div className="action-icon">
                <FontAwesomeIcon icon={faDatabase} />
              </div>
              <h3 className="action-title">Add Payroll</h3>
              <p className="action-text">
                Capture a payroll entry and compute totals.
              </p>
              <Link to="/payrolladd" className="btn btn-primary btn-sm">
                Start
              </Link>
            </div>
          </div>
          <div className="card action-card">
            <div className="card-body">
              <div className="action-icon">
                <FontAwesomeIcon icon={faMoneyCheck} />
              </div>
              <h3 className="action-title">View Payroll</h3>
              <p className="action-text">
                Review payroll summaries and client totals.
              </p>
              <Link to="/payroll" className="btn btn-outline-primary btn-sm">
                Open
              </Link>
            </div>
          </div>
        </CardGrid>
      </PageSection>
    </div>
  );
};

export default Home;
