import ChatInterface from './components/ChatInterface';
import Login from './components/Login';
import { ToasterProvider } from './components/ToasterProvider';

function App() {
  const isUser = false;

  return (
    <>
      {isUser ? <ChatInterface /> : <Login />}
      <ToasterProvider />
    </>
  );
}

export default App;
