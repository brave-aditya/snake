import React, { useEffect, useState } from "react";
import Square from "./Square";
import { useSwipeable } from "react-swipeable";

var score = 0;
var highscore = 0;
var direct = "right";
const Board = ({ board }) => {
  if(score>highscore){
    highscore=score;
  }
  const ab = board.map((x, index) => <Square key={x.index} val={x} />);

  const handlers = useSwipeable({
    onSwipedLeft: (e) => {
      if (direct !== "right") {
        direct = "left";
      }
    },
    onSwipedRight: (e) => {
      if (direct !== "left") {
        direct = "right";
      }
    },
    onSwipedUp: (e) => {
      if (direct !== "down") {
        direct = "up";
      }
    },
    onSwipedDown: (e) => {
      if (direct !== "up") {
        direct = "down";
      }
    },
    preventScrollOnSwipe: true,
  });
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
      <div className="container col-span-3 place-self-center text-center lg:text-2xl w-full mb-2">
        <h1 className="lg:text-2xl">
          Your Score is :{" "}
          <span className="w-[50px] bg-[#fff] text-[#000]"> {score} </span>
        </h1>
        <h1 className="lg:text-2xl mt-2">
          Your Highest Score is :{" "}
          <span className="w-[50px] bg-[#fff] text-[#000]"> {highscore} </span>
        </h1>
        <h1 className="lg:text-2xl mt-2">
          Keep going you can do better than that!
        </h1>
      </div>
      <div className="container sticky col-span-3 lg:col-span-6 place-self-center border-4 rounded-lg w-full lg:w-fit">
        <div
          {...handlers}
          className="container w-full lg:w-fit lg:h-[calc(100vh-95px)] aspect-square justify-center items-center grid grid-cols-20 gridpattern"
        >
          {ab}
        </div>
      </div>
      <div className="container col-span-3 place-self-center text-center w-full lg:text-2xl mt-4">
        <h1 className="lg:text-2xl">
          If you like this game then please visit my portfolio website{" "}
          <p>
            <a href="https://aditya-swart.vercel.app" className="underline">
              aditya-swart.vercel.app
            </a>
          </p>{" "}
          and drop a follow on my socials.
        </h1>
      </div>
    </div>
  );
};
const Snake = () => {
  var bord = Array(400).fill("no");
  var snake = [];
  snake[0] = 190;
  var food = Math.floor(Math.random() * 400);

  const [details, setDetails] = useState({
    s: bord,
    interval: null,
  });
  const generatefood = () => {
    if (snake[0] === food) {
      score = score + 1;
      food = Math.floor(Math.random() * 400);
      for (let t = 0; t < snake.length; t++) {
        if (food === snake[t]) {
          food = Math.floor(Math.random() * 400);
          t = 0;
        }
      }
    } else {
      snake.pop();
    }
  };
  const checkgame = () => {
    for (let i = 1; i < snake.length; i++) {
      if (snake[0] === snake[i]) {
        bord.fill("no");
        alert(
          "Game Over \n Your score is:" + score + "\n press OK for a new game"
        );
        if(score>highscore){
          highscore=score;
        }
        score = 0;
        let j = snake[0];
        snake = [];
        snake[0] = j;
      }
    }
  };
  const movebord = () => {
    snake.unshift(snake[0]);
    window.addEventListener("keydown", moveSomething, false);
    function moveSomething(e) {
      switch (e.keyCode) {
        case 37:
          if (direct !== "right") {
            direct = "left";
          }
          break;
        case 38:
          if (direct !== "down") {
            direct = "up";
          }
          break;
        case 39:
          if (direct !== "left") {
            direct = "right";
          }
          break;
        case 40:
          if (direct !== "up") {
            direct = "down";
          }
          break;
        default:
      }
      window.removeEventListener("keydown", moveSomething, false);
    }
    switch (direct) {
      case "right":
        if (snake[0] % 20 === 19) {
          snake[0] = snake[0] - 20;
        }
        snake[0]++;
        break;
      case "left":
        if (snake[0] % 20 === 0) {
          snake[0] = snake[0] + 20;
        }
        snake[0] = snake[0] - 1;
        break;

      case "up":
        if (snake[0] < 20) {
          snake[0] = snake[0] + 400;
        }
        snake[0] = snake[0] - 20;

        break;
      case "down":
        if (snake[0] > 379) {
          snake[0] = snake[0] - 400;
        }
        snake[0] = snake[0] + 20;
        break;
      default:
    }
    generatefood();
  };
  const trial = () => {
    bord.fill("no");
    movebord();
    bord[snake[0]] = "head";
    for (let i = 1; i < snake.length; i++) {
      bord[snake[i]] = "body";
    }
    bord[food] = "food";
    checkgame();
    return bord;
  };
  useEffect(() => {
    const interval = setInterval(() => setDetails({ s: trial() }), 200);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div>
      <Board board={details.s} />
    </div>
  );
};

export default Snake;
