import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { getSpaceshipConfig } from "../config/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
const config = getSpaceshipConfig();

// install npm font awesome
//npm i --save @fortawesome/fontawesome-svg-core  @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome @fortawesome/free-brands-svg-icons
function ProductCard(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "none",
      backgroundColor: "black",
      border: "none",
      inset: "10% auto auto 50%",
    },
  };
  const addProduct = (id) =>{
    if(props.cart.find(product=> product._id === id)){

    }else{
      const product = props.products.find((product) => product._id === id)
      props.setCart((prevState)=>[...prevState, product])
    }

  }

  return (
    <div className="ProductCard">
          <img
            onClick={() => setModalIsOpen(true)}
            src={"https://codeship-api.herokuapp.com/" + props.product.img_path}
          />
          <div className="ContainerInfoCard">
            <h3>{props.product.title}</h3>
            <p>{props.product.price} coins</p>
            <FontAwesomeIcon icon={faPlusCircle} onClick={()=> addProduct(props.product._id)} className="icon" />
          </div>
          <Modal style={customStyles} className="modal" isOpen={modalIsOpen}>
            <span className="closeModal" onClick={() => setModalIsOpen(false)}>
              X
            </span>
            <img
              className="imgProduct"
              src={"https://codeship-api.herokuapp.com/" + props.product.img_path}
            />
            <h3 className="TitleProductModal">{props.product.title}</h3>
            <p className="DescriptionProductModal">
              {props.product.description}
            </p>
            <form className="FormComments">
              <textarea className="textareaComments"></textarea>
              <button className="PublishComment">PUBLISH</button>
            </form>
            <div className="commentsContainer">
              <img
                className="ImgUser"
                src="https://i.scdn.co/image/9ed3f6a2f42b970bcfcab147a50ad22243e2d1a5"
              />
              <p>
                <span>username</span> comentario diciendo lo bueno que es este
                producto! Que bonito todo y funciona de maravilla hehehihihihi
                :OO
              </p>
            </div>
          </Modal>
    </div>
  );
}

export default ProductCard;
