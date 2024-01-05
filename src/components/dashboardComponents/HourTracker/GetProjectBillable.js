import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const GetProjectBillable = ({ projectId, onPercentageChange }) => {
    const [timeDetails, setTimeDetails] = useState({
        status: '',
        totalBillableHours: 0,
        totalBillableMinutes: 0,
        totalBudget: 0
    });

    useEffect(() => {
        const fetchBillableTime = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/projects/getBillableTime/${projectId}`);
                setTimeDetails(response.data);
            } catch (error) {
                console.error('Error fetching billable time:', error);
            }
        };

        fetchBillableTime();
    }, [projectId]);

    const getTotalTimeInMinutes = () => {
        return (timeDetails.totalBillableHours * 60) + timeDetails.totalBillableMinutes;
    };

    const getPercentage = () => {
        const budgetMinutes = timeDetails.totalBudget * 60;
        const billableMinutes = getTotalTimeInMinutes();
        return (billableMinutes / budgetMinutes) * 100;
    };

    useEffect(() => {
        const percentage = getPercentage();
        onPercentageChange(percentage);
    }, [timeDetails, onPercentageChange]);

    const remainingOrOverTime = useMemo(() => {
        const budgetMinutes = timeDetails.totalBudget * 60;
        const billableMinutes = getTotalTimeInMinutes();
        const difference = Math.abs(budgetMinutes - billableMinutes);

        const hours = Math.floor(difference / 60);
        const minutes = difference % 60;

        return { hours, minutes };
    }, [timeDetails]);

    const percentage = getPercentage();

    return (
        <div>
            <h3>{timeDetails.status === 'Over budget' ? 'Over Budget Time' : 'Remaining Time'}</h3>
            <p>Hours: {remainingOrOverTime.hours}, Minutes: {remainingOrOverTime.minutes}</p>
            <p>Percentage Used: {percentage.toFixed(2)}%</p>
        </div>
    );
};

export default GetProjectBillable;
