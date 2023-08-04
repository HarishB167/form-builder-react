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
        Builder
      </NavLink>
      <NavLink to="/formResponses" className={getNavLinkClass}>
        Responses
      </NavLink>
    </div>
  );
};

export default NavBar;
