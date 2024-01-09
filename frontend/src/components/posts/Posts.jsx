import React from "react";
import Post from "./Post";

const Posts = ({ posts }) => {
  // console.log("Posts from Posts component: ", posts);
  return (
    <div className="relative w-3/4 flex flex-wrap m-5">
      <h1
        style={{ fontFamily: "Lora, serif" }}
        className="absolute left-1/2 top-6 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-black tracking-widest"
      >
        PING POSTS
      </h1>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
