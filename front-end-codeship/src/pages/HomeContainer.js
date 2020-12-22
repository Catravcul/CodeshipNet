import React from "react";
import { Link } from "react-router-dom";
function HomeContainer() {
  return (
    <div className="HomeContainer">
      <div className="ProfileHome">PROFILE</div>
      <div className="ProfilePlay">PLAY</div>
      <div className="ProfileShop">
        <Link to="/shop">Shop</Link>
      </div>
    </div>
  );
}
export default HomeContainer;
