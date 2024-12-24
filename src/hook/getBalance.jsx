import axios from "axios";
import { useEffect, useState } from "react";

export function useBalance() {
  const [amount, setAmount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBalance = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("aToken");
        const response = await axios.get(
          "http://localhost:8000/api/v1/account/balance",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setAmount(response.data.balance.toFixed(2));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getBalance();
  }, []);

  return { amount, loading, error };
}
