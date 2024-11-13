// import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home"; // Adjust the path if necessary
import Profile from "./pages/Profile"; // Adjust the path if necessary
import Payroll from "./pages/payroll/Payroll"; // Adjust the path if necessary
import PayrollAdd from "./pages/payroll/PayrollAdd"; // Adjust the path if necessary
import Settings from "./pages/Settings"; // Adjust the path if necessary
import PersonAdd from "./pages/person/PersonAdd";
import Logout from "./pages/Logout";
import Testing from "./pages/Testing";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/payrolladd" element={<PayrollAdd />} />
          <Route path="/personadd" element={<PersonAdd />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/testing" element={<Testing />} />
        </Route>
      </Routes>
  );
};

export default App;
