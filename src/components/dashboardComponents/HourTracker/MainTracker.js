import React, { useState, useEffect, useRef } from 'react';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import axios from 'axios';
import TimeEntry from './TimeEntry';

function MainTracker() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const user = useSelector(state => state.user.userDetails);
  const userID = user._id;
  const [projects, setProjects] = useState([]);
  const [timeEntries, setTimeEntries] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showProjectOptions, setShowProjectOptions] = useState(false);
  const [showTaskOptions, setShowTaskOptions] = useState(false);
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [text, setText] = useState('');
  const [forceUpdateKey, setForceUpdateKey] = useState(0);

  const projectDropdownRef = useRef(null);
  const taskDropdownRef = useRef(null);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${apiUrl}/api/users/projects/${userID}`)
      .then(response => {
        setProjects(response.data)
      })
      .catch(error => console.error('Error fetching projects:', error));
  }, [userID]);

  useEffect(() => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    axios.get(`${apiUrl}/api/time-entries/timecards/${userID}/${formattedDate}`)
      .then(response => setTimeEntries(response.data))
      .catch(error => console.error('Error fetching time entries:', error));
  }, [selectedDate, userID, forceUpdateKey]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleInput = (event, type) => {
    const value = event.target.value;
    if (!/^\d*$/.test(value)) return;

    if (type === 'hours') {
      setHours(value <= 24 ? value : 24);
    } else if (type === 'minutes') {
      setMinutes(value <= 59 ? value : 59);
    }
  };

  const saveTimeEntry = () => {
    const timeEntryData = {
      userID: `${userID ? userID : user._id }`,
      employeeId: `${userID ? userID : user._id }`,
      projectId: selectedProject._id,
      taskId: selectedTask._id,
      date: selectedDate,
      enteredHours: hours,
      enteredMinutes: minutes,
      comment: text,
    };

    axios.post(`${apiUrl}/api/time-entries/time`, timeEntryData)
      .then(() => {
        setHours('');
        setMinutes('');
        setText('');
        setForceUpdateKey(prevKey => prevKey + 1);
      })
      .catch(error => console.error('Error saving time entry:', error));
  };

  return (
    <div key={forceUpdateKey} className="p-5 space-y-4">
      <h1 className="text-2xl font-bold text-gray-700">Time Tracker</h1>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          className="rounded-lg shadow-lg"
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
      {console.log(timeEntries)}
        {timeEntries.map((entry) => (
          <TimeEntry key={entry._id} {...entry} forceUpdate={forceUpdateKey} />
        ))}
      </div>
    </div>
  );
}

export default MainTracker;
