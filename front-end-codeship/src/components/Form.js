import React, { Component } from "react";
import axios from 'axios';
// import { useForm } from "react-hook-form";


class Form extends Component {
  constructor(props) {
    super(props)

    this.state={
      userName: "",
      userUsername: "",
      userPassword: ""
    }
  }

  //track the change of input values and keep in sync with the state object

  changeHandler = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  //submit handler
  submitHandler = e => {
    e.preventDefault()
    console.log(this.state)
    axios.post('https://jsonplaceholder.typicode.com/posts', this.state)
    .then(response => {
      console.log(response)
    })
    .catch(error=> {
      console.log(error)
    })

  }

 render(){

  const {userName, userUsername, userPassword} = this.state

  return (

        <div className="form-container">
            <div className="actual-form">
            <div className="image-register-container"></div>
            <div className="form-register-container">
            <form onSubmit={this.submitHandler}>
                <div>
                  <label for="userName">Name</label>
                  <input type="text" id="userName" name="userName" value={userName} onChange={this.changeHandler}placeholder="write your name"></input>
                </div>
                <div>
                  <label for="userUsername">Username</label>
                  <input type="text" id="userUsername" name="userUsername" value={userUsername} onChange={this.changeHandler}placeholder="write a username"></input>
                </div>
                <div>
                  <label for="userPassword">Password</label>
                  <input type="text" id="userPassword" name="userPassword" value={userPassword} onChange={this.changeHandler}placeholder="write a password"></input>
                </div>
                <button type="submit"> Register </button>
              </form>
            </div>
            </div>
        </div>
  );
}
}

export default Form;