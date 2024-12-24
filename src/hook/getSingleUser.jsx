import axios from "axios";
import { useState, useEffect } from "react";

// function for getting single user
export function useSingleUser() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("aToken");

      const response = await axios.get(
        "http://localhost:8000/api/v1/user/singleuser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);
    };
    getUser();
  }, []);

  return user;
}
