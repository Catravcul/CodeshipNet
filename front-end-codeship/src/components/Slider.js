import React, {Component} from "react";
import Carousel from 'react-elastic-carousel';
import Item from "./Item";
// import axios from "axios";

const breakPoints = [
    { width: 1, itemsToShow: 6 }
    // { width: 3, itemsToShow: 2, itemsToScroll: 2 },
    // { width: 4, itemsToShow: 3 },
    // { width: 5, itemsToShow: 4 }
  ];

class Slider extends Component{
    state = {
        usersProfilePictures: []
    };

    styles = {
        width:100,
        height: 100
    };


    
 

    //fetch users
    componentDidMount(){

    const token = sessionStorage.getItem("codeship-token")
      fetch('https://codeship-api.herokuapp.com/user', {method: "GET", headers:{"x-access-token": token}})
      .then(res => {
        return res.json();
      })
      .then(data =>{
        console.log(data)
        // this.setState({usersProfilePictures: products.data.products})
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
        this.setState({usersProfilePictures: products.data.products})
      })
      .catch(error => {
        console.log(error)
      })
    }

      render(){
       const {usersProfilePictures} = this.state
       console.log(this.state);

            return (

                <div className="carousel-container">
                <Carousel breakPoints={breakPoints}>

                {usersProfilePictures.length ? usersProfilePictures.map(image => <Item key={image.id}><img style={this.styles} src={"https://codeship-api.herokuapp.com/" + image.img_path} alt={image.title}></img></Item>): null}
                </Carousel>
              </div>
                );
             }
      }

      
export default Slider;

