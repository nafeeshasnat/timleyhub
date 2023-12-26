import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormValues, updateTask, addTask, removeTask } from '../../features/projectFormSlice';

const NewProject = () => {
  const user = useSelector((state) => state.user.userDetails);
  const userID = user._id;
  const dispatch = useDispatch();
  const formValues = useSelector((state) => state.projectForm);

  const [billable, setBillable] = useState(false);

  useEffect(() => {
    // Initialize form values on component mount
    dispatch(updateFormValues({
      clientName: '',
      projectName: '',
      projectTimeBudget: 0,
      isBillable: false,
      tasks: [{ name: '', budget: '', isBillable: false }],
      isRecurring: false,
    }));
  }, [dispatch]);

  const [errors, setErrors] = useState({});
  
  const handleInputChange = (e) => {
    const { name, value, type, checked, className } = e.target;
    console.log(className)
    dispatch(updateFormValues({ [name]: type === 'checkbox' ? checked : value }));
  };

  console.log(formValues)

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
  
    // Send the POST request to the backend
    fetch('http://localhost:5001/api/projects/new', { // Replace with your actual backend server URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Handle success - perhaps redirecting to the dashboard or clearing the form
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
      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow px-4 py-5 sm:p-6">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">
              Client name
            </label>
            <input
              type="text"
              name="clientName"
              value={formValues.clientName}
              onChange={handleInputChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="col-span-6">
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
              Project name
            </label>
            <input
              type="text"
              name="projectName"
              value={formValues.projectName}
              onChange={handleInputChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="projectTimeBudget" className="block text-sm font-medium text-gray-700">
              Total project time budget
            </label>
            <input
              type="number"
              name="projectTimeBudget"
              value={formValues.projectTimeBudget}
              onChange={handleInputChange}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              required
            />
            <div className="flex items-center mt-2">
              <input
                id="isBillable"
                name="isBillable"
                type="checkbox"
                checked={formValues.isBillable}
                onChange={(e) => {
                  handleInputChange(e); // First function call
                  updateBillable(e); // Second function call
                }}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="isBillable" className="ml-2 block text-sm text-gray-900">
                This project is billable
              </label>
            </div>
          </div>
          
          {/* Tasks Section */}
          <div className="col-span-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tasks
            </label>
            {formValues.tasks.map((task, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 mb-2">
                <input
                  type="text"
                  name="name"
                  value={task.name}
                  placeholder="Task name"
                  onChange={(e) => handleTaskChange(index, e)}
                  className="col-span-7 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  name="budget"
                  value={task.budget}
                  placeholder="Budget"
                  onChange={(e) => handleTaskChange(index, e)}
                  className="col-span-3 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {billable && (
                <div className="flex justify-center items-center gap-x-2" id="billable_task">
                  <label>Billable</label>
                  <input
                    type="checkbox"
                    name="isBillable"
                    checked={task.isBillable}
                    onChange={(e) => handleTaskChange(index, e)}
                    className="col-span-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </div>
                )}

                {formValues.tasks.length > 1 && (
                  <div className="flex justify-center items-center col-span-1">
                    <button
                      type="button"
                      onClick={() => handleRemoveTask(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      X
                    </button>
                  </div>
                )}
                
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddTask}
              className="text-sm text-blue-500"
            >
              + Add a Task
            </button>
          </div>
          
          {/* Recurring Project */}
          <div className="col-span-6 sm:col-span-3">
            <div className="flex items-center">
              <input
                id="isRecurring"
                name="isRecurring"
                type="checkbox"
                checked={formValues.isRecurring}
                onChange={handleInputChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="isRecurring" className="ml-2 block text-sm text-gray-900">
                This is a recurring project (Monthly Retainer)
              </label>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="col-span-6">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
            >
              Save Project
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewProject;