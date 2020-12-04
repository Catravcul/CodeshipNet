import React, {Component} from "react";
import Carousel from 'react-elastic-carousel';
import Item from "./Item";

const breakPoints = [
    { width: 1, itemsToShow: 8 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
  ];

class Slider extends Component{
    state = {
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQenFLGsLXa2WrfKCYcxHh_ER-kcoW6-Pywgg&usqp=CAU"
    };

    styles = {
        width:200
    };

      render(){
            return (

                <div className="carousel-container">
                <Carousel breakPoints={breakPoints}>
                  <Item>
                      <img style={this.styles} src={this.state.imageUrl} alt="test"></img>
                  </Item>
                  <Item>2</Item>
                  <Item>3</Item>
                  <Item>4</Item>
                  <Item>5</Item>
                  <Item>6</Item>
                  <Item>7</Item>
                  <Item>8</Item>
                  <Item>9</Item>
                  <Item>10</Item>
                </Carousel>
              </div>
                );
             }
      }
export default Slider;

