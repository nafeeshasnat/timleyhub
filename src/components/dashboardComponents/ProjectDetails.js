import { useState, useEffect } from "react";
import EditModal from "./EditModal";
import NewProject from "./NewProject";
import { useSelector, useDispatch } from 'react-redux';
import { projectUpdate } from "../../features/AllProjectsSlice";

const ProjectDetails = (project) => {
  const dispatch = useDispatch();
  const isUpdated = useSelector((state) => state.allProjects.updated);
  const [editModal, setEditModal] = useState(false);
  const data = project.projectData;

  console.log(isUpdated)

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

  console.log(isUpdated)

  return (
    <div>
      <p>Project allocated time: {data.projectTimeBudget} hours</p>
      <button onClick={toggleModal}>Edit</button>
      <button>Delete</button>
      {editModal && <EditModal openModal = {editModal} closeModal={closeModal}>
        <NewProject updateProject={true} projectData={project} />
      </EditModal>}
    </div>
  )
}

export default ProjectDetails;