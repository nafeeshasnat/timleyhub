import React, { useState, useEffect, useRef } from 'react';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import TimeEntry from './TimeEntry';

const MainTracker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const user = useSelector((state) => state.user.userDetails);
  const userID = user._id;

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showProjectOptions, setShowProjectOptions] = useState(false);
  const [showTaskOptions, setShowTaskOptions] = useState(false);
  const [projects, setProjects] = useState([]);
  const [timeEntries, setTimeEntries] = useState([]);
  const [timeSave, setTimeSave] = useState(false);

  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [text, setText] = useState('');
  const [forceUpdateKey, setForceUpdateKey] = useState(0);

  const projectDropdownRef = useRef(null);
  const taskDropdownRef = useRef(null);

  useEffect(() => {
      fetch(`http://localhost:5001/api/users/projects/${userID}`)
          .then(response => response.json())
          .then(setProjects)
          .catch(error => console.error('Error fetching projects:', error));
  }, [userID]);

  useEffect(() => {
      fetchTimeEntries();
      setTimeSave(false);
  }, [selectedDate, userID, timeSave]);
  
  const fetchTimeEntries = () => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    fetch(`http://localhost:5001/api/time-entries/timecards/${userID}/${formattedDate}`)
      .then(response => response.json())
      .then(setTimeEntries)
      .catch(error => console.error('Error fetching time entries:', error));
  };

  const handleDateChange = (newDate) => setSelectedDate(newDate);

  const handleInput = (e, type) => {
      const value = e.target.value;
      if (!/^\d*$/.test(value)) return;

      if (type === 'hours') {
          setHours(value <= 24 ? value : 24);
      } else if (type === 'minutes') {
          setMinutes(value <= 59 ? value : 59);
      }
  };

  const saveTimeEntry = () => {
    const timeEntryData = {
      employeeId: userID,
      projectId: selectedProject._id,
      taskId: selectedTask._id,
      date: selectedDate,
      enteredHours: hours,
      enteredMinutes: minutes,
      comment: text,
    };
  
    fetch('http://localhost:5001/api/time-entries/time', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(timeEntryData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Time entry saved:', data);
      // Optionally, clear the input fields here if needed
      setHours('');
      setMinutes('');
      setText('');
      fetchTimeEntries();
      // Fetch updated time entries
      return fetch(`http://localhost:5001/api/time-entries/timecards/${userID}/${selectedDate.toISOString().split('T')[0]}`)
    })
    .then(response => response.json())
    .then(newTimeEntries => {
      setTimeEntries(newTimeEntries); // Update state with new time entries
      setTimeSave(true);
      setForceUpdateKey(prevKey => prevKey + 1);
    })
    .catch(error => {
      console.error('Error saving time entry:', error);
    });
  };  

  return (
    <div className="p-5 space-y-4">
      <h1 className="text-2xl font-bold text-gray-700">Time Tracker</h1>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          className='rounded-lg shadow-lg'
          label="Date picker"
          inputFormat="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          orientation="landscape"
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <div>
        <h3 className="font-semibold text-lg">Select a Project</h3>
        <div ref={projectDropdownRef} className="relative">
          <div
            onClick={() => setShowProjectOptions(!showProjectOptions)}
            className="w-full border border-gray-300 rounded-lg py-2 px-4 bg-white shadow-sm cursor-pointer"
          >
            {selectedProject ? `${selectedProject.clientName} : ${selectedProject.projectName}` : "Select a project"}
          </div>
          {showProjectOptions && (
            <ul className="absolute z-20 w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg overflow-auto">
              {projects.map((project) => (
                <li
                  key={project._id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedProject(project);
                    setSelectedTask(null);
                    setShowProjectOptions(false);
                  }}
                >
                  {project.clientName} : {project.projectName}
                </li>
              ))}
            </ul>
          )}
        </div>

        <h3 className="font-semibold text-lg mt-4">Select a Task</h3>
        <div ref={taskDropdownRef} className="relative">
          <div
            onClick={() => setShowTaskOptions(!showTaskOptions)}
            className="w-full border border-gray-300 rounded-lg py-2 px-4 bg-white shadow-sm cursor-pointer"
          >
            {selectedTask ? selectedTask.name : "Select a task"}
          </div>
          {showTaskOptions && (
            <ul className="absolute z-20 w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg overflow-auto">
              {selectedProject && selectedProject.tasks.map((task) => (
                <li
                  key={task.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedTask(task);
                    setShowTaskOptions(false);
                  }}
                >
                  {task.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
          <input
            type="text"
            value={hours}
            onChange={(e) => handleInput(e, 'hours')}
            placeholder="Hours"
            className="flex-1 border border-gray-300 rounded-lg py-2 px-4"
          />
          <input
            type="text"
            value={minutes}
            onChange={(e) => handleInput(e, 'minutes')}
            placeholder="Minutes"
            className="flex-1 border border-gray-300 rounded-lg py-2 px-4"
          />
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text"
            className="flex-1 border border-gray-300 rounded-lg py-2 px-4"
          />
        </div>

        <button onClick={saveTimeEntry} className="mt-4 w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
          Save
        </button>
      </div>

      <div className="space-y-2">
        {timeEntries.map((entry) => (
          <TimeEntry key={entry._id} {...entry} />
        ))}
      </div>
    </div>
  );
};

export default MainTracker;
