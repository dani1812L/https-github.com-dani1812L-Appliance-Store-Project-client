import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Outlet } from "react-router-dom";

// הכרטיסיה העליונה בצורה שהמשתמש לא מחובר
const GuestNavBar = () => {
  return (
    <>
      <Navbar
        className={"w-100 position-sticky sticky-top"}
        bg="dark"
        data-bs-theme="dark"
      >
        <Container>
          <Nav className="me-auto">
            <Link className="text-white me-3 text-decoration-none" to="/">
              Home
            </Link>
            <Link className="text-white me-3 text-decoration-none" to="/signup">
              Signup
            </Link>
            <Link className="text-white me-3 text-decoration-none" to="/login">
              Login
            </Link>
          </Nav>
          <h2 className="text-info">Appliance Store App</h2>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default GuestNavBar;
