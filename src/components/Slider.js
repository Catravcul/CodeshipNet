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
    // state = {
    //     usersProfilePictures: []
    // };

    styles = {
        width:100,
        height: 100
    };

      render(){
            return (

                <div className="carousel-container">
                <Carousel breakPoints={breakPoints}>

                {this.props.items.length ? this.props.items.map(image => <Item key={image.id}><img style={this.styles} src={"https://codeship-api.herokuapp.com/" + image.img_path} alt={image.title}></img></Item>): null}
                </Carousel>
              </div>
                );
             }
      }

      
export default Slider;

