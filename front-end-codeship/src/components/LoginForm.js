import React, {Component} from "react";
import axios from "axios"


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

  axios.post('https://jsonplaceholder.typicode.com/posts', this.state).then(res => {
    console.log(res)
  }).catch(err => {
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