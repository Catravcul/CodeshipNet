import React, { useContext, useEffect, useState } from "react";

import { Context } from '../components/Context'

//Profile Components
import Slider from "../components/Slider"
import Form from "../components/Form"
import ButtonsNav from "../components/ButtonsNav"



function ProfileContainer(){
  const context = useContext(Context)

  const [user, setUser] = useState({})
  const [usersProfilePictures, setUsersProfilePictures] = useState([])
  const [productsImages, setProductsImages] = useState([])

  const [updateForm, setUpdateForm] = useState(true)
  
  const getFetch = (url, callback) => {
    fetch(url, {method: "GET", cache: 'no-cache'})
    .then(res => {
      return res.json();
    })
    .then(callback)
  }

  //fetch users
  useEffect(() => {
    fetch(context.config.codeshipApi.urlBase + '/user/all', 
    {method: "GET", headers:{"x-access-token": context.token}, cache: 'no-cache'})
    .then(res => {
      return res.json();
    })
    .then(({users}) => setUsersProfilePictures(users))
    .catch(error => {
      console.log(error)
    })
  },[context.token])

  useEffect(() => {
    const userId =  window.location.href.split('/')[4]
    if (userId) {
      getFetch(
        context.config.codeshipApi.urlBase + '/public/user/' + userId,
        ({user}) => setUser(user)
      )
    } else if (context.session._id) {
      setUser(context.session)
    }
  }, [context.session])

  //fetch products & user
  useEffect( () => {
    getFetch(
      context.config.codeshipApi.urlBase + '/public/product',
      ({products}) => setProductsImages(products)
    )
  },[])
  
  //events for profile and spaceship update
  const showUpdateProfile = () =>{
    setUpdateForm(false)
  }
  
  const showUpdateSpaceship = () =>{
      setUpdateForm(true)
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
                    <Slider users={true} items={usersProfilePictures}></Slider>
                </div>
                <div className="profile-spaceship-info">
                    <div className="profile-spaceship-details">
                      {/*props update button*/}
                        <Form spaceship={updateForm} update={true} user={user}></Form>
                    </div>
                    <div className="user-spaceship-details">
                        <div className="user-spaceship-link-container">
                        </div>
                        <div className="user-spaceship-container">
                            <div className="">
                            {}
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
)}
  
export default ProfileContainer;