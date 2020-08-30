import React from "react";
import ReactDOM from "react-dom";
import ReactTouchEvents from "react-touch-events";
import "./style.css";

var score = 0;
var direct = "right";
var bord = Array(400).fill("no");
var snake = [];
snake[0] = 190;
var food = Math.floor(Math.random() * 400);
class Square extends React.Component {
  returnSquare() {
    if (this.props.val === "head") {
      return <span className="head cell"></span>;
    }
    if (this.props.val === "body") {
      return <span className="body cell"></span>;
    }
    if (this.props.val === "no") {
      return <span className="no cell"></span>;
    }
    if (this.props.val === "food") {
      return <span className="food cell"></span>;
    }
  }

  render() {
    return <span>{this.returnSquare()}</span>;
  }
}
class Board extends React.Component {
  renS() {
    const ab = this.props.square.map((x) => <Square val={x} />);
    return ab;
  }
  handleSwipe(direction) {
    switch (direction) {
      case "left":
        if (direct !== "right") {
          direct = "left";
        }
        break;
      case "top":
        if (direct !== "down") {
          direct = "up";
        }
        break;
      case "right":
        if (direct !== "left") {
          direct = "right";
        }
        break;
      case "bottom":
        if (direct !== "up") {
          direct = "down";
        }
        break;
      default:
    }
  }

  render() {
    return (
      <div>
        <div className="w3-quarter box1">
          <h1>Score Is:{score}</h1>
        </div>
        <ReactTouchEvents onSwipe={this.handleSwipe}>
          <div className="w3-half grid">{this.renS()}</div>
        </ReactTouchEvents>

        <div className="w3-rest box2"><h1>'Game of Snake' from our childhood.</h1></div>
      </div>
    );
  }
}
class Snake extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      s: bord,
      interval: null,
    };
  }
  generatefood() {
    if (snake[0] === food) {
      ++score;
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
  }
  checkgame() {
    for (let i = 1; i < snake.length; i++)
      if (snake[0] === snake[i]) {
        bord.fill("no");
        alert(
          "Game Over \n Your score is:" + score + "\n press OK for a new game"
        );
        score = 0;
        let j = snake[0];
        snake = [];
        snake[0] = j;
      }
  }
  movebord() {
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
    this.generatefood();
  }
  trial() {
    bord.fill("no");
    this.movebord();
    bord[snake[0]] = "head";
    for (let i = 1; i < snake.length; i++) {
      bord[snake[i]] = "body";
    }
    bord[food] = "food";
    this.checkgame();
    return bord;
  }
  render() {
    return (
      <div>
        <Board square={this.state.s} />
      </div>
    );
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ s: this.trial() }), 200);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
}
const el = <Snake />;
ReactDOM.render(el, document.getElementById("root"));
