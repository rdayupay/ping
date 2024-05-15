import { useState } from 'react';
import { Search, Plus, Minus } from 'react-feather';

function ChatList() {
  const [addUser, setAddUser] = useState(false);

  return (
    <div className="flex items-center ">
      <div className="flex items-center px-2 py-1 bg-gray-200 rounded-md ml-2 w-20 lg:w-52 md:w-40">
        <Search size={14} className="text-gray-400 mr-1 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent focus:outline-none text-black flex-1 text-sm overflow-hidden max-w-full"
          maxLength={30}
        />
      </div>

      <button type="button" onClick={() => setAddUser(!addUser)}>
        {addUser ? (
          <Plus size={16} className="text-gray-300 cursor-pointer ml-1" />
        ) : (
          <Minus size={16} className="text-gray-300 cursor-pointer ml-1" />
        )}
      </button>
    </div>
  );
}

export default ChatList;
