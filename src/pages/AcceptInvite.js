import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { useNavigate } from 'react-router-dom';

const AcceptInvite = () => {
    const [employee, setEmployee] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { invitationToken } = useParams();
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch(`${apiUrl}/api/collaborators/invite/${invitationToken}`)
            .then(response => response.json())
            .then(data => setEmployee(data))
            .catch(err => console.error('Error fetching data:', err));
    }, [invitationToken]);

    const handlePassword = (e) => {
      setPassword(e.target.value);
      if(error !== ''){
        setError('');
      }
    }

    const handleConfirmPassword = (e) => {
      setConfirmPassword(e.target.value);
      if(error !== ''){
        setError('');
      }
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
      }
      // Submit password setup logic here

      try {
        const response = await fetch(`${apiUrl}/api/collaborators/set-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token: invitationToken, newPassword: password })
        });
  
        const data = await response.json();
        if (response.ok) {
          // Redirect to login page with email query parameter
          navigate(`/login`);
        } else {
          throw new Error(data.msg || 'Failed to set password');
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle errors here (e.g., show error message to the user)
      }
    };

    if (!employee) return <div>Loading...</div>;

    return (
      <>
      <Navigation />
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="container mx-auto p-4 max-w-lg mt-52">
            <h1 className="text-2xl font-bold mb-4">Welcome to {employee.company.companyName}</h1>
            <p className="mb-4">Hi {employee.firstName} {employee.lastName}, you have been invited to join as a {employee.role}.</p>

            <form onSubmit={handleSubmit} className="max-w-sm">
                {error && <p className="text-red-500">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Set Password</label>
                    <input type="password" value={password} onChange={(e) => handlePassword(e)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2 w-full">Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={(e) => handleConfirmPassword(e)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Set Password</button>
            </form>
        </div>
      </div>
      </>
    );
};

export default AcceptInvite;
