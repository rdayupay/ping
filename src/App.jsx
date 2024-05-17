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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <>
      {currentUser ? <ChatInterface /> : <Login />}
      <ToasterProvider />
    </>
  );
}

export default App;
