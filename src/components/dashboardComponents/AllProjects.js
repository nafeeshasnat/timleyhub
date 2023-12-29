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

    fetch(`http://localhost:5001/api/projects?adminId=${adminId}`)
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
    <div className="all-projects">
      <h2>All Projects</h2>
      <ul role="list" className="divide-y divide-gray-100">
      {projects.map((project, index) => (
        <>
        <li key={index} project-id={index} className={`flex justify-between gap-x-6 py-5 cursor-pointer duration-300 ease-in-out hover:bg-gray-200 px-4 ${openProjectId === index ? "bg-gray-200 rounded-t-xl" : "hover:rounded-xl"}`} onClick={(e) => toggleProject(index, e)}>
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{project.clientName}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{project.projectName}</p>
            </div>
          </div>
          
          {project.createdAt && (
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="mt-1 text-xs leading-5 text-gray-500">
              Created On <time dateTime={project.lastSeenDateTime}>{project.lastSeen}</time>
            </p>
            <div className="mt-1 flex items-center gap-x-1.5">
              <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
              <p className="text-xs leading-5 text-gray-500">{convertToLocalTime(project.createdAt)}</p>
            </div>
            </div>
          )}
        </li>
        {openProjectId === index && (
          <div className="translate transform overflow-hidden" details-of={index}>
            <h3>Project Details</h3>
            <ProjectDetails projectData={project} />
          </div>
        )}
        </>
      ))}
    </ul>
    </div>
  )
}

export default AllProjects;