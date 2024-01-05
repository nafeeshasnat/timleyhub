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
    <div>
      <h1>Time Tracker</h1>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          label="Date picker"
          inputFormat="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          orientation="landscape"
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <div>
        <h3>Select a Project</h3>
        <div ref={projectDropdownRef} className="relative">
          <div
            onClick={() => setShowProjectOptions(!showProjectOptions)}
            className="w-full border border-gray-300 rounded-md py-2 px-4 bg-white cursor-pointer"
          >
            {selectedProject ? `${selectedProject.clientName} : ${selectedProject.projectName}` : "Select a project"}
          </div>
          {showProjectOptions && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md max-h-60 overflow-auto">
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

        <h3>Select a Task</h3>
        <div ref={taskDropdownRef} className="relative mt-4">
          <div
            onClick={() => setShowTaskOptions(!showTaskOptions)}
            className="w-full border border-gray-300 rounded-md py-2 px-4 bg-white cursor-pointer"
          >
            {selectedTask ? selectedTask.name : "Select a task"}
          </div>
          {showTaskOptions && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md max-h-60 overflow-auto">
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

        <div className="flex space-x-2 items-center mt-4">
          <input
            type="text"
            value={hours}
            onChange={(e) => handleInput(e, 'hours')}
            placeholder="Hours"
            className="border border-gray-300 rounded-md py-2 px-4 w-24"
          />
          <span>:</span>
          <input
            type="text"
            value={minutes}
            onChange={(e) => handleInput(e, 'minutes')}
            placeholder="Minutes"
            className="border border-gray-300 rounded-md py-2 px-4 w-24"
          />
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text"
            className="border border-gray-300 rounded-md py-2 px-4 w-full"
          />
        </div>

        <button onClick={saveTimeEntry} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
          Save
        </button>
      </div>

      <div className="time-entries">
      {timeEntries.map((entry) => (
          <TimeEntry key={`${entry._id}-${forceUpdateKey}`} {...entry} />
      ))}
      </div>
    </div>
  );
};

export default MainTracker;
