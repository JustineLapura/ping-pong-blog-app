import React, { useContext } from "react";
import {
  FaFacebook,
  FaPinterest,
  FaInstagram,
  FaTwitter,
  FaSearch,
} from "react-icons/fa";

import "@fontsource/poppins"; // Import Poppins font
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { AuthContext } from "../../context/AuthContext";

const Topbar = () => {
  const { user } = useContext(AuthContext);
  const userData = user?.user || user?.updatedUser;

  const navigate = useNavigate();

  // image location
  const PF = "http://localhost:4000/images/";

  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      style={{ fontFamily: "Poppins, sans-serif" }}
      className="w-full h-[50px] sticky top-0 bg-gray-100 flex justify-between items-center z-10"
    >
      <img
        className="w-16"
        src="https://media.giphy.com/media/XdO8pkb5D4JxMHHof4/giphy.gif"
        alt=""
      />
      <div className="w-1/4 h-full  flex justify-center items-center gap-4">
        <FaFacebook className="cursor-pointer" />
        <FaTwitter className="cursor-pointer" />
        <FaPinterest className="cursor-pointer" />
        <FaInstagram className="cursor-pointer" />
      </div>
      <img
        className="w-16"
        src="https://media.giphy.com/media/XdO8pkb5D4JxMHHof4/giphy.gif"
        alt=""
      />

      <div className="w-2/4 h-full  flex items-center">
        <ul className="flex w-full h-full justify-center items-center gap-8 text-gray-500">
          <Link to="/">
            <li className="cursor-pointer font-thin">HOME</li>
          </Link>
          <li className="cursor-pointer font-thin">ABOUT</li>
          <li className="cursor-pointer font-thin">CONTACT</li>
          <Link to="/write">
            <li className="cursor-pointer font-thin">WRITE</li>
          </Link>
          {user && (
            <li className="cursor-pointer font-thin" onClick={handleLogout}>
              LOGOUT
            </li>
          )}
        </ul>
      </div>
      <img
        className="w-16"
        src="https://media.giphy.com/media/XdO8pkb5D4JxMHHof4/giphy.gif"
        alt=""
      />

      <div className="w-1/4 h-full  flex justify-center items-center gap-2">
        {userData && (
          <Link to="/settings">
            <img
              src={
                userData.profilePicture
                  ? PF + userData.profilePicture
                  : "https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-vector-contact-symbol-illustration-184752213.jpg"
              }
              alt=""
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
            />
          </Link>
        )}
        {!user && (
          <ul className="flex items-center gap-3 mx-2">
            <Link to="/login">
              <li className="cursor-pointer font-thin text-gray-500">LOGIN</li>
            </Link>
            <Link to="/register">
              <li className="cursor-pointer font-thin text-gray-500">
                REGISTER
              </li>
            </Link>
          </ul>
        )}
        <FaSearch className="cursor-pointer" />
      </div>
      <img
        className="w-16"
        src="https://media.giphy.com/media/XdO8pkb5D4JxMHHof4/giphy.gif"
        alt=""
      />
    </div>
  );
};

export default Topbar;
