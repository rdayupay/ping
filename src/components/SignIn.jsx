function SignIn() {
  return (
    <div className="bg-violet-600 p-8 rounded-lg shadow-lg w-full max-w-md bg-opacity-75">
      <h2 className="text-3xl mb-6 text-center">Welcome back!</h2>
      <form className="space-y-6">
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="w-full px-4 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="w-full px-4 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
