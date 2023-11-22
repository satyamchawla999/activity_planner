// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"; // Import Navigate
import { useSelector } from "react-redux";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/DashBoard";
import Adoption from "./pages/Adoption";
import Navbar from "./components/Navbar";
import SignupPage from './pages/SignupPage'
import PetInfo from "./pages/PetInfo";
import PetCarePage from "./pages/Instructions";
import Helpline from "./pages/Helpline";

const Main = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      {isAuthenticated && <Navbar/>}
      <Routes>
        <Route
          path="/signin"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignupPage />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />}
        />
        <Route
          path="/helpline"
          element={isAuthenticated ? <Helpline /> : <Navigate to="/signin" />}
        />
        <Route
          path="/instructions"
          element={isAuthenticated ? <PetCarePage /> : <Navigate to="/signin" />}
        />
        <Route
          path="/adoption"
          element={isAuthenticated ? <Adoption /> : <Navigate to="/signin" />}
        />
        <Route
          path="/pet-info/:id"
          element={isAuthenticated ? <PetInfo /> : <Navigate to="/signin" />}
        />
        
        <Route index element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
};

export default Main;
