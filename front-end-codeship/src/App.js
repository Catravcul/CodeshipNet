import React from 'react'

// import react-router-dom without BrowserRouter gives route errors
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// import pages
import ShopContainer from './pages/ShopContainer'
import HomeContainer from './pages/HomeContainer'
import ProfileContainer from './pages/ProfileContainer'
import RegisterContainer from './pages/RegisterContainer'

//import route path
import ROUTES from "./utils/routes";


function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path={ROUTES.HOME} exact>
        <HomeContainer />
      </Route>
      <Route path={ROUTES.SHOP} exact>
        <ShopContainer />
      </Route>
      <Route path={ROUTES.PROFILE} exact>
        <ProfileContainer />
      </Route>
      <Route path={ROUTES.REGISTER} exact>
        <RegisterContainer />
      </Route>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
