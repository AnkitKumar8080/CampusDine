import { useState } from "react";
import "./App.css";
import Home from "./pages/home/Home";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";

function App() {
  const user = useSelector((state) => state.auth.userData);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              user && user.userId ? <Home /> : <Navigate to="/admin-login" />
            }
          />

          <Route
            path="/admin-login"
            element={user && user.userId ? <Navigate to="/" /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
