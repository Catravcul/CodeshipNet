import React, { Component } from "react";
import { Context } from './Context'
import { Link } from 'react-router-dom'

const initialState = {
  username: "",
  name: "",
  lastname: "",
  email: "",
  description: "",
  profileImage: "https://www.nailseatowncouncil.gov.uk/wp-content/uploads/blank-profile-picture-973460_1280.jpg",
  errors: [],
  password: {
    class:'form-input',
    name:'password',
    value:''
  },
  passwordConfirm: {
    class:'form-input',
    name:'passwordConfirm',
    value:''
  },
  title: "",
  goal: "",
  goal_explanation: "",
  goal_reason: "",
  userShowed: false
}

class Form extends Component {
  
  state= initialState;
  
  componentDidMount(){
    if (this.props.update) {
      this.setState({
        password: {
          class:'hidden',
          name:''
        },
        passwordConfirm: {
          class:'hidden',
          name:''
        }
      })
    }
  }
  
  //track the change of input values and keep in sync with the state object
  changeHandler = e => {
    const {currentTarget:{name, value}} = e
    if (name.search('password') >= 0) {
      this.setState({[name]: {value: value, name: name, class: 'form-input'}})
    } else {
      this.setState({[name]: value})
    }
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
      errors[1] = "Name should not be shorter than 3 characters";
    }
    if(this.state.name.length > 12){
      errors[1] = "Name should not be longer than 12 characters";
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

    if(!this.props.update && this.state.password.value < 6){
      errors[4] = "Password should be longer than 6 characters";
    }

    if(!this.props.update && this.state.passwordConfirm.value !== this.state.password.value){
      errors[5] = "Password does not match";
    }

    if(this.state.description > 250){
      errors[6] = "Description can't be longer than 250 characters"
    }

    if(errors.length > 0){
      console.log(errors)
      this.setState({errors });
      return false;
    }

    return true;
  };

  //submit handler
  submitHandler = e => {
    e.preventDefault()
    const isValid = this.validate();

    if (isValid) {
      const body = new FormData(document.getElementById('form-register'));
      fetch(this.context.config.codeshipApi.urlBase + '/public/user',{method: "PUT", body: body})
      .then(response => {
        return response.json() //or .text you get a string
      }).then(({token}) => {
        this.context.token = token
        this.context.setToken(token)
        this.fetchUpdate(this.context.config.codeshipFS.urlBase + '/user', body);
      })
      .catch(error=> console.log(error))
    }
   }
   
  submitUpdate = e => {
    e.preventDefault()
    const isValid = this.validate();
    if (isValid) {
      const body = new FormData(document.getElementById('form-register'));
      this.fetchUpdate(this.context.config.codeshipApi.urlBase + '/user', body);
      this.fetchUpdate(this.context.config.codeshipFS.urlBase + '/user', body);
    }
  }
  
  fetchUpdate = (url, body) => {
    fetch(url, {method: "PATCH", body, headers:{"x-access-token":this.context.token}})
    .then(response => {
    return response.json()
    }).then(({user, err}) => err ? console.log(err) : this.context.setSession(user), body)
    .catch(error => console.log(error))
  }
    
