import React, {useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons"
function Header(){
var [toggle, setToggle] = useState(false)
let userModal
if(toggle){
    userModal = 
    <div className="ModalProfileSignOut">
   <a href="/profile">Profile</a>
   <a href="/login">Sign Out</a>
</div>
}
    return(
        <header>
                <h1>CODESHIP</h1>
                <div className="infoProfileHeader">
                    <div className="infoUserHeader">
                    <h4>username_01</h4>
                    <p>500 coins</p>
                    </div>
                    <img src="https://i.scdn.co/image/9ed3f6a2f42b970bcfcab147a50ad22243e2d1a5"></img>
                    <FontAwesomeIcon icon={faChevronDown}  onClick={() => setToggle(!toggle)} className="icon" />
                    {userModal}
                </div>

        </header>
    )
}

export default Header