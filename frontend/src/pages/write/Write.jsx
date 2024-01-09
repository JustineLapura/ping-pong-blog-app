import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useSnackbar } from "notistack";

const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [emptyFields, setEmptyFields] = useState(null);

  const { user } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const username = user?.user?.username || user?.updatedUser?.username;
  const navigate = useNavigate();
  console.log(username);

  const createPost = async (e) => {
    e.preventDefault();
    console.log("Form submitted!"); // Add this line

    const newPost = {
      username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("http://localhost:4000/api/upload/", data);
      } catch (error) {
        console.log("Error uploading file:", error);
      }
    }

    try {
      const response = await fetch("http://localhost:4000/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      const json = await response.json();

      if (!response.ok) {
        setEmptyFields(json.emptyFields);
        const errorMessage = json.error || "An error occurred";
        enqueueSnackbar(errorMessage, {
          variant: "error",
        });
      }

      if (response.ok) {
        enqueueSnackbar("Post has been created", { variant: "success" });
        console.log(json);
        navigate("/post/" + json.post._id);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      // Handle create post error
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-200 pt-[50px]">
      <img
        className="absolute w-[200px] bottom-16 right-4"
        src="https://media.giphy.com/media/Np8xe8PLMCZZDIJrML/giphy.gif"
        alt=""
      />
      <img
        className="absolute w-[200px] bottom-16 -left-6"
        src="https://media.giphy.com/media/4znhp9W6vwJ5KiDuTx/giphy.gif"
        alt=""
      />
      {file && (
        <img
          className="max-h-[300px] w-[70vw] mb-4 ms-[180px] rounded-lg object-cover"
          src={URL.createObjectURL(file)}
          alt=""
        />
      )}
      {/* {!file && (
        <img
          className="ml-[150px] h-[250px] w-[73vw] my-2 rounded-lg object-cover"
          src="https://images.pexels.com/photos/3987066/pexels-photo-3987066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
      )} */}
      <form onSubmit={createPost} className="ml-[150px] relative">
        {/* Title  */}
        <div className=" flex items-center gap-2">
          <label htmlFor="fileInput">
            <IoAddCircleOutline className="w-6 h-6 cursor-pointer text-gray-500" />
          </label>
          <input
            className="hidden"
            type="file"
            id="fileInput"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            className={
              emptyFields && emptyFields.includes("title")
                ? "text-xl p-5 w-[70vw] focus:outline-none border border-red-500 rounded"
                : "text-xl border-0 p-5 w-[70vw] focus:outline-none rounded"
            }
            type="text"
            placeholder="Title"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <br />
        {/* Form Group  */}
        <textarea
          placeholder="Tell your story..."
          type="text"
          className={
            emptyFields && emptyFields.includes("desc")
              ? "text-xl p-5 w-[72vw] focus:outline-none border border-red-500 rounded"
              : "text-xl border-0 p-5 w-[72vw] focus:outline-none rounded"
          }
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        ></textarea>
        <button
          type="submit"
          className="absolute top-3 right-16 text-white font-bold bg-teal-500 px-6 py-2 rounded-lg cursor-pointer text-lg"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default Write;
