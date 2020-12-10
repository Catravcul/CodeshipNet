import React, {Component} from "react";



function LoginForm(){
    return(
    <div className="login-form">
           <form>
           <div>
                  <label for=""> Username</label>
                  <input type="text" id="username" name="username" placeholder="write username"></input>
                </div>
                <div>
                  <label for=""> Password</label>
                  <input type="text" id="password" name="password" placeholder="write password"></input>
                </div>
           </form>
    </div>)
}

export default LoginForm;