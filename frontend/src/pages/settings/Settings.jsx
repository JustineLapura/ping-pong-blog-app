import React, { useContext, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import "@fontsource/poppins"; // Import Poppins font

import Sidebar from "../../components/sidebar/Sidebar";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user, dispatch } = useContext(AuthContext);
  const userData = user?.user || user?.updatedUser;
  const { enqueueSnackbar } = useSnackbar();

  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  // image location
  const PF = "http://localhost:4000/images/";
  console.log(emptyFields);

  const navigate = useNavigate();

  console.log("userData: ", userData);

  // const handleUpdate = async (e) => {
  //   e.preventDefault();

  //   const updatedUser = new FormData();
  //   updatedUser.append("userId", userData._id);
  //   updatedUser.append("username", username);
  //   updatedUser.append("email", email);
  //   updatedUser.append("password", password);

  //   if (file) {
  //     updatedUser.append("profilePic", file);
  //   }

  //   const url = `http://localhost:4000/api/user/${userData._id}`;

  //   try {
  //     const response = await fetch(url, {
  //       method: "PUT",
  //       body: updatedUser,
  //     });

  //     const json = await response.json();

  //     if (!response.ok) {
  //       enqueueSnackbar("Profile update error", { variant: "error" });
  //       setError(json.error);
  //       setEmptyFields(json.emptyFields);
  //     }

  //     if (response.ok) {
  //       console.log("UPDATED_USER: ", json);
  //       localStorage.setItem("User", JSON.stringify(json));
  //       dispatch({ type: "LOGIN", payload: json });

  //       setError(null);
  //       enqueueSnackbar("Profile updated successfully", { variant: "success" });
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //     // Handle update profile error
  //   }
  // };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("Form submitted!"); // Add this line

    const updatedUser = {
      userId: userData._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePicture = filename;
      try {
        await axios.post("http://localhost:4000/api/upload/", data);
      } catch (error) {
        console.log("Error uploading file:", error);
      }
    }

    const url = `http://localhost:4000/api/user/${userData._id}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      const json = await response.json();

      if (!response.ok) {
        const errorMessage = json.error || "An error occurred";
        enqueueSnackbar(errorMessage, { variant: "error" });
        setError(json.error);
        setEmptyFields(json.emptyFields);
      }

      if (response.ok) {
        console.log("UPDATED_USER: ", json);
        localStorage.setItem("User", JSON.stringify(json));
        dispatch({ type: "LOGIN", payload: json });

        setError(null);
        enqueueSnackbar("Profile updated successfully", { variant: "success" });
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle update profile error
    }

    // try {
    //   const response = await axios.put(
    //     "http://localhost:4000/api/user/" + userData._id,
    //     updatedUser
    //   );

    //   const json = await response.data;

    //   if (!response.ok) {
    //     enqueueSnackbar("Profile update error", { variant: "error" });
    //     setError(json.error);
    //     setEmptyFields(json.emptyFields);
    //   }

    //   if (response.ok) {
    //     enqueueSnackbar("Profile updated successfuly", { variant: "success" });
    //     setError(null);
    //     navigate("/");
    //   }
    // } catch (error) {
    //   console.error("Error creating post:", error);
    //   // Handle create post error
    // }
  };

  return (
    <div
      style={{ fontFamily: "Poppins, sans-serif" }}
      className="relative flex bg-gray-100"
    >
      <img
        className="absolute bottom-[42%] left-0 w-32 "
        src="https://media.giphy.com/media/y1apf6P1FHRKcRV7Wp/giphy.gif"
        alt=""
      />
      <img
        className="absolute bottom-[42%] right-[26%] w-32 "
        src="https://media.giphy.com/media/9V5tmbpfUQcPV6IARH/giphy.gif"
        alt=""
      />
      <div className="w-3/4 p-2">
        <div className="flex justify-between items-center">
          <span className="text-2xl text-blue-900 font-semibold">
            Update Your Account
          </span>
          <span className="text-red-600 cursor-pointer font-bold">
            Delete Account
          </span>
        </div>
        {/* Settings Form  */}
        <form className="flex flex-col" onSubmit={handleUpdate}>
          <div className="flex flex-col items-center justify-center">
            <label className="text-2xl mt-5 font-bold">Profile Picture</label>
            <div className="my-3 flex flex-col justify-center gap-2 items-center">
              {!userData?.profilePicture && (
                <img
                  className="w-24 h-24 rounded-full object-cover"
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : "https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-vector-contact-symbol-illustration-184752213.jpg"
                  }
                  alt=""
                />
              )}
              {userData?.profilePicture && (
                <img
                  className="w-24 h-24 rounded-full object-cover"
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : PF + userData.profilePicture
                  }
                  alt=""
                />
              )}
              <label
                className="text-xl flex items-center gap-1"
                htmlFor="fileInput"
              >
                <FaRegUserCircle className="w-6 h-6 flex justify-center items-center cursor-pointer" />
                <span className="text-sm cursor-pointer">change</span>
              </label>
            </div>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label className="text-xl mt-4 text-center">Username</label>
          <input
            className={
              emptyFields && emptyFields.includes("username")
                ? "h-8 w-[500px] mx-auto text-color-gray-600 my-3 focus:outline-none ps-1 border rounded bg-gray-200 border-red-500"
                : "h-8 w-[500px] rounded mx-auto text-color-gray-600 my-3 focus:outline-none ps-1 border-b bg-gray-200 border-gray-300"
            }
            type="text"
            placeholder={userData?.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="text-xl mt-4 text-center">Email</label>
          <input
            className={
              emptyFields && emptyFields.includes("email")
                ? "h-8 w-[500px] mx-auto text-color-gray-600 my-3 focus:outline-none ps-1 border rounded bg-gray-200 border-red-500"
                : "h-8 w-[500px] rounded mx-auto text-color-gray-600 my-3 focus:outline-none ps-1 border-b bg-gray-200 border-gray-300"
            }
            type="text"
            placeholder={userData?.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="text-xl mt-4 text-center">Password</label>
          <input
            className={
              emptyFields && emptyFields.includes("password")
                ? "h-8 w-[500px] mx-auto text-color-gray-600 my-3 focus:outline-none ps-1 border rounded bg-gray-200 border-red-500"
                : "h-8 w-[500px] rounded mx-auto text-color-gray-600 my-3 focus:outline-none ps-1 border-b bg-gray-200 border-gray-300"
            }
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-[150px] mx-auto border-none bg-teal-600 text-white cursor-pointer rounded-lg py-1"
            type="submit"
          >
            Update
          </button>
          {error && (
            <p className="text-red-500 mt-2 text-center font-semibold">
              {error}
            </p>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Settings;
