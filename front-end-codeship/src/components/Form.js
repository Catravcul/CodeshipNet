import React, { Component } from "react";
import axios from 'axios';
// import { useForm } from "react-hook-form";

// username, lastname, email, password, passwordConfirm, description, image and points
const initialState = {
  username: "",
  name: "",
  lastname: "",
  email: "",
  password: "",
  passwordConfirm: "",
  description: "",
  image: "",
  errors: []
}

class Form extends Component {

    state= initialState;

  //track the change of input values and keep in sync with the state object
  changeHandler = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  //form validation
  validate = () => {
    let errors= [];
 
    if(this.state.username.length < 3){
      errors[0] = "Username should not be shorter than 3 characters";
    }
    if(this.state.username.length > 15){
      errors[0] = "Username should not be longer than 15 characters";
    }
    if(this.state.name.length < 3){
      errors[1] = "Name should not be shorter than 12 characters";
    }
    if(this.state.name.length > 12){
      errors[1] = "Name should not be shorter than 12 characters";
    }

    if(this.state.lastname.length < 3){
      errors[2] = "Lastname should not be shorter than 3 characters";
    }

    if(this.state.lastname.length > 15){
      errors[2] = "Lastname should not be longer than 15 characters";
    }

    if(!this.state.email.includes('@')){
      errors[3] = "Mail should have an email format '@' "
    }

    if(this.state.password < 6){
      errors[4] = "Password should be longer than 6 characters";
    }

    if(this.state.passwordConfirm !== this.state.password){
      errors[5] = "Password does not match";
    }

    if(this.state.description < 250){
      errors[6] = "Description can't be longer than 250 characters"
    }

    if(errors){
      this.setState({errors });
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

  const {username, name, lastname, email, password, passwordConfirm, description, image} = this.state

  //register/update button display
  let myButton;
  if(this.props.register){
    myButton = <button type="submit"> Register </button>
  } else {
    myButton = <button type="submit"> Update </button>}
  
  let button
  return (

    <form class="form-container" onSubmit={this.props.update?this.submitUpdate:this.submitHandler}>
            <div className="actual-form">
            <div className="image-register-container">
            <div>
                  <label for="image">Add Image</label>
                  <input type="image" id="image" name="image" value={image} onChange={this.changeHandler}placeholder="Upload a profile picture"></input>
                </div>
                <div>{this.state.imageError}</div>
            </div>
            <div className="form-register-container">
            <div>
                  <label for="username">Username</label>
                  <input type="text" id="username" name="username" value={username} onChange={this.changeHandler}placeholder="write your name"></input>
                </div>
               <div>{this.state.errors[0]}</div>
               <div>
                  <label for="name"> Name</label>
                  <input type="text" id="name" name="name" value={name} onChange={this.changeHandler}placeholder="write your name"></input>
                </div>
                <div>{this.state.errors[1]}</div>
                <div>
                  <label for="lastname"> Last name</label>
                  <input type="text" id="lastname" name="lastname" value={lastname} onChange={this.changeHandler}placeholder="write your last name"></input>
                </div>
                <div>{this.state.errors[2]}</div>
                <div>
                  <label for="email">Email</label>
                  <input type="email" id="email" name="email" value={email} onChange={this.changeHandler}placeholder="write your email"></input>
                </div>
                <div>{this.state.errors[3]}</div>
                <div>
                  <label for="password">Password</label>
                  <input type="text" id="password" name="password" value={password} onChange={this.changeHandler}placeholder="write a password"></input>
                </div>
                <div>{this.state.errors[4]}</div>
                <div>
                  <label for="passwordConfirm">Confirm Password</label>
                  <input type="text" id="passwordConfirm" name="passwordConfirm" value={passwordConfirm} onChange={this.changeHandler}placeholder=" confirm password"></input>
                </div>
                <div>{this.state.errors[5]}</div>
                <div>
                  <label for="description">Description</label>
                  <input type="text" id="description" name="description" value={description} onChange={this.changeHandler}placeholder="write a description"></input>
                </div>
                <div>{this.state.descriptionError}</div>
                {myButton}
            </div>
          </div>
        </form>
  );
}
}

export default Form;