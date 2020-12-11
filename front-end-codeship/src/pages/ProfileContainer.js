import React, { useEffect, useState } from "react";

//Profile Components 
import Slider from "../components/Slider"
import Form from "../components/Form"
import ButtonsNav from "../components/ButtonsNav"



function ProfileContainer(){

    const [usersProfilePictures, setUsersProfilePictures] = useState([])
    const [productsImages, setProductsImages] = useState([])

    //fetch users
    useEffect(() => { 

        const token = sessionStorage.getItem("codeship-token")
          fetch('https://codeship-api.herokuapp.com/user', {method: "GET", headers:{"x-access-token": token}})
          .then(res => {
            return res.json();
          })
          .then(data =>{
            console.log(data)
            setUsersProfilePictures(data.data.users)
          })
          .catch(error => {
            console.log(error)
          })
    
         //fetch products
          fetch('https://codeship-api.herokuapp.com/public/product', {method: "GET"})
    
          .then(res => {
            return res.json();
          })
          .then(products =>{
            console.log(products)
            setProductsImages(products.data.products)
          })
          .catch(error => {
            console.log(error)
          })
        },[])
    
        //events for profile and spaceship update
        
        const showUpdateProfile = () =>{ 
            console.log("profile")
        }

        const showUpdateSpaceship = () =>{ 
            console.log("spaceship")
        }

    return(
  <div className="profile-container">
      <div className="profile-content">
          <div className="sidenav">
              <div className="points-content">

              </div>
              <div className="navbar">
                  <ButtonsNav title="Profile" click={showUpdateProfile}></ButtonsNav>
                  <ButtonsNav title="Spaceship" click={showUpdateSpaceship}></ButtonsNav>
            </div>
          </div>
          <div className="profile-info-container">
              <div className="users-container">
                  <Slider items={usersProfilePictures}></Slider>
              </div>
              <div className="profile-spaceship-info">
                  <div className="profile-spaceship-details">
                      <Form update={true}></Form>
                  </div>
                  <div className="user-spaceship-details">
                      <div className="user-spaceship-link-container">
                      </div>
                      <div className="user-spaceship-container">
                          <div className="image-container">
                          </div>
                      </div>
                      <div className="products-slider-container">
                          <Slider items={productsImages}></Slider>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
    )
    }

export default ProfileContainer;