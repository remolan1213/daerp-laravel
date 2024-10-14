import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home'; // Adjust the path if necessary
import Profile from './components/Profile'; // Adjust the path if necessary
import Payroll from './components/Payroll'; // Adjust the path if necessary
import Settings from './components/Settings'; // Adjust the path if necessary

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />} >
              <Route index element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/payroll" element={<Payroll />} />
              <Route path="/settings" element={<Settings />} />
            </Route>  
        </Routes>
    );
};

export default App;
