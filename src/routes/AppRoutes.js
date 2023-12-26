import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import { useState } from "react";
import { useSelector } from 'react-redux';
// Import other pages as needed

const AppRoutes = () => {
  let userPath = '';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useSelector((state) => state.user.userDetails);
  if(user != null){
    console.log(user);
    userPath = user.firstName.toLowerCase();
  }
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />
        <Route 
          path={`/${userPath}/*`}
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
