import { useEffect, useState } from "react";
import { useUsers } from "../hook/getUsers";
import { Link } from "react-router-dom";
import AppBar from "../components/AppBar";
import Search from "../components/Search";
import { useBalance } from "../hook/getBalance";
import { useSingleUser } from "../hook/getSingleUser";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [allFilteredUser, setAllFilteredUser] = useState([]);

  // custom hook
  const allUsers = useUsers();
  const singleuser = useSingleUser();
  const { amount, loading, error } = useBalance();

  useEffect(() => {
    setAllFilteredUser(allUsers || []);
  }, [allUsers]);

  const isLoadingSingleUser = !singleuser;

  const handleChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);

    const filteredUser = allUsers.filter((user) => {
      const fullname = `${user.firstname} ${user.lastname}`;
      return (
        user.firstname.toLowerCase().includes(newSearch.toLowerCase()) ||
        user.lastname.toLowerCase().includes(newSearch.toLowerCase()) ||
        fullname.toLowerCase().includes(newSearch.toLowerCase())
      );
    });

    setAllFilteredUser(filteredUser.length > 0 ? filteredUser : allUsers);
  };

  return (
    <>
      {isLoadingSingleUser ? (
        <p>Loading...</p>
      ) : (
        <>
          <AppBar singleUser={singleuser} />
        </>
      )}

      <div className="mx-6">
        <p className="font-bold text-xl m-6">
          Your balance Rs: {loading ? "Loading..." : error ? error : amount}
        </p>
        <p className="font-bold text-xl m-6">Users</p>
        <Search onType={handleChange} value={search} />
        <div className="flex m-4 flex-col">
          {allFilteredUser.length > 0 ? (
            allFilteredUser.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between w-full mb-2"
              >
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-gray-400 rounded-full mr-2">
                    {user.firstname[0].toUpperCase()}
                  </div>
                  {`${user.firstname} ${user.lastname}`}
                </div>
                <Link
                  to={`/send/${user._id}`}
                  className="ml-auto py-2 px-3 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
                >
                  Send Money
                </Link>
              </div>
            ))
          ) : (
            <div>No user found</div>
          )}
        </div>
      </div>
    </>
  );
}
