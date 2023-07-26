import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Form Builder</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/builder">Form Builder</Nav.Link>
          <Nav.Link href="/fill">Form Fill</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
