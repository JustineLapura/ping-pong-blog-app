import React from "react";
import "@fontsource/lora"; // Import Lora font
import "@fontsource/varela-round"; // Import Varela Round font
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  // console.log("Post: ", post);
  const PF = "http://localhost:4000/images/";
  return (
    <Link to={`/post/${post._id}`}>
      <div className="w-[300px] mx-2 my-20 text-gray-700 hover:text-gray-900 shadow-2xl rounded-b-lg hover:scale-105 duration-200">
        {!post.photo && (
          <img
            className="w-full h-[280px] rounded-t-lg object-cover"
            src="https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Sample photo"
          />
        )}
        {post.photo && (
          <img
            className="w-full h-[280px] rounded-t-lg object-cover"
            src={PF + post.photo}
            alt={post.title}
          />
        )}
        {/* Post info  */}
        <div className="relative px-4 pb-4">
          <img
            className="absolute w-10 left-0 top-0"
            src="https://media.giphy.com/media/9zxmm8CT4gn9m/giphy.gif"
            alt=""
          />
          <img
            className="absolute w-10 right-0 top-0"
            src="https://media.giphy.com/media/tNbXuyMMSaZydoQ7kG/giphy.gif"
            alt=""
          />
          <div className="flex flex-col items-center">
            <div className="text-yellow-600 mt-4 flex gap-4">
              {post.categories &&
                post.categories.map((cat) => (
                  <span className="cursor-pointer">{cat}</span>
                ))}
            </div>
            <span className="font-bold text-xl cursor-pointer ">
              {post.title}
            </span>
            <hr />
            <span
              style={{ fontFamily: "Lora, serif" }}
              className="italic text-gray-500 text-sm hover:text-gray-900"
            >
              {new Date(post.createdAt).toLocaleString()}
            </span>
          </div>
          <p className="mt-2">
            <span>
              Author:
              <Link to={`/?user=${post.username}`}>
                <b className="cursor-pointer transform hover:scale-105 ml-2">
                  {post.username}
                </b>
              </Link>
            </span>
          </p>
          <p
            style={{ fontFamily: "Varela Round, sans-serif" }}
            className=" hover:text-blue-800 mt-4 leading-6 overflow-hidden line-clamp-4"
          >
            {post.desc}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Post;
