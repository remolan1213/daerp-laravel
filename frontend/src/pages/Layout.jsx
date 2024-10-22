// src/components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom"; // Outlet will render the matched child route component
import Navigation from "./Navigation"; // Create this component for your menu

const Layout = () => {
  return (
    <div>
      <main>
        <div className="glass">
          <Navigation /> {/* Common Navigation Bar */}
          <div className="content">
            <Outlet /> {/* This is where routed components will be rendered */}
          </div>
        </div>
      </main>
  
    </div>
  );
};

export default Layout;
