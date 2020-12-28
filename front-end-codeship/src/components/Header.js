import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
function Header(props) {
  var [toggle, setToggle] = useState(false);
  let userModal;
  if (toggle) {
    userModal = (
      <div className="ModalProfileSignOut">
        <a href="/profile">Profile</a>
        <a href="/login">Sign Out</a>
      </div>
    );
  }
  return (
    <header>
      <h1>CODESHIP</h1>
      <div className="infoProfileHeader">
        <div className="infoUserHeader">
          <h4>{props.session.username}</h4>
          <p>{props.session.points} coins</p>
        </div>
        <img
          src={"https://codeship-api.herokuapp.com/" + props.session.img_path}
        ></img>
        <FontAwesomeIcon
          icon={faChevronDown}
          onClick={() => setToggle(!toggle)}
          className="icon"
        />
        {userModal}
      </div>
    </header>
  );
}

export default Header;
