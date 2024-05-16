import PropTypes from 'prop-types';
import { X } from 'react-feather';

function AddUserModal({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative p-8">
        <button
          onClick={onClose}
          className="absolute bg-red-500 top-2 right-2 rounded-full p-1"
        >
          <X size={16} />
        </button>

        <div className="bg-white p-8 rounded-md shadow-lg">
          <form className="flex flex-col md:flex-row mb-6">
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="text-black w-full md:w-auto px-4 py-2 rounded-md bg-slate-200 border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="text-sm mt-2 md:mt-0 ml-0 md:ml-2 px-4 md:w-auto bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Search
            </button>
          </form>

          <div className="flex items-center">
            <img
              src="./Selena.png"
              alt="Selena Gomez smiling"
              className="w-10 h-10 rounded-full object-cover mr-4"
            />
            <span className="text-md text-gray-600 font-semibold mr-2">
              Selena Gomez
            </span>

            <button className="text-sm ml-auto bg-violet-800 text-white px-4 py-2 rounded-md hover:bg-violet-600 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2">
              Add User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

AddUserModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddUserModal;
