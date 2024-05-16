import ChatInterface from './components/ChatInterface';
import Login from './components/Login';

function App() {
  const isUser = false;

  return <>{isUser ? <ChatInterface /> : <Login />}</>;
}

export default App;
