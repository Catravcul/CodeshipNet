import React, {Component} from "react";
import Carousel from 'react-elastic-carousel';
import Item from "./Item";
import { Context } from "../components/Context"

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
          {this.props.items ? this.props.items.map(
              item => <Item key={item.id}>
                        <img style={this.styles} src={this.context.config.codeshipFS.urlBase + item.img_path} alt={item.title} />
                      </Item>
            ): null}
        </Carousel>
      </div>
    );
  }
}

Slider.contextType = Context;
      
export default Slider;

