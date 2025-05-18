import React from "react";
import { Route, Routes } from "react-router-dom";
import UserNavBar from "../components/navBars/UserNavBar";
import Filters from "../components/FormsFilters/Filters";
import FilterNavBar from "../components/navBars/FilterNavBar";
import BasketNavBar from "../components/navBars/BasketNavBar";

// כל האתר בצורה שהמשתמש מחובר
const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserNavBar />}>
        <Route path="/shopList" element={<BasketNavBar />}></Route>
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

export default UserRoutes;
