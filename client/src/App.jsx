import { useSelector } from "react-redux";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Orders from "./pages/orders/Orders";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  const user = useSelector((state) => state.auth.userData);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user && user.userId ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={user && user.userId ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user && user.userId ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/orders"
            element={
              user && user.userId ? <Orders /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/profile"
            element={
              user && user.userId ? <Profile /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
