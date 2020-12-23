import React, {useState, useEffect} from 'react'

// import react-router-dom without BrowserRouter gives route errors
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

// import pages
import ShopContainer from './pages/ShopContainer'
import HomeContainer from './pages/HomeContainer'
import ProfileContainer from './pages/ProfileContainer'
import RegisterContainer from './pages/RegisterContainer'
import LoginContainer from './pages/LoginContainer';

//import route path
import ROUTES from "./utils/routes";


function App() {

//hash sent through fetch to access private routes
const[token, setToken] = useState('hika')


//Logged user data
const[session, setSession] = useState({})

useEffect(() => {
  const tokenSession = sessionStorage.getItem("codeship-token")
  setToken(tokenSession)
  const userSession = sessionStorage.getItem("session-token")
  setSession(userSession)
}, [])



  return (
    <BrowserRouter>
    <Switch>
      <Route path={ROUTES.HOME} exact>
        <HomeContainer />
        <Link to={ROUTES.LOGIN}>LOGIN</Link>
        <Link to={ROUTES.REGISTER}>REGISTER</Link>
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
      <Route path={ROUTES.LOGIN} exact>
        <LoginContainer session={session} token={token} />
      </Route>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
