// TimeEntry.js
import React from 'react';

const TimeEntry = ({task, projectName, comment, date, enteredHours, enteredMinutes}) => {
const formattedDate  = new Date(date);

const timeSpent = `${enteredHours.toString().padStart(2, '0')} : ${enteredMinutes.toString().padStart(2, '0')}`;
const percentage = 100;

const year = formattedDate.getFullYear();
const month = formattedDate.getMonth() + 1; // getMonth() returns 0-11
const day = formattedDate.getDate();
  return (
    <div className="bg-white shadow rounded-md p-4 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold">Project: {projectName}</h4>
          <p className="text-sm text-gray-600">Task: {task.name}</p>
          <p className="text-sm text-gray-600">Comment: {comment}</p>
          <p className="text-xs text-gray-500">{year}-{month.toString().padStart(2, '0')}-{day.toString().padStart(2, '0')}</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold">{timeSpent}</span>
          <p className="text-sm text-gray-600">hours</p>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-4">
        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
      <div className="flex items-center justify-end mt-2">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold mr-2">Edit</button>
        <button className="text-red-600 hover:text-red-800 text-sm font-semibold">Delete</button>
      </div>
    </div>
  );
}

export default TimeEntry;
