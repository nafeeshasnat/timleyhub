import React, { useState, useEffect } from 'react';
import ProjectDetails from './ProjectDetails';
import { useSelector, useDispatch } from 'react-redux';
import { projectsStorage } from '../../features/AllProjectsSlice';

const AllProjects = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDetails);
  const deletedProjectID = useSelector((state) => state.allProjects.deletedID);
  const userID = user._id;
  const projects = useSelector((state) => state.allProjects.projects);
  const [openProjectId, setOpenProjectId] = useState(null);
  const projectUpdateState = useSelector((state) => state.allProjects.updated);

  useEffect(() => {
    // Replace 'adminId' with the actual logged-in admin's ID
    const adminId = userID; // This should be dynamically set based on logged-in user

    const apiUrl = process.env.REACT_APP_API_URL;
    fetch(`${apiUrl}/api/projects?adminId=${adminId}`)
      .then(response => response.json())
      .then(data => {
        // setProjects(data);
        dispatch(projectsStorage(data));
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }, [userID, projectUpdateState, deletedProjectID, dispatch]);

  const convertToLocalTime = (time) => {
    return new Date(time).toLocaleString();
  };

  const toggleProject = (projectId, e) => {
    if (openProjectId === projectId) {
      setOpenProjectId(null); // Close if already open
    } else {
      setOpenProjectId(projectId); // Open the clicked project
    }
  };

  return(
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">All Projects</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {projects.map((project, index) => (
            <React.Fragment key={project._id}>
              <li className={`flex justify-between items-center px-4 py-4 sm:px-6 hover:bg-gray-50 ${openProjectId === project._id ? "bg-gray-50" : ""}`} onClick={(e) => toggleProject(project._id, e)}>
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900 truncate">{project.clientName}</p>
                    <p className="text-xs text-gray-500 truncate">{project.projectName}</p>
                  </div>
                </div>

                {project.createdAt && (
                  <div className="flex-shrink-0 hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-xs text-gray-500">
                      Created On <time dateTime={project.createdAt}>{convertToLocalTime(project.createdAt)}</time>
                    </p>
                  </div>
                )}
                <div className="ml-5 flex-shrink-0">
                  <svg className={`w-5 h-5 ${openProjectId === project._id ? "text-gray-400 rotate-180" : "text-gray-600"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </li>
              {openProjectId === project._id && (
                <div className="px-4 pt-4 pb-2 sm:px-6 bg-gray-50">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Project Details</h3>
                  <ProjectDetails projectData={project} />
                </div>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AllProjects;