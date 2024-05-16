import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import toast from 'react-hot-toast';

import { auth } from '../lib/firebase';

function SignIn() {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);

    const { email, password } = Object.fromEntries(formData);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-violet-600 p-8 rounded-lg shadow-lg w-full max-w-md bg-opacity-75">
      <h2 className="text-3xl mb-6 text-center">Welcome back!</h2>
      <form className="space-y-6" onSubmit={handleSignIn}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="w-full px-4 py-2  rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-400"
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="w-full px-4 py-2  rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-400"
          disabled={loading}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400"
          disabled={loading}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
