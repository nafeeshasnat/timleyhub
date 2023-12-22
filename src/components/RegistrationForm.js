import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = ({ onToggleForm }) => {
  const [formData, setFormData] = useState({
    // firstName: '',
    // lastName: '',
    // email: '',
    // password: '',
  });

  // const { firstName, lastName, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/users/signup', formData);
      console.log(res.data);
      // Handle success
    } catch (err) {
      console.error(err);
      // Optionally, check if response property exists
      if (err.response) {
        console.error(err.response.data);
      } else {
        console.error('Error occurred:', err.message);
      }
    }
  };
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={onSubmit}>
        {/* Full Name */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600"
            placeholder="First Name"
            onChange={onChange}
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600"
            placeholder="Last Name"
            onChange={onChange}
          />
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600"
            placeholder="Your Email"
            onChange={onChange}
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600"
            placeholder="Password"
            onChange={onChange}
          />
        </div>

        {/* Repeat Password */}
        <div>
          <label htmlFor="repeatPassword" className="block text-sm font-medium leading-6 text-gray-900">
            Repeat Password
          </label>
          <input
            id="repeatPassword"
            name="repeatPassword"
            type="password"
            autoComplete="new-password"
            required
            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600"
            placeholder="Repeat Password"
          />
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
            Accept Terms and Conditions
          </label>
        </div>

        {/* Sign Up Button */}
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign Up
          </button>
        </div>
      </form>

      {/* Already a Member Link */}
      <p className="mt-4 text-center text-sm text-gray-500">
        Already a member?{' '}
        <button
          onClick={onToggleForm}
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Log in
        </button>
      </p>
    </div>
  );
};

export default RegistrationForm;
