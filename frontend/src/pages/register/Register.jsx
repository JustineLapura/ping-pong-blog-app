import React, { useState } from "react";
import { Link } from "react-router-dom";
import "@fontsource/lora"; // Import Lora font
import { useSignup } from "../../hooks/useSignup";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, error, emptyFields, isLoading } = useSignup();
  console.log("emptyFields: ", emptyFields);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(username, email, password);
  };

  return (
    <div className="h-[92vh] flex flex-col justify-center items-center bg-cover bg-[url('https://images.pexels.com/photos/3771083/pexels-photo-3771083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]">
      <div className="fixed top-0 left-0 w-full min-h-screen bg-slate-50/10" />
      <span
        className="text-3xl font-semibold z-10 text-white"
        style={{ fontFamily: "Lora, serif" }}
      >
        Register
      </span>
      <form onSubmit={handleSubmit} className="flex flex-col mt-5 z-10">
        <label className="my-3 text-white" htmlFor="">
          Username
        </label>
        <input
          className={
            emptyFields && emptyFields.includes("username")
              ? "p-3 bg-white border-2 border-red-500"
              : "p-3 bg-white outline-none"
          }
          type="text"
          placeholder="Enter your username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="my-3 text-white" htmlFor="">
          Email
        </label>
        <input
          className={
            emptyFields && emptyFields.includes("email")
              ? "p-3 bg-white border-2 border-red-500"
              : "p-3 bg-white outline-none"
          }
          type="text"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="my-3 text-white" htmlFor="">
          Password
        </label>
        <input
          className={
            emptyFields && emptyFields.includes("password")
              ? "p-3 bg-white border-2 border-red-500"
              : "p-3 bg-white outline-none"
          }
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="mt-5 cursor-pointer bg-teal-600 border-none text-white rounded-full p-2"
          type="submit"
          disabled={isLoading}
        >
          Register
        </button>
        {error && (
          <p className="text-red-100 mt-4 text-center font-semibold">{error}</p>
        )}
      </form>
      <Link to="/login">
        <button className="absolute top-[60px] right-5 bg-red-400 cursor-pointer border-none px-3 py-1 rounded-lg text-white">
          Login
        </button>
      </Link>
    </div>
  );
};

export default Register;
