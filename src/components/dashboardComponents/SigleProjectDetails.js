import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SingleProjectDetails = () => {
  const projectID = useParams().projectID;
  const [project, setProject] = useState(null);
  const [taskEntries, setTaskEntries] = useState({});

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/projects/${projectID}`);
        setProject(response.data);
        organizeTaskEntries(response.data.tasks, response.data.timestemps);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProject();
  }, [projectID]);

  // Function to organize task entries
  const organizeTaskEntries = (tasks, timeEntries) => {
    const entriesMap = {};
    tasks.forEach(task => {
      entriesMap[task._id] = timeEntries.filter(entry => entry.taskId === task._id);
    });
    setTaskEntries(entriesMap);
  };

  if (!project) {
    return <div>Loading project details...</div>;
  }

  // Calculate the total hours and minutes from time entries
  const calculateTotalTimeEntries = (timeEntries) => {
    let totalHours = 0;
    let totalMinutes = 0;

    Object.values(timeEntries).flat().forEach(entry => {
      totalHours += entry.enteredHours;
      totalMinutes += entry.enteredMinutes;
    });

    // Normalize minutes to hours
    if (totalMinutes >= 60) {
      totalHours += Math.floor(totalMinutes / 60);
      totalMinutes %= 60;
    }

    return { totalHours, totalMinutes };
  };

  const { totalHours, totalMinutes } = calculateTotalTimeEntries(taskEntries);

  const hoursRemaining = project.projectTimeBudget - totalHours;
  const budgetUtilization = (totalHours / project.projectTimeBudget) * 100;

  return (
    <div className="bg-gray-100 p-8">
      <ProjectHeader projectName={project.projectName} />
      <ProjectInfo owner={project.admin} createdAt={project.createdAt} />
      <BudgetInfo totalHours={project.projectTimeBudget} hoursLogged={totalHours + totalMinutes / 60} hoursRemaining={hoursRemaining} budgetUtilization={budgetUtilization} />
      <TaskList tasks={project.tasks} taskEntries={taskEntries} />
    </div>
  );
};

// Component for displaying project header
const ProjectHeader = ({ projectName }) => (
  <div className="bg-white p-4 rounded shadow">
    <h1 className="text-xl font-semibold">{projectName}</h1>
    <div>Edit Project | Archive Project</div>
  </div>
);

// Component for displaying project information
const ProjectInfo = ({ owner, createdAt }) => (
  <div className="bg-white my-4 p-4 rounded shadow">
    <div>Project owner: {owner.firstName} {owner.lastName}</div>
    <div>Project created on: {createdAt}</div>
  </div>
);

// Component for displaying budget information
const BudgetInfo = ({ totalHours, hoursLogged, hoursRemaining, budgetUtilization }) => (
  <div className="bg-white my-4 p-4 rounded shadow flex justify-between items-center">
    <div>
      <h2 className="text-xl font-semibold">{hoursRemaining.toFixed(2)} hours remaining in the project budget</h2>
      <p>{hoursLogged.toFixed(2)} hours logged to the total {totalHours.toFixed(2)} hour budget</p>
    </div>
    <div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${budgetUtilization.toFixed(2)}%` }}></div>
      </div>
      <div>{budgetUtilization.toFixed(2)}%</div>
    </div>
  </div>
);

// Component for listing tasks and their entries
const TaskList = ({ tasks, taskEntries }) => (
  <div className="bg-white my-4 p-4 rounded shadow">
    {tasks.map(task => (
      <TaskItem key={task._id} task={task} taskDetails={taskEntries[task._id] || []} />
    ))}
  </div>
);

// Component for displaying individual task details
const TaskItem = ({ task, taskDetails }) => {
  const totalHoursForTask = taskDetails.reduce((acc, entry) => acc + entry.enteredHours + entry.enteredMinutes / 60, 0);

  return (
    <div className="my-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{task.name}</h3>
      </div>
      <div>{taskDetails.length} person(s) has entered time to this task</div>
      <div className="flex justify-between items-center">
        <div><p>Budget</p><p>{task.budget}</p></div>
        <div><p>Actual</p><p>{totalHoursForTask.toFixed(2)}</p></div>
        <div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(totalHoursForTask / task.budget * 100).toFixed(2)}%` }}></div>
          </div>
          <div>{((totalHoursForTask / task.budget) * 100).toFixed(2)}%</div>
        </div>
        <div><p>{(task.budget - totalHoursForTask).toFixed(2)} hours remaining</p></div>
      </div>
      {taskDetails.map(entry => (
        <div key={entry._id}>
          <p>{entry.employeeId.firstName} {entry.employeeId.lastName}</p>
          <p>Hours: {entry.enteredHours}</p>
        </div>
      ))}
    </div>
  );
};

export default SingleProjectDetails;
