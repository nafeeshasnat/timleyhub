import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/userSlice';

const LoginForm = ({ onToggleForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); 
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');  // State to handle error messages

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    if (email) {
      setFormData(prevState => ({ ...prevState, email }));
    }
  }, [location.search]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage('');  // Clear error message when user starts typing
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await axios.post(`${apiUrl}/api/users/login`, formData);
      if (res.data) {
        const userDetails = res.data.user || res.data.employee;
        console.log(userDetails);
        dispatch(loginSuccess(userDetails));
        console.log(userDetails)
        const companyName = userDetails.companyURLName;
        
        navigate(`/${companyName}`);
      }
    } catch (err) {
      if (err.response) {
        console.error(err.response.data);
        setErrorMessage('Invalid email or password');  // Set error message if login fails
      }
    }
  };

  return(
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={onSubmit}>
        <div>
          {errorMessage && (
            <div className='relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 mb-4'>
              <p className="mb-4 text-sm text-red-600 mb-0 text-center">{errorMessage}</p>
            </div>
          )}
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email || ''}
              required
              onChange={onChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              onChange={onChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Not a member?{' '}
        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={onToggleForm}>
          Sign Up Now
        </a>
      </p>
    </div>
  )
}

export default LoginForm;
