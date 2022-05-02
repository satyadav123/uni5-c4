import { useSelector, useStore } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import { Home } from "./components/home";
import { Login } from "./components/login";
import { Logout } from "./components/logout";
import { NewOrder } from "./components/newOrder";
import { Orders } from "./components/Orders";
import { ProtectedRoute } from "./components/ProtextRoute";

function App() {

  const auth = useSelector(store => store.auth);
  return (
    <div className="App">
      <div>
        <Link className="nav-home" to="/">
          Home
        </Link>
        {/* Show either login or logout below */}
        {auth.isLoggedIn ? (
          <Link className="nav-logout" to="/logout">
            Logout
          </Link>
        ) : (
          <Link className="nav-login" to="/login">
            Login
          </Link>
        )}
      </div>

      <Routes>
        {/* Routes are as follows:
        Route      Component
        /           Home
        /login      Login
        /logout     Logout
        /orders     Orders    Protected
        /neworder   NewOrder  Protected
        */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/neworder"
          element={
            <ProtectedRoute>
              <NewOrder />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
