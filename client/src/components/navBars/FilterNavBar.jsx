import { useEffect, useState, useRef, useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Outlet } from "react-router-dom";
import { SearchBar } from "../navBars/SearchBar";
import StoreContext from "../Context/StoreContext";
import { PriceRangeFilter } from "./PriceRangeBar";

// הכרטיסיה שמתחת לכרטיסיה העליונה
const FilterNavBar = () => {
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);
  const { search, setSearch, setRange, range } = useContext(StoreContext);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const links = [
    "all",
    "Smartphones",
    "laptops",
    "Headphones",
    "Televisions",
    "tablets",
  ];
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY.current) {
        setShow(true);
      } else if (currentScrollY > lastScrollY.current) {
        setShow(false); // Scrolling down
      }

      // update the last scroll position
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const applyPriceRange = () => {
    setRange({ minPrice: minPrice, maxPrice: maxPrice });
  };
  return (
    <>
      <Navbar
        className={`w-100 ${show ? "position-fixed" : "d-none"}`}
        bg="dark"
        data-bs-theme="dark"
      >
        <Container>
          <Nav className="me-auto">
            {links.map((item) => (
              <Link
                key={item}
                className="text-white me-3 text-decoration-none"
                to={`/${item === "all" ? "" : item}`}
                aria-label={`Filter by ${item}`}
              >
                {item}
              </Link>
            ))}
          </Nav>
          <PriceRangeFilter
            minPrice={minPrice}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
            onMinPriceChange={setMinPrice}
            applyPriceRange={applyPriceRange}
          />
        </Container>
        <SearchBar onSearchChange={setSearch} searchTerm={search} />
      </Navbar>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default FilterNavBar;
