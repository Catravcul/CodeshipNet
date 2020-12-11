import React, {Component} from "react";
// import axios from "axios"


const initialState = {
  username: "",
  password: ""
}

class LoginForm extends Component{

  state = initialState

changeLoginHandler = e => {
  this.setState({[e.target.name]: e.target.value})
}

handleLoginSubmit = e => {
  e.preventDefault();

  fetch('https://codeship-api.herokuapp.com/public/user',{method: "POST", body: JSON.stringify(this.state), headers: {"Content-Type": "application/json"}})
  .then(res => {
    return res.json()
  })
  .then(data => {
    console.log(data.data)
    //saving token and user values in sessionStorage
    sessionStorage.setItem("codeship-token", data.data.token)
    sessionStorage.setItem("codeship-user", JSON.stringify(data.data.user))
  })
  .catch(err => {
    console.log(err)
  })
}
  render(){ 

    const {username, password} = this.state

    return(
    <div className="login-form">
           <form onSubmit={this.handleLoginSubmit}>
           <div>
                  <label for=""> Username</label>
                  <input type="text" id="username" name="username" value={username} onChange={this.changeLoginHandler} placeholder="write username"></input>
                </div>
                <div>
                  <label for=""> Password</label>
                  <input type="text" id="password" name="password" value={password} onChange={this.changeLoginHandler} placeholder="write password"></input>
                </div>
                <button type="submit"> Login</button>
           </form>
    </div>)
}
}

export default LoginForm;