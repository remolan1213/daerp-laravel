// src/components/Layout.jsx
// import React from "react";
import { Outlet } from "react-router-dom"; // Outlet will render the matched child route component
import Navigation from "../components/Navigation"; // Create this component for your menu

const Layout = () => {
  return (
      <main>
        <div className="glass">
          <Navigation /> {/* Common Navigation Bar */}
          <div>
            <Outlet /> {/* This is where routed components will be rendered */}
          </div>
        </div>
      </main>
  );
};

export default Layout;

