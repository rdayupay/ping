import { auth } from '../lib/firebase';
import { useMessageStore } from '../lib/messageStore';
import ChatPanel from './ChatPanel';
import MainChat from './MainChat';
import UserDetails from './UserDetails';

function ChatInterface() {
  const { messageId } = useMessageStore();

  return (
    <div className="grid grid-cols-4 h-screen px-4 py-4 mx-auto">
      <div className="col-span-1 border-r border-gray-700">
        <ChatPanel />
      </div>

      <div className="col-span-2 border-r border-gray-700">
        {messageId ? (
          <MainChat />
        ) : (
          <div className="flex items-center justify-center h-full">
            Select a message to start chatting
          </div>
        )}
      </div>

      <div className="col-span-1 flex flex-col justify-between">
        {messageId ? <UserDetails /> : <div className="flex-grow"></div>}

        <button
          type="button"
          className="mx-2 text-center text-md text-white bg-blue-700 py-2 w-full rounded-md hover:bg-blue-600 mb-6"
          onClick={() => auth.signOut()}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ChatInterface;
