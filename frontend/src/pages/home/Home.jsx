import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const [posts, setPosts] = useState([]);

  // const { user } = useContext(AuthContext);
  // console.log(user);

  const { search } = useLocation();
  console.log("Search: ", search);
  // console.log("Posts: ", posts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/blogs${search}`
        );
        setPosts(response.data);
      } catch (error) {
        console.log("Error Fetching:", error);
      }
    };

    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className="w-full flex ">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
};

export default Home;
