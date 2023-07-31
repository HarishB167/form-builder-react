import { NavLink } from "react-router-dom";
import "./navBar.css";

const NavBar = () => {
  const getNavLinkClass = ({ isActive }) =>
    isActive ? "active navBar_link" : "navBar_link";

  return (
    <div className="navBar">
      <div className="navBar__label">Form Builder</div>
      <NavLink to="/" className={getNavLinkClass}>
        Home
      </NavLink>
      <NavLink to="/builder" className={getNavLinkClass}>
        Form Builder
      </NavLink>
      <NavLink to="/fill" className={getNavLinkClass}>
        Fill
      </NavLink>
    </div>
  );
};

export default NavBar;
