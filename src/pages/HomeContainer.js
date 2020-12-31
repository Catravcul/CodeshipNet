import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../components/Context"

function HomeContainer() {
  const context = useContext(Context)
  const playGame = () => {
    let gameWindow = window.open(context.config.codeshipGame.urlBase);
    window.onmessage = (e) => {
      if (e.origin === context.config.codeshipGame.urlBase) {
        if (e.data === context.postMessageS) {
          gameWindow.postMessage(
            context.token,
            context.config.codeshipGame.urlBase
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
