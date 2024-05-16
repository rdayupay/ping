import { useState } from 'react';

import SignIn from './SignIn';
import SignUp from './SignUp';

function Login() {
  const [showSignIn, setShowSignIn] = useState(true);

  return (
    <div className="flex flex-col items-center min-h-screen justify-center">
      {showSignIn ? <SignIn /> : <SignUp />}
      <button
        className="mt-4 underline"
        onClick={() => setShowSignIn(!showSignIn)}
      >
        {showSignIn ? 'Switch to Sign Up' : 'Switch to Sign In'}
      </button>
    </div>
  );
}

export default Login;
