import React from "react";

//login components
import LoginForm from "../components/LoginForm"

function LoginContainer(){
    return(<div className="register-and-login-container">
        <div className="form-container">
            <div className="image-design-login">
            </div>
            <div className="login-form-container">
                <LoginForm />

            </div>
        </div>

    </div>)

}

export default LoginContainer;