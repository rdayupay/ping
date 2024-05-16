import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import ChatInterface from './components/ChatInterface';
import Login from './components/Login';
import { ToasterProvider } from './components/ToasterProvider';
import { auth } from './lib/firebase';
import { useUserStore } from './lib/userStore';

function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (authUser) => {
      fetchUserInfo(authUser?.uid);
    });

    return () => unSubscribe();
  }, [fetchUserInfo]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {currentUser ? <ChatInterface /> : <Login />}
      <ToasterProvider />
    </>
  );
}

export default App;
