import { useState } from "react";
import EditModal from "./EditModal";
import NewProject from "./NewProject";

const ProjectDetails = (project) => {
  const [editModal, setEditModal] = useState(false);
  const data = project.projectData;

  const toggleModal = () => {
    setEditModal(!editModal); // Toggle the modal state
  };

  const closeModal = () => {
    setEditModal(false); // Function to close the modal
  };

  return (
    <div>
      <p>Project allocated time: {data.projectTimeBudget} hours</p>
      <button onClick={toggleModal}>Edit</button>
      <button>Delete</button>
      {editModal && <EditModal openModal = {editModal} closeModal={closeModal}>
        <NewProject />
      </EditModal>}
    </div>
  )
}

export default ProjectDetails;