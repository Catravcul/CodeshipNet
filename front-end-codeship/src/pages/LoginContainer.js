import React from "react";

//login components
import LoginForm from "../components/LoginForm"

function LoginContainer(props){
    return(<div className="register-and-login-container">
        <div className="form-container">
            <div className="image-design-login">
            </div>
            <div className="login-form-container">
                <LoginForm token={props.token}></LoginForm>

            </div>
        </div>

    </div>)

}

export default LoginContainer;