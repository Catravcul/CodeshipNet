import React from "react";
import { Link } from "react-router-dom";

function HomeContainer(props) {
  const playGame = () => {
    let gameWindow = window.open("https://codeship-game.herokuapp.com/");
    window.onmessage = (e) => {
      if (e.origin === "https://codeship-game.herokuapp.com/") {
        if (e.data === "123") {
          gameWindow.postMessage(
            props.token,
            "https://codeship-game.herokuapp.com/"
          );
        }
      }
    };
  };
  return (
    <div className="HomeContainer">
      <div className="FlexboxHome">
        <div className="ProfileHome">
          <Link to="/login">
            <h1>PROFILE</h1>
          </Link>
        </div>
        <div className="PlayHome">
          <a onClick={playGame}>
            <h1>PLAY</h1>
          </a>
        </div>
        <div className="ShopHome">
          <Link to="/shop">
            <h1>SHOP</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomeContainer;
