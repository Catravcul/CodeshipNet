import React from "react";

//Profile Components 
import Slider from "../components/Slider"

function ProfileContainer(){
    return(
  <div className="profile-container">
      <div className="profile-content">
          <div className="sidenav">
              <div className="points-content">

              </div>
              <div className="navbar">

            </div>

          </div>
          <div className="profile-info-container">
              <div className="users-container">
                  <Slider></Slider>

              </div>
              <div className="profile-spaceship-info">
                  <div className="profile-spaceship-details">

                  </div>
                  <div className="user-spaceship-details">
                      <div className="user-spaceship-link-container">

                      </div>
                      <div className="user-spaceship-container">
                          <div className="image-container">

                          </div>

                      </div>
                      <div className="products-slider-container">

                      </div>
                      
                  </div>

              </div>

          </div>

      </div>
  </div>
    )
    }
    export default ProfileContainer;