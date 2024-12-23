import { useState } from "react";
import { ClipboardList } from "lucide-react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="flex items-center mb-8">
          <ClipboardList className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-2xl font-bold text-blue-600">YQMS</span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Please enter login details below
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              User Name
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter the Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-sm text-gray-600 hover:text-blue-600">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Log in
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or continue</span>
            </div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <img
              src="https://192.167.4.113/IMG/logo.jpg"
              alt="Google"
              className="h-5 w-5 mr-2"
            />
            Log in with YAi Credentials
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Register
            </a>
          </p>
        </form>
      </div>

      {/* Right Section */}
      <div className="hidden lg:flex lg:flex-1 bg-black items-center justify-center p-12">
        <div className="max-w-2xl text-center">
          <img
            src="https://cdn.sanity.io/images/ztw74qc4/production/91213435f1cf5293b2105aea50d48c3df854ce68-1200x664.jpg?w=1536&fit=max&auto=format"
            alt="Quality Management"
            className="w-full rounded-lg shadow-lg mb-8"
          />
          <p className="text-xl text-gray-600 italic">
            Manage your QC, QA Inspection and Reports with YQMS...
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
