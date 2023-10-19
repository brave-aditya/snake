import React, { useState } from "react";

const Square = ({index, val }) => {
  var background;
  if (val === "no opacity-0") {
    background = "bg-snakebg";
  }
  if (val === "food") {
    background =
      "bg-[#ff0000] rounded-full border border-[#fff] animate-[glow_0.8s_infinite_alternate] z-50";
  }
  if (val === "head") {
    background =
      "bg-[#66ff00] border border-[#fff] shadow-[0_0_5px_5px_rgba(10,255,0,1)] z-50";
  }
  if (val === "body") {
    background = "bg-snakebody";
  }
  return (
    <span
      className={
        "aspect-square z-10 box-border h-[100%] w-[100%] " + background
      }
    ></span>
  );
};

export default Square;
