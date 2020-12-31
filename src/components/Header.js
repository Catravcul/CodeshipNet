import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Context } from '../components/Context'
function Header() {
  const context = useContext(Context)

  var [toggle, setToggle] = useState(false);
  const signOut = () => {
    sessionStorage.setItem("codeship-token", "");
    context.setSession({});
    context.setToken("");
  };
  let userModal;
  if (toggle) {
    userModal = (
      <div className="ModalProfileSignOut">
        <Link to="/"> Home</Link>
        {context.session.cart ? (
          <>
            <Link to="/profile"> Profile</Link>
            <Link to="/login" onClick={signOut}>
              Sign Out
            </Link>
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
        {context.session.cart ? (
          <>
            <div className="infoUserHeader">
              <h4>{context.session.username}</h4>
              <p>{context.session.points} coins</p>
            </div>
            <img
              src={
                context.config.codeshipApi.urlBase + "/" + context.session.img_path
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
