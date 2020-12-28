import React from "react";
import { Link } from "react-router-dom";

function HomeContainer() {
  return (
    <div className="HomeContainer">
      <div className="FlexboxHome">
        <div className="ProfileHome">
          <Link to="/profile">
            <h1>PROFILE</h1>
          </Link>
        </div>
        <div className="PlayHome">
          <a href="https://codeship-game.herokuapp.com/">
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
