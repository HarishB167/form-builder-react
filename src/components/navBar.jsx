import "./navBar.css";

const NavBar = () => {
  return (
    <div className="navBar">
      <div className="navBar__label">Form Builder</div>
      <a href="/" className="navBar_link">
        Home
      </a>
      <a href="/builder" className="navBar_link">
        Form Builder
      </a>
      <a href="/fill" className="navBar_link">
        Form Fill
      </a>
    </div>
  );
};

export default NavBar;
