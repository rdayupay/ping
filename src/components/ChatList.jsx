import { useEffect, useState } from 'react';
import { Search, Plus, Minus } from 'react-feather';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';

import AddUserModal from './AddUserModal';
import { useUserStore } from '../lib/userStore';
import { db } from '../lib/firebase';
import { useMessageStore } from '../lib/messageStore';

function ChatList() {
  const [addUser, setAddUser] = useState(false);
  const [messages, setMessages] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const { currentUser } = useUserStore();
  const { messageId, selectMessage } = useMessageStore();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, 'userMessages', currentUser.id),
      async (res) => {
        const items = res.data().messages;

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, 'users', item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return {
            ...item,
            user,
          };
        });

        const messageData = await Promise.all(promises);

        setMessages(messageData.sort((a, b) => a.updatedAt - b.updatedAt));
      }
    );

    return () => unsubscribe();
  }, [currentUser.id]);

  const toggleAddUserModal = () => {
    setAddUser(!addUser);
  };

  const handleSelectMessage = async (message) => {
    const userMessage = messages.map((msg) => {
      const { user, ...rest } = msg;

      return rest;
    });

    const messageIndex = userMessage.findIndex(
      (msg) => msg.messageId === message.messageId
    );

    userMessage[messageIndex].isSeen = true;

    const userMessagesRef = doc(db, 'userMessages', currentUser.id);

    try {
      await updateDoc(userMessagesRef, {
        messages: userMessage,
      });

      selectMessage(message.messageId, message.user);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredMessages = messages.filter((message) =>
    message.user.username.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center mx-2">
        <div className="flex items-center px-2 py-1 bg-gray-200 rounded-md w-full">
          <Search size={14} className="text-gray-400 mr-1 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none text-black text-sm overflow-hidden w-full"
            maxLength={30}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <button
          type="button"
          onClick={toggleAddUserModal}
          className="flex text-xs w-34 items-center bg-violet-600 rounded-lg mx-2 p-1"
        >
          <Plus size={16} className="text-gray-300 cursor-pointer" />
        </button>
      </div>

      <ul className="no-scrollbar overflow-y-auto mt-6">
        {filteredMessages.map((message) => (
          <li
            className={`flex px-4 py-2 mt-2 mr-1 border-l-4 items-center cursor-pointer ${
              message.isSeen ? '' : 'bg-violet-900'
            } ${
              messageId === message.messageId
                ? 'border-blue-500'
                : 'border-transparent'
            }`}
            key={message.messageId}
            onClick={() => handleSelectMessage(message)}
          >
            <img
              src={
                message.user.blocked.includes(currentUser.id)
                  ? './TSCat.jpg'
                  : message.user.avatar || './TSCat.jpg'
              }
              alt="User avatar"
              className="w-8 h-8 rounded-full object-cover mr-4"
            />
            <div>
              <span className="text-sm text-white">
                {message.user.blocked.includes(currentUser.id)
                  ? 'User'
                  : message.user.username}
              </span>
              <p className="text-xs text-gray-200">{message.lastMessage}</p>
            </div>
          </li>
        ))}
      </ul>

      {addUser && <AddUserModal onClose={toggleAddUserModal} />}
    </div>
  );
}

export default ChatList;
