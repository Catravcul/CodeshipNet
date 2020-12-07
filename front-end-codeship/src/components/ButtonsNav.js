import React, {Component} from "react";

function NavButton(props){
    return(
    <div className="nav-buttons-container">
            <button type="button"> {props.title} </button>
    </div>)
}

export default NavButton;