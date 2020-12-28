import React, { useState, useEffect } from "react";

// import react-router-dom without BrowserRouter gives route errors
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

// import pages
import ShopContainer from "./pages/ShopContainer";
import HomeContainer from "./pages/HomeContainer";
import ProfileContainer from "./pages/ProfileContainer";
import RegisterContainer from "./pages/RegisterContainer";
import LoginContainer from "./pages/LoginContainer";

//import route path
import ROUTES from "./utils/routes";

function App() {
  //hash sent through fetch to access private routes
  const [token, setToken] = useState("");

  //Logged user data
  const [session, setSession] = useState({});

  useEffect(() => {
    if (window.opener) {
      window.addEventListener("message", (e) => {
        if (e.origin === "https://codeship-game.herokuapp.com") {
          const tokenSession = e.data;
          sessionStorage.setItem("codeship-token", e.data);
          setToken(tokenSession);
        }
      });
      window.opener.postMessage("123", "https://codeship-game.herokuapp.com");
      window.opener = null;
    } else {
      const tokenSession = sessionStorage.getItem("codeship-token");
      setToken(tokenSession);
    }

    //ask server if token is valid
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path={ROUTES.HOME} exact>
          <HomeContainer
            session={session}
            setSession={setSession}
            setToken={setToken}
            token={token}
          />
          <Link to={ROUTES.LOGIN}>LOGIN</Link>
          <Link to={ROUTES.REGISTER}>REGISTER</Link>
        </Route>
        <Route path={ROUTES.SHOP} exact>
          <ShopContainer
            session={session}
            setSession={setSession}
            setToken={setToken}
            token={token}
          />
        </Route>
        <Route path={ROUTES.PROFILE} exact>
          <ProfileContainer />
        </Route>
        <Route path={ROUTES.REGISTER} exact>
          <RegisterContainer />
        </Route>
        <Route path={ROUTES.LOGIN} exact>
          <LoginContainer
            session={session}
            setSession={setSession}
            setToken={setToken}
            token={token}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
