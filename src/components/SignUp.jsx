import { useState } from 'react';

function SignUp() {
  const [avatar, setAvatar] = useState({
    file: null,
    url: '',
  });

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
      <form className="space-y-6">
        <label
          htmlFor="file"
          className="flex items-center justify-center underline cursor-pointer"
        >
          <img
            src={avatar.url || './TSCat.jpg'}
            alt="Avatar"
            className="w-12 h-12 rounded-full mr-2"
          />
          Upload an image
        </label>
        <input
          type="file"
          id="file"
          className="hidden"
          onChange={handleAvatar}
        />
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500  py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
