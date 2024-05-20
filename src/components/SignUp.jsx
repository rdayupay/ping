import { useState } from 'react';
import toast from 'react-hot-toast';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { auth, db } from '../lib/firebase';
import upload from '../lib/upload';

function SignUp() {
  const [avatar, setAvatar] = useState({
    file: null,
    url: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);

    const { username, email, password } = Object.fromEntries(formData);

    if (!avatar.file) {
      toast.error('Please upload an avatar.');
      setLoading(false);
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const imgUrl = await upload(avatar.file);

      await setDoc(doc(db, 'users', res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });

      await setDoc(doc(db, 'userMessages', res.user.uid), {
        messages: [],
      });

      toast.success('Account created successfully! You can now sign in.');

      setAvatar({
        file: null,
        url: '',
      });

      event.target.reset();
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatar = (event) => {
    if (!event.target.files[0]) {
      return;
    }

    setAvatar({
      file: event.target.files[0],
      url: URL.createObjectURL(event.target.files[0]),
    });
  };

  return (
    <div className="bg-violet-600 p-8 rounded-lg shadow-lg w-full max-w-md bg-opacity-75">
      <h2 className="text-3xl mb-6 text-center">Create an Account</h2>
      <form className="space-y-6" onSubmit={handleSignUp}>
        <label
          htmlFor="file"
          className="flex items-center justify-center underline cursor-pointer"
        >
          <img
            src={avatar.url || './TSCat.jpg'}
            alt="Avatar"
            className="w-12 h-12 rounded-full object-cover mr-2"
          />
          Upload an image
        </label>
        <input
          type="file"
          id="file"
          className="hidden"
          onChange={handleAvatar}
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-400"
          disabled={loading}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-400"
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-400"
          disabled={loading}
        />
        <button
          type="submit"
          className="w-full bg-blue-500  py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
