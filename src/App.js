import React, { useState, useEffect } from "react";

// import react-router-dom without BrowserRouter gives route errors
import { BrowserRouter, Switch, Route } from "react-router-dom";

// import pages
import ShopContainer from "./pages/ShopContainer";
import HomeContainer from "./pages/HomeContainer";
import ProfileContainer from "./pages/ProfileContainer";
import RegisterContainer from "./pages/RegisterContainer";
import LoginContainer from "./pages/LoginContainer";

// import context, config consts
import { Context } from "./components/Context";
import { getConfig } from "./config/config";

//import route path
import ROUTES from "./utils/routes";

//img background
import tunnel from "./assets/tunnel-4427837_1280.jpg";

function App() {
  //hash sent through fetch to access private routes
  const [token, setToken] = useState("");

  //Logged user data
  const [session, setSession] = useState({});

  const config = getConfig();

  useEffect(() => {
    if (window.opener) {
      window.addEventListener("message", (e) => {
        if (e.origin === config.codeshipGame.urlBase) {
          const tokenSession = e.data;
          sessionStorage.setItem("codeship-token", e.data);
          setToken(tokenSession);
          updateSession(tokenSession);
        }
      });
      window.opener.postMessage("123", config.codeshipGame.urlBase);
      window.opener = null;
    } else {
      const tokenSession = sessionStorage.getItem("codeship-token");
      setToken(tokenSession);
      updateSession(tokenSession);
    }
    document.getElementsByTagName("body")[0].style.backgroundImage =
      'url("' + tunnel + '")';
  }, []);

  const updateSession = (token) => {
    fetch(config.codeshipApi.urlBase + "/user", {
      method: "GET",
      headers: { "x-access-token": token },
      cache: "no-cache",
    })
      .then((res) => res.json())
      .then(({ user }) => {
        if (user) {
          setSession(user);
        }
      });
  };

  return (
    <Context.Provider
      value={{
        config: config,
        session: session,
        setSession: setSession,
        token: token,
        setToken: setToken,
        postMessageS: "123",
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route path={ROUTES.HOME} exact>
            <HomeContainer />
          </Route>
          <Route path={ROUTES.SHOP} exact>
            <ShopContainer />
          </Route>
          <Route path={ROUTES.PROFILE}>
            <ProfileContainer />
          </Route>
          <Route path={ROUTES.REGISTER} exact>
            <RegisterContainer />
          </Route>
          <Route path={ROUTES.LOGIN} exact>
            <LoginContainer />
          </Route>
        </Switch>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
