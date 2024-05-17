import { collection, getDocs, query, where } from 'firebase/firestore';
import PropTypes from 'prop-types';
import { X } from 'react-feather';
import { db } from '../lib/firebase';
import { useState } from 'react';

function AddUserModal({ onClose }) {
  const [user, setUser] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');

    try {
      const userRef = collection(db, 'users');

      const q = query(userRef, where('username', '==', username));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setUser(querySnapshot.docs[0].data());
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          <form
            className="flex flex-col md:flex-row mb-6"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="text-black w-full md:w-auto px-4 py-2 rounded-md bg-slate-200 border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="text-sm mt-2 md:mt-0 ml-0 md:ml-2 px-4 md:w-auto bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Search
            </button>
          </form>

          {user && (
            <div className="flex items-center">
              <img
                src={user.avatar || './Selena.png'}
                alt="Selena Gomez smiling"
                className="w-10 h-10 rounded-full object-cover mr-4"
              />
              <span className="text-md text-gray-600 font-semibold mr-2">
                {user.username}
              </span>

              <button className="text-sm ml-auto bg-violet-800 text-white px-4 py-2 rounded-md hover:bg-violet-600 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2">
                Add User
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

AddUserModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddUserModal;
