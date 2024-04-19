import { useState, useEffect } from "react";
import EditModal from "./EditModal";
import NewProject from "./NewProject";
import { useSelector, useDispatch } from 'react-redux';
import { projectUpdate, projectDelete } from "../../features/AllProjectsSlice";

const ProjectDetails = (project) => {
  const dispatch = useDispatch();
  const isUpdated = useSelector((state) => state.allProjects.updated);
  const [editModal, setEditModal] = useState(false);
  const data = project.projectData;

  const toggleModal = () => {
    setEditModal(!editModal); // Toggle the modal state
  };

  const closeModal = () => {
    setEditModal(false); // Function to close the modal
  };

  useEffect(() => {
    if (isUpdated) {
      setEditModal(false); // Close modal when isUpdated is true
      dispatch(projectUpdate(false));
    }
  }, [isUpdated, dispatch]);

  const deleteProject = async (projectId) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiUrl}/api/projects/remove/${projectId}`, {
        method: 'DELETE',
      });
      dispatch(projectDelete(projectId));
      // Dispatch an action to update the projects list in Redux store if needed
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const [why, setWhy] = useState('');

  const openModal =  (purpose, e) => {
    setWhy(purpose);
    toggleModal();
  }

  return (
    <div>
      <p>Project allocated time: {data.projectTimeBudget} hours</p>
      <button onClick={() => openModal('edit')}>Edit</button>
      <button onClick={() => openModal('del')}>Delete</button>
      <a href="">Details -{'>'}</a>
      {editModal && <EditModal openModal = {editModal} closeModal={closeModal}>
       { why == 'edit' ? <NewProject updateProject={true} projectData={project} /> : 
       <div>
        <h3>Delete project : {data.projectName}?</h3>
        <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:opacity-85 sm:mt-0 sm:w-auto"
                    onClick={() =>deleteProject(project.projectData._id)}
                  >
                    Delete
                  </button>
       </div>}
        
      </EditModal>}

    </div>
  )
}

export default ProjectDetails;