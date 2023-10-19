"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MdOutlineWbSunny, MdDarkMode } from "react-icons/md";

const TopBar = ({ theme }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex flex-row justify-between text-xl sm:text-2xl">
      <div className="flex flex-row">
        <span>Snake Game </span>
        <Image
          src="/images/snake.png"
          width={40}
          height={40}
          className="px-2 sm:px-1"
          alt="snake"
        />
      </div>
      <span className="hidden sm:block">
        "Relive the beautiful memory of our childhood".
      </span>
      <button
        className=" border border-black rounded-md p-1"
        onClick={() => {
          setToggle(!toggle);
          theme(toggle);
        }}
      >
        {toggle ? <MdOutlineWbSunny /> : <MdDarkMode />}
      </button>
    </div>
  );
};

export default TopBar;
