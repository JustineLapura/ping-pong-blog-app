import React from "react";
import "@fontsource/lora"; // Import Lora font

const Header = () => {
  return (
    <div className="w-full relative mt-[60px]">
      <img
        className="absolute -top-10 left-[24%] w-20"
        src="https://media.giphy.com/media/92lZ9Ht5wExiBLjpOi/giphy.gif"
        alt=""
      />
      <div
        style={{ fontFamily: "Lora, serif" }}
        className=" flex flex-col items-center text-gray-800"
      >
        <span className="absolute -top-6 font-semibold">Spin to Win</span>
        <span className="absolute font-bold -top-1 text-6xl tracking-widest">
          PINGPONGISTAS
        </span>
      </div>
      <img
        className="w-full h-[470px] mt-14 object-cover "
        src="https://media.giphy.com/media/7GtdMQAyHSR1K/giphy.gif"
        alt=""
      />
    </div>
  );
};

export default Header;
