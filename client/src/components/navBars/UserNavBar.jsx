import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Outlet } from "react-router-dom";
import { setUserDetails } from "../../services/util";
import { useNavigate } from "react-router-dom";
import { LOGOUT_URL } from "../../constant/urls";
import { apiGet } from "../../services/apiRequest";
import UserContext from "../Context/UserContext";

// הכרטיסיה העליונה בצורה שהמשתמש מחובר
const userNavBar = () => {
  const nav = useNavigate();
  const { setUser } = useContext(UserContext);
  
  // התנתקות של משתמש
  const logoutClick = async (e) => {
    e.preventDefault();
    await apiGet(LOGOUT_URL);
    setUser({});
    setUserDetails({});
    nav("/");
  };
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
            <Link
              className="text-white me-3 text-decoration-none"
              to="/shopList"
            >
              My shop list
            </Link>
            <button
              onClick={logoutClick}
              type="submit"
              className="btn btn-primary btn-sm"
            >
              Logout
            </button>
          </Nav>
          <h2 className="text-info">Appliance Store App</h2>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default userNavBar;
