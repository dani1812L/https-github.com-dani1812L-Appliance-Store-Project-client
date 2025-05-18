import { Routes, Route } from "react-router-dom";
import GuestNavBar from "../components/navBars/GuestNavBar";
import FilterNavBar from "../components/navBars/FilterNavBar";
import Signup from "../components/FormsUsers/Signup";
import Login from "../components/FormsUsers/Login";
import Filters from "../components/FormsFilters/Filters";

// כל האתר בצורה שהמשתמש לא מחובר
const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GuestNavBar />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<FilterNavBar />}>
          <Route index element={<Filters filterCategory="all" />} />
          <Route
            path="/Smartphones"
            element={<Filters filterCategory="Smartphones" />}
          />
          <Route
            path="/laptops"
            element={<Filters filterCategory="laptops" />}
          />
          <Route
            path="/Headphones"
            element={<Filters filterCategory="Headphones" />}
          />
          <Route
            path="/Televisions"
            element={<Filters filterCategory="Televisions" />}
          />
          <Route
            path="/tablets"
            element={<Filters filterCategory="tablets" />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default MainRoutes;
