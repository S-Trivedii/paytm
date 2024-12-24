import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const onHandleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSendData = async () => {
    try {
      // this response contains the userId for which we have the balance
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        userData,
        {
          withCredentials: true,
        }
      );

      setUserData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      });
      navigate("/signin");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex items-center justify-center">
          <Heading label="Sign up" />
        </div>
        <SubHeading label="Enter your information to create an account" />
        {""}
        <InputBox
          label="First Name:"
          placeHolder="John"
          changeInput={onHandleChange}
          value={userData.firstname}
          name="firstname"
          inputType="text"
        />
        <InputBox
          label="Last Name:"
          placeHolder="Doe"
          changeInput={onHandleChange}
          value={userData.lastname}
          name="lastname"
          inputType="text"
        />
        <InputBox
          label="Email:"
          placeHolder="john@gmail.com"
          changeInput={onHandleChange}
          value={userData.email}
          name="email"
          inputType="email"
        />
        <InputBox
          label="Password:"
          placeHolder="••••••••"
          changeInput={onHandleChange}
          value={userData.password}
          name="password"
          inputType="password"
        />
        <Button onPress={handleSendData} label="Sign Up" />
        {""}
        <div className="flex justify-center">
          <BottomWarning label="Already have an account? " />
          <Link to="/signin" className="text-blue-500 text-sm hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
