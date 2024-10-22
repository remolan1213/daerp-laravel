import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home"; // Adjust the path if necessary
import Profile from "./pages/Profile"; // Adjust the path if necessary
import Payroll from "./pages/Payroll"; // Adjust the path if necessary
import Settings from "./pages/Settings"; // Adjust the path if necessary
import Dataentry from "./pages/Dataentry";
import Logout from "./pages/Logout";
import "./style.css"; // Adjust the path if necessary for your styles
const App = () => {
  return (

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/dataentry" element={<Dataentry />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
  );
};

export default App;
