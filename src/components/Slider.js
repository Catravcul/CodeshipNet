import React, {Component} from "react";
import Carousel from 'react-elastic-carousel';
import Item from "./Item";
import { Context } from '../components/Context'
import ModalProduct from './ModalProduct'

const breakPoints = [
    { width: 1, itemsToShow: 6 }
    // { width: 3, itemsToShow: 2, itemsToScroll: 2 },
    // { width: 4, itemsToShow: 3 },
    // { width: 5, itemsToShow: 4 }
  ];

class Slider extends Component{
  state = {
      modalIsOpen: false,
      item: {}
  };

  
  setModalIsOpen = state => this.setState({modalIsOpen: state});

  visitProfile = ({_id}) => {
    window.location.href = '/profile/' + _id
  }

  showModal = item => {
    this.setState({item})
    if (this.state.modalIsOpen) {
      this.setModalIsOpen(false)
    } else {
      this.setModalIsOpen(true)
    }
  }

  render(){
    const urlBase = this.context.config.codeshipFS.urlBase
    let clickEvent, nameProp
    if (this.props.users) {
      clickEvent = this.visitProfile
      nameProp = 'username'
    } else {
      clickEvent = this.showModal
      nameProp = 'title'
    }
    return (
      <div className="carousel-container">
        <Carousel breakPoints={breakPoints}>
          {this.props.items ? this.props.items.map(
              item => 
              <>
                <Item key={item._id}>
                  <img className='carousel-item' src={urlBase + item.img_path} alt={item[nameProp]} onClick={() => clickEvent(item)}/>
                </Item>
              </>
            ): null}
        </Carousel>
        <ModalProduct product={this.state.item} setModalIsOpen={this.setModalIsOpen} modalIsOpen={this.state.modalIsOpen}/>
      </div>
    );
  }
}

Slider.contextType = Context;
      
export default Slider;

