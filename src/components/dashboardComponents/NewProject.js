import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormValues, updateTask, addTask, removeTask } from '../../features/projectFormSlice';
import { projectUpdate } from '../../features/AllProjectsSlice';
import { useNavigate } from 'react-router-dom';

const NewProject = (props) => {
  console.log(props.updateProject);
  const isUpdate = props.updateProject || false;
  let initialProjectDataToUpdate;

  if(isUpdate){
    initialProjectDataToUpdate = props.projectData.projectData;
  }
  const user = useSelector((state) => state.user.userDetails);
  const userID = user._id;
  const userName = user.firstName;
  const dispatch = useDispatch();
  const formValues = useSelector((state) => state.projectForm);

  const [billable, setBillable] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Initialize form values on component mount
    dispatch(updateFormValues({
      clientName: isUpdate ? initialProjectDataToUpdate.clientName : '',
      projectName: isUpdate ? initialProjectDataToUpdate.projectName : '',
      projectTimeBudget: isUpdate ? initialProjectDataToUpdate.projectTimeBudget : 0,
      isBillable: isUpdate ? initialProjectDataToUpdate.isBillable : false,
      tasks: isUpdate ? initialProjectDataToUpdate.tasks.map(task => ({
        name: task.name,
        budget: task.budget,
        isBillable: task.isBillable
      })) : [{ name: '', budget: '', isBillable: false }],
      isRecurring: isUpdate ? initialProjectDataToUpdate.isRecurring : false,
    }));
  }, [dispatch]);

  const [errors, setErrors] = useState({});
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch(updateFormValues({ [name]: type === 'checkbox' ? checked : value }));
  };

  const handleTaskChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    dispatch(updateTask({ index, task: { [name]: type === 'checkbox' ? checked : value } }));
  };

   // Add a new task
   const handleAddTask = () => {
    dispatch(addTask());
  };

  // Remove a task
  const handleRemoveTask = (index) => {
    dispatch(removeTask(index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform frontend validation first (if any)
  
    // Construct the project data from state
    const projectData = {
      ...formValues,
      admin: userID,
    };

    const apiUrl = process.env.REACT_APP_API_URL;

    const url = isUpdate
    ? `${apiUrl}/api/projects/update/${initialProjectDataToUpdate._id}`
    : `${apiUrl}/api/projects/new`;

    const method = isUpdate ? 'PUT' : 'POST';
  
    // Send the POST request to the backend
    fetch( url, { // Replace with your actual backend server URL
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    })
    .then(response => response.json())
    .then(data => {
      if (isUpdate) {
        dispatch(projectUpdate(true)); // Dispatch action after successful update
      }else{
        navigate(`/${userName}/all-projects`)
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle errors - show user a message, log, etc.
    });
  };

  const updateBillable = (e) => {
    setBillable(e.target.checked);
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-700 mb-4">{props.updateProject ? 'Edit Project' : 'Add a New Project'}</h1>
        <p className="text-gray-500">Set up your project details and tasks below.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-lg rounded-xl px-8 py-10">
        <div className="space-y-6">
          {/* Client Name */}
          <div>
            <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-2">
              Client name
            </label>
            <input
              type="text"
              name="clientName"
              value={formValues.clientName}
              onChange={handleInputChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Project Name */}
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-2">
              Project name
            </label>
            <input
              type="text"
              name="projectName"
              value={formValues.projectName}
              onChange={handleInputChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Project Time Budget & Billable Toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="projectTimeBudget" className="block text-sm font-medium text-gray-700 mb-2">
                Total project time budget
              </label>
              <input
                type="number"
                name="projectTimeBudget"
                value={formValues.projectTimeBudget}
                onChange={handleInputChange}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="flex items-center mt-6 sm:mt-0">
              <input
                id="isBillable"
                name="isBillable"
                type="checkbox"
                checked={formValues.isBillable}
                onChange={(e) => {
                  handleInputChange(e); // First function call
                  updateBillable(e); // Second function call
                }}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="isBillable" className="ml-2 block text-sm text-gray-900">
                This project is billable
              </label>
            </div>
          </div>

          {/* Tasks */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tasks
            </label>
            {/* Task Items */}
            {formValues.tasks.map((task, index) => (
              <div key={index} className="flex flex-wrap -mx-3 mb-2 items-center">
                <div className="w-full sm:w-7/12 px-3 mb-2 sm:mb-0">
                  <input
                    type="text"
                    name="name"
                    value={task.name}
                    placeholder="Task name"
                    onChange={(e) => handleTaskChange(index, e)}
                    className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg"
                  />
                </div>
                <div className="w-full sm:w-3/12 px-3 mb-2 sm:mb-0">
                  <input
                    type="number"
                    name="budget"
                    value={task.budget}
                    placeholder="Budget"
                    onChange={(e) => handleTaskChange(index, e)}
                    className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg"
                  />
                </div>
                {billable && (
                  <div className="flex items-center w-full sm:w-1/12 px-3">
                    <input
                      type="checkbox"
                      name="isBillable"
                      checked={task.isBillable}
                      onChange={(e) => handleTaskChange(index, e)}
                      className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  </div>
                )}
                {formValues.tasks.length > 1 && (
                  <div className="w-full sm:w-1/12 px-3 text-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveTask(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      &times;
                    </button>
                  </div>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddTask}
              className="text-indigo-600 hover:text-indigo-800 transition-colors text-sm font-semibold mt-2"
            >
              + Add a Task
            </button>
          </div>
          
          {/* Recurring Project */}
          <div>
            <div className="flex items-center">
              <input
                id="isRecurring"
                name="isRecurring"
                type="checkbox"
                checked={formValues.isRecurring}
                onChange={handleInputChange}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="isRecurring" className="ml-2 block text-sm text-gray-900">
                This is a recurring project (Monthly Retainer)
              </label>
            </div>
          </div>
          
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md shadow-lg font-semibold tracking-wide"
            >
              {isUpdate ? 'Update Project' : 'Save Project'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewProject;