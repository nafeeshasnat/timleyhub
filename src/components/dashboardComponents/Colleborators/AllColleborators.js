const colleborators = [
  {
    name: 'Nafees Hasnat (Account Owner)',
    email: 'nafis5566@icloud.com',
    isAdmin: true,
  },
  {
    name: 'Nafees H',
    email: 'nafis5566@gmail.com',
    isAdmin: false,
  },
  // ... other colleborators
];

const AllColleborators = () => {
  
  return (
    <div className="container mx-auto mt-10">
      <div>
        <h1>All Collaborators</h1>
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
                      Admin
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {colleborators.map((colleborator, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{colleborator.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{colleborator.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {colleborator.isAdmin ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"> Admin </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"> colleborator </span>
                        )}
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