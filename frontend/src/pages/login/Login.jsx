import React, { useState } from "react";
import { Link } from "react-router-dom";
import "@fontsource/lora"; // Import Lora font
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, emptyFields, isLoading } = useLogin();
  console.log(emptyFields);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(username, password);
  };

  return (
    <div className="h-[92vh] flex flex-col justify-center items-center bg-cover bg-[url('https://images.pexels.com/photos/709134/pexels-photo-709134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]">
      <div className="fixed top-0 left-0 w-full min-h-screen bg-slate-50/10" />
      <span
        className="text-3xl font-semibold z-10 text-white"
        style={{ fontFamily: "Lora, serif" }}
      >
        Login
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
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="Enter your username..."
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
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Enter your password..."
        />
        <button
          className="mt-5 cursor-pointer bg-red-400 border-none text-white rounded-full p-2"
          type="submit"
        >
          Login
        </button>
        {error && (
          <p className="text-red-600 mt-4 text-center font-semibold">{error}</p>
        )}
      </form>
      <Link to="/register">
        <button className="absolute top-[60px] right-5 bg-teal-600 cursor-pointer border-none px-3 py-1 rounded-lg text-white">
          Register
        </button>
      </Link>
    </div>
  );
};

export default Login;
