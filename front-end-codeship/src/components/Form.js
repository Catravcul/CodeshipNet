import React, { Component } from "react";
import axios from 'axios';
// import { useForm } from "react-hook-form";

const initialState = {
  userName: "",
  userUsername: "",
  userPassword: "",
  nameError: "",
  usernameError: "",
  passwordError: ""
}

class Form extends Component {


    state= initialState;

  //track the change of input values and keep in sync with the state object
  changeHandler = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  //form validation
  validate = () => {
    let nameError= "";
 
    if(this.state.userName.includes('$')){
      nameError = "can't include the $ sign";
    }
    if(nameError){
      this.setState({ nameError });
      return false;
    }
 return true;
  };

  //submit handler
  
  submitHandler = e => {
    e.preventDefault()
    const isValid = this.validate();
    if(isValid) {
      console.log(this.state)
      axios.post('https://jsonplaceholder.typicode.com/posts', this.state)
      .then(response => {
        console.log(response)
      })
      .catch(error=> {
        console.log(error)
      })
      //clear Form if it's valid
      this.setState(initialState);
    }
   }

   submitUpdate = e => {
    e.preventDefault()
    const isValid = this.validate();
    if(isValid) {
      console.log(this.state)
      axios.put('https://jsonplaceholder.typicode.com/posts', this.state)
      .then(response => {
        console.log(response)
      })
      .catch(error=> {
        console.log(error)
      })
      //clear Form if it's valid
      this.setState(initialState);
    }
   }

 render(){

  const {userName, userUsername, userPassword} = this.state

  //register/update button display
  let myButton;
  if(this.props.register){
    myButton = <button type="submit"> Register </button>
  } else {
    myButton = <button type="submit"> Update </button>}
  


  return (

        <div className="form-container">
            <div className="actual-form">
            <div className="image-register-container">
              <p>hgfghv</p>
            </div>
            <div className="form-register-container">
            <form onSubmit={this.props.update?this.submitUpdate:this.submitHandler}>
                <div>
                  <label for="userName">Name</label>
                  <input type="text" id="userName" name="userName" value={userName} onChange={this.changeHandler}placeholder="write your name"></input>
                </div>
               <div>{this.state.nameError}</div>
                <div>
                  <label for="userUsername">Username</label>
                  <input type="text" id="userUsername" name="userUsername" value={userUsername} onChange={this.changeHandler}placeholder="write a username"></input>
                </div>
                <div>{this.state.usernameError}</div>
                <div>
                  <label for="userPassword">Password</label>
                  <input type="text" id="userPassword" name="userPassword" value={userPassword} onChange={this.changeHandler}placeholder="write a password"></input>
                </div>
                <div>{this.state.passwordError}</div>
                {/* <button type="submit"></button> */}
                {myButton}
              </form>
            </div>
            </div>
        </div>
  );
}
}

export default Form;