import React, {Component} from "react";
import { Context } from './Context'

const initialState = {
  username: "",
  password: ""
}

class LoginForm extends Component{

  state = initialState

  loginSessionTest(){ 
    if(this.context.token){
      window.location.href = '/profile'
    }
  }

changeLoginHandler = e => {
  this.setState({[e.target.name]: e.target.value})
}

handleLoginSubmit = e => {
  e.preventDefault();

  fetch( this.context.config.codeshipApi.urlBase + '/public/user',{
    method: "POST", 
    body: JSON.stringify(this.state), 
    headers: {"Content-Type": "application/json"},
    cache: 'no-cache'
  })
  .then(res => {
    return res.json()
  })
  .then(data => {
    //saving token and user values in sessionStorage
    sessionStorage.setItem("codeship-token", data.token)
    this.context.setToken(data.token)
    this.context.setSession(data.user)
  })
  .catch(err => {
    console.log(err)
  })
}
  render(){

    this.loginSessionTest()
    const {username, password} = this.state

    return(
    <div className="login-form">
           <form onSubmit={this.handleLoginSubmit}>
           <div>
                  {/* <label for=""> Username</label> */}
                  <input className="form-input" type="text" id="username" name="username" value={username} onChange={this.changeLoginHandler} placeholder="Username"></input>
                </div>
                <div>
                  {/* <label for=""> Password</label> */}
                  <input className="form-input" type="text" id="password" name="password" value={password} onChange={this.changeLoginHandler} placeholder="Password"></input>
                </div>
                <button className="formBtns" type="submit"> Login</button>
           </form>
    </div>)
}
}

LoginForm.contextType = Context
export default LoginForm;