import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import { useSelector } from 'react-redux';
import AcceptInvite from "../pages/AcceptInvite";

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => state.user.isSuccess);
  const user = useSelector((state) => state.user.userDetails);
  const userPath = user && user.companyURLName ? user.companyURLName : 'default';

  console.log(`Logged in: ${isLoggedIn}`);
  console.log(`User Path: ${userPath}`);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path={`/${userPath}/*`}
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />} 
        />
        <Route path="/accept-invitation/:invitationToken" element={<AcceptInvite />} />
        {/* Fallback for any unmatched routes */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
