import React from "react";

//Register Components
import Form from "../components/Form"

function RegisterContainer(){

    return(
            <div className="register-and-login-container">
                    <Form register={true} update={false}></Form>
            </div>
    )
}

export default RegisterContainer;

