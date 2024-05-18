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

  return (
    <div>
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

        <button type="button" onClick={toggleAddUserModal}>
          {addUser ? (
            <Minus size={16} className="text-gray-300 cursor-pointer ml-1" />
          ) : (
            <Plus size={16} className="text-gray-300 cursor-pointer ml-1" />
          )}
        </button>
      </div>

      <ul className="no-scrollbar overflow-y-auto mt-6">
        {messages.map((message) => (
          <li
            className={`flex px-4 py-2 mt-2 mr-1 border-b border-gray-700 items-center cursor-pointer ${
              message.isSeen ? '' : 'bg-violet-900'
            }`}
            key={message.messageId}
            onClick={() => handleSelectMessage(message)}
          >
            <img
              src={message.user.avatar || './TSCat.jpg'}
              alt="User avatar"
              className="w-8 h-8 rounded-full object-cover mr-4"
            />
            <div>
              <span className="text-sm text-white">
                {message.user.username}
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
