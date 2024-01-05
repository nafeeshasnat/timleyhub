import React, {useState, useEffect, useRef} from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import TimeEntry from './TimeEntry';


const MainTracker = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const user = useSelector((state) => state.user.userDetails);
  const userID = user._id;

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showProjectOptions, setShowProjectOptions] = useState(false);
  const [showTaskOptions, setShowTaskOptions] = useState(false);
  const projectDropdownRef = useRef(null);
  const taskDropdownRef = useRef(null);
  const [projects, setProjects] = useState([]);

  const tasks = selectedProject ? selectedProject.tasks : [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (projectDropdownRef.current && !projectDropdownRef.current.contains(event.target)) {
        setShowProjectOptions(false);
      }
      if (taskDropdownRef.current && !taskDropdownRef.current.contains(event.target)) {
        setShowTaskOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [projectDropdownRef, taskDropdownRef]);

  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [text, setText] = useState('');

  const formattedDate = selectedDate.toISOString().split('T')[0];


  // Handler for hours and minutes input
  // Ensures that only numerical values are entered and within a reasonable range
  const handleTimeInput = (e, type) => {
    const value = e.target.value;

    // If the input is not a number, return early
    if (!/^\d*$/.test(value)) return;

    if (type === 'hours') {
      // If the hours are more than 24, reset to 24
      setHours(value <= 24 ? value : 24);
    } else if (type === 'minutes') {
      // If the minutes are more than 59, reset to 59
      setMinutes(value <= 59 ? value : 59);
    }
  };

  // get the available projects
  useEffect(() => {
    fetch(`http://localhost:5001/api/users/projects/${userID}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setProjects(data)
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }, []);
  
  const [timeEntries, setTimeEntries] = useState([]); // State to hold time entries

   // Get TIme
  const fetchTimeEntries = () => {
    fetch(`http://localhost:5001/api/time-entries/timecards/${userID}/${formattedDate}`)
      .then(response => response.json())
      .then(data => {
        setTimeEntries(data);
      })
      .catch(error => {
        console.error('Error fetching time entries:', error);
      });
  };

   // Fetch time entries when the selected date changes
   useEffect(() => {
    fetchTimeEntries();
  }, [selectedDate]);

  // save time
  const saveTimeEntry = () => {
    const timeEntryData = {
      employeeId: userID, // or however you get the employee ID
      projectId: selectedProject._id,
      taskId: selectedTask._id,
      date: selectedDate,
      enteredHoure: hours, // Ensure this is a number
      enteredMinutes: minutes,
      comment: text,
      // ...other fields if necessary
    };

    setTimeEntries([...timeEntries, timeEntryData]);
  
    fetch('http://localhost:5001/api/time-entries/time', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(timeEntryData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Time entry saved:', data);
      setShowProjectOptions(null);
      fetchTimeEntries();
    })
    .catch((error) => {
      console.error('Error saving time entry:', error);
    });
  };

  console.log(timeEntries)

  return(
    <div>
      <h1>Time Tracker</h1>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
          label="Date picker"
          inputFormat="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          orientation="landscape"xs
          renderInput={(params) => <TextField {...params} />}
          slotProps={{
            actionBar: {
              actions: [''],
            },
          }}
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
            {/* Dropdown icon */}
          </div>
          {showProjectOptions && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md max-h-60 overflow-auto">
              {projects.map((project) => (
                <li
                  key={project._id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedProject(project);
                    setSelectedTask(null); // Reset the selected task
                    setShowProjectOptions(false);
                  }}
                >
                  {project.clientName} : {project.projectName}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Task Selector */}
        <div ref={taskDropdownRef} className="relative mt-4">
          <div
            onClick={() => setShowTaskOptions(!showTaskOptions)}
            className="w-full border border-gray-300 rounded-md py-2 px-4 bg-white cursor-pointer"
          >
            {selectedTask ? selectedTask.name : "Select a task"}
            {/* Dropdown icon */}
          </div>
          {showTaskOptions && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md max-h-60 overflow-auto">
              {tasks.map((task) => (
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
          {/* Hours Input */}
          <input
            type="text"
            value={hours}
            onChange={(e) => handleTimeInput(e, 'hours')}
            placeholder="Hours"
            className="border border-gray-300 rounded-md py-2 px-4 w-24"
          />

          <span>:</span>

          {/* Minutes Input */}
          <input
            type="text"
            value={minutes}
            onChange={(e) => handleTimeInput(e, 'minutes')}
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

        <div className="mt-4">
          <button className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700' onClick={saveTimeEntry}>Save</button>
        </div>
      </div>
      {/* Render Time Entries */}
      <div className="time-entries">
        {timeEntries.map((entry, index) => (
          <TimeEntry key={index} {...entry} />
        ))}
      </div>
    </div>
  )
}

export default MainTracker;