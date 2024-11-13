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
  return (
    <div className="menu-sidebar">
      <Logo /> {/* Use Logo component */}
        <MenuItem to="/" icon={faHome} label="Home" />
        <MenuItem to="/profile" icon={faUser} label="Profile" />
        <MenuItem to="/payroll" icon={faMoneyCheck} label="Payroll" />
        <MenuItem to="/payrolladd" icon={faDatabase} label="Payroll Add" />
        <MenuItem to="/personadd" icon={faDatabase} label="Person Add" />
        <MenuItem to="/settings" icon={faCog} label="Settings" />
        <MenuItem to="/logout" icon={faSignOut} label="Logout" />
        
      <div className="menu-footer">
        <Footer />
      </div>
    </div>
  );
};

export default Navigation;
