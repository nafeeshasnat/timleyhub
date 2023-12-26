import React, { useState } from 'react';
import optimizeLogo from '../icons/optimize-logo.png';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
// Import any additional components you might need

const LoginPage = () => {
  
  const [showLoginForm, setShowLoginForm] = useState(true); // State to control form display

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm); // Toggle between login and registration form
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <a href="/"><img
            className="mx-auto h-15 w-auto"
            src={optimizeLogo}
            alt="Your Company"
          /></a>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in or Register
          </h2>
        </div>

        {showLoginForm ? (
          <LoginForm onToggleForm={toggleForm} />
        ) : (
          <RegistrationForm onToggleForm={toggleForm} />
        )}

      </div>
  );
};

export default LoginPage;
