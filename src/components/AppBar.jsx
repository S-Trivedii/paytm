import { Link, useNavigate } from "react-router-dom";

export default function AppBar({ singleUser }) {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem("aToken");
    navigate("/signin");
  };
  return (
    <div className="border-b border-gray-300">
      <div className="flex items-center justify-between mt-2 mx-12 ">
        <h1 className="text-2xl font-bold">PayTM App</h1>
        <div className="flex justify-center">
          {singleUser.user.firstname ? (
            <>
              <div className="p-4 text-2xl">Hello</div>
              <div className="bg-gray-400 mt-2 p-4 text-2xl w-12 h-12 rounded-full flex items-center justify-center">
                {singleUser.user.firstname[0].toUpperCase()}
              </div>
              <div>
                <button
                  className="bg-red-500 m-3 text-white py-2 px-4 rounded-lg hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200"
                  onClick={handleClick}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <Link to="/signup">Register</Link>
              </div>
              <div>
                <Link to="/signin">Login</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
