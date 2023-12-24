import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import { useState } from "react";
// Import other pages as needed

const AppRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />
        <Route 
          path="/experiments" 
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
