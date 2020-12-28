import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
function Header(props) {
  var [toggle, setToggle] = useState(false);
  let userModal;
  if (toggle) {
    userModal = (
      <div className="ModalProfileSignOut">
        <Link to="/"> Home</Link>
        {props.session.cart ? (
          <>
            <Link to="/profile"> Profile</Link>
            <Link to="/login"> Sign Out</Link>
          </>
        ) : (
          <Link to="/login"> Log In</Link>
        )}
      </div>
    );
  }
  return (
    <header>
      <Link to="/">
        <h1>CODESHIP</h1>
      </Link>
      <div className="infoProfileHeader">
        {props.session.cart ? (
          <>
            <div className="infoUserHeader">
              <h4>{props.session.username}</h4>
              <p>{props.session.points} coins</p>
            </div>
            <img
              src={
                "https://codeship-api.herokuapp.com/" + props.session.img_path
              }
            ></img>
          </>
        ) : (
          ""
        )}
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
