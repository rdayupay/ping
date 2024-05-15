import ChatPanel from './ChatPanel';
import MainChat from './MainChat';
import UserDetails from './UserDetails';

function ChatInterface() {
  return (
    <div className="flex h-screen px-4 py-4 mx-auto">
      <div className="w-1/4">
        <ChatPanel />
      </div>

      <div className="flex-1">
        <MainChat />
      </div>

      <div className="w-1/4">
        <UserDetails />
      </div>
    </div>
  );
}

export default ChatInterface;
