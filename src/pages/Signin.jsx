import { Link, useNavigate } from "react-router-dom";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { useState } from "react";
import axios from "axios";

export default function Signin() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const onHandleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendData = async () => {
    // will send a post request to the backend
    const response = await axios.post(
      "http://localhost:8000/api/v1/user/login",
      userData,
      { withCredentials: true }
    );

    const tokenFromBackend = response.data.token;
    

    // storing token in local storage
    localStorage.setItem("aToken", tokenFromBackend);
    setUserData({
      email: "",
      password: "",
    });

    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex items-center justify-center">
          <Heading label="Sign In" />
        </div>
        <SubHeading label="Enter your email and password to login" />
        {""}
        <InputBox
          label="Email:"
          placeHolder="john@gmail.com"
          value={userData.email}
          name="email"
          changeInput={onHandleChange}
          inputType="email"
        />
        <InputBox
          label="Password:"
          placeHolder="••••••••"
          value={userData.password}
          name="password"
          changeInput={onHandleChange}
          inputType="password"
        />
        <Button label="Sign In" onPress={handleSendData} />
        <div className="flex justify-center">
          <BottomWarning label="Don't have an account? " />
          <Link to="/signup" className="text-blue-500 text-sm hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
