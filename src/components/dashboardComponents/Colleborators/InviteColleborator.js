import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const InviteColleborator = () => {
  const user = useSelector((state) => state.user.userDetails);
  const userID = user._id;
  const [inviteState, setInviteState] = useState('false');

  console.log(user);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic goes here
    let inviteName = '';

    const collabooratorData = {
      ...formData,
      companyId: userID,
      companyURLName: user.companyURLName
    };

    console.log(collabooratorData);

    // Send the POST request to the backend
    fetch('http://localhost:5001/api/collaborator/invite/', { // Replace with your actual backend server URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(collabooratorData),
    }).then(() => {
      setInviteState(true);
      inviteName = `${collabooratorData.firstName} ${collabooratorData.lastName}`;
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle errors - show user a message, log, etc.
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-10 min-w-screen">
      <div className="mb-4">
        <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      <div className="mb-4">
        <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      <div className="mb-6">
        <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">Role</label>
        <select name="role" value={formData.role} onChange={handleChange} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
          <option value="">Select a role</option>
          <option value="manager">Manager</option>
          <option value="collaborator">Collaborator</option>
        </select>
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default InviteColleborator;
