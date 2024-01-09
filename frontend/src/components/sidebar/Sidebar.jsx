import React, { useEffect, useState } from "react";

import "@fontsource/poppins"; // Import Poppins font
import {
  FaFacebook,
  FaPinterest,
  FaInstagram,
  FaTwitter,
  FaSearch,
} from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);

  // console.log("Categories: ", categories);
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios("http://localhost:4000/api/category/");
      setCategories(response.data);
    };

    fetchCategories();
  }, []);

  return (
    <div
      style={{ fontFamily: "Poppins, sans-serif" }}
      className="w-1/4 m-5 pb-[30px] rounded flex flex-col items-center"
    >
      <h1 className="m-3 p-1 w-[80%] border-t border-b border-gray-800 text-center font-semibold">
        About me
      </h1>
      <img
        className="mt-4 h-[430px]"
        src="https://media.giphy.com/media/RO5eUCuvmVVI7ujBLB/giphy-downsized-large.gif"
        alt=""
      />
      <p className="w-[80%] mt-8">
        Chinese professional table tennis player who is currently ranked number
        3 in Men’s Singles by the ITTF and the reigning Olympic singles
        champion.
      </p>
      <span
        style={{ fontFamily: "Poppins, sans-serif" }}
        className="mt-6 font-semibold text-xl text-gray-800"
      >
        CATEGORIES
      </span>
      <div className="p-7">
        <ul className="grid grid-cols-2 place-items-center text-left gap-x-8 gap-y-2">
          {categories &&
            categories.map((cat) => (
              <Link to={`/?cat=${cat.name}`} key={cat._id}>
                <li className="cursor-pointer text-gray-600">{cat.name}</li>
              </Link>
            ))}
        </ul>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <span className="w-[80%] text-center font-semibold text-gray-800 border-t border-b border-gray-800">
          FOLLOW US
        </span>
        <div className="flex justify-center items-center gap-4 mt-6">
          <FaFacebook className="cursor-pointer" />
          <FaTwitter className="cursor-pointer" />
          <FaPinterest className="cursor-pointer" />
          <FaInstagram className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
