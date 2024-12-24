import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/signup"
          className="text-lg text-blue-500 hover:text-blue-700 transition duration-200"
        >
          Register
        </Link>

        <Link
          to="/signin"
          className="text-lg text-blue-500 hover:text-blue-700 transition duration-200"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
