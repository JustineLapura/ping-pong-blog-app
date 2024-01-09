import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";

const Single = () => {
  return (
    <div className="w-full flex">
      <SinglePost />
      <Sidebar />
    </div>
  );
};

export default Single;
