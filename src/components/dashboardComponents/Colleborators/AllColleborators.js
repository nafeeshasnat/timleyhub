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
    <div className="container mx-auto mt-10">
      <div>
        <h1>All Collaborators</h1>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:opacity-85 sm:mt-0 sm:w-auto"
          onClick={() => setEditModal(true)}>
          Invite collaborators
        </button>
        {editModal && <EditModal openModal = {editModal} closeModal={closeModal}>
          <h2 className="text-xl mb-4 font-bold text-center">Add a colleborator</h2>
          <p className="text-left text-sm font-medium text-gray-500 text-center">Invite will be sent over email</p>
          <InviteColleborator/>
        </EditModal>}
      </div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
                <tbody className="bg-white divide-y divide-gray-200">
                  {collaborators.map((colleborator, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{colleborator.firstName} {colleborator.lastName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{colleborator.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 capitalize">{colleborator.role == 'comAdmin' ? 'Admin' : colleborator.role}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllColleborators;