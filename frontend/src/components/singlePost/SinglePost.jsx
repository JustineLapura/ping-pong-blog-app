import React, { useContext, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import "@fontsource/lora"; // Import Lora font
import "@fontsource/varela-round"; // Import Varela Round font
import "@fontsource/poppins"; // Import Poppins font
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useSnackbar } from "notistack";

const SinglePost = () => {
  const [post, setPost] = useState(null);
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);

  const userData = user?.user || user?.updatedUser;
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const PF = "http://localhost:4000/images/";

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  console.log("Path: ", id);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/blogs/${id}`
        );
        setPost(response.data);
        setTitle(response.data.title);
        setDesc(response.data.desc);
      } catch (error) {
        console.log("Error Fetching: ", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:4000/api/blogs/" + id, {
        data: {
          username: userData.username,
        },
      });
      enqueueSnackbar("Post has been deleted", { variant: "success" });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userData.username,
          title,
          desc,
        }),
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
        enqueueSnackbar("Post has been updated", { variant: "success" });
        setUpdateMode(false);
      }
    } catch (error) {
      console.error("Error updating post:", error);
      // Handle update post error
    }

    // try {
    //   const response = await axios.put(
    //     "http://localhost:4000/api/blogs/" + id,
    //     {
    //       username: userData.username,
    //       title,
    //       desc,
    //     }
    //   );

    //   const json = await response.json();

    //   if (!response.ok) {
    //     setEmptyFields(json.emptyFields);
    //     const errorMessage = json.error || "An error occurred";
    //     enqueueSnackbar(errorMessage, {
    //       variant: "error",
    //     });
    //   }

    //   if (response.ok) {
    //     enqueueSnackbar("Post has been updated", { variant: "success" });
    //     setUpdateMode(false);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className="w-3/4 p-5">
      <div className="relative">
        <Link to="..">
          <p className="absolute duration-200 text-white  px-5 py-2 hover:scale-110 font-semibold">
            Go Back
          </p>
        </Link>
        {post && (
          <>
            {!post.photo && (
              <img
                className="w-full h-[400px] object-cover rounded-lg"
                src="https://images.pexels.com/photos/3601081/pexels-photo-3601081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
            )}
            {post.photo && (
              <img
                className="w-full h-[400px] object-cover rounded-lg"
                src={PF + post.photo}
                alt={post.title}
              />
            )}
          </>
        )}
        {/* Title  */}
        <div className="w-full flex items-center">
          {updateMode && (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={
                emptyFields && emptyFields.includes("title")
                  ? "w-full text-center mt-2 me-2 py-1 border border-red-500 rounded outline-none"
                  : "w-full text-center mt-2 me-2 py-1 border border-gray-500 rounded outline-none"
              }
              autoFocus
            />
          )}
          {!updateMode && (
            <h1
              style={{ fontFamily: "Lora, serif" }}
              className="w-full text-center m-4 text-2xl italic font-bold"
            >
              {title}
            </h1>
          )}
          <div className="flex items-center gap-2 text-xl">
            {post && post.username === userData?.username && (
              <>
                <FaRegEdit
                  className="cursor-pointer text-teal-700"
                  onClick={() => setUpdateMode(!updateMode)}
                />
                <MdDeleteOutline
                  className="cursor-pointer text-red-500"
                  onClick={() => setDeleteModal(true)}
                />
              </>
            )}
          </div>
        </div>
        {/* Post Info  */}
        <div
          style={{ fontFamily: "Varela Round, sans-serif" }}
          className="flex justify-between items-center my-4 text-yellow-600"
        >
          {post && (
            <span>
              Author:
              <Link to={`/?user=${post.username}`}>
                <b className="cursor-pointer transform hover:scale-105 ml-2">
                  {post.username}
                </b>
              </Link>
            </span>
          )}

          <span className="">
            {post && new Date(post.createdAt).toLocaleString()}
          </span>
        </div>
        {updateMode && (
          <textarea
            name=""
            id=""
            cols="30"
            rows="2"
            className={
              emptyFields && emptyFields.includes("desc")
                ? "w-full border border-red-500 rounded p-2 outline-none"
                : "w-full border border-gray-500 rounded p-2 outline-none"
            }
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          />
        )}
        {!updateMode && (
          <p className="" style={{ fontFamily: "Poppins, sans-serif" }}>
            {desc}
          </p>
        )}
        {updateMode && (
          <div className="w-full flex items-center justify-end">
            <button
              className="bg-green-600 text-white py-1 px-4 rounded"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        )}
      </div>

      {/* Delete Modal  */}
      <div
        className={
          deleteModal
            ? "fixed h-[300px] w-[400px] px-6 flex flex-col justify-center items-center gap-10 text-blue-900 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-white rounded-2xl z-30 ease-in duration-300"
            : "fixed h-[300px] w-[400px] px-6 flex flex-col justify-center items-center gap-10 text-blue-900 left-1/2 top-[-100%] transform -translate-x-1/2 -translate-y-1/2 py-10 bg-white rounded-2xl z-20 ease-in duration-300"
        }
      >
        <h1 className="text-2xl text-gray-900 font-bold text-center">
          Are you sure you want to delete this post?
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => setDeleteModal(false)}
            className="bg-red-500 px-6 py-2 rounded-full text-white"
          >
            No
          </button>
          <button
            onClick={handleDelete}
            className="bg-blue-800 px-6 py-2 rounded-full text-white"
          >
            Yes
          </button>
        </div>
      </div>
      {deleteModal && (
        <div
          onClick={() => setDeleteModal(false)}
          className="fixed top-0 left-0 w-full h-screen bg-black/60 z-20"
        />
      )}
    </div>
  );
};

export default SinglePost;
