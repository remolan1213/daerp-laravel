import React, { useEffect, useState } from "react";
import Logo from "./Logo"; // Import the Logo component

import {
  faHome,
  faUser,
  faCog,
  faMoneyCheck,
  faSignOut,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";
import MenuItem from "./MenuItem"; // Import the MenuItem component
import Footer from "./Footer"; // Import the Footer component

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className={`menu-sidebar${isOpen ? " is-open" : ""}`} aria-label="Primary">
      <div className="menu-top">
        <Logo /> {/* Use Logo component */}
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={isOpen}
          aria-controls="primary-menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Menu
        </button>
      </div>
      <ul className="menu-list" id="primary-menu">
        <MenuItem to="/" icon={faHome} label="Home" onClick={() => setIsOpen(false)} />
        <MenuItem to="/profile" icon={faUser} label="Profile" onClick={() => setIsOpen(false)} />
        <MenuItem to="/payroll" icon={faMoneyCheck} label="Payroll" onClick={() => setIsOpen(false)} />
        <MenuItem to="/payrolladd" icon={faDatabase} label="Payroll Add" onClick={() => setIsOpen(false)} />
        <MenuItem to="/personadd" icon={faDatabase} label="Person Add" onClick={() => setIsOpen(false)} />
        <MenuItem to="/settings" icon={faCog} label="Settings" onClick={() => setIsOpen(false)} />
        <MenuItem to="/logout" icon={faSignOut} label="Logout" onClick={() => setIsOpen(false)} />
      </ul>
        
      <div className="menu-footer">
        <Footer />
      </div>
    </nav>
  );
};

export default Navigation;
