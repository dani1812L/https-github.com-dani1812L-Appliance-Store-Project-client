import "./App.css";
import MainRoutes from "./routes/MainRoutes";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./components/Context/UserContext";
import { useEffect, useMemo, useState } from "react";
import UserRoutes from "./routes/UserRoutes";
import StoreContext from "./components/Context/StoreContext";
import { getUserDetails, setUserDetails } from "./services/util";

// מחזיק בתוכו את כל האתר
function App() {
  let [user, setUser] = useState(getUserDetails());
  let [search, setSearch] = useState('');
  let [range, setRange] = useState(0);
  const [basket, setBasket] = useState([])

  return (
    <UserContext.Provider value={{user, setUser}}>
      <StoreContext.Provider value={{search, range, basket, setSearch, setRange, setBasket}}>
        <BrowserRouter>
          {user.auth ? <UserRoutes /> : <MainRoutes />}
        </BrowserRouter>
      </StoreContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
