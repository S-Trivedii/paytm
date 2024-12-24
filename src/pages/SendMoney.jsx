import { useState, useEffect } from "react";
import { useSingleUser } from "../hook/getSingleUser";
import { useBalance } from "../hook/getBalance";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function SendMoney() {
  const [sendingAmountInfo, setSendingAmountInfo] = useState({
    to: "",
    amount: null,
  });
  const [loading, setLoading] = useState(true);
  const [errorMssg, setErrorMssg] = useState("");
  const [successMssg, setSuccessMssg] = useState("");

  // custom hook
  const singleuser = useSingleUser();
  const { amount } = useBalance();

  // useParams
  const { userId } = useParams();

  // Navigation
  const navigate = useNavigate();

  // Loading is necessary since API call is not completed
  useEffect(() => {
    if (singleuser) {
      setLoading(false);
    }
  }, [singleuser]);

  const handleChange = (e) => {
    setSendingAmountInfo({
      ...sendingAmountInfo,
      [e.target.name]: Number(e.target.value),
      to: userId,
    });
  };

  const handleClick = async () => {
    if (sendingAmountInfo.amount > amount) {
      setErrorMssg("You do not have sufficient balance");
    } else {
      try {
        const token = localStorage.getItem("aToken");

        const response = await axios.post(
          `http://localhost:8000/api/v1/account/transfer`,
          sendingAmountInfo,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          navigate("/dashboard");
        } else {
          setSuccessMssg(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Send Money
        </h1>

        {loading ? (
          <div className="text-center text-gray-700">Loading...</div>
        ) : (
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-500 text-white rounded-full mr-3">
              {singleuser.user.firstname[0].toUpperCase()}
            </div>
            <div className="text-lg font-medium text-gray-700">
              {`${singleuser.user.firstname} ${singleuser.user.lastname}`}{" "}
            </div>
          </div>
        )}

        <label className="block text-gray-600 font-semibold mb-2">
          Amount (Rs)
        </label>
        <div className="flex flex-col items-center mb-4">
          <input
            type="number"
            name="amount"
            value={sendingAmountInfo.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleClick}
            className="bg-blue-500 mt-4 w-full text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Initiate Transfer
          </button>
          {errorMssg && <span className="mt-4 text-red-500">{errorMssg}</span>}
          {successMssg && (
            <span className="mt-4 text-green-500">{successMssg}</span>
          )}
        </div>
      </div>
    </div>
  );
}