  profileImgHandler = (e) =>{
    const reader = new FileReader();
    reader.onload = () => {
      if(reader.readyState === 2){
        this.setState({profileImage: reader.result })
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  render(){
  
    if (this.props.user) {
      if (this.props.user.username && !this.state.userShowed) {
        const {username, name, lastname, email, description} = this.props.user
        this.setState({
          username: username,
          name: name,
          lastname: lastname,
          email: email,
          description: description,
          userShowed: true
        })
      }
    }

  const {username, name, lastname, email, password, passwordConfirm, description, profileImage, title, goal, goal_explanation, goal_reason} = this.state
  //register/update button display
  //register nav to not show in update
  let myButton;
  let loginRegisterNav;
  let fileUpload = <label className="upload-img-btn upload-btn-update-position" htmlFor="image"> <i class="fas fa-file-image"></i> Update Img</label>
  if (this.props.register) {
    myButton = <button className="formBtns" type="submit"> Register </button>
    loginRegisterNav = 
    <div className="login-regiser-nav">
      <div>
        <Link to="/login" className="welcome-user">Login</Link>
        <p className="welcome-user"> | </p>
        <Link to="/register" className="welcome-user">Register</Link>
      </div>
    </div>
  } else if (this.context.session._id && !window.location.href.split('/')[4]) {
    myButton = 
    <button className="formBtns update-btn" type="submit"> Update Profile </button>
  } else {
    fileUpload = ''
  }

  let updateProfilePicture;
  if (this.props.update) {
    let imgSrc = profileImage;
    if (this.props.user) if (this.props.user.img_path) imgSrc = this.context.config.codeshipFS.urlBase + this.props.user.img_path
    updateProfilePicture =
    <div className="updateProfileImg">
      <img id="register-img" src={imgSrc} alt="this is a profile picture"></img>
      <input className="form-input hide-uplaod-img" id="image" type="file" accept="image/*" name="img" onChange={this.profileImgHandler} placeholder="Upload a profile picture"></input>
      <div>
        {fileUpload}
      </div>
    </div>
  } else {
    updateProfilePicture =
    <div className="img-holder">
      <img id="register-img" src={profileImage} alt="this is a profile picture"></img>
      <input className="form-input hide-uplaod-img" id="image" type="file" accept="image/*" name="img" onChange={this.profileImgHandler} placeholder="Upload a profile picture"></input>
      <div>
        <label className="upload-img-btn" htmlFor="image"> <i class="fas fa-file-image"></i> Upload a Profile Image</label>
      </div>
    </div>
  }


  let inputs;
  if (this.props.spaceship) {
    inputs = 
    <div >
      <div>
        <input className="form-input" type="text" name="title" value={title} onChange={this.changeHandler} placeholder="Title"/>
      </div>
      <div>
        <input className="form-input" type="text" name="goal" value={goal} onChange={this.changeHandler} placeholder="Goal"/>
      </div>
      <div>
        <input className="form-input" type="text" name="goal_explanation" value={goal_explanation} onChange={this.changeHandler} placeholder="Goal Explanation"/>
      </div>
      <div>
        <input className="form-input" type="text" name="goal_reason" value={goal_reason} onChange={this.changeHandler} placeholder="Goal Reason"/>
      </div>
    </div>
  } else {
    inputs =
    <>
      <div className="first-input">
        <input className="form-input" type="text" name="username" value={username} onChange={this.changeHandler}placeholder="Username" />
      </div>
      <span className="form-error">{this.state.errors[0]}</span>
      <div>
        <input className="form-input" type="text" name="name" value={name} onChange={this.changeHandler}placeholder="Name" />
      </div>
      <div className="form-error">{this.state.errors[1]}</div>
      <div>
        <input className="form-input" type="text" name="lastname" value={lastname} onChange={this.changeHandler}placeholder="Last name" />
      </div>
      <div className="form-error">{this.state.errors[2]}</div>
      <div>
        <input className="form-input" type="email" name="email" value={email} onChange={this.changeHandler}placeholder="E-mail" />
      </div>
      <div className="form-error">{this.state.errors[3]}</div>
      <div>
        <input className={password.class} type="password" name={password.name} value={password.value} onChange={this.changeHandler}placeholder="Password" />
      </div>
      <div className="form-error">{this.state.errors[4]}</div>
      <div>
        <input className={passwordConfirm.class} type="password" name={passwordConfirm.name} value={passwordConfirm.value} onChange={this.changeHandler}placeholder="Confirm password" />
      </div>
      <div className="form-error">{this.state.errors[5]}</div>
      <div>
        <input className="form-input description-input" type="textarea" name="description" value={description} onChange={this.changeHandler}placeholder="Description" />
      </div>
      <div className="form-error">{this.state.descriptionError}</div>
    </>
  }

  return (

    <form id="form-register" className="form-container" onSubmit={this.props.update?this.submitUpdate:this.submitHandler}>
      <div className="actual-form">
        <div className="image-register-container">
            {updateProfilePicture}
        </div>
        <div className="form-register-container">
          {loginRegisterNav}
          {inputs}
          {myButton}
        </div>
      </div>
    </form>
  );
}
}

Form.contextType = Context

export default Form;
