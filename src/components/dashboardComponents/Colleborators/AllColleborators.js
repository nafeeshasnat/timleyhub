import { useState, useEffect } from "react";
import EditModal from "../EditModal";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCollaborators } from "../../../actions/collaboratorsActions";
import InviteColleborator from "./InviteColleborator";

const AllColleborators = () => {
  const [editModal, setEditModal] = useState(false);
  const dispatch = useDispatch();
  const collaborators = useSelector(state => state.collaborators.collaborators);

  useEffect(() => {
    dispatch(fetchCollaborators());
  }, [dispatch]);

  const closeModal = () => {
    setEditModal(false); // Function to close the modal
  };

  return (
    <div className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">All Collaborators</h1>
        <button
          type="button"
          className="mt-3 inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => setEditModal(true)}>
          Invite Collaborators
        </button>
        {editModal && (
          <EditModal openModal={editModal} closeModal={closeModal}>
            <div className="p-5">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Add a Collaborator</h2>
              <p className="text-sm text-gray-500">Invitations will be sent over email.</p>
              <InviteColleborator />
            </div>
          </EditModal>
        )}
      </div>
      <div className="mt-6">
        <div className="align-middle inline-block min-w-full border-b border-gray-200 shadow sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email Address
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {collaborators.map((collaborator, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{collaborator.firstName} {collaborator.lastName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{collaborator.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${collaborator.role === 'comAdmin' ? 'bg-green-100 text-green-800' : collaborator.invitationToken ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                      {collaborator.role === 'comAdmin' ? 'Admin' : collaborator.invitationToken ? 'Invited' : collaborator.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllColleborators;
