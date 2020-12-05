import React, {Component} from "react";
import Carousel from 'react-elastic-carousel';
import Item from "./Item";
import axios from "axios";

const breakPoints = [
    { width: 1, itemsToShow: 8 }
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

    componentDidMount(){
      axios.get('https://jsonplaceholder.typicode.com/photos').then(res => {
        console.log(res);
        this.setState({usersProfilePictures: res.data})
      })
      .catch(error => {
        console.log(error)
      })
    }

      render(){
       const {usersProfilePictures} = this.state

            return (

                <div className="carousel-container">
                <Carousel breakPoints={breakPoints}>

                {usersProfilePictures.length ? usersProfilePictures.map(image => <Item key={image.id}><img style={this.styles} src={image.url} alt="test"></img></Item>): null}
                </Carousel>
              </div>
                );
             }
      }
export default Slider;

