import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GetProjectBillable({ projectId, onPercentageChange }) {
  const [timeDetails, setTimeDetails] = useState({
    status: '',
    totalBillableHours: 0,
    totalBillableMinutes: 0,
    totalBudget: 0
  });

  // Fetch billable time details when projectId changes
  useEffect(() => {
    async function fetchBillableTime() {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/projects/getBillableTime/${projectId}`);
        if (response.data) {
          setTimeDetails(response.data);
          updatePercentage(response.data);
        }
      } catch (error) {
        console.error('Error fetching billable time:', error);
      }
    }

    fetchBillableTime();
  }, [projectId]);

  // Calculate and update the percentage used of the budget
  function updatePercentage(data) {
    const totalMinutes = (data.totalBillableHours * 60) + data.totalBillableMinutes;
    const budgetMinutes = data.totalBudget * 60;
    const percentage = (totalMinutes / budgetMinutes) * 100;
    onPercentageChange(percentage);
  }

  // Render the component UI
  return (
    <div>
      <h3>{timeDetails.status === 'Over budget' ? 'Over Budget Time' : 'Remaining Time'}</h3>
      <p>Hours: {formatHoursAndMinutes(timeDetails.totalBillableHours, timeDetails.totalBillableMinutes)}</p>
      <p>Percentage Used: {calculatePercentage().toFixed(2)}%</p>
    </div>
  );

  // Helper function to format hours and minutes
  function formatHoursAndMinutes(hours, minutes) {
    return `${hours}h ${minutes}m`;
  }

  // Helper function to calculate the display percentage
  function calculatePercentage() {
    const totalMinutes = (timeDetails.totalBillableHours * 60) + timeDetails.totalBillableMinutes;
    const budgetMinutes = timeDetails.totalBudget * 60;
    return (totalMinutes / budgetMinutes) * 100;
  }
}

export default GetProjectBillable;
