import { useEffect, useState } from "react";
import axios from "axios";

export function useUsers() {
  const [allUsers, setAllUsers] = useState(null);
  useEffect(() => {
    const sendingToken = async () => {
      const token = localStorage.getItem("aToken");

      if (token) {
        // sending token from frontend to backend for authentication
        const response = await axios.get("http://localhost:8000/api/v1/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAllUsers(response.data.user);
      } else {
        console.log("No token found, user is not authenticated");
      }
    };
    sendingToken();
  }, []);

  return allUsers;
}

// useEffect(() => {
//   const getFilterUser = async () => {
//     const response = await axios.get(
//       "http://localhost:8000/api/v1/user?filterName=" + search
//     );

//     setAllUsers(response.data.user);
//   };
//   getFilterUser();
// }, [search]);
